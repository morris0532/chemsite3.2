# chemsite3.0 项目开发规范与 Manus AI 指南

## 1. 引言

本指南旨在为 `chemsite3.0` 项目的开发和内容管理提供一套清晰的规范，特别是针对多语言内容的发布和 SEO 优化。其主要目的是确保项目的一致性、可维护性，并防止在协作过程中可能出现的常见错误。对于 Manus AI 助手而言，在开始处理与 `chemsite3.0` 仓库相关的任务时，请务必首先阅读并理解本文件。

## 2. 多语言博客文章关联问题：`id` 和 `slug` 的重要性

在 `chemsite3.0` 这样的多语言静态网站生成器中，不同语言版本的文章能够正确关联并实现语言切换功能，主要依赖于 Frontmatter 中的 `id` 和 `slug` 字段。如果这些字段在不同语言版本之间不一致，将导致语言切换功能失效，用户在切换语言时会跳转到错误的页面或默认页面。

### 2.1 案例分析：多语言同步与 ID 冲突问题

**问题描述 1：Slug 不一致**
在草酸文章（Oxalic Acid Comprehensive Guide）同步中，最初俄语和法语版本的 `slug` 被翻译成了各自语言，导致跳转失效。
*   **解决**：所有语言版本必须使用相同的英文 `slug`。

**问题描述 2：ID 冲突**
在发布新文章时，曾错误地将新文章分配为 `id: "6"`，而该 ID 已被 "How to Choose the Right Chemical Supplier from China" 占用。这导致点击语言切换时跳转到了错误的文章。
*   **解决**：每篇文章必须拥有全局唯一的 ID。

**正确示例（Frontmatter 片段）**：

```yaml
# 文章 A: How to Choose the Right Chemical Supplier (en/ru/fr)
id: "6"
slug: "how-to-choose-the-right-chem-supplier-from-china"

# 文章 B: Oxalic Acid Comprehensive Guide (en/ru/fr)
id: "8"
slug: "oxalic-acid-comprehensive-guide"
```

### 2.2 问题原因

网站的语言切换机制依赖于一个**统一的标识符**来识别同一篇文章的不同语言版本。这个标识符就是 `id` 和 `slug`。当 `id` 或 `slug` 在不同语言版本中不一致时，系统会认为它们是不同的文章，从而无法建立正确的关联。

## 3. 多语言内容发布规范

为避免上述问题再次发生，请严格遵守以下规范：

### 3.1 `id` 字段规范

*   **全局唯一性**：每个独立的概念或文章（无论语言）都应拥有一个唯一的 `id`。一旦分配，不得更改。**在分配新 ID 前，必须检索所有语言目录下的现有文章，确保新 ID 不与任何现有文章冲突。**
*   **跨语言一致性**：同一篇文章的所有语言版本（例如，英文、俄文、法文）必须使用**完全相同**的 `id`。这是系统关联不同语言版本的核心。
*   **分配规则建议**：建议查看当前所有文章中最大的 ID 数值，并在此基础上递增分配新 ID。
*   **当前已分配 ID 列表（截至 2026-04-06）**：
    *   **ID: "1"** - How to Choose the Right Chem Supplier from China (已更正为 6)
    *   **ID: "2"** - How to Choose Right Caustic Soda Grade
    *   **ID: "3"** - Chemical Shipping Logistics from China
    *   **ID: "4"** - Water Treatment Chemicals Comparison
    *   **ID: "5"** - Oxalic Acid Industrial Applications
    *   **ID: "6"** - How to Choose the Right Chemical Supplier from China
    *   **ID: "8"** - Oxalic Acid Comprehensive Guide
    *   **ID: "9"** - How Aluminum Sulfate Functions in Water Treatment
    *   **ID: "10"** - Complete Guide to Sodium Thiosulphate
    *   **下一个可用 ID**：建议从 **"11"** 开始。

### 3.2 `slug` 字段规范

*   **跨语言一致性**：同一篇文章的所有语言版本必须使用**完全相同**的 `slug`。`slug` 通常是文章标题的英文小写、用连字符连接的形式，用于构建 URL 路径。即使是中文或俄文文章，其 `slug` 也应保持英文形式，与英文版文章的 `slug` 一致。
*   **URL 友好性**：`slug` 必须是 URL 友好的，只包含小写字母、数字和连字符，不包含特殊字符或空格。

### 3.3 文件命名规范

*   **语言前缀**：博客文章文件应放置在对应的语言目录下（例如 `src/content/en/blog/`、`src/content/ru/blog/`、`src/content/fr/blog/`）。
*   **文件名与 slug 关联**：文件名（不含扩展名）应与文章的 `slug` 保持一致，以提高可读性和管理效率。例如，`oxalic-acid-comprehensive-guide.md`。

