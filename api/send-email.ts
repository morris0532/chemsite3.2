import { Resend } from 'resend';

// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Use environment variable for API key
  const resend = new Resend(process.env.RESEND_API_KEY || 're_aMc6CbVu_JbyMDUdzNpmA8GDo3RqSDirV');

  try {
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
