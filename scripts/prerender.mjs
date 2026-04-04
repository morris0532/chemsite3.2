import fs from 'fs';
import path from 'path';
import { getPrerenderRoutes } from './get-prerender-routes.mjs';

const routes = getPrerenderRoutes();
const distDir = path.resolve('dist');
const templateFile = path.join(distDir, 'index.html');

if (!fs.existsSync(templateFile)) {
  console.error('Build dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const template = fs.readFileSync(templateFile, 'utf-8');

routes.forEach(route => {
  const routePath = route.startsWith('/') ? route.slice(1) : route;
  const targetDir = path.join(distDir, routePath);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, template);
  console.log(\`Prerendered: \${route}\`);
});

console.log('Prerendering completed.');
