import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import { getPrerenderRoutes } from './get-prerender-routes.mjs';

const routes = getPrerenderRoutes();
const distDir = path.resolve('dist');
const contentDir = path.resolve('src/content');
const siteConfig = JSON.parse(fs.readFileSync(path.join(contentDir, 'site-config.json'), 'utf-8'));
const BASE_URL = 'https://www.sinopeakchem.com';

console.log(`Starting advanced content injection for ${routes.length} routes...`);

const contentMetadata = {
  en: { products: [], blog: [] },
  ru: { products: [], blog: [] },
  fr: { products: [], blog: [] }
};

['en', 'ru', 'fr'].forEach(locale => {
  ['products', 'blog'].forEach(type => {
    const dir = path.join(contentDir, locale, type);
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.md')) {
          const fileContent = fs.readFileSync(path.join(dir, file), 'utf-8');
          const { data } = matter(fileContent);
          contentMetadata[locale][type].push({
            title: data.title || data.name || '',
            slug: data.slug || file.replace('.md', ''),
            date: data.date || '',
            cas: data.cas || '',
            image: data.image || ''
          });
        }
      });
    }
  });
});

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
  let ogImage = 'https://www.sinopeakchem.com/images/og-image.jpg';
  let jsonLd = null;

  const parts = route.split('/').filter(Boolean); 
  const locale = parts[0] || 'en';
  const type = parts[1];
  const slug = parts[2];

  if (parts.length === 3 && (type === 'blog' || type === 'products')) {
    const mdFilePath = path.join(contentDir, locale, type, `${slug}.md`);
    if (fs.existsSync(mdFilePath)) {
      const fileContent = fs.readFileSync(mdFilePath, 'utf-8');
      const { data, content } = matter(fileContent);
      contentHtml = marked.parse(content);
      
      if (type === 'products') {
        title = `${data.name} (CAS ${data.cas}) - Bulk Supply from China`;
        description = `Buy high-purity ${data.name} (${data.cas}) in bulk from China. ${data.shortDescription || ''} Competitive pricing with COA/MSDS.`;
        ogImage = data.image || ogImage;
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.shortDescription || description,
          "sku": `CAS-${data.cas}`,
          "brand": { "@type": "Brand", "name": "Sinopeakchem" },
          "offers": {
            "@type": "Offer",
            "seller": { "@type": "Organization", "name": "Sinopeakchem" },
            "availability": "https://schema.org/InStock"
          },
          "image": data.image
        };
      } else {
        title = data.title;
        description = data.excerpt || '';
        ogImage = data.image || ogImage;
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "datePublished": data.date,
          "author": { "@type": "Organization", "name": "Sinopeakchem" },
          "image": data.image
        };
      }
      
      if (Array.isArray(data.tags)) {
        keywords = data.tags.join(', ');
      } else if (data.keywords) {
        keywords = data.keywords;
      } else if (data.category) {
        keywords = `${data.category}, chemical supplier, China`;
      }
    }
  } 
  else if (parts.length === 2) {
    const page = parts[1];
    if (page === 'products') {
	      title = `Industrial Chemical Products | Oxalic Acid, Caustic Soda & More`;
	      description = `Browse 22+ high-purity industrial chemicals from Sinopeakchem. Including organic acids, alkali products, sulfates, and specialty chemicals. COA/MSDS available.`;
	      const productNames = contentMetadata[locale].products.slice(0, 15).map(p => p.title).join(', ');
	      keywords = `${productNames}, ${locale === 'ru' ? 'химикаты, промышленная химия' : (locale === 'fr' ? 'produits chimiques, chimie industrielle' : 'chemicals, industrial chemicals')}`;
	      
	      const productsHtml = contentMetadata[locale].products.map(p => `
	        <div class="product-card">
	          <img src="${p.image}" alt="${p.title}" />
	          <h3>${p.title}</h3>
	          <p>CAS: ${p.cas}</p>
	          <a href="/${locale}/products/${p.slug}">${siteConfig[locale]?.ui?.viewDetails || 'View Details'}</a>
	        </div>
	      `).join('');

	      contentHtml = `
	        <section class="products-header">
	          <h1>${title}</h1>
	          <p>${description}</p>
	        </section>
	        <section class="products-list">
	          <div class="product-grid">${productsHtml}</div>
	        </section>
	      `;
	    } else if (page === 'blog') {
      title = `Blog - Chemical Industry Insights and Product Guides`;
      description = `Read the latest industry news, product guides, and technical articles about industrial chemicals from Sinopeakchem's expert team.`;
      const blogTitles = contentMetadata[locale].blog.slice(0, 10).map(b => b.title).join(', ');
      keywords = `${blogTitles}, ${locale === 'ru' ? 'новости отрасли, химические руководства' : (locale === 'fr' ? 'actualités de l\'industrie, guides chimiques' : 'industry news, chemical guides')}`;
    } else if (page === 'about') {
	      title = locale === 'ru' ? 'О нас' : (locale === 'fr' ? 'À propos' : 'About Us');
	      description = siteConfig[locale]?.footer?.companyDesc || '';
	      keywords = locale === 'ru' ? 'о нас, компания, поставщик химикатов, Китай' : (locale === 'fr' ? 'à propos, entreprise, fournisseur de produits chimiques, Chine' : 'about, company, chemical supplier, China');
	      
	      contentHtml = `
	        <section class="about-hero">
	          <h1>${title}</h1>
	          <p>${description}</p>
	        </section>
	        <section class="about-mission">
	          <h2>${locale === 'ru' ? 'Наша миссия' : (locale === 'fr' ? 'Notre Mission' : 'Our Mission')}</h2>
	          <p>${siteConfig[locale]?.footer?.companyDesc}</p>
	        </section>
	        <section class="about-contact">
	          <h2>${locale === 'ru' ? 'Свяжитесь с нами' : (locale === 'fr' ? 'Contactez-nous' : 'Get in Touch')}</h2>
	          <p>${siteConfig[locale]?.footer?.contact?.address}</p>
	          <p>Email: ${siteConfig[locale]?.footer?.contact?.email}</p>
	          <p>Phone: ${siteConfig[locale]?.footer?.contact?.phone}</p>
	        </section>
	      `;
	    } else if (page === 'contact') {
      title = locale === 'ru' ? 'Контакты' : (locale === 'fr' ? 'Contact' : 'Contact Us');
      description = 'Get in touch with Sinopeakchem for high-quality chemical products.';
      keywords = locale === 'ru' ? 'контакты, запрос, продажи, химическая продукция' : (locale === 'fr' ? 'contact, demande, ventes, produits chimiques' : 'contact, inquiry, sales, chemical products');
    } else if (page === 'privacy-policy') {
      title = locale === 'ru' ? 'Политика конфиденциальности' : (locale === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy');
      description = 'Privacy policy and data protection at Sinopeakchem.';
      keywords = locale === 'ru' ? 'конфиденциальность, защита данных, политика' : (locale === 'fr' ? 'confidentialité, protection des données, politique' : 'privacy, data protection, policy');
    } else if (page === 'terms-of-service') {
      title = locale === 'ru' ? 'Условия использования' : (locale === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Service');
      description = 'Terms of service and usage guidelines for Sinopeakchem website.';
      keywords = locale === 'ru' ? 'условия использования, правила, соглашение' : (locale === 'fr' ? 'conditions d\'utilisation, règles, accord' : 'terms of service, rules, agreement');
    }
  }
  else if (parts.length === 1) {
    title = `Sinopeakchem - Premier Industrial Chemical Supplier from China | 22+ Products`;
    description = `Sinopeakchem is a leading industrial chemical supplier and trader from China, providing high-purity chemicals including Oxalic Acid, Caustic Soda, Sodium Sulfate to 50+ countries.`;
    keywords = locale === 'ru' ? 'поставщик химикатов, Китай, промышленная химия, B2B' : (locale === 'fr' ? 'fournisseur de produits chimiques, Chine, chimie industrielle, B2B' : 'chemical supplier, China, industrial chemicals, B2B');
    jsonLd = {
	      "@context": "https://schema.org",
	      "@type": "Organization",
	      "name": "Sinopeakchem",
	      "url": BASE_URL,
	      "logo": `${BASE_URL}/logo.png`,
	      "description": description,
	      "address": {
	        "@type": "PostalAddress",
	        "streetAddress": "No. 182, Jinshui Road, Licang District",
	        "addressLocality": "Qingdao",
	        "addressRegion": "Shandong Province",
	        "addressCountry": "CN"
	      },
	      "contactPoint": {
	        "@type": "ContactPoint",
	        "telephone": "+86-135-8326-2050",
	        "email": "info@sinopeakchem.com",
	        "contactType": "sales"
	      }
	    };

	    // Homepage content injection
	    const productsHtml = contentMetadata[locale].products.slice(0, 6).map(p => `
	      <div class="product-item">
	        <img src="${p.image}" alt="${p.title}" />
	        <h3>${p.title}</h3>
	        <p>CAS: ${p.cas}</p>
	        <a href="/${locale}/products/${p.slug}">View Details</a>
	      </div>
	    `).join('');

	    const blogHtml = contentMetadata[locale].blog.slice(0, 3).map(b => `
	      <div class="blog-item">
	        <h3>${b.title}</h3>
	        <p>${b.date}</p>
	        <a href="/${locale}/blog/${b.slug}">Read More</a>
	      </div>
	    `).join('');

	    contentHtml = `
	      <section class="hero">
	        <h1>${title}</h1>
	        <p>${description}</p>
	      </section>
	      <section class="products">
	        <h2>${locale === 'ru' ? 'Ключевые продукты' : (locale === 'fr' ? 'Produits Phares' : 'Core Products')}</h2>
	        <div class="product-grid">${productsHtml}</div>
	      </section>
	      <section class="blog">
	        <h2>${locale === 'ru' ? 'Отраслевая экспертиза' : (locale === 'fr' ? 'Expertise de l\'Industrie' : 'Industry Expertise')}</h2>
	        <div class="blog-grid">${blogHtml}</div>
	      </section>
	    `;
	  }

	  if (title || description || keywords) {
    let html = fs.readFileSync(targetFile, 'utf-8');

    const rootPlaceholder = '<div id="root"></div>';
    if (contentHtml && html.includes(rootPlaceholder)) {
      html = html.replace(rootPlaceholder, `<div id="root" class="loaded">${contentHtml}</div>`);
    }

    const fullTitle = `${title} | Sinopeakchem`;
    const titleRegex = /<title>[\s\S]*?<\/title>/i;
    if (titleRegex.test(html)) {
      html = html.replace(titleRegex, `<title>${fullTitle}</title>`);
    } else {
      html = html.replace(/<\/head>/i, `  <title>${fullTitle}</title>\n  </head>`);
    }

    const cleanDesc = description.replace(/"/g, '&quot;').replace(/\n/g, ' ').trim();
    const descMeta = `<meta name="description" content="${cleanDesc}" />`;
    const descRegex = /<meta\s+name="description"\s+content=".*?"\s*\/?>/i;
    if (descRegex.test(html)) {
      html = html.replace(descRegex, descMeta);
    } else {
      html = html.replace(/<\/head>/i, `  ${descMeta}\n  </head>`);
    }

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

    const canonicalUrl = `${BASE_URL}${route}`;
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
    html = html.replace(/<\/head>/i, `  ${canonicalTag}\n  </head>`);

    const currentPath = route.replace(/^\/(en|ru|fr)/, '');
    const hreflangTags = [
      `<link rel="alternate" hreflang="en" href="${BASE_URL}/en${currentPath}" />`,
      `<link rel="alternate" hreflang="ru" href="${BASE_URL}/ru${currentPath}" />`,
      `<link rel="alternate" hreflang="fr" href="${BASE_URL}/fr${currentPath}" />`,
      `<link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${currentPath}" />`
    ].join('\n  ');
    html = html.replace(/<\/head>/i, `  ${hreflangTags}\n  </head>`);

    const ogTags = [
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${cleanDesc}" />`,
      `<meta property="og:image" content="${ogImage}" />`,
      `<meta property="og:url" content="${canonicalUrl}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Sinopeakchem" />`,
      `<meta property="og:locale" content="${locale === 'en' ? 'en_US' : (locale === 'ru' ? 'ru_RU' : 'fr_FR')}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${cleanDesc}" />`,
      `<meta name="twitter:image" content="${ogImage}" />`
    ].join('\n  ');
    html = html.replace(/<\/head>/i, `  ${ogTags}\n  </head>`);

    if (jsonLd) {
      const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;
      html = html.replace(/<\/head>/i, `  ${jsonLdTag}\n  </head>`);
    }

    html = html.replace(/<html lang="en">/i, `<html lang="${locale}">`);

    fs.writeFileSync(targetFile, html);
    console.log(`Injected advanced SEO into: ${route} (Title: ${title})`);
  }
});

console.log('Advanced content injection completed.');
