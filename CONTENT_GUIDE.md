# Sinopeakchem 网站内容发布与 SEO 自动化操作指南

本指南将指导您如何通过简单的 **Markdown (.md)** 文件发布产品和博客，并确保它们获得最佳的 Google 搜索效果。

---

## 🚀 核心逻辑：文件即页面
您只需要将编写好的 `.md` 文件放入指定文件夹并推送（Push）到 GitHub，系统会自动完成：
1.  **生成页面**：自动创建对应的 URL 路径。
2.  **SEO 注入**：自动填充 `<title>`、`<meta description>` 和面包屑导航。
3.  **内容静态化**：将正文转为 HTML，确保 Google 爬虫无需 JS 即可读取。
4.  **站点地图更新**：自动将新页面加入 `sitemap.xml`。

---

## 📦 第一部分：发布新产品 (Products)

### 1. 准备工作
*   **图片**：将产品图片放入 `public/products/` 文件夹（建议使用 `.jpg` 或 `.webp` 格式）。
*   **文件名**：使用小写字母和连字符（例如 `caustic-soda.md`），这将成为您的 URL 路径。

### 2. 存放目录
*   **英文版**：`src/content/en/products/`
*   **俄语版**：`src/content/ru/products/`
    *   *提示：若要实现中俄语版互相切换，请确保两个文件夹下的文件名完全一致。*

### 3. 文件模板 (Frontmatter)
在 `.md` 文件开头必须包含以下信息：

```markdown
---
name: "Caustic Soda (Sodium Hydroxide)"
nameCn: "烧碱 (氢氧化钠)"
cas: "1310-73-2"
hsCode: "28151100"
category: "Inorganic Chemicals"
image: "/products/caustic-soda.jpg"
shortDescription: "这里写一段 150 字以内的产品简介，会自动变成 Google 的搜索摘要。"
specifications:
  - "Purity: 99% min"
  - "Appearance: White flakes"
  - "Packing: 25kg bags"
---

### 产品详情 (Product Details)
这里开始写您的详细正文内容。支持 **Markdown** 语法：
- 使用 `###` 表示二级标题
- 使用 `-` 表示列表
- 使用 `**加粗**` 表示重点
```

---

## ✍️ 第二部分：发布新博客 (Blog)

### 1. 准备工作
*   **图片**：将封面图放入 `public/blog/` 文件夹。

### 2. 存放目录
*   **英文版**：`src/content/en/blog/`
*   **俄语版**：`src/content/ru/blog/`

### 3. 文件模板 (Frontmatter)
在 `.md` 文件开头必须包含以下信息：

```markdown
---
title: "您的博客标题"
date: "2026-04-04"
author: "Sinopeakchem"
image: "/blog/cover-image.jpg"
excerpt: "这里写一段吸引人的摘要，会自动变成 Google 的搜索描述。"
---

### 行业趋势分析
这里开始写您的正文内容。建议字数在 500 字以上，并多次提及您的核心产品关键词，以提升 SEO 权重。
```

---

## 🛠️ 第三部分：发布流程 (Git 操作)

1.  **本地编写**：在您的电脑上创建并编辑 `.md` 文件。
2.  **上传/推送**：
    *   如果您使用 GitHub 网页版：直接进入对应文件夹，点击 `Add file` -> `Upload files`。
    *   如果您使用 Git 命令行：
        ```bash
        git add .
        git commit -m "feat: add new product caustic-soda"
        git push origin main
        ```
3.  **等待构建**：Vercel 会在 1 分钟内自动完成构建。
4.  **验证**：
    *   访问 `https://www.sinopeakchem.com/en/products/您的文件名` 查看新页面。
    *   右键点击“查看网页源代码”，确认标题和正文已注入。

---

## 💡 SEO 专家建议
*   **关键词密度**：在正文中自然地提及产品名称 3-5 次。
*   **内链建设**：在博客文章中加入指向相关产品页面的链接，例如 `[Check our Caustic Soda](/en/products/caustic-soda)`。
*   **图片 Alt 标签**：系统会自动将产品名称作为图片的 Alt 标签，这有助于 Google 图片搜索。
*   **定期更新**：Google 喜欢活跃的网站，建议每周至少发布 1 篇博客或更新 1 个产品。
