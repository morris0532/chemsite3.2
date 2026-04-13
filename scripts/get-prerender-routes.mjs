import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPrerenderRoutes() {
  const contentDir = path.resolve('src/content');
  const locales = ['en', 'ru', 'fr', 'es', 'ar'];
  const POSTS_PER_PAGE = 12;
  const basePages = [
    '',
    '/products',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/packaging-gallery'
  ];

  const routes = [];

  basePages.forEach(page => {
    routes.push(`/en${page}`);
    routes.push(`/ru${page}`);
    routes.push(`/fr${page}`);
    routes.push(`/es${page}`);
    routes.push(`/ar${page}`);
  });

  locales.forEach(locale => {
    const blogDir = path.join(contentDir, locale, 'blog');
    if (fs.existsSync(blogDir)) {
      const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
      let activeBlogCount = 0;

      blogFiles.forEach(file => {
        const fileContent = fs.readFileSync(path.join(blogDir, file), 'utf-8');
        const { data } = matter(fileContent);
        if (data.draft !== true) {
          activeBlogCount++;
          const slug = data.slug || data.Slug || file.replace('.md', '');
          routes.push(`/${locale}/blog/${slug}`);
        }
      });

      // Add pagination routes
      const totalPages = Math.ceil(activeBlogCount / POSTS_PER_PAGE);
      for (let i = 2; i <= totalPages; i++) {
        routes.push(`/${locale}/blog/page/${i}`);
      }
    }
  });

  locales.forEach(locale => {
    const productDir = path.join(contentDir, locale, 'products');
    if (fs.existsSync(productDir)) {
      fs.readdirSync(productDir).forEach(file => {
        if (file.endsWith('.md')) {
          const fileContent = fs.readFileSync(path.join(productDir, file), 'utf-8');
          const { data } = matter(fileContent);
          if (data.draft !== true) {
            const slug = data.slug || data.Slug || file.replace('.md', '');
            routes.push(`/${locale}/products/${slug}`);
          }
        }
      });
    }
  });

  return [...new Set(routes)];
}
