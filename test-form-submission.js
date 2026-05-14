/**
 * 表单提交测试脚本
 * 用于测试 MultiStepInquiryForm 的提交功能
 */

const testFormSubmission = async () => {
  console.log("🧪 开始测试表单提交功能...\n");

  // 测试数据
  const testData = {
    name: "Test User",
    email: "test@example.com",
    company: "Test Company",
    phone: "+1 234 567 890",
    quantity: "medium",
    industry: "manufacturing",
    message: "This is a test inquiry",
    type: "product_inquiry",
    product: "Test Product",
    subscribe: true,
  };

  console.log("📝 测试数据：");
  console.log(JSON.stringify(testData, null, 2));
  console.log("\n");

  try {
    // 模拟 API 请求
    console.log("📤 发送 POST 请求到 /api/send-email...");
    
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log(`✅ 响应状态码：${response.status}`);
    console.log(`✅ 响应状态文本：${response.statusText}`);

    if (response.ok) {
      console.log("\n✅ 表单提交成功！");
      const result = await response.json().catch(() => ({}));
      console.log("📦 响应数据：", result);
    } else {
      console.log("\n❌ 表单提交失败！");
      const errorText = await response.text();
      console.log("❌ 错误信息：", errorText);
    }
  } catch (error) {
    console.error("\n❌ 发生错误：", error.message);
  }
};

// 测试表单验证
const testFormValidation = () => {
  console.log("\n🧪 测试表单验证...\n");

  const testCases = [
    {
      name: "完整数据",
      data: {
        industry: "manufacturing",
        quantity: "medium",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
      },
      shouldPass: true,
    },
    {
      name: "缺少行业",
      data: {
        industry: "",
        quantity: "medium",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
      },
      shouldPass: false,
    },
    {
      name: "缺少采购量",
      data: {
        industry: "manufacturing",
        quantity: "",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
      },
      shouldPass: false,
    },
    {
      name: "缺少姓名",
      data: {
        industry: "manufacturing",
        quantity: "medium",
        name: "",
        email: "john@example.com",
        phone: "+1 234 567 890",
      },
      shouldPass: false,
    },
    {
      name: "缺少邮箱",
      data: {
        industry: "manufacturing",
        quantity: "medium",
        name: "John Doe",
        email: "",
        phone: "+1 234 567 890",
      },
      shouldPass: false,
    },
    {
      name: "缺少电话",
      data: {
        industry: "manufacturing",
        quantity: "medium",
        name: "John Doe",
        email: "john@example.com",
        phone: "",
      },
      shouldPass: false,
    },
  ];

  const validateStep3 = (data) => {
    return (
      data.name?.trim() !== "" &&
      data.email?.trim() !== "" &&
      data.phone?.trim() !== ""
    );
  };

  testCases.forEach((testCase) => {
    const isValid = validateStep3(testCase.data);
    const passed = isValid === testCase.shouldPass;
    const icon = passed ? "✅" : "❌";
    console.log(`${icon} ${testCase.name}: ${passed ? "通过" : "失败"}`);
  });
};

// 运行测试
console.log("========================================");
console.log("   MultiStepInquiryForm 测试套件");
console.log("========================================\n");

testFormValidation();
console.log("\n");
testFormSubmission();
