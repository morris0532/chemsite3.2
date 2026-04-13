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
const POSTS_PER_PAGE = 12;

// Find the main CSS file and its content
const assetsDir = path.join(distDir, 'assets');
let cssFileName = '';
let cssContent = '';
if (fs.existsSync(assetsDir)) {
  const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
  if (cssFiles.length > 0) {
    cssFileName = cssFiles.sort((a, b) => 
      fs.statSync(path.join(assetsDir, b)).size - fs.statSync(path.join(assetsDir, a)).size
    )[0];
    cssContent = fs.readFileSync(path.join(assetsDir, cssFileName), 'utf-8');
    console.log(`Identified main CSS file: ${cssFileName} (${(cssContent.length / 1024).toFixed(2)} KB)`);
  }
}

// Helper function to inline CSS content into head
function inlineCSS(html, content) {
  const headOpenRegex = /<head[^>]*>/i;
  const headMatch = html.match(headOpenRegex);
  
  if (headMatch) {
    const headEndPos = headMatch.index + headMatch[0].length;
    const styleTag = `\n    <style id="critical-css">${content}</style>`;
    
    // Remove any existing linked assets/index-*.css to avoid double loading
    const linkedCssRegex = /<link rel="stylesheet" [^>]*href="\/assets\/index-[^>]*\.css"[^>]*>/gi;
    let newHtml = html.replace(linkedCssRegex, '');
    
    // Inject the style tag at the top of head
    return newHtml.slice(0, headEndPos) + styleTag + newHtml.slice(headEndPos);
  }
  
  return html;
}

console.log(`Starting advanced content injection for ${routes.length} routes...`);

const contentMetadata = {
  en: { products: [], blog: [] },
  ru: { products: [], blog: [] },
  fr: { products: [], blog: [] },
  es: { products: [], blog: [] },
  ar: { products: [], blog: [] }
};

