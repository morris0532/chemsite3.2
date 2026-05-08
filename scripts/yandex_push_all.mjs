import fs from 'fs';
import path from 'path';

const HOST = 'www.sinopeakchem.com';
const KEY = 'yandexkey' + Math.random().toString(36).substring(7);
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function pushAllToYandex() {
  console.log('🚀 开始提取全量多语言 URL...');
  
  const sitemaps = [
    'public/sitemap-static.xml',
    'public/sitemap-products.xml',
    'public/sitemap-blog-1.xml'
  ];

  let allUrls = [];

  sitemaps.forEach(sitemap => {
    const sitemapPath = path.resolve(sitemap);
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      const matches = content.match(/https:\/\/www\.sinopeakchem\.com\/(en|ru|fr|es|ar)[a-zA-Z0-9\/-]*/g) || [];
      allUrls = allUrls.concat(matches);
      console.log(`✅ 从 ${sitemap} 中提取了 ${matches.length} 个 URL。`);
    }
  });

  const uniqueUrls = [...new Set(allUrls)];
  console.log(`📊 总计找到 ${uniqueUrls.length} 个唯一 URL。`);

  if (uniqueUrls.length === 0) return;

  // 创建验证文件
  fs.writeFileSync(path.resolve(`public/${KEY}.txt`), KEY);
  console.log(`🔑 已创建验证文件: public/${KEY}.txt`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: uniqueUrls
  };

  console.log('📡 正在向 Yandex 发送全量推送请求...');
  
  try {
    const response = await fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('🎉 Yandex 成功接收全量推送请求！状态码: ' + response.status);
      console.log('请在 24-48 小时内查看 Yandex Webmaster 的收录统计。');
    } else {
      const errorText = await response.text();
      console.error(`❌ 推送失败: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('❌ 网络请求错误:', error);
  }
}

pushAllToYandex();
