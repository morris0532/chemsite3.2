import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const VIRTUAL_MODULE_ID = 'virtual:markdown-content';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

/**
 * 将对象的所有键名转换为小写，实现大小写不敏感访问
 */
function normalizeKeys(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const normalized = {};
  for (const key in obj) {
    normalized[key.toLowerCase()] = obj[key];
  }
  return normalized;
}

/**
 * 标准化产品名称/ID，忽略大小写、空格、连字符等差异
 * 例如: "Oxalic-acid", "oxalic acid", "oxalic- Acid" -> "oxalic-acid"
 */
function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // 将空格替换为连字符
    .replace(/[_-]+/g, '-')    // 将下划线或多个连字符替换为单个连字符
    .replace(/^-+|-+$/g, '');  // 去除首尾连字符
}

function loadLocaleContent(locale) {
  const contentDir = path.resolve('src/content');
  const postsDir = path.join(contentDir, locale, 'blog');
  const productsDir = path.join(contentDir, locale, 'products');

  const posts = [];
  const products = [];

  // Load blog posts
  if (fs.existsSync(postsDir)) {
    fs.readdirSync(postsDir).forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: rawFrontmatter, content } = matter(fileContent);
        
        const frontmatter = normalizeKeys(rawFrontmatter);
        
        posts.push({
          id: frontmatter.id || file.replace('.md', ''),
          RootnoTouch: frontmatter.rootnotouch || frontmatter.slug || file.replace('.md', ''),
          slug: frontmatter.slug || file.replace('.md', ''),
          title: frontmatter.title || '',
          excerpt: frontmatter.excerpt || '',
          content: content,
          date: frontmatter.date || new Date().toISOString(),
          author: frontmatter.author || 'Sinopeakchem Team',
          category: frontmatter.category || 'News',
          // 对 Product 字段进行标准化处理
          Product: slugify(frontmatter.product || ''),
          image: frontmatter.image || '/logo.png',
          tags: frontmatter.tags || [],
        });
      }
    });
  }

  // Load products
  if (fs.existsSync(productsDir)) {
    fs.readdirSync(productsDir).forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(productsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: rawFrontmatter, content } = matter(fileContent);
        
        const frontmatter = normalizeKeys(rawFrontmatter);
        
        products.push({
          // 对产品 ID 也进行标准化，确保匹配一致性
          id: slugify(frontmatter.id || file.replace('.md', '')),
          RootnoTouch: frontmatter.rootnotouch || frontmatter.slug || file.replace('.md', ''),
          slug: frontmatter.slug || file.replace('.md', ''),
          name: frontmatter.name || '',
          category: frontmatter.category || 'Chemicals',
          categories: frontmatter.categories || (frontmatter.category ? [frontmatter.category] : ['Chemicals']),
          shortDescription: frontmatter.shortdescription || '',
          description: content,
          cas: frontmatter.cas || '',
          hsCode: frontmatter.hscode || '',
          packaging: frontmatter.packaging || '',
          loading: frontmatter.loading || '',
          image: frontmatter.image || '/logo.png',
          specs: frontmatter.specs || [],
          applications: frontmatter.applications || [],
          faqs: frontmatter.faqs || [],
          ports: frontmatter.ports || '',
          featured: frontmatter.featured || false,
          // 对产品自身的 Product 字段也进行标准化
          Product: slugify(frontmatter.product || ''),
          status: frontmatter.status || 'active',
        });
      }
    });
  }

  return { posts, products };
}

export default function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const locales = ['en', 'ru', 'fr', 'es', 'ar'];
        const allData = {};
        
        locales.forEach(locale => {
          allData[locale] = loadLocaleContent(locale);
        });

        return `
const markdownContent = ${JSON.stringify(allData)};

export default markdownContent;

// Export individual locale data for code splitting
${locales.map(locale => `export const ${locale}Data = markdownContent.${locale};`).join('\n')}
        `;
      }
    },
  };
}
