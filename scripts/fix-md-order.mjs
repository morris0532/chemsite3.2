// ... 前面的代码保持不变 ...

function fixFileOrder(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const orderedData = {};
  
  // 1. 先按您的严格要求排好“门面”字段
  const PREFERRED_ORDER = ['Id', 'Origin_Slug', 'Slug', 'Excerpt', 'title', 'description', 'image', 'imageAlt', 'Date', 'author', 'category'];
  
  PREFERRED_ORDER.forEach(key => {
    if (data[key] !== undefined) {
      orderedData[key] = data[key];
    }
  });

  // 2. 【核心安全逻辑】：把所有“不在列表里”的属性（如 cas, hsCode, loading 等）全部追加到后面
  Object.keys(data).forEach(key => {
    if (!PREFERRED_ORDER.includes(key)) {
      // 只要这个 key 在原文件中存在，且没被排过序，就直接塞到末尾
      orderedData[key] = data[key];
    }
  });

  // 3. 写回文件（gray-matter 会严格遵循 orderedData 的插入顺序）
  const updatedContent = matter.stringify(content, orderedData);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
}
