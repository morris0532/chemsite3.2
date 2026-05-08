import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, type, product, documents, company, quantity, phone, subscribe } = req.body;

  // Basic validation
  if (!email || (!message && type !== 'doc_request' && type !== 'product_inquiry')) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Resend API key not configured' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    if (type === 'doc_request') {
      const docList = documents.split(', ');
      const slug = product.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      // Check which files exist on server
      const docsWithStatus = docList.map((doc: string) => {
        const docType = doc.toLowerCase();
        const fileName = `${slug}-${docType}.pdf`;
        const filePath = path.join(process.cwd(), 'public', 'docs', fileName);
        const exists = fs.existsSync(filePath);
        // Generate a slightly obfuscated download link through our new API
        const obfuscatedUrl = `https://sinopeakchem.com/api/download?file=${fileName}`;
        return { name: doc, fileName, exists, url: obfuscatedUrl };
      });

      const missingDocs = docsWithStatus.filter((d: any) => !d.exists);

      // 1. Send to Customer
      await resend.emails.send({
        from: 'Sinopeakchem <info@sinopeakchem.com>',
        to: email,
        subject: `Technical Documents for ${product}`,
        html: `
          <h2>Technical Documents Request</h2>
          <p>Dear ${name || 'Customer'},</p>
          <p>Thank you for your interest in our product: <strong>${product}</strong>.</p>
          <p>As requested, here are the technical documents you need:</p>
          <ul>
            ${docsWithStatus.map((doc: any) => {
              if (doc.exists) {
                return `<li><strong>${doc.name}</strong>: <a href="${doc.url}">Download ${doc.name}</a></li>`;
              } else {
                return `<li><strong>${doc.name}</strong>: <span style="color: #e53e3e;">Currently being updated. Our team will send it to you manually shortly.</span></li>`;
              }
            }).join('')}
          </ul>
          ${missingDocs.length > 0 ? `<p><em>Note: Some documents are undergoing final review and will be sent to you by our technical team within 24 hours.</em></p>` : ''}
          <p>If you have any further questions or need a formal quote, please don't hesitate to reply to this email.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Sinopeakchem Team</strong><br />info@sinopeakchem.com</p>
        `,
      });

      // 2. Notify Admin
      const data = await resend.emails.send({
        from: 'Sinopeakchem System <info@sinopeakchem.com>',
        to: 'info@sinopeakchem.com',
        replyTo: email,
        subject: `${subscribe ? '[NEW SUBSCRIBER] ' : ''}${missingDocs.length > 0 ? '[URGENT - DOC MISSING] ' : '[Lead] '}Document Request: ${product} from ${name || email}`,
        html: `
          <h2>New Document Request (Lead)</h2>
          ${missingDocs.length > 0 ? `<div style="padding: 15px; background-color: #fff5f5; border: 1px solid #feb2b2; color: #c53030; margin-bottom: 20px;">
            <strong>ATTENTION:</strong> The following documents were MISSING and NOT sent to the customer:
            <ul>${missingDocs.map((d: any) => `<li>${d.name} (${d.fileName})</li>`).join('')}</ul>
            Please reply to the customer (${email}) manually with the requested files.
          </div>` : ''}
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Name:</strong> ${name || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Documents Requested:</strong> ${documents}</p>
          <p><strong>Subscribe to Newsletter:</strong> ${subscribe ? 'YES' : 'NO'}</p>
          <hr />
          <p>Automated notification from sinopeakchem.com</p>
        `,
      });

      // Try to add to Resend Audience if ID is provided
      if (subscribe && process.env.RESEND_AUDIENCE_ID) {
        try {
          await resend.contacts.create({
            email: email,
            firstName: name?.split(' ')[0] || '',
            lastName: name?.split(' ').slice(1).join(' ') || '',
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID,
          });
        } catch (err) {
          console.error('Failed to add contact to audience:', err);
        }
      }

      return res.status(200).json({ success: true, data });
    }

    if (type === 'product_inquiry') {
      // 1. Send Confirmation to Customer
      await resend.emails.send({
        from: 'Sinopeakchem <info@sinopeakchem.com>',
        to: email,
        subject: `Inquiry Received: ${product}`,
        html: `
          <h2>Thank you for your inquiry</h2>
          <p>Dear ${name || 'Customer'},</p>
          <p>We have received your inquiry for <strong>${product}</strong>. Our sales team will review your requirements and get back to you with a formal quotation within 24 hours.</p>
          <p><strong>Your Inquiry Details:</strong></p>
          <ul>
            <li><strong>Product:</strong> ${product}</li>
            <li><strong>Quantity:</strong> ${quantity || 'Not specified'}</li>
          </ul>
          <p>If you have any urgent questions, please feel free to reply to this email or contact us via WhatsApp.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Sinopeakchem Sales Team</strong><br />info@sinopeakchem.com</p>
        `,
      });

      // 2. Send Full Details to Admin
      const data = await resend.emails.send({
        from: 'Sinopeakchem System <info@sinopeakchem.com>',
        to: 'info@sinopeakchem.com',
        replyTo: email,
        subject: `${subscribe ? '[NEW SUBSCRIBER] ' : ''}[New Inquiry] ${product} from ${name || email}`,
        html: `
          <h2>New Product Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Product</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${product}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Quantity</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quantity || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Customer Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${company || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Subscribe to Newsletter</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${subscribe ? 'YES' : 'NO'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${message || 'N/A'}</td></tr>
          </table>
          <hr />
          <p>Automated notification from sinopeakchem.com</p>
        `,
      });

      // Try to add to Resend Audience if ID is provided
      if (subscribe && process.env.RESEND_AUDIENCE_ID) {
        try {
          await resend.contacts.create({
            email: email,
            firstName: name?.split(' ')[0] || '',
            lastName: name?.split(' ').slice(1).join(' ') || '',
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID,
          });
        } catch (err) {
          console.error('Failed to add contact to audience:', err);
        }
      }

      return res.status(200).json({ success: true, data });
    }

    // Default Contact Form Logic
    // 1. Send Confirmation to Customer
    await resend.emails.send({
      from: 'Sinopeakchem <info@sinopeakchem.com>',
      to: email,
      subject: `Message Received: ${subject || 'General Inquiry'}`,
      html: `
        <h2>Thank you for contacting us</h2>
        <p>Dear ${name || 'Customer'},</p>
        <p>We have received your message regarding "<strong>${subject || 'General Inquiry'}</strong>". Our team will review your request and get back to you as soon as possible.</p>
        <p><strong>Your Message Summary:</strong></p>
        <div style="padding: 15px; background-color: #f7fafc; border-left: 4px solid #4a5568; margin: 20px 0;">
          ${message}
        </div>
        <p>If you have any urgent questions, please feel free to reply to this email.</p>
        <br />
        <p>Best Regards,</p>
        <p><strong>Sinopeakchem Team</strong><br />info@sinopeakchem.com</p>
      `,
    });

    // 2. Send Full Details to Admin
    const data = await resend.emails.send({
      from: 'Sinopeakchem Contact Form <info@sinopeakchem.com>',
      to: 'info@sinopeakchem.com',
      subject: `New Inquiry: ${subject || 'General Inquiry'} from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr />
        <p>This email was sent from the contact form on sinopeakchem.com</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}
