# 分步式表单迁移指南

## 📋 从 chemsite3.2 迁移到 chemsite3.0

本指南详细说明如何将分步式表单改造从 chemsite3.2 迁移到 chemsite3.0。

---

## 🔄 迁移步骤

### 第 1 步：复制新组件文件

```bash
# 复制分步式表单组件
cp /home/ubuntu/chemsite3.2/src/components/MultiStepInquiryForm.tsx \
   /home/ubuntu/chemsite3.0/src/components/

# 验证文件是否存在
ls -la /home/ubuntu/chemsite3.0/src/components/MultiStepInquiryForm.tsx
```

---

### 第 2 步：更新 ProductDetail.tsx

#### 2.1 添加导入语句

**在文件顶部添加**（第 24 行之后）：

```typescript
import MultiStepInquiryForm from "@/components/MultiStepInquiryForm";
```

#### 2.2 移除旧的表单状态变量

**删除以下代码**（第 46-55 行）：

```typescript
// ❌ 删除这些行
const [inquiryName, setInquiryName] = useState("");
const [inquiryEmail, setInquiryEmail] = useState("");
const [inquiryCompany, setInquiryCompany] = useState("");
const [inquiryPhone, setInquiryPhone] = useState("");
const [inquiryQuantity, setInquiryQuantity] = useState("");
const [inquiryMessage, setInquiryMessage] = useState("");
const [inquirySubscribe, setInquirySubscribe] = useState(true);
const [inquirySubmitted, setInquirySubmitted] = useState(false);
```

**保留**：

```typescript
// ✅ 保留这一行
const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
```

#### 2.3 移除旧的提交处理函数

**删除以下代码**（第 115-169 行）：

```typescript
// ❌ 删除整个 handleInquirySubmit 函数
const handleInquirySubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // ... 所有代码
};
```

#### 2.4 替换表单 UI

**找到并替换 Dialog 组件**（大约第 376-441 行）：

**❌ 旧代码**：
```typescript
<Dialog open={inquiryModalOpen} onOpenChange={setInquiryModalOpen}>
  <DialogTrigger asChild>
    <Button className="h-14 px-8 bg-[#0066B3] hover:bg-[#004a82] text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1">
      {content.getQuote} <ArrowRight className="ml-2 w-5 h-5" />
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[550px] rounded-[2rem] p-8 max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-2xl font-black text-slate-900">{content.getQuote}: {product.name}</DialogTitle>
    </DialogHeader>
    {inquirySubmitted ? (
      // ... 成功页面代码
    ) : (
      <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        // ... 所有表单字段代码
      </form>
    )}
  </DialogContent>
</Dialog>
```

**✅ 新代码**：
```typescript
<Dialog open={inquiryModalOpen} onOpenChange={setInquiryModalOpen}>
  <DialogTrigger asChild>
    <Button className="h-14 px-8 bg-[#0066B3] hover:bg-[#004a82] text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1">
      {content.getQuote} <ArrowRight className="ml-2 w-5 h-5" />
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-8 max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-2xl font-black text-slate-900">{content.getQuote}</DialogTitle>
    </DialogHeader>
    <MultiStepInquiryForm
      productName={product.name}
      isRu={isRu}
      isFr={isFr}
      isEs={isEs}
      isAr={isAr}
      onClose={() => setInquiryModalOpen(false)}
    />
  </DialogContent>
</Dialog>
```

---

### 第 3 步：更新 TopicDetail.tsx

#### 3.1 添加导入语句

**在文件顶部添加**（第 20 行之后）：

```typescript
import MultiStepInquiryForm from "@/components/MultiStepInquiryForm";
```

#### 3.2 移除旧的表单状态变量

**删除以下代码**（第 55-65 行）：

```typescript
// ❌ 删除这些行
const [inquiryName, setInquiryName] = useState("");
const [inquiryEmail, setInquiryEmail] = useState("");
const [inquiryCompany, setInquiryCompany] = useState("");
const [inquiryPhone, setInquiryPhone] = useState("");
const [inquiryQuantity, setInquiryQuantity] = useState("");
const [inquiryMessage, setInquiryMessage] = useState("");
const [inquirySubscribe, setInquirySubscribe] = useState(true);
const [inquirySubmitted, setInquirySubmitted] = useState(false);
const [isFormExpanded, setIsFormExpanded] = useState(false);
```

