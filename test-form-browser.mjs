/**
 * 浏览器自动化测试脚本
 * 使用 Playwright 测试表单提交功能
 */

import { chromium } from "playwright";

const BASE_URL = "http://localhost:5173";

async function testFormSubmission() {
  console.log("🧪 启动浏览器自动化测试...\n");

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // 1. 导航到产品页面
    console.log("📍 导航到产品页面...");
    await page.goto(`${BASE_URL}/products/soda-ash`, {
      waitUntil: "networkidle",
    });
    console.log("✅ 页面加载完成\n");

    // 2. 查找并点击"获取报价"按钮
    console.log("🔍 查找'获取报价'按钮...");
    const quoteButton = await page.locator(
      'button:has-text("Get a Quote"), button:has-text("Получить цену")'
    );

    if (await quoteButton.isVisible()) {
      console.log("✅ 找到按钮\n");
      await quoteButton.click();
      await page.waitForTimeout(500);
    } else {
      console.log("❌ 未找到按钮\n");
      throw new Error("Quote button not found");
    }

    // 3. 等待对话框打开
    console.log("⏳ 等待对话框打开...");
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    console.log("✅ 对话框已打开\n");

    // 4. 测试第1步 - 选择行业
    console.log("📋 第1步：选择行业...");
    const industryOptions = await page.locator(
      '[role="dialog"] input[type="radio"][name="industry"]'
    );
    const industryCount = await industryOptions.count();
    console.log(`✅ 找到 ${industryCount} 个行业选项`);

    if (industryCount > 0) {
      await industryOptions.first().click();
      console.log("✅ 已选择第一个行业\n");
    }

    // 5. 点击"下一步"按钮
    console.log("🔘 点击'下一步'按钮...");
    const nextButton = await page.locator(
      '[role="dialog"] button:has-text("Next"), [role="dialog"] button:has-text("Далее")'
    );

    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(500);
      console.log("✅ 已进入第2步\n");
    }

    // 6. 测试第2步 - 选择采购量
    console.log("📋 第2步：选择采购量...");
    const quantityOptions = await page.locator(
      '[role="dialog"] input[type="radio"][name="quantity"]'
    );
    const quantityCount = await quantityOptions.count();
    console.log(`✅ 找到 ${quantityCount} 个采购量选项`);

    if (quantityCount > 0) {
      await quantityOptions.first().click();
      console.log("✅ 已选择第一个采购量\n");
    }

    // 7. 点击"下一步"按钮进入第3步
    console.log("🔘 点击'下一步'按钮...");
    const nextButton2 = await page.locator(
      '[role="dialog"] button:has-text("Next"), [role="dialog"] button:has-text("Далее")'
    );

    if (await nextButton2.isVisible()) {
      await nextButton2.click();
      await page.waitForTimeout(500);
      console.log("✅ 已进入第3步\n");
    }

    // 8. 测试第3步 - 填写联系方式
    console.log("📋 第3步：填写联系方式...");

    // 填写姓名
    const nameInput = await page.locator(
      '[role="dialog"] input[placeholder="John Doe"]'
    );
    if (await nameInput.isVisible()) {
      await nameInput.fill("Test User");
      console.log("✅ 已填写姓名");
    }

    // 填写邮箱
    const emailInput = await page.locator(
      '[role="dialog"] input[placeholder="john@company.com"]'
    );
    if (await emailInput.isVisible()) {
      await emailInput.fill("test@example.com");
      console.log("✅ 已填写邮箱");
    }

    // 填写电话
    const phoneInput = await page.locator(
      '[role="dialog"] input[placeholder="+1 234 567 890"]'
    );
    if (await phoneInput.isVisible()) {
      await phoneInput.fill("+1 234 567 890");
      console.log("✅ 已填写电话\n");
    }

    // 9. 点击提交按钮
    console.log("🔘 点击提交按钮...");
    const submitButton = await page.locator(
      '[role="dialog"] button:has-text("Submit"), [role="dialog"] button:has-text("Отправить")'
    );

    if (await submitButton.isVisible()) {
      console.log("✅ 提交按钮可见");
      await submitButton.click();
      console.log("✅ 已点击提交按钮\n");

      // 等待成功消息
      console.log("⏳ 等待成功消息...");
      await page.waitForTimeout(2000);

      const successMessage = await page.locator(
        'text="Successfully", text="успешно", text="Succès"'
      );
      if (await successMessage.isVisible()) {
        console.log("✅ 成功消息已显示\n");
      }
    } else {
      console.log("❌ 提交按钮不可见\n");
    }

    console.log("========================================");
    console.log("✅ 所有测试完成！");
    console.log("========================================");
  } catch (error) {
    console.error("❌ 测试失败：", error.message);
  } finally {
    await browser.close();
  }
}

// 运行测试
testFormSubmission();
