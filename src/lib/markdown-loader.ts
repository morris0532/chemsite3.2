import matter from 'gray-matter';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  cas: string;
  hsCode: string;
  packaging: string;
  loading: string;
  image: string;
  nameCn?: string;
}

export interface SiteConfig {
  navigation: Array<{ name: string; link: string }>;
  footer: {
    companyDesc: string;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    copyright: string;
  };
  ui: Record<string, string>;
}

// 这个函数在构建时由 Vite 插件调用
export async function loadMarkdownFiles(locale: 'en' | 'ru'): Promise<{
  posts: Post[];
  products: Product[];
}> {
  // 注意：这个函数在运行时会被 Vite 的虚拟模块替换
  // 实际的文件加载发生在构建时
  return { posts: [], products: [] };
}

export async function loadSiteConfig(): Promise<Record<'en' | 'ru', SiteConfig>> {
  const config = await import('../content/site-config.json');
  return config.default;
}

export function parseMarkdownFile(content: string): { data: Record<string, any>; content: string } {
  const { data, content: body } = matter(content);
  return { data, content: body };
}
