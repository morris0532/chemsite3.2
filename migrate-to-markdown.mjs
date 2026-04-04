import fs from 'fs';
import path from 'path';
import { blogPosts } from './src/data/blogs.ts';
import { blogPostsRu } from './src/data/blogs_ru.ts';
import { products } from './src/data/products.ts';
import { productsRu } from './src/data/products_ru.ts';

const CONTENT_DIR = 'src/content';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeMarkdown(dir, filename, data, content) {
  const filePath = path.join(dir, `${filename}.md`);
  const frontmatter = Object.entries(data)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n');
  const fileContent = `---\n${frontmatter}\n---\n\n${content || ''}`;
  fs.writeFileSync(filePath, fileContent);
}


console.log('Migrating blogs...');
const blogEnDir = path.join(CONTENT_DIR, 'en/blog');
const blogRuDir = path.join(CONTENT_DIR, 'ru/blog');
ensureDir(blogEnDir);
ensureDir(blogRuDir);

blogPosts.forEach(post => {
  const { content, ...meta } = post;
  writeMarkdown(blogEnDir, post.slug, meta, content);
});

blogPostsRu.forEach(post => {
  const { content, ...meta } = post;
  writeMarkdown(blogRuDir, post.slug, meta, content);
});


console.log('Migrating products...');
const prodEnDir = path.join(CONTENT_DIR, 'en/products');
const prodRuDir = path.join(CONTENT_DIR, 'ru/products');
ensureDir(prodEnDir);
ensureDir(prodRuDir);

products.forEach(prod => {
  const { description, ...meta } = prod;
  writeMarkdown(prodEnDir, prod.slug, meta, description);
});

productsRu.forEach(prod => {
  const { description, ...meta } = prod;
  writeMarkdown(prodRuDir, prod.slug, meta, description);
});

console.log('Migration completed!');
