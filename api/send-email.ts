import { Resend } from 'resend';

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

  const resend = new Resend(process.env.RESEND_API_KEY || 're_aMc6CbVu_JbyMDUdzNpmA8GDo3RqSDirV');

  try {
    if (type === 'doc_request') {
      // 1. Send to Customer
      await resend.emails.send({
        from: 'Sinopeakchem <onboarding@resend.dev>',
        to: email,
        subject: `Technical Documents for ${product}`,
        html: `
          <h2>Technical Documents Request</h2>
          <p>Dear ${name || 'Customer'},</p>
          <p>Thank you for your interest in our product: <strong>${product}</strong>.</p>
          <p>As requested, here are the technical documents you need:</p>
          <ul>
            ${documents.split(', ').map((doc: string) => `<li><strong>${doc}</strong>: <a href="https://sinopeakchem.com/docs/${product.toLowerCase().replace(/\s+/g, '-')}-${doc.toLowerCase()}.pdf">Download ${doc}</a></li>`).join('')}
          </ul>
          <p>If you have any further questions or need a formal quote, please don't hesitate to reply to this email.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Sinopeakchem Team</strong><br />info@sinopeakchem.com</p>
        `,
      });

      // 2. Notify Admin
      const data = await resend.emails.send({
        from: 'Sinopeakchem System <onboarding@resend.dev>',
        to: 'info@sinopeakchem.com',
        subject: `[Lead] Document Request: ${product} from ${name || email}`,
        html: `
          <h2>New Document Request (Lead)</h2>
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
      from: 'Sinopeakchem Contact Form <onboarding@resend.dev>',
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
