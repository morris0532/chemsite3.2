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
  let keywords = '';

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
      
      // 提取关键词 (支持 tags 数组或 keywords 字符串)
      if (Array.isArray(data.tags)) {
        keywords = data.tags.join(', ');
      } else if (data.keywords) {
        keywords = data.keywords;
      } else if (data.category) {
        keywords = `${data.category}, chemical supplier, China`;
      }
    }
  } 
  // 2. 处理 About, Contact, Privacy, Terms (硬编码或简单逻辑)
  else if (parts.length === 2) {
    const page = parts[1];
    if (page === 'about') {
      title = locale === 'ru' ? 'О нас' : (locale === 'fr' ? 'À propos' : 'About Us');
      description = siteConfig[locale]?.footer?.companyDesc || '';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
      keywords = locale === 'ru' ? 'о нас, компания, поставщик химикатов, Китай' : (locale === 'fr' ? 'à propos, entreprise, fournisseur de produits chimiques, Chine' : 'about, company, chemical supplier, China');
    } else if (page === 'contact') {
      title = locale === 'ru' ? 'Контакты' : (locale === 'fr' ? 'Contact' : 'Contact Us');
      description = 'Get in touch with Sinopeakchem for high-quality chemical products.';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
      keywords = locale === 'ru' ? 'контакты, запрос, продажи, химическая продукция' : (locale === 'fr' ? 'contact, demande, ventes, produits chimiques' : 'contact, inquiry, sales, chemical products');
    } else if (page === 'products') {
      title = locale === 'ru' ? 'Продукты' : (locale === 'fr' ? 'Produits' : 'Products');
      description = 'Browse our wide range of high-quality industrial chemicals.';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
      keywords = locale === 'ru' ? 'продукты, химикаты, промышленная химия, каталог' : (locale === 'fr' ? 'produits, produits chimiques, chimie industrielle, catalogue' : 'products, chemicals, industrial chemicals, catalog');
    } else if (page === 'blog') {
      title = locale === 'ru' ? 'Блог' : (locale === 'fr' ? 'Blog' : 'Blog');
      description = 'Latest industry insights and product guides from Sinopeakchem.';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
      keywords = locale === 'ru' ? 'блог, новости отрасли, химические руководства, технические статьи' : (locale === 'fr' ? 'blog, actualités de l\'industrie, guides de produits chimiques, articles techniques' : 'blog, industry news, chemical guides, technical articles');
    } else if (page === 'privacy-policy') {
      title = locale === 'ru' ? 'Политика конфиденциальности' : (locale === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy');
      description = 'Privacy policy and data protection at Sinopeakchem.';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
      keywords = locale === 'ru' ? 'конфиденциальность, защита данных, политика' : (locale === 'fr' ? 'confidentialité, protection des données, politique' : 'privacy, data protection, policy');
    } else if (page === 'terms-of-service') {
      title = locale === 'ru' ? 'Условия использования' : (locale === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Service');
      description = 'Terms of service and usage guidelines for Sinopeakchem website.';
      contentHtml = `<h1>${title}</h1><p>${description}</p>`;
      keywords = locale === 'ru' ? 'условия использования, правила, соглашение' : (locale === 'fr' ? 'conditions d\'utilisation, règles, accord' : 'terms of service, rules, agreement');
    }
  }
  // 3. 处理首页
  else if (parts.length === 1) {
    title = locale === 'ru' ? 'Главная' : (locale === 'fr' ? 'Accueil' : 'Home');
    description = siteConfig[locale]?.footer?.companyDesc || '';
    contentHtml = `<h1>${title}</h1><p>${description}</p>`;
    keywords = locale === 'ru' ? 'поставщик химикатов, Китай, промышленная химия, B2B' : (locale === 'fr' ? 'fournisseur de produits chimiques, Chine, chimie industrielle, B2B' : 'chemical supplier, China, industrial chemicals, B2B');
  }

  if (contentHtml || title || description || keywords) {
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

    // 4. 注入 SEO Keywords
    if (keywords) {
      const cleanKeywords = keywords.replace(/"/g, '&quot;').replace(/\n/g, ' ').trim();
      const keywordsMeta = `<meta name="keywords" content="${cleanKeywords}" />`;
      const keywordsRegex = /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i;
      if (keywordsRegex.test(html)) {
        html = html.replace(keywordsRegex, keywordsMeta);
      } else {
        html = html.replace(/<\/head>/i, `  ${keywordsMeta}\n  </head>`);
      }
    }

    fs.writeFileSync(targetFile, html);
    console.log(`Injected content and SEO meta into: ${route} (Title: ${title})`);
  } else {
    console.log(`No content found for: ${route}, keeping original.`);
  }
});

console.log('Content injection completed.');
