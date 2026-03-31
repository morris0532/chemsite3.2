import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://sinopeakchem.com';

async function generateSitemap() {
  const contentDir = path.resolve('src/content');
  const locales = ['en', 'ru'];
  const pages = [
    '',
    '/products',
    '/blog',
    '/about',
    '/contact'
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const today = new Date().toISOString().split('T')[0];

  const addUrl = (loc, changefreq, priority, enLoc, ruLoc) => {
    sitemap += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}" />
    <xhtml:link rel="alternate" hreflang="ru" href="${ruLoc}" />
  </url>`;
  };

  // 1. 添加基础页面
  pages.forEach(page => {
    const enLoc = `${SITE_URL}/en${page}`;
    const ruLoc = `${SITE_URL}/ru${page}`;
    addUrl(`${SITE_URL}/en${page}`, 'weekly', page === '' ? '1.0' : '0.8', enLoc, ruLoc);
    if (page !== '') { // Avoid duplicate for homepage, as /en is already added
      addUrl(`${SITE_URL}/ru${page}`, 'weekly', '0.8', enLoc, ruLoc);
    }
  });

  // 2. 添加博客文章
  for (const locale of locales) {
    const blogDir = path.join(contentDir, locale, 'blog');
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        const slug = file.replace('.md', '');
        const enLoc = `${SITE_URL}/en/blog/${slug}`;
        const ruLoc = `${SITE_URL}/ru/blog/${slug}`;
        addUrl(`${SITE_URL}/${locale}/blog/${slug}`, 'monthly', '0.6', enLoc, ruLoc);
      });
    }
  }

  // 3. 添加产品页面
  for (const locale of locales) {
    const productDir = path.join(contentDir, locale, 'products');
    if (fs.existsSync(productDir)) {
      const files = fs.readdirSync(productDir).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        const slug = file.replace('.md', '');
        const enLoc = `${SITE_URL}/en/products/${slug}`;
        const ruLoc = `${SITE_URL}/ru/products/${slug}`;
        addUrl(`${SITE_URL}/${locale}/products/${slug}`, 'monthly', '0.7', enLoc, ruLoc);
      });
    }
  }

  sitemap += '\n</urlset>';

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully in public/sitemap.xml');
}

generateSitemap();
