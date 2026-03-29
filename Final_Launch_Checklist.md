# 🚀 Sinopeakchem 网站上线前最后冲刺清单

这份清单涵盖了您目前网站从“技术完成”到“商业上线”所需的所有关键步骤。

---

## 1. 🖼️ 产品图片上传 (Product Images)
目前全站已支持响应式多图展示（主图 + 3张副图），为了让客户产生信任感，请上传真实的产品图。

### 📁 上传路径
所有图片请统一放入项目根目录下的：`/public/products/`

### 🏷️ 命名规则 (必须小写)
系统会根据文件名自动关联到对应的产品页面：
*   **产品主图**：`[slug].webp` （例如：`sodium-thiosulphate.webp`）
*   **装箱/包装图 1**：`[slug]-1.webp`
*   **装箱/包装图 2**：`[slug]-2.webp`
*   **装箱/包装图 3**：`[slug]-3.webp`

### 📐 图片规格建议
*   **比例**：强制锁定为 **4:3**。
*   **尺寸**：建议宽度 **1200px**，高度 **900px**。
*   **格式**：统一使用 **WebP**。
*   **处理建议**：您可以直接将从 Alibaba 等平台找来的 PNG/JPG 放入文件夹，然后在本地运行我为您准备的脚本：`python scripts/optimize-images.py`。它会自动完成比例裁剪、尺寸缩放和 WebP 转换。

---

## 2. 📄 技术文档准备 (Technical Documents)
目前已为您配置好“内容锁”弹窗和自动发送逻辑。
*   **存放路径**：`/public/docs/`
*   **命名规则**：参考我之前为您生成的 `Product_Docs_Filename_List.md`。
    *   例如：`oxalic-acid-msds.pdf`, `oxalic-acid-coa.pdf`
*   **内容建议**：统一使用英文版 PDF。
*   **优雅降级**：如果某个产品的文件缺失，系统会自动提示客户“正在更新”，并向您发送紧急提醒。

---

## 3. 📊 分析工具配置 (Analytics Setup)
您需要注册以下两个免费账号并获取 ID：
*   **Google Analytics 4 (GA4)**:
    *   去 [analytics.google.com](https://analytics.google.com) 注册并获取 **衡量 ID** (格式如 `G-XXXXXXXXXX`)。
*   **Microsoft Clarity**:
    *   去 [clarity.microsoft.com](https://clarity.microsoft.com) 注册并获取 **项目 ID**。
*   **操作**：拿到 ID 后发给我，我为您一键集成。

---

## 4. 🌐 域名与部署 (Domain & Deployment)
*   **Vercel 绑定**：在 Vercel 控制台将 `sinopeakchem.com` 绑定到该项目。
*   **SSL 证书**：Vercel 会自动为您生成免费的 HTTPS 证书。
*   **DNS 记录**：在您的域名服务商（如阿里云/Cloudflare）处，按照 Vercel 的提示修改 CNAME 记录。

---

## 5. 🔍 SEO 激活 (SEO Activation)
*   **Google Search Console (GSC)**:
    *   去 [search.google.com](https://search.google.com/search-console) 验证域名所有权。
    *   **提交 Sitemap**：输入 `https://sinopeakchem.com/sitemap.xml`。这是让 Google 快速收录 70 多个页面的最快方法。

---

## 6. 📧 邮件系统最后校验 (Email System)
*   **Resend 域名验证**：在 [resend.com/domains](https://resend.com/domains) 验证 `sinopeakchem.com`。
*   **Vercel 环境变量**：在 Vercel 后台添加 `RESEND_API_KEY`。

**所有技术架构已就绪，祝您的新官网询盘不断！📈**