### 3.4 验证步骤

在发布任何新的多语言内容之前，请务必执行以下验证：

1.  **检查 `id`**：确保所有语言版本的 `id` 字段完全一致。
2.  **检查 `slug`**：确保所有语言版本的 `slug` 字段完全一致，且为英文形式。
3.  **检查文件路径**：确保文件放置在正确的语言目录下，且文件名与 `slug` 匹配。

## 4. SEO 内容优化规范

本节概述了 `chemsite3.0` 博客内容的 SEO 深度优化标准，旨在提升搜索引擎排名、增加自然流量，并适应 Google 搜索算法的最新变化，特别是针对 AI 搜索体验 (SGE/AI Overviews) 的影响。

### 4.1 核心 SEO 趋势与策略

*   **E-E-A-T (经验、专业、权威、信任)**：内容应由具有真实经验、专业知识、公认权威和高度可信度的个人或实体创建。在内容中融入第一人称叙述，分享独到见解和实际操作经验，并提供详细的作者简介。
*   **SGE (Search Generative Experience) / AI Overviews 优化**：在文章开篇或关键段落中，清晰、简洁地直接回答用户可能提出的问题。使用结构化数据 (Schema Markup) 帮助搜索引擎理解内容语义和结构。提供清晰的摘要、重点或结论，方便 AI 提取关键信息。
*   **品牌搜索 (Branded Search) 策略**：通过社交媒体营销、网红合作和公关活动，鼓励用户搜索「品牌名称 + 关键词」，提升品牌知名度和相关关键词排名。
*   **用户意图匹配**：精确理解并满足用户的搜索意图。根据用户是想「了解资讯」、「比较产品」还是「进行购买」来设计内容类型。

### 4.2 部落格內容深度優化步驟

1.  **內容規劃與關鍵字研究**：
    *   定義核心主題與目標受眾。
    *   使用專業工具識別高相關性、中高搜尋量且競爭度適中的主要關鍵字，並發掘長尾關鍵字和問題型關鍵字。
    *   分析搜尋意圖，規劃內容類型。
    *   規劃主題集群 (Topic Cluster)，建立核心內容頁和支援性內容頁。
2.  **內容創作與優化**：
    *   撰寫高品質、有深度的原創內容，體現 E-E-A-T 原則。
    *   優化標題與 Meta Description，使其吸引人且包含主要關鍵字。
    *   使用清晰的標題層級 (H1-H6)，簡潔的段落，並嵌入高品質圖片、圖表、影片等。
    *   自然融入主要關鍵字和語義相關關鍵字 (LSI Keywords)。
    *   建立內部連結到網站內其他相關頁面，並引用權威、可信的外部來源。
3.  **技術性 SEO 檢查**：
    *   優化網站速度，確保符合 Core Web Vitals 標準，特別是 INP (Interaction to Next Paint)。
    *   確保移動設備適應性，所有頁面使用 HTTPS 加密連線。
    *   確保 XML Sitemap 是最新的並已提交給 Google Search Console，`robots.txt` 沒有阻止重要頁面。
    *   為部落格文章、作者資訊等添加適當的結構化數據 (Schema Markup)。
4.  **用戶體驗 (UX) 與參與度**：
    *   提升頁面停留時間與降低跳出率，引導用戶進行下一步操作。
    *   確保網站導航清晰直觀，內部搜尋功能有效。
5.  **監測與分析**：
    *   定期檢查 Google Search Console 和 Google Analytics 4 (GA4) 報告，監測自然流量、用戶行為和關鍵字排名變化。
    *   持續監測競爭對手的 SEO 策略。

## 5. Manus AI 行为准则

*   **优先阅读**：在处理 `chemsite3.0` 仓库的任何内容相关任务（尤其是涉及多语言内容和 SEO 优化）时，请将本 `MANUS_GUIDELINES.md` 文件作为首要阅读材料。
*   **严格遵守**：在创建、修改或同步内容时，严格遵守本文件中关于 `id`、`slug`、文件命名和 SEO 优化等规范。
*   **主动纠正**：如果发现现有内容不符合本规范，应主动提出并进行纠正（在获得用户许可后）。
*   **及时反馈**：如果本指南有任何不清晰或需要补充的地方，请及时向用户反馈。

## 6. 结论

遵循本指南将有助于维护 `chemsite3.0` 项目的结构化和功能性，确保所有语言内容都能无缝地协同工作，并达到卓越的搜索引擎表现。感谢您的合作！
