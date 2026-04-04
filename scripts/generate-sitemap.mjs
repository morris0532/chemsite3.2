import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.sinopeakchem.com';

async function generateSitemap() {
  const contentDir = path.resolve('src/content');
  const locales = ['en', 'ru', 'fr'];
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

  const addUrl = (loc, changefreq, priority, enLoc, ruLoc, frLoc) => {
    sitemap += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}" />
    <xhtml:link rel="alternate" hreflang="ru" href="${ruLoc}" />
    <xhtml:link rel="alternate" hreflang="fr" href="${frLoc}" />
  </url>`;
  };

  // 1. 添加基础页面
  pages.forEach(page => {
    const enLoc = `${SITE_URL}/en${page}`;
    const ruLoc = `${SITE_URL}/ru${page}`;
    const frLoc = `${SITE_URL}/fr${page}`;
    
    // 为每个语言添加 URL 条目
    addUrl(enLoc, 'weekly', page === '' ? '1.0' : '0.8', enLoc, ruLoc, frLoc);
    addUrl(ruLoc, 'weekly', '0.8', enLoc, ruLoc, frLoc);
    addUrl(frLoc, 'weekly', '0.8', enLoc, ruLoc, frLoc);
  });

  // 2. 添加博客文章
  // 先获取所有博客的 slug，确保 alternate 链接完整
  const blogSlugs = new Set();
  for (const locale of locales) {
    const blogDir = path.join(contentDir, locale, 'blog');
    if (fs.existsSync(blogDir)) {
      fs.readdirSync(blogDir)
        .filter(f => f.endsWith('.md'))
        .forEach(f => blogSlugs.add(f.replace('.md', '')));
    }
  }

  for (const slug of blogSlugs) {
    const enLoc = `${SITE_URL}/en/blog/${slug}`;
    const ruLoc = `${SITE_URL}/ru/blog/${slug}`;
    const frLoc = `${SITE_URL}/fr/blog/${slug}`;
    
    for (const locale of locales) {
      const blogFile = path.join(contentDir, locale, 'blog', `${slug}.md`);
      if (fs.existsSync(blogFile)) {
        addUrl(`${SITE_URL}/${locale}/blog/${slug}`, 'monthly', '0.6', enLoc, ruLoc, frLoc);
      }
    }
  }

  // 3. 添加产品页面
  // 先获取所有产品的 slug
  const productSlugs = new Set();
  for (const locale of locales) {
    const productDir = path.join(contentDir, locale, 'products');
    if (fs.existsSync(productDir)) {
      fs.readdirSync(productDir)
        .filter(f => f.endsWith('.md'))
        .forEach(f => productSlugs.add(f.replace('.md', '')));
    }
  }

  for (const slug of productSlugs) {
    const enLoc = `${SITE_URL}/en/products/${slug}`;
    const ruLoc = `${SITE_URL}/ru/products/${slug}`;
    const frLoc = `${SITE_URL}/fr/products/${slug}`;
    
    for (const locale of locales) {
      const productFile = path.join(contentDir, locale, 'products', `${slug}.md`);
      if (fs.existsSync(productFile)) {
        addUrl(`${SITE_URL}/${locale}/products/${slug}`, 'monthly', '0.7', enLoc, ruLoc, frLoc);
      }
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
