import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, type, product, documents, company } = req.body;

  // Basic validation
  if (!email || (!message && type !== 'doc_request')) {
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
        reply_to: email,
        subject: `${missingDocs.length > 0 ? '[URGENT - DOC MISSING] ' : '[Lead] '}Document Request: ${product} from ${name || email}`,
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
          <hr />
          <p>Automated notification from sinopeakchem.com</p>
        `,
      });
      return res.status(200).json({ success: true, data });
    }

    // Default Contact Form Logic
    const data = await resend.emails.send({
      from: 'Sinopeakchem Contact Form <info@sinopeakchem.com>',
      to: 'info@sinopeakchem.com',
      subject: `New Inquiry: ${subject || 'General Inquiry'} from ${name}`,
      reply_to: email,
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