**保留**：

```typescript
// ✅ 保留这一行
const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
```

#### 3.3 移除旧的提交处理函数

**删除以下代码**（第 120-173 行）：

```typescript
// ❌ 删除整个 handleInquirySubmit 函数
const handleInquirySubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!product) return;
  // ... 所有代码
};
```

#### 3.4 替换表单 UI

**找到并替换 Quick Inquiry Card 部分**（大约第 403-517 行）：

**❌ 旧代码**：
```typescript
<div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-blue-900/5 relative overflow-hidden">
  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
  
  <h3 className="text-xl font-black text-slate-900 mb-2 relative z-10">{content.quickInquiry}</h3>
  <p className="text-sm text-slate-500 font-medium mb-8 relative z-10">{content.inquiryDesc}</p>
  
  {inquirySubmitted ? (
    // ... 成功页面代码
  ) : (
    <form onSubmit={handleInquirySubmit} className="space-y-4 relative z-10">
      // ... 所有表单字段代码（100+ 行）
    </form>
  )}
</div>
```

**✅ 新代码**：
```typescript
<Dialog open={inquiryModalOpen} onOpenChange={setInquiryModalOpen}>
  <DialogTrigger asChild>
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-blue-900/5 relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <h3 className="text-xl font-black text-slate-900 mb-2 relative z-10">{content.quickInquiry}</h3>
      <p className="text-sm text-slate-500 font-medium mb-8 relative z-10">{content.inquiryDesc}</p>
      <Button className="w-full h-12 bg-[#0066B3] hover:bg-[#004a82] text-white rounded-xl font-bold">
        {content.submit}
      </Button>
    </div>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-8 max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-2xl font-black text-slate-900">{content.quickInquiry}</DialogTitle>
    </DialogHeader>
    {product && (
      <MultiStepInquiryForm
        productName={product.name}
        isRu={isRu}
        isFr={isFr}
        isEs={isEs}
        isAr={isAr}
        onClose={() => setInquiryModalOpen(false)}
      />
    )}
  </DialogContent>
</Dialog>
```

---

## 🧪 测试清单

迁移完成后，请按以下清单进行测试：

### 功能测试

- [ ] ProductDetail 页面的"获取报价"按钮可点击
- [ ] TopicDetail 页面的"快速询盘"卡片可点击
- [ ] 分步式表单正确显示
- [ ] 第1步：行业选择正常工作
- [ ] 第2步：采购量选择正常工作
- [ ] 第3步：联系方式填写正常工作
- [ ] 前后导航按钮工作正常
- [ ] 表单验证正常工作
- [ ] 表单提交成功
- [ ] 成功页面显示正确

### 多语言测试

- [ ] 英文版本 (`/products/...`)
- [ ] 俄文版本 (`/ru/products/...`)
- [ ] 法文版本 (`/fr/products/...`)
- [ ] 西班牙文版本 (`/es/products/...`)
- [ ] 阿拉伯文版本 (`/ar/products/...`)

### 响应式设计测试

- [ ] 桌面版本（1920px）
- [ ] 平板版本（768px）
- [ ] 手机版本（375px）

### 浏览器兼容性测试

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📊 代码变化统计

### ProductDetail.tsx

| 指标 | 值 |
|------|-----|
| 原始行数 | 708 |
| 改造后行数 | ~650 |
| 删除行数 | ~58 |
| 代码减少百分比 | 8% |
| 新增导入 | 1 |
| 删除状态变量 | 8 |
| 删除函数 | 1 |

### TopicDetail.tsx

| 指标 | 值 |
|------|-----|
| 原始行数 | 610 |
| 改造后行数 | ~520 |
| 删除行数 | ~90 |
| 代码减少百分比 | 15% |
| 新增导入 | 1 |
| 删除状态变量 | 9 |
| 删除函数 | 1 |

---

## 🔍 常见问题

### Q1：如果迁移出错怎么办？

