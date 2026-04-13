import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = 'src/content';
// 定义您期望的严格物理顺序，增加了产品核心字段
const PREFERRED_ORDER = [
  'Id',
  'RootnoTouch',
  'Slug',
  'name',
  'cas',
  'hsCode',
  'Excerpt',
  'title',
  'description',
  'image',
  'imageAlt',
  'Date',
  'author',
  'category',
  'tag',
  'Primary_Keyword',
  'Keywords',
  'Schema_Type',
  'Target_Region'
];

function fixFileOrder(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // 如果没有 frontmatter，跳过
    if (Object.keys(data).length === 0) return;

    // 重构有序对象
    const orderedData = {};
    
    // 1. 先按 PREFERRED_ORDER 顺序插入字段
    PREFERRED_ORDER.forEach(key => {
      if (data[key] !== undefined) {
        orderedData[key] = data[key];
      }
    });

    // 2. 追加不在列表中的其他字段（如 packaging, loading 等），确保不删除任何属性
    Object.keys(data).forEach(key => {
      if (!PREFERRED_ORDER.includes(key)) {
        orderedData[key] = data[key];
      }
    });

    // 3. 检查是否有变化，避免不必要的写入
    const updatedContent = matter.stringify(content, orderedData);
    if (fileContent !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`✅ Fixed order for: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// 递归扫描目录
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

console.log('🚀 Starting YAML order fix (including Product fields)...');
scanDir(CONTENT_DIR);
console.log('✨ All files processed!');
