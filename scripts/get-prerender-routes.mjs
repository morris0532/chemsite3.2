import fs from 'fs';
import path from 'path';

export function getPrerenderRoutes() {
  const contentDir = path.resolve('src/content');
  const locales = ['en', 'ru', 'fr', 'es'];
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
  });

  locales.forEach(locale => {
    const blogDir = path.join(contentDir, locale, 'blog');
    if (fs.existsSync(blogDir)) {
      fs.readdirSync(blogDir).forEach(file => {
        if (file.endsWith('.md')) {
          const slug = file.replace('.md', '');
          routes.push(`/${locale}/blog/${slug}`);
        }
      });
    }
  });

  locales.forEach(locale => {
    const productDir = path.join(contentDir, locale, 'products');
    if (fs.existsSync(productDir)) {
      fs.readdirSync(productDir).forEach(file => {
        if (file.endsWith('.md')) {
          const slug = file.replace('.md', '');
          routes.push(`/${locale}/products/${slug}`);
        }
      });
    }
  });

  return [...new Set(routes)];
}
