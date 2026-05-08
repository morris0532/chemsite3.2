# Sinopeakchem 3.0: 全球 B2B 化工供应平台

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Sinopeakchem 3.0 是一个专为全球化工行业设计的高性能、SEO 优化的 B2B 电子商务与信息平台。它作为中国优质化工制造与全球工业采购之间的数字桥梁，拥有强大的多语言内容管理系统。

---

## 🏗️ chemsite3.0 核心架构规范 (Core Logic)

本项目采用“数据与表现分离”的现代化架构，所有核心功能均由以下 7 大逻辑驱动：

### 1. 多语言双锚点关联逻辑 (Dual-Anchor Mapping)
系统通过“主从双锚点”机制确保多语言内容的精准对应：
*   **主锚点：`id` (核心标识符)**：最高优先级。它是内容的唯一“数字指纹”。系统在聚合 Topic、关联产品与文章、以及执行跨语言跳转时，首选 `id` 进行匹配。
*   **辅助锚点：`RootnoTouch` (引用标识符)**：次级优先级。当 `id` 缺失时作为备选关联手段，同时也作为代码中语义化引用的标签。

### 2. Topic 集成与聚合逻辑 (Topic Aggregation)
Topic 页面是连接产品（Product）与文章（Post）的集合中心：
*   **聚合锚点**：通过 YAML 中的 `Product` 属性进行强关联。
*   **标签分发**：系统根据文章的 `category` 字段自动分发内容：
    *   **Technical Articles**: 匹配 `technical` 或 `tech`。
    *   **Market Insights**: 匹配 `market` 或 `marketing`。
*   **健壮性**：匹配逻辑自动忽略大小写与前后空格。

### 3. 多语言回退展示逻辑 (Fallback Strategy)
当目标语言内容缺失时，系统执行“英文优先”的保护机制：
*   **自动回退**：若当前语言（如俄语）下找不到匹配 `id` 的文件，系统自动抓取对应的英文版（`en`）内容。
*   **用户提示**：页面顶部会自动注入 `FallbackNotice` 组件，提示用户当前内容暂为英文版并正在翻译中。

### 4. Slug 的 SEO 解耦逻辑 (Slug Role)
*   **表现层隔离**：`slug` 仅作为 URL 的 SEO 路径，不参与底层逻辑关联。
*   **灵活性**：您可以为不同语言设置完全不同的 `slug`（如英文用 `caustic-soda`，俄文用 `kausticheskaya-soda`），只要它们的 `id` 相同，系统依然能精准识别。

### 5. SEO 自动化与结构化数据逻辑 (SEO & Schema)
*   **自动生成**：系统根据 YAML 元数据自动为每个页面生成 **JSON-LD 结构化数据**。
*   **搜索增强**：确保产品在 Google 搜索中能以“富媒体摘要”（显示价格、库存、评价等）形式呈现，提升点击率。

### 6. 静态化与虚拟模块逻辑 (SSG & Virtual Modules)
*   **Vite 驱动**：利用 `vite-plugin-markdown.mjs` 在构建时将所有 Markdown 预解析为 JSON 虚拟模块。
*   **极致性能**：全站静态化部署，无需数据库查询，实现毫秒级页面响应速度。

### 7. 图片资产共享逻辑 (Asset Management)
*   **跨语言复用**：所有语言版本共用 `/public/images/` 下的同一套图片资产。
*   **全局同步**：只需替换一个图片文件，全站所有语言版本的产品图和博客图将同步更新，极大降低维护成本。

---

## 📁 项目结构
- `src/content/` - 包含产品和博客文章的多语言 Markdown 文件。
- `src/components/` - 可复用的 UI 组件和 SEO 工具。
- `src/pages/` - 核心页面模板（首页、产品、博客、Topic 详情）。
- `src/hooks/` - 用于内容获取和多语言路由的自定义逻辑。
- `vite-plugin-markdown.mjs` - 核心数据解析插件。

## 🛠 快速开始
```shell
pnpm install
pnpm run dev    # 启动开发环境
pnpm run build  # 构建生产版本
```

---
*由 Sinopeakchem 技术团队维护。最后更新时间：2026年4月30日*

## 8. 产品状态管理逻辑 (Product Status Management)

为了灵活控制产品在网站上的可见性，同时保护已有的 SEO 权重，我们引入了 `status` 字段来管理产品状态。

### 如何使用 `status` 字段：

1.  **编辑产品 Markdown 文件**：
    *   导航到 `src/content/[lang]/products/` 目录下，找到您要修改的产品 Markdown 文件（例如 `src/content/en/products/your-product.md`）。

2.  **添加或修改 YAML Frontmatter**：
    *   在文件的顶部 YAML Frontmatter 区域（由 `---` 包裹的部分）中，添加或修改 `status` 字段。

    ```yaml
    ---
    id: your-product-id
    name: Your Product Name
    status: active # 或 inactive
    ---
    ```

### `status` 字段的两种状态：

| 状态值 | 描述 | 网站行为 |
| :--- | :--- | :--- |
| **`active`** | **产品正常上架** | 1. 在产品列表页 (`/products`) 中正常显示。
| | | 2. 产品详情页 (`/products/[slug]`) 正常访问，所有内容和询价功能可用。 |
| **`inactive`** | **产品暂时下架** | 1. **在产品列表页 (`/products`) 中隐藏**，不会被用户看到。
| | | 2. 产品详情页 (`/products/[slug]`) 仍可直接访问（保护 SEO）。
| | | 3. 在产品详情页的标题下方，会显示一个黄色的 **“Temporarily Unavailable (暂时不可用)”** 标签。
| | | 4. **询价按钮及其他功能保持不变**，允许有特殊需求的客户继续询价。 |

### 架构师建议：
*   **SEO 保护**：当产品暂时缺货或需要调整时，强烈建议使用 `status: inactive` 而不是直接删除文件，这能有效避免 404 错误，保护已积累的搜索引擎排名。
*   **灵活管理**：通过修改此字段，您可以快速控制产品的线上可见性，无需修改代码逻辑。
*   **内容完整性**：即使产品下架，其详情页内容依然完整展示，有助于潜在客户了解产品信息，为未来的销售做铺垫。

---
*由 Sinopeakchem 技术团队维护。最后更新时间：2026年4月30日*
