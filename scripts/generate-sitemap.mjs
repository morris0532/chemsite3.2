import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.sinopeakchem.com';
const TODAY = new Date().toISOString().split('T')[0];
const PUBLIC_DIR = path.resolve('public');
const CONTENT_DIR = path.resolve('src/content');
const LOCALES = ['en', 'ru', 'fr', 'es', 'ar'];

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

function getXmlHeader() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
}

function formatUrlEntry(loc, changefreq, priority, alternates) {
  let entry = `
  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;
  
  Object.entries(alternates).forEach(([lang, href]) => {
    entry += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`;
  });
  // Add x-default
  entry += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates['en'] || loc}" />`;
  
  entry += `
  </url>`;
  return entry;
}

async function generateSitemap() {
  console.log('Starting advanced sitemap generation...');
  const sitemaps = [];

  // 1. Static Pages Sitemap
  let staticXml = getXmlHeader();
  const staticPages = ['', '/products', '/blog', '/about', '/contact', '/privacy-policy', '/terms-of-service'];
  
  staticPages.forEach(page => {
    const alternates = {};
    LOCALES.forEach(l => alternates[l] = `${SITE_URL}/${l}${page}`);
    LOCALES.forEach(l => {
      staticXml += formatUrlEntry(alternates[l], 'weekly', page === '' ? '1.0' : '0.8', alternates);
    });
  });
  staticXml += '\n</urlset>';
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-static.xml'), staticXml);
  sitemaps.push('sitemap-static.xml');

  // 2. Products Sitemap
  let productXml = getXmlHeader();
  const productSlugs = new Set();
  LOCALES.forEach(l => {
    const dir = path.join(CONTENT_DIR, l, 'products');
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).filter(f => f.endsWith('.md')).forEach(f => productSlugs.add(f.replace('.md', '')));
    }
  });

  productSlugs.forEach(slug => {
    const alternates = {};
    LOCALES.forEach(l => alternates[l] = `${SITE_URL}/${l}/products/${slug}`);
    LOCALES.forEach(l => {
      productXml += formatUrlEntry(alternates[l], 'monthly', '0.9', alternates);
    });
  });
  productXml += '\n</urlset>';
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-products.xml'), productXml);
  sitemaps.push('sitemap-products.xml');

  // 3. Blog Sitemap (Supports splitting if > 1000 items per file to be safe, though Google limit is 50k)
  const blogSlugs = new Set();
  LOCALES.forEach(l => {
    const dir = path.join(CONTENT_DIR, l, 'blog');
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).filter(f => f.endsWith('.md')).forEach(f => blogSlugs.add(f.replace('.md', '')));
    }
  });

  const blogSlugsArray = Array.from(blogSlugs);
  const CHUNK_SIZE = 1000; // Conservative chunk size for blog posts
  for (let i = 0; i < blogSlugsArray.length; i += CHUNK_SIZE) {
    const chunk = blogSlugsArray.slice(i, i + CHUNK_SIZE);
    const chunkIndex = Math.floor(i / CHUNK_SIZE) + 1;
    const fileName = `sitemap-blog-${chunkIndex}.xml`;
    
    let blogXml = getXmlHeader();
    chunk.forEach(slug => {
      const alternates = {};
      LOCALES.forEach(l => alternates[l] = `${SITE_URL}/${l}/blog/${slug}`);
      LOCALES.forEach(l => {
        blogXml += formatUrlEntry(alternates[l], 'monthly', '0.6', alternates);
      });
    });
    blogXml += '\n</urlset>';
    fs.writeFileSync(path.join(PUBLIC_DIR, fileName), blogXml);
    sitemaps.push(fileName);
  }

  // 4. Generate Sitemap Index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  sitemaps.forEach(s => {
    indexXml += `
  <sitemap>
    <loc>${SITE_URL}/${s}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`;
  });
  indexXml += '\n</sitemapindex>';
  
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);
  console.log(`Sitemap Index generated with ${sitemaps.length} sub-sitemaps.`);
}

generateSitemap().catch(console.error);