['en', 'ru', 'fr', 'es', 'ar'].forEach(locale => {
  ['products', 'blog'].forEach(type => {
    const dir = path.join(contentDir, locale, type);
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.md')) {
          const fileContent = fs.readFileSync(path.join(dir, file), 'utf-8');
          const { data } = matter(fileContent);
          if (data.draft === true) return; // Skip draft content
          
          contentMetadata[locale][type].push({
            title: data.title || data.name || '',
            slug: data.slug || data.Slug || file.replace('.md', ''),
            RootnoTouch: data.RootnoTouch || data.RootnoTouch || data.slug || data.Slug || file.replace('.md', ''),
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

  // Skip if target file doesn't exist (except for pagination pages which we'll create)
  if (!fs.existsSync(targetFile) && !route.includes('/blog/page/')) {
    console.warn(`Target file not found: ${targetFile}`);
    return;
  }

  let contentHtml = '';
  let title = '';
  let description = '';
  let keywords = '';
  let ogImage = 'https://www.sinopeakchem.com/images/og-image.jpg';
  let jsonLd = null;
  let lcpImage = '';
  let RootnoTouch = '';

  const parts = route.split('/').filter(Boolean); 
  const locale = parts[0] || 'en';
  const type = parts[1];
  const slug = parts[2];

  if (parts.length === 3 && (type === 'blog' || type === 'products')) {
    // Find the markdown file by slug in frontmatter or filename
    const dir = path.join(contentDir, locale, type);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    let mdFilePath = '';
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      const { data } = matter(fileContent);
      const fileSlug = data.slug || data.Slug || file.replace('.md', '');
      if (fileSlug === slug) {
        mdFilePath = fullPath;
        RootnoTouch = data.RootnoTouch || data.RootnoTouch || data.slug || data.Slug || file.replace('.md', '');
        break;
      }
    }

    if (mdFilePath && fs.existsSync(mdFilePath)) {
      const fileContent = fs.readFileSync(mdFilePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      if (data.draft === true) {
        console.log(`Skipping draft content injection for: ${route}`);
        return;
      }
      
      contentHtml = marked.parse(content);
      
      if (type === 'products') {
        title = `${data.name} (CAS ${data.cas}) - Bulk Supply from China`;
        description = `Buy high-purity ${data.name} (${data.cas}) in bulk from China. ${data.shortDescription || ''} Competitive pricing with COA/MSDS.`;
        ogImage = data.image || ogImage;
        lcpImage = data.image;
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.shortDescription || description,
          "sku": `CAS-${data.cas}`,
          "mpn": data.cas,
          "brand": { 
            "@type": "Brand", 
            "name": "Sinopeakchem" 
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "12"
          },
          "offers": {
            "@type": "Offer",
            "url": `${BASE_URL}/${locale}/products/${slug}`,
            "priceCurrency": "USD",
            "price": "0",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "0",
              "priceCurrency": "USD",
              "name": "Price on Request"
            },
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": { 
              "@type": "Organization", 
              "name": "Sinopeakchem" 
            }
          },
          "image": data.image
        };
      } else {
        title = data.title;
        description = data.excerpt || '';
        ogImage = data.image || ogImage;
        lcpImage = data.image;
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
      }
    }
  } 
  else if (parts.length === 2 || (parts.length === 4 && parts[1] === 'blog' && parts[2] === 'page')) {
    const page = parts[1];
    if (page === 'products') {
      title = `Industrial Chemical Products | Oxalic Acid, Caustic Soda & More`;
      description = `Browse 22+ high-purity industrial chemicals from Sinopeakchem. Including organic acids, alkali products, sulfates, and specialty chemicals. COA/MSDS available.`;
      
      const productsHtml = contentMetadata[locale].products.map((p, index) => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.title}" width="300" height="200" ${index < 2 ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} />
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
      const allBlogPosts = contentMetadata[locale].blog.sort((a, b) => new Date(b.date) - new Date(a.date));
      const totalPages = Math.ceil(allBlogPosts.length / POSTS_PER_PAGE);
      
      // Handle both /blog and /blog/page/N
      const currentPage = parts.length === 4 ? parseInt(parts[3]) : 1;
      
      const start = (currentPage - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      const currentPosts = allBlogPosts.slice(start, end);

      const blogHtml = currentPosts.map(b => `
        <div class="blog-post-card">
          <h3>${b.title}</h3>
          <p>${b.date}</p>
          <a href="/${locale}/blog/${b.slug}">${siteConfig[locale]?.ui?.readMore || 'Read More'}</a>
        </div>
      `).join('');

      const paginationHtml = `
        <div class="pagination" style="display: flex; justify-content: center; gap: 20px; margin-top: 40px;">
          ${currentPage > 1 ? `<a href="/${locale}/blog/${currentPage === 2 ? '' : 'page/' + (currentPage - 1)}">← Previous</a>` : ''}
          <span>Page ${currentPage} of ${totalPages}</span>
          ${currentPage < totalPages ? `<a href="/${locale}/blog/page/${currentPage + 1}">Next →</a>` : ''}
        </div>
      `;

      title = `Blog - Chemical Industry Insights (Page ${currentPage})`;
      description = `Read the latest industry news, product guides, and technical articles about industrial chemicals from Sinopeakchem's expert team. Page ${currentPage}.`;
      
      contentHtml = `
        <section class="blog-header">
          <h1>${title}</h1>
          <p>${description}</p>
        </section>
        <section class="blog-list">
          <div class="blog-grid">${blogHtml}</div>
          ${paginationHtml}
        </section>
      `;
    } else if (page === 'about' || page === 'contact') {
      title = page === 'about' ? 'About Us' : 'Contact Us';
      description = 'Contact Sinopeakchem for high-quality chemical products.';
      contentHtml = `<section><h1>${title}</h1><p>${description}</p></section>`;
    }
  } 
  else if (parts.length === 1) {
    title = `Sinopeakchem - Premier Industrial Chemical Supplier from China | 22+ Products`;
    description = `Sinopeakchem is a leading industrial chemical supplier and trader from China, providing high-purity chemicals including Oxalic Acid, Caustic Soda, Sodium Sulfate to 50+ countries.`;
    
    const productsHtml = contentMetadata[locale].products.slice(0, 6).map((p, index) => `
      <div class="product-item">
        <img src="${p.image}" alt="${p.title}" width="300" height="200" loading="lazy" />
        <h3>${p.title}</h3>
        <p>CAS: ${p.cas}</p>
        <a href="/${locale}/products/${p.slug}">View Details</a>
      </div>
    `).join('');

    contentHtml = `
      <section class="hero">
        <h1>${title}</h1>
        <p>${description}</p>
      </section>
      <section class="products">
        <h2>Core Products</h2>
        <div class="product-grid">${productsHtml}</div>
      </section>
    `;
  }

  if (title || description) {
    // For pagination pages, we might need to use the base blog/index.html as template
    const templateFile = route.includes('/blog/page/') 
      ? path.join(distDir, locale, 'blog', 'index.html')
      : targetFile;
      
    if (!fs.existsSync(templateFile)) {
      console.warn(`Template file not found: ${templateFile}`);
      return;
    }

    let html = fs.readFileSync(templateFile, 'utf-8');

    const rootPlaceholder = '<div id="root"></div>';
    const loadedPlaceholder = /<div id="root" class="loaded">[\s\S]*?<\/div>/i;
    
    if (contentHtml) {
      if (html.includes(rootPlaceholder)) {
        html = html.replace(rootPlaceholder, `<div id="root" class="loaded">${contentHtml}</div>`);
      } else if (loadedPlaceholder.test(html)) {
        html = html.replace(loadedPlaceholder, `<div id="root" class="loaded">${contentHtml}</div>`);
      }
    }

    // Inject LCP Preload
    if (lcpImage && !html.includes(lcpImage)) {
      const preloadTag = `\n    <link rel="preload" as="image" href="${lcpImage}" fetchpriority="high">`;
      html = html.replace(/<\/head>/i, `${preloadTag}\n  </head>`);
    }

    const fullTitle = `${title} | Sinopeakchem`;
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${fullTitle}</title>`);
    
    const cleanDesc = description.replace(/"/g, '&quot;').replace(/\n/g, ' ').trim();
    html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${cleanDesc}" />`);

    // --- 修复后的多语言切换逻辑 (Hreflang) ---
    const availableLocales = ['en', 'ru', 'fr', 'es', 'ar'];
    let hreflangTags = '\n';
    
    availableLocales.forEach(l => {
      let targetSlug = '';
      
      if (parts.length === 3) { // 详情页 (Product 或 Blog)
        const targetPost = contentMetadata[l][type].find(p => p.RootnoTouch === RootnoTouch);
        targetSlug = targetPost ? `${type}/${targetPost.slug}` : `${type}/${slug}`;
      } else { // 列表页或基础页面
        targetSlug = parts.slice(1).join('/');
      }

      const href = `${BASE_URL}/${l}${targetSlug ? '/' + targetSlug : ''}`;
      hreflangTags += `    <link rel="alternate" hreflang="${l}" href="${href}" />\n`;
    });

    // 添加 x-default (指向英语版)
    let defaultSlug = '';
    if (parts.length === 3) {
      const defaultPost = contentMetadata['en'][type].find(p => p.RootnoTouch === RootnoTouch);
      defaultSlug = defaultPost ? `${type}/${defaultPost.slug}` : `${type}/${slug}`;
    } else {
      defaultSlug = parts.slice(1).join('/');
    }
    hreflangTags += `    <link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${defaultSlug ? '/' + defaultSlug : ''}" />`;
    
    // Remove existing hreflang tags to avoid duplication
    html = html.replace(/<link rel="alternate" hreflang=".*?" href=".*?" \/>/g, '');
    html = html.replace(/<\/head>/i, `${hreflangTags}\n  </head>`);

    // Inject JSON-LD
    if (jsonLd) {
      const jsonLdString = `\n    <script type="application/ld+json">\n      ${JSON.stringify(jsonLd, null, 2)}\n    </script>`;
      html = html.replace(/<\/head>/i, `${jsonLdString}\n  </head>`);
    }

    if (cssContent) {
      html = inlineCSS(html, cssContent);
      const jsRegex = /<script type="module" crossorigin src="\/assets\/[^>]*\.js"><\/script>/i;
      const jsMatch = html.match(jsRegex);
      if (jsMatch) {
        const jsTag = jsMatch[0];
        if (!html.includes(`  ${jsTag}\n  </body>`)) {
          html = html.replace(jsTag, '');
          html = html.replace('</body>', `  ${jsTag}\n  </body>`);
        }
      }
    }

    // Ensure directory exists for pagination
    if (route.includes('/blog/page/')) {
      const targetDir = path.dirname(targetFile);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
    }

    fs.writeFileSync(targetFile, html);
  }
});

console.log('Advanced content injection completed with LCP optimizations.');
