import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const VIRTUAL_MODULE_ID = 'virtual:markdown-content';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

// Create virtual modules for each locale
const createLocaleModuleId = (locale) => `virtual:markdown-content-${locale}`;
const createResolvedLocaleModuleId = (locale) => `\0virtual:markdown-content-${locale}`;

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
        const { data: frontmatter, content } = matter(fileContent);
        posts.push({
          id: frontmatter.id || frontmatter.Id || file.replace('.md', ''),
          RootnoTouch: frontmatter.RootnoTouch || frontmatter.rootnotouch || frontmatter.slug || frontmatter.Slug || file.replace('.md', ''),
          slug: frontmatter.slug || frontmatter.Slug || file.replace('.md', ''),
          title: frontmatter.title || '',
          excerpt: frontmatter.excerpt || '',
          content: content,
          date: frontmatter.date || new Date().toISOString(),
          author: frontmatter.author || 'Sinopeakchem Team',
          category: frontmatter.category || 'News',
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
        const { data: frontmatter, content } = matter(fileContent);
        products.push({
          id: frontmatter.id || frontmatter.Id || file.replace('.md', ''),
          RootnoTouch: frontmatter.RootnoTouch || frontmatter.rootnotouch || frontmatter.slug || frontmatter.Slug || file.replace('.md', ''),
          slug: frontmatter.slug || frontmatter.Slug || file.replace('.md', ''),
          name: frontmatter.name || '',
          category: frontmatter.category || 'Chemicals',
          shortDescription: frontmatter.shortDescription || '',
          description: content,
          cas: frontmatter.cas || '',
          hsCode: frontmatter.hsCode || '',
          packaging: frontmatter.packaging || '',
          loading: frontmatter.loading || '',
          image: frontmatter.image || '/logo.png',
          specs: frontmatter.specs || [],
          applications: frontmatter.applications || [],
          faqs: frontmatter.faqs || [],
          ports: frontmatter.ports || '',
          featured: frontmatter.featured || false,
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
      // Support locale-specific modules for code splitting
      const locales = ['en', 'ru', 'fr', 'es', 'ar'];
      for (const locale of locales) {
        if (id === createLocaleModuleId(locale)) {
          return createResolvedLocaleModuleId(locale);
        }
      }
      
      // Support the main virtual module that imports all locales
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },
    load(id) {
      const locales = ['en', 'ru', 'fr', 'es', 'ar'];
      
      // Handle locale-specific modules (each locale gets its own chunk)
      for (const locale of locales) {
        if (id === createResolvedLocaleModuleId(locale)) {
          const data = loadLocaleContent(locale);
          return `export default ${JSON.stringify(data)};`;
        }
      }

      // Handle main virtual module - this creates dynamic imports for each locale
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        // Generate code that dynamically imports locale-specific modules
        const importStatements = locales.map(locale => 
          `'${locale}': () => import('virtual:markdown-content-${locale}')`
        ).join(',\n  ');
        
        return `
const localeModules = {
  ${importStatements}
};

// Cache for loaded content
const cache = {};

export default async function getMarkdownContent(locale) {
  if (cache[locale]) {
    return cache[locale];
  }
  
  try {
    const module = await localeModules[locale]();
    cache[locale] = module.default;
    return module.default;
  } catch (error) {
    console.error('Failed to load markdown content for locale:', locale, error);
    return { posts: [], products: [] };
  }
}

// For synchronous access (fallback for SSR/prerendering)
export async function loadAllLocales() {
  const result = {};
  for (const locale of ['en', 'ru', 'fr', 'es', 'ar']) {
    result[locale] = await getMarkdownContent(locale);
  }
  return result;
}
        `;
      }
    },
  };
}
