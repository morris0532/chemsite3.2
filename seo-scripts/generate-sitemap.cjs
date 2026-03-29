const fs = require('fs');
const path = require('path');

// Base URL of the website
const BASE_URL = 'https://sinopeakchem.com';

// Get current date for lastmod
const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// Static routes for both English and Russian
const staticRoutes = [
  { url: '/', lang: 'en', priority: '1.0' },
  { url: '/en', lang: 'en', priority: '1.0' },
  { url: '/en/products', lang: 'en', priority: '0.8' },
  { url: '/en/about', lang: 'en', priority: '0.8' },
  { url: '/en/blog', lang: 'en', priority: '0.8' },
  { url: '/en/contact', lang: 'en', priority: '0.8' },
  { url: '/ru', lang: 'ru', priority: '1.0' },
  { url: '/ru/products', lang: 'ru', priority: '0.8' },
  { url: '/ru/about', lang: 'ru', priority: '0.8' },
  { url: '/ru/blog', lang: 'ru', priority: '0.8' },
  { url: '/ru/contact', lang: 'ru', priority: '0.8' },
];

// Function to extract slugs from data files
function getSlugs(filePath, regex) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Extract English product slugs
const enProductSlugs = getSlugs(
  path.join(__dirname, '../src/data/products.ts'),
  /slug:\s*["'](.+?)["']/g
);

// Extract Russian product slugs
const ruProductSlugs = getSlugs(
  path.join(__dirname, '../src/data/products_ru.ts'),
  /slug:\s*["'](.+?)["']/g
);

// Extract English blog slugs
const enBlogSlugs = getSlugs(
  path.join(__dirname, '../src/data/blogs.ts'),
  /slug:\s*["'](.+?)["']/g
);

// Extract Russian blog slugs
const ruBlogSlugs = getSlugs(
  path.join(__dirname, '../src/data/blogs_ru.ts'),
  /slug:\s*["'](.+?)["']/g
);

// Combine all routes
const allRoutes = [
  ...staticRoutes,
  ...enProductSlugs.map(slug => ({ url: `/en/products/${slug}`, lang: 'en', priority: '0.8' })),
  ...enBlogSlugs.map(slug => ({ url: `/en/blog/${slug}`, lang: 'en', priority: '0.8' })),
  ...ruProductSlugs.map(slug => ({ url: `/ru/products/${slug}`, lang: 'ru', priority: '0.8' })),
  ...ruBlogSlugs.map(slug => ({ url: `/ru/blog/${slug}`, lang: 'ru', priority: '0.8' })),
];

// Generate XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes
  .map(route => {
    let alternateLink = '';
    if (route.url === '/') {
      alternateLink = `<xhtml:link rel="alternate" hreflang="ru" href="${BASE_URL}/ru" />`;
    } else if (route.lang === 'en') {
      alternateLink = `<xhtml:link rel="alternate" hreflang="ru" href="${BASE_URL}/ru${route.url.substring(3)}" />`;
    } else if (route.lang === 'ru') {
      alternateLink = `<xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en${route.url.substring(3)}" />`;
    }
    
    return `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
    ${alternateLink}
  </url>`;
  })
  .join('\n')}
</urlset>`;

// Write to public directory
const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml);

console.log(`Sitemap generated successfully at ${outputPath}`);
console.log(`Total routes: ${allRoutes.length}`);
