import fs from 'fs';
import path from 'path';

// Vercel Serverless Function to handle secure downloads
export default async function handler(req: any, res: any) {
  const { file } = req.query;

  if (!file) {
    return res.status(400).json({ error: 'File parameter is missing' });
  }

  // Security: Prevent directory traversal by only allowing specific characters
  const safeFileName = file.replace(/[^a-zA-Z0-9.-]/g, '');
  
  // We'll look for files in the 'public/docs' directory but hide the direct URL
  // You can later move this to a private directory if you want even more security
  const filePath = path.join(process.cwd(), 'public', 'docs', safeFileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Document not found or being updated.' });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    // Set headers to force download and hide the real path
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"`);
    
    return res.send(fileBuffer);
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
