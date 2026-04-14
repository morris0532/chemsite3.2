# 阿拉伯语版本上线问题排查与修复记录 (2026-04-11)

在为 `chemsite3.0` 项目添加阿拉伯语（`ar`）支持的过程中，我们遇到了两个主要的技术障碍：**刷新白屏** 和 **刷新 404 错误**。本文档记录了这些问题的根源及最终解决方案，以供未来扩展其他语言（如西班牙语 `es`）时参考。

---

## 问题 1：刷新白屏 (Runtime Crash) 

### 现象描述 
用户在访问 `/ar/products`、`/ar/about` 等页面时，初次进入正常，但手动刷新浏览器后页面变为纯白，控制台报错。

### 根源分析
1.  **全局配置缺失**：项目使用了 `useSiteConfig` 钩子来加载导航、页脚等全局 UI 文本。该钩子在代码中硬编码了支持的语言列表（`en`, `ru`, `fr`），且对应的配置文件 `src/content/site-config.json` 中缺少 `ar` 字段。
2.  **搜索逻辑崩溃**：`useSearch` 钩子在初始化时未处理 `ar` 语言，导致在阿拉伯语环境下刷新时，React 尝试读取未定义的配置项，触发运行时异常。

### 解决方法
-   **完善配置数据**：在 `src/content/site-config.json` 中新增了完整的 `ar` 配置项。
-   **扩展钩子支持**：更新了 `src/hooks/useSiteConfig.ts` 和 `src/hooks/useSearch.ts`，将 `ar` 和 `es` 加入支持的语言类型定义中。
-   **UI 翻译**：在 `src/components/SearchDialog.tsx` 等组件中添加了阿拉伯语的界面翻译。

---

## 问题 2：刷新 404 错误 (Deployment Routing)

### 现象描述
在 Vercel 生产环境下，直接刷新子页面（如 `/ar/products`）时，服务器返回 `404: NOT_FOUND`。

### 根源分析
1.  **预渲染脚本遗漏**：项目采用静态预渲染（Prerendering）策略。`scripts/get-prerender-routes.mjs` 脚本中硬编码了仅为 `en`, `ru`, `fr`, `es` 生成基础页面（Products, About, Contact 等）的物理目录。由于 `/ar/products/index.html` 等物理文件未生成，Vercel 无法找到对应资源。
2.  **内容注入失败**：`scripts/content-injector.mjs` 在构建后注入 SEO 元数据时，也忽略了 `ar` 语言，导致即使手动创建目录也无法获得正确的静态内容。
3.  **Vercel 重定向规则**：原有的 `vercel.json` 规则不够通用，未能覆盖新增的语言路径。

### 解决方法
-   **重构预渲染逻辑**：修改 `scripts/get-prerender-routes.mjs`，将 `ar` 加入 `basePages` 的循环生成逻辑，确保构建输出中包含所有语言的物理目录。
-   **完善注入器**：更新 `scripts/content-injector.mjs`，使其能正确处理 `ar` 和 `es` 的内容注入。
-   **强化 Vercel 配置**：更新 `vercel.json`，使用通用的 SPA 重写规则（Rewrites），确保所有不匹配静态文件的请求都指向 `index.html`。
-   **站点地图更新**：重写 `scripts/generate-sitemap.mjs`，使其自动支持所有已定义的语言，并生成正确的 `alternate` 语言链接。

---

## 经验总结与未来建议

1.  **避免硬编码语言列表**：未来应考虑将支持的语言列表统一提取到全局常量中，避免在多个脚本（`get-prerender-routes`, `content-injector`, `generate-sitemap`）中重复定义。
2.  **本地构建验证**：在推送新语言前，应在本地执行 `pnpm build` 并检查 `dist` 目录结构，确认物理文件是否按预期生成。
3.  **多语言一致性**：每添加一种新语言，必须同步更新：
    -   `src/content/site-config.json`
    -   `vite-plugin-markdown.mjs`
    -   所有 `scripts/` 下的构建脚本
    -   `src/hooks/` 下的相关多语言钩子

---
*记录人：Manus AI*
