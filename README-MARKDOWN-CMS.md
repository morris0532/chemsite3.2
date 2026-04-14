# 零成本 Markdown 内容管理方案

本项目采用基于 Markdown 的内容管理架构，完全免费，无需任何数据库或外部 CMS 服务。

## 📁 文件结构

```
src/content/
├── site-config.json          # 全站配置：导航、页脚、多语言 UI 文案
├── en/
│   ├── blog/                 # 英文博客文章（Markdown 格式）
│   │   ├── article-1.md
│   │   └── article-2.md
│   └── products/             # 英文产品列表（Markdown 格式）
│       ├── product-1.md
│       └── product-2.md
└── ru/
    ├── blog/                 # 俄文博客文章
    │   ├── article-1.md
    │   └── article-2.md
    └── products/             # 俄文产品列表
        ├── product-1.md
        └── product-2.md
```

## 🎯 核心概念

### 1. 全局配置 (site-config.json)
管理所有多语言 UI 元素，包括：
- **导航菜单**：修改菜单项名称和链接
- **页脚信息**：公司描述、联系方式、版权声明
- **UI 文案**：按钮文字、标签等

**修改方式**：直接编辑 `src/content/site-config.json`，无需重启开发服务器。

### 2. Markdown 文件
每篇博客文章或产品都是一个独立的 `.md` 文件，包含：
- **Frontmatter**（YAML 格式）：元数据（标题、日期、分类等） 
- **内容**：Markdown 格式的正文

**示例**：
```markdown
---
id: "1"
slug: "sodium-thiosulphate"
name: "Sodium Thiosulphate"
category: "Water Treatment"
shortDescription: "High-purity sodium thiosulphate for industrial applications"
cas: "7772-98-7"
hsCode: "2830.30.00"
packaging: "25kg/50kg bags"
loading: "20 tons/container"
image: "/products/sodium-thiosulphate.webp"
---

## Product Overview
Sodium thiosulphate is a versatile chemical used in...
```

## 📝 如何编辑内容

### 添加新博客文章
1. 在 `src/content/en/blog/` 目录下创建新文件：`my-article.md`
2. 按照上述格式填写 frontmatter 和内容
3. 保存文件，提交 Git
4. 网站会自动显示新文章

### 添加新产品
1. 在 `src/content/en/products/` 目录下创建新文件：`my-product.md`
2. 填写产品信息
3. 保存并提交

### 添加新语言
1. 在 `src/content/` 下创建新文件夹，如 `zh/` （中文）
2. 在 `zh/` 下创建 `blog/` 和 `products/` 子目录
3. 复制所有文章和产品，翻译内容
4. 在 `site-config.json` 中添加新语言的配置
5. 提交 Git，网站自动支持新语言

### 修改导航和页脚
编辑 `src/content/site-config.json`：
```json
{
  "en": {
    "navigation": [
      { "name": "Home", "link": "/en" },
      { "name": "Products", "link": "/en/products" }
    ],
    "footer": {
      "companyDesc": "...",
      "contact": { ... }
    }
  }
}
```

## 🚀 部署到 Vercel

### 前置条件
- GitHub 账户
- Vercel 账户

### 部署步骤
1. 将代码推送到 GitHub：
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. 在 Vercel 后台关联此仓库
3. 设置环境变量（如需要）
4. 点击"Deploy"

### 自动部署
每次您推送到 GitHub，Vercel 会自动重新构建并部署网站。

## 📊 内容管理最佳实践

### 文件命名
- 使用小写字母和连字符：`my-article.md` ✅
- 避免空格和特殊字符：`My Article.md` ❌

### Frontmatter 字段
**博客文章必需字段**：
- `id`：唯一标识符
- `slug`：URL 友好的标识符
- `title`：文章标题
- `excerpt`：摘要（用于列表显示）
- `date`：发布日期（ISO 格式）
- `author`：作者名称
- `category`：分类
- `image`：封面图片 URL
- `tags`：标签数组

**产品必需字段**：
- `id`：唯一标识符
- `slug`：URL 友好的标识符
- `name`：产品名称
- `category`：分类
- `shortDescription`：简短描述
- `cas`：CAS 号
- `hsCode`：HS 编码
- `packaging`：包装规格
- `loading`：装载规格
- `image`：产品图片 URL

## 🔄 多语言工作流

1. **创建英文内容**：在 `en/blog/` 或 `en/products/` 中创建文件
2. **翻译内容**：复制文件到 `ru/blog/` 或 `ru/products/`，翻译 frontmatter 和内容
3. **同步配置**：确保 `site-config.json` 中有对应语言的配置
4. **测试**：本地运行 `npm run dev`，切换语言验证

## 📈 扩展性

### 添加第 100 篇文章
- 只需添加一个新的 `.md` 文件
- 无需修改代码
- 构建时自动扫描并加载

### 添加新语言
- 创建新文件夹
- 翻译内容
- 更新 `site-config.json`
- 完成！

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## 💡 常见问题

### Q: 如何添加图片？
A: 将图片放在 `public/` 目录下，在 frontmatter 中引用：
```yaml
image: "/products/my-image.webp"
```

### Q: 支持多少篇文章？
A: 理论上无限制。构建时间会随着文件数量增加而增加，但 Vercel 通常能在 1-2 分钟内完成构建。

### Q: 如何删除文章？
A: 删除对应的 `.md` 文件，提交 Git，网站会自动更新。

### Q: 能否使用 HTML？
A: 可以。Markdown 支持内联 HTML。

## 📞 技术支持

如有问题，请检查：
1. 文件名是否正确（小写，连字符）
2. Frontmatter 格式是否正确（YAML 格式）
3. 必需字段是否齐全
4. 构建日志是否有错误

---

**零成本方案的优势**：
✅ 完全免费（Vercel 免费层）
✅ 无需数据库
✅ 无需服务器
✅ 支持无限多语言
✅ 支持无限文章数量
✅ 版本控制（Git）
✅ 快速部署（Vercel）
