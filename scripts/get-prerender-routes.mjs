import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPrerenderRoutes() {
  const contentDir = path.resolve('src/content');
  const locales = ['en', 'ru', 'fr', 'es', 'ar'];
  const POSTS_PER_PAGE = 12;
  
  // Base pages that exist for every locale
  const basePages = [
    '',
    '/products',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/packaging-gallery',
    '/topics'
  ];

  const routes = [];

  // 1. Add base pages for all locales
  basePages.forEach(page => {
    locales.forEach(locale => {
      routes.push(`/${locale}${page}`);
    });
  });

  // 2. Automatically scan content directories for detail pages
  locales.forEach(locale => {
    const localeDir = path.join(contentDir, locale);
    if (!fs.existsSync(localeDir)) return;

    const items = fs.readdirSync(localeDir, { withFileTypes: true });
    
    items.forEach(item => {
      if (item.isDirectory()) {
        const type = item.name; // e.g., 'blog', 'products'
        const typeDir = path.join(localeDir, type);
        const files = fs.readdirSync(typeDir).filter(f => f.endsWith('.md'));
        
        let activeCount = 0;
        files.forEach(file => {
          const fileContent = fs.readFileSync(path.join(typeDir, file), 'utf-8');
          const { data } = matter(fileContent);
          if (data.draft !== true) {
            activeCount++;
            const slug = data.slug || data.Slug || file.replace('.md', '');
            
            // Add detail route for this type
            routes.push(`/${locale}/${type}/${slug}`);
            
            // SPECIAL CASE: Topics detail pages are derived from products content
            if (type === 'products') {
              routes.push(`/${locale}/topics/${slug}`);
            }
          }
        });

        // Add pagination for blog
        if (type === 'blog') {
          const totalPages = Math.ceil(activeCount / POSTS_PER_PAGE);
          for (let i = 2; i <= totalPages; i++) {
            routes.push(`/${locale}/blog/page/${i}`);
          }
        }
      }
    });
  });

  // Unique and clean routes
  return [...new Set(routes)].map(r => {
    let clean = r.replace(/\/$/, '');
    return clean === '' ? '/en' : clean;
  });
}
