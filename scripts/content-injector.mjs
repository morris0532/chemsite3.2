import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import { getPrerenderRoutes } from './get-prerender-routes.mjs';

const routes = getPrerenderRoutes();
const distDir = path.resolve('dist');
const contentDir = path.resolve('src/content');

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

  // 尝试匹配 MD 文件
  let mdFilePath = null;
  const parts = route.split('/').filter(Boolean); // [en, blog, slug] 或 [en, products, slug]

  if (parts.length === 3) {
    const [locale, type, slug] = parts;
    if ((type === 'blog' || type === 'products')) {
      mdFilePath = path.join(contentDir, locale, type, `${slug}.md`);
    }
  } else if (parts.length === 2) {
    const [locale, page] = parts;
    const possibleMdPath = path.join(contentDir, locale, `${page}.md`);
    if (fs.existsSync(possibleMdPath)) {
      mdFilePath = possibleMdPath;
    }
  }

  if (mdFilePath && fs.existsSync(mdFilePath)) {
    const fileContent = fs.readFileSync(mdFilePath, 'utf-8');
    const { data, content } = matter(fileContent);
    contentHtml = marked.parse(content);
    
    // 适配不同类型的 MD 字段
    title = data.title || data.name || '';
    description = data.excerpt || data.description || data.shortDescription || '';
  }

  if (contentHtml || title || description) {
    let html = fs.readFileSync(targetFile, 'utf-8');

    // 1. 注入正文到 <div id="root"></div>
    const rootPlaceholder = '<div id="root"></div>';
    if (contentHtml && html.includes(rootPlaceholder)) {
      html = html.replace(rootPlaceholder, `<div id="root">${contentHtml}</div>`);
    }

    // 2. 注入 SEO Title (使用更激进的正则替换)
    if (title) {
      const fullTitle = `${title} | Sinopeakchem`;
      const titleRegex = /<title>[\s\S]*?<\/title>/i;
      if (titleRegex.test(html)) {
        html = html.replace(titleRegex, `<title>${fullTitle}</title>`);
      } else {
        html = html.replace(/<\/head>/i, `  <title>${fullTitle}</title>\n  </head>`);
      }
    }

    // 3. 注入 SEO Description (使用更激进的正则替换)
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
