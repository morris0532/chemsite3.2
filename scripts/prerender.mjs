import fs from 'fs';
import path from 'path';
import { getPrerenderRoutes } from './get-prerender-routes.mjs';

const routes = getPrerenderRoutes();
const distDir = path.resolve('dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

console.log(`Starting simple prerender for ${routes.length} routes...`);

routes.forEach(route => {
  if (route === '/en' || route === '/ru') {
    // 已经有 index.html 处理根路径，这里可以根据需要生成子目录
  }
  
  const routePath = route.startsWith('/') ? route.slice(1) : route;
  const targetDir = path.join(distDir, routePath);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // 简单复制 index.html 到各个路由目录，这样 Yandex 至少能看到入口
  // 真正的预渲染需要浏览器环境，这里先保证路由可访问
  fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml);
});

console.log('Simple route structure created.');
