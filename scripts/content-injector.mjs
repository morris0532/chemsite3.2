import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import { getPrerenderRoutes } from './get-prerender-routes.mjs';

const routes = getPrerenderRoutes();
const distDir = path.resolve('dist');
const contentDir = path.resolve('src/content');
const siteConfig = JSON.parse(fs.readFileSync(path.join(contentDir, 'site-config.json'), 'utf-8'));

console.log(`Starting content injection for ${routes.length} routes...`);

routes.forEach(route => {
  const routePath = route.startsWith('/') ? route.slice(1) : route;
  const targetFile = path.join(distDir, routePath, 'index.html');

  if (!fs.existsSync(targetFile)) {
    console.warn(`Target file not found: ${targetFile}`);
    return;
  }

  let contentHtml = '';
  let title = '';
  let description = '';

  const parts = route.split('/').filter(Boolean); // [en, blog, slug] 或 [en, products, slug] 或 [en, about]
  const locale = parts[0] || 'en';
  const type = parts[1];
  const slug = parts[2];

  // 1. 处理产品详情页和博客详情页 (MD 文件)
  if (parts.length === 3 && (type === 'blog' || type === 'products')) {
    const mdFilePath = path.join(contentDir, locale, type, `${slug}.md`);
    if (fs.existsSync(mdFilePath)) {
      const fileContent = fs.readFileSync(mdFilePath, 'utf-8');
      const { data, content } = matter(fileContent);
      contentHtml = marked.parse(content);
      title = data.title || data.name || '';
      description = data.excerpt || data.description || data.shortDescription || '';
    }
  } 
  // 2. 处理 About, Contact, Privacy, Terms (硬编码或简单逻辑)
  else if (parts.length === 2) {
    const page = parts[1];
    if (page === 'about') {
      title = locale === 'ru' ? 'О нас' : (locale === 'fr' ? 'À propos' : 'About Us');
      description = siteConfig[locale]?.footer?.companyDesc || '';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
    } else if (page === 'contact') {
      title = locale === 'ru' ? 'Контакты' : (locale === 'fr' ? 'Contact' : 'Contact Us');
      description = 'Get in touch with Sinopeakchem for high-quality chemical products.';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
    } else if (page === 'products') {
      title = locale === 'ru' ? 'Продукты' : (locale === 'fr' ? 'Produits' : 'Products');
      description = 'Browse our wide range of high-quality industrial chemicals.';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
    } else if (page === 'blog') {
      title = locale === 'ru' ? 'Блог' : (locale === 'fr' ? 'Blog' : 'Blog');
      description = 'Latest industry insights and product guides from Sinopeakchem.';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
    }
  }
  // 3. 处理首页
  else if (parts.length === 1) {
    title = locale === 'ru' ? 'Главная' : (locale === 'fr' ? 'Accueil' : 'Home');
    description = siteConfig[locale]?.footer?.companyDesc || '';
    contentHtml = `<h1>${title}</h1><p>${description}</p>`;
  }

  if (contentHtml || title || description) {
    let html = fs.readFileSync(targetFile, 'utf-8');

    // 1. 注入正文到 <div id="root"></div>
    const rootPlaceholder = '<div id="root"></div>';
    if (contentHtml && html.includes(rootPlaceholder)) {
      html = html.replace(rootPlaceholder, `<div id="root">${contentHtml}</div>`);
    }

    // 2. 注入 SEO Title
    if (title) {
      const fullTitle = `${title} | Sinopeakchem`;
      const titleRegex = /<title>[\s\S]*?<\/title>/i;
      if (titleRegex.test(html)) {
        html = html.replace(titleRegex, `<title>${fullTitle}</title>`);
      } else {
        html = html.replace(/<\/head>/i, `  <title>${fullTitle}</title>\n  </head>`);
      }
    }

    // 3. 注入 SEO Description
    if (description) {
      const cleanDesc = description.replace(/"/g, '&quot;').replace(/\n/g, ' ').trim();
      const descMeta = `<meta name="description" content="${cleanDesc}" />`;
      const descRegex = /<meta\s+name="description"\s+content=".*?"\s*\/?>/i;
      if (descRegex.test(html)) {
        html = html.replace(descRegex, descMeta);
      } else {
        html = html.replace(/<\/head>/i, `  ${descMeta}\n  </head>`);
      }
    }

    fs.writeFileSync(targetFile, html);
    console.log(`Injected content and SEO meta into: ${route} (Title: ${title})`);
  } else {
    console.log(`No content found for: ${route}, keeping original.`);
  }
});

console.log('Content injection completed.');
