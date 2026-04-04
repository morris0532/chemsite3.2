import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const VIRTUAL_MODULE_ID = 'virtual:markdown-content';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

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
        const contentDir = path.resolve('src/content');
        const locales = ['en', 'ru', 'fr'];
        const data = {};

        locales.forEach(locale => {
          const postsDir = path.join(contentDir, locale, 'blog');
          const productsDir = path.join(contentDir, locale, 'products');

          const posts = [];
          const products = [];

          // 加载博客文章
          if (fs.existsSync(postsDir)) {
            fs.readdirSync(postsDir).forEach(file => {
              if (file.endsWith('.md')) {
                const filePath = path.join(postsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data: frontmatter, content } = matter(fileContent);
                posts.push({
                  id: frontmatter.id || file.replace('.md', ''),
                  slug: frontmatter.slug || file.replace('.md', ''),
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

          // 加载产品
          if (fs.existsSync(productsDir)) {
            fs.readdirSync(productsDir).forEach(file => {
              if (file.endsWith('.md')) {
                const filePath = path.join(productsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data: frontmatter, content } = matter(fileContent);
                products.push({
                  id: frontmatter.id || file.replace('.md', ''),
                  slug: frontmatter.slug || file.replace('.md', ''),
                  name: frontmatter.name || '',
                  category: frontmatter.category || 'Chemicals',
                  shortDescription: frontmatter.shortDescription || '',
                  description: content,
                  cas: frontmatter.cas || '',
                  hsCode: frontmatter.hsCode || '',
                  packaging: frontmatter.packaging || '',
                  loading: frontmatter.loading || '',
                  image: frontmatter.image || '/logo.png',
                  nameCn: frontmatter.nameCn || '',
                  specs: frontmatter.specs || [],
                  applications: frontmatter.applications || [],
                  faqs: frontmatter.faqs || [],
                  ports: frontmatter.ports || '',
                  featured: frontmatter.featured || false,
                });
              }
            });
          }

          data[locale] = { posts, products };
        });

        return `export default ${JSON.stringify(data)};`;
      }
    },
  };
}
