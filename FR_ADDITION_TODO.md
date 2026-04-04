# 🇫🇷 法语 (FR) 添加进度清单 (TODO List)

本文件记录了为 Sinopeakchem 网站添加法语支持的详细步骤。

---

## 📅 阶段 1：基础架构搭建 (Infrastructure) - [✅ 已完成]
- [x] 创建法语内容目录 (`src/content/fr/products`, `src/content/fr/blog`)
- [x] 修改 `useMarkdownContent` 钩子以支持 `fr` 语言
- [x] 在 `app.tsx` 中注册 `/fr` 路由
- [x] 在 `Layout.tsx` 中添加法语切换逻辑
- [x] 在 `Layout.tsx` 中添加法语 SEO `alternate` 链接

---

## 📅 阶段 2：核心 UI 与 静态内容翻译 (UI Translation) - [✅ 已完成]
- [x] 翻译 `Layout.tsx` 中的导航菜单 (NavLinks)
- [x] 翻译 Footer、搜索框、联系表单中的固定文字
- [x] 升级语言切换器为下拉菜单模式
- [ ] 创建法语版 `Home`, `About`, `Contact` 页面组件 (将在内容填充阶段同步优化)

---

## 📅 阶段 3：产品与博客内容全量复制 (Content Placeholder) - [✅ 已完成]
- [x] 将所有英文产品 MD 文件复制到 `src/content/fr/products/`
- [x] 将所有英文博客 MD 文件复制到 `src/content/fr/blog/`
- [x] 验证法语版目录结构完整性

---

## 📅 阶段 4：内容翻译与替换 (Content Translation) - [待开始]
- [ ] 逐一翻译 attendus `src/content/fr/products/` 下的文件 (8/22)
    - [x] Chlorure d'ammonium (ammonium-chloride.md)
    - [x] Borax (borax.md)
    - [x] Chlorure de calcium (calcium-chloride.md)
    - [x] Sulfate d'ammonium (ammonium-sulphate.md)
    - [x] Soude caustique (caustic-soda.md)
    - [x] Acide citrique anhydre (citric-acid-anhydrous.md)
    - [x] Acide citrique monohydraté (citric-acid-monohydrate.md)
    - [x] Acide oxalique (oxalic-acid.md)
    - [ ] 其他产品 (进行中...)
- [ ] 逐一翻译并替换 `src/content/fr/blog/` 下的文件
- [ ] 验证法语版 MD 内容的静态注入效果

---

## 📅 阶段 4：SEO 与 站点地图同步 (SEO & Sitemap) - [待开始]
- [ ] 修改 `generate-sitemap.mjs` 加入法语 URL
- [ ] 确保法语版 JSON-LD 结构化数据正确显示
- [ ] 提交法语版 URL 到 Google Search Console 进行测试

---

## 🏁 最终验证 (Final Check)
- [ ] 验证法语版全站链接跳转
- [ ] 验证法语版 SEO 源码注入
- [ ] 验证法语版移动端适配
