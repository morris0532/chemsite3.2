import fs from 'fs';
import path from 'path';

export function getPrerenderRoutes() {
  const contentDir = path.resolve('src/content');
  const locales = ['en', 'ru'];
  const basePages = [
    '',
    '/products',
    '/blog',
    '/about',
    '/contact'
  ];

  const routes = [];

  // 1. 基础页面
  basePages.forEach(page => {
    routes.push(`/en${page}`);
    routes.push(`/ru${page}`);
  });

  // 2. 博客文章
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

  // 3. 产品页面
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

  // 去重并返回
  return [...new Set(routes)];
}
