import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = 'src/content';
const PREFERRED_ORDER = [
  'Id', 'Origin_Slug', 'Slug', 'Excerpt', 'title', 'description', 
  'image', 'imageAlt', 'Date', 'author', 'category', 'tag', 
  'Primary_Keyword', 'Keywords', 'Schema_Type', 'Target_Region'
];

function fixFileOrder(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    if (Object.keys(data).length === 0) return;

    const orderedData = {};
    PREFERRED_ORDER.forEach(key => {
      if (data[key] !== undefined) orderedData[key] = data[key];
    });

    Object.keys(data).forEach(key => {
      if (!PREFERRED_ORDER.includes(key)) orderedData[key] = data[key];
    });

    const updatedContent = matter.stringify(content, orderedData);
    if (fileContent !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`✅ Fixed order for: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.md')) {
      fixFileOrder(fullPath);
    }
  });
}

console.log('🚀 Starting YAML order fix...');
scanDir(CONTENT_DIR);
console.log('✨ All files processed!');