**A**：使用备份文件恢复：
```bash
# 恢复 ProductDetail.tsx
cp /home/ubuntu/chemsite3.2/src/pages/ProductDetail.tsx.backup \
   /home/ubuntu/chemsite3.0/src/pages/ProductDetail.tsx

# 恢复 TopicDetail.tsx
cp /home/ubuntu/chemsite3.2/src/pages/TopicDetail.tsx.backup \
   /home/ubuntu/chemsite3.0/src/pages/TopicDetail.tsx
```

### Q2：新组件需要额外的依赖吗？

**A**：不需要。`MultiStepInquiryForm.tsx` 只使用了现有的依赖：
- React（已有）
- lucide-react（已有）
- @/components/ui（已有）
- @/hooks/use-toast（已有）

### Q3：如何定制表单的行业选项？

**A**：编辑 `MultiStepInquiryForm.tsx` 中的 `INDUSTRY_OPTIONS` 对象：

```typescript
const INDUSTRY_OPTIONS = {
  en: [
    { value: "your-value", label: "Your Label" },
    // ... 添加更多选项
  ],
  // ... 其他语言
};
```

### Q4：如何修改采购量的范围？

**A**：编辑 `MultiStepInquiryForm.tsx` 中的 `QUANTITY_OPTIONS` 对象：

```typescript
const QUANTITY_OPTIONS = {
  en: [
    { value: "your-value", label: "Your Label" },
    // ... 修改范围
  ],
  // ... 其他语言
};
```

### Q5：如何添加新的语言支持？

**A**：在 `MultiStepInquiryForm.tsx` 中添加新语言配置：

```typescript
const INDUSTRY_OPTIONS = {
  en: [ /* ... */ ],
  // ... 其他语言
  zh: [ // 添加中文
    { value: "manufacturing", label: "化学制造" },
    // ... 其他选项
  ],
};

const CONTENT = {
  en: { /* ... */ },
  // ... 其他语言
  zh: { // 添加中文
    step1Title: "您从事哪个行业？",
    // ... 其他文本
  },
};
```

---

## 📈 性能优化建议

### 1. 代码分割

如果表单组件变得很大，可以使用动态导入：

```typescript
const MultiStepInquiryForm = lazy(() => 
  import("@/components/MultiStepInquiryForm")
);
```

### 2. 缓存优化

表单数据可以缓存到 localStorage：

```typescript
// 在 MultiStepInquiryForm.tsx 中添加
useEffect(() => {
  localStorage.setItem("formData", JSON.stringify(formData));
}, [formData]);
```

### 3. 分析集成

可以添加事件追踪来监测用户行为：

```typescript
// 在每个步骤添加
analytics.track("form_step_completed", { step: currentStep });
```

---

## 🚀 部署建议

### 预发布检查

```bash
# 1. 检查 TypeScript 错误
npm run lint

# 2. 构建项目
npm run build

# 3. 预览构建结果
npm run preview
```

### 发布步骤

```bash
# 1. 提交更改到 Git
git add .
git commit -m "feat: implement multi-step inquiry form"

# 2. 创建新分支（可选）
git checkout -b feature/multi-step-form

# 3. 推送到远程
git push origin feature/multi-step-form
```

---

## 📝 维护建议

### 定期检查

- 每月检查表单提交数据
- 监测转化率变化
- 收集用户反馈
- 更新行业和采购量选项

### 文档更新

- 保持 `MULTI_STEP_FORM_IMPLEMENTATION.md` 最新
- 记录所有自定义修改
- 维护多语言翻译

---

## ✅ 迁移完成标志

迁移成功的标志：

- ✅ 所有代码改造完成
- ✅ 所有测试通过
- ✅ 多语言版本正常工作
- ✅ 表单提交成功
- ✅ 没有控制台错误
- ✅ 性能指标正常
- ✅ 用户反馈积极

---

## 📞 技术支持

如有问题，请参考：
1. `MULTI_STEP_FORM_IMPLEMENTATION.md` - 实现细节
2. `MultiStepInquiryForm.tsx` - 源代码注释
3. chemsite3.2 中的参考实现

---

**最后更新**：2026-05-14
**版本**：1.0
**状态**：✅ 准备就绪
