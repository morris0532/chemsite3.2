import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.sinopeakchem.com';

async function generateSitemap() {
  const contentDir = path.resolve('src/content');
  const locales = ['en', 'ru', 'fr', 'es', 'ar'];
  const pages = [
    '',
    '/products',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service'
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const today = new Date().toISOString().split('T')[0];

  const addUrl = (loc, changefreq, priority, alternateLocs) => {
    sitemap += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;
    
    Object.entries(alternateLocs).forEach(([lang, href]) => {
      sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`;
    });
    
    sitemap += `
  </url>`;
  };

  pages.forEach(page => {
    const alternateLocs = {};
    locales.forEach(locale => {
      alternateLocs[locale] = `${SITE_URL}/${locale}${page}`;
    });
    
    locales.forEach(locale => {
      addUrl(alternateLocs[locale], 'weekly', page === '' ? '1.0' : '0.8', alternateLocs);
    });
  });

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
    const alternateLocs = {};
    locales.forEach(locale => {
      alternateLocs[locale] = `${SITE_URL}/${locale}/blog/${slug}`;
    });
    
    for (const locale of locales) {
      const blogFile = path.join(contentDir, locale, 'blog', `${slug}.md`);
      if (fs.existsSync(blogFile)) {
        addUrl(alternateLocs[locale], 'monthly', '0.6', alternateLocs);
      }
    }
  }

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
    const alternateLocs = {};
    locales.forEach(locale => {
      alternateLocs[locale] = `${SITE_URL}/${locale}/products/${slug}`;
    });
    
    for (const locale of locales) {
      const productFile = path.join(contentDir, locale, 'products', `${slug}.md`);
      if (fs.existsSync(productFile)) {
        addUrl(alternateLocs[locale], 'monthly', '0.7', alternateLocs);
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
