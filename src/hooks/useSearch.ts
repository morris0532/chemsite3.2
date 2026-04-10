import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { useMarkdownContent } from './useMarkdownContent';

export interface SearchResult {
  type: 'post' | 'product';
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  cas?: string;
  language: 'en' | 'ru' | 'fr' | 'es' | 'ar';
  score?: number;
}

export function useSearch(currentLocale: 'en' | 'ru' | 'fr' | 'es' | 'ar') {
  const enContent = useMarkdownContent('en');
  const ruContent = useMarkdownContent('ru');
  const frContent = useMarkdownContent('fr');
  const esContent = useMarkdownContent('es');
  const arContent = useMarkdownContent('ar');

  const searchIndex = useMemo(() => {
    // 合并英文、俄文、法文、西班牙文和阿拉伯文的所有内容
    const items: SearchResult[] = [
      // 英文内容
      ...enContent.posts.map((post: any) => ({
        type: 'post' as const,
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        category: post.category,
        image: post.image,
        language: 'en' as const,
      })),
      ...enContent.products.map((product: any) => ({
        type: 'product' as const,
        slug: product.slug,
        title: product.name,
        description: product.shortDescription,
        category: product.category,
        image: product.image,
        cas: product.cas,
        language: 'en' as const,
      })),
      // 俄文内容
      ...ruContent.posts.map((post: any) => ({
        type: 'post' as const,
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        category: post.category,
        image: post.image,
        language: 'ru' as const,
      })),
      ...ruContent.products.map((product: any) => ({
        type: 'product' as const,
        slug: product.slug,
        title: product.name,
        description: product.shortDescription,
        category: product.category,
        image: product.image,
        cas: product.cas,
        language: 'ru' as const,
      })),
      // 法文内容
      ...frContent.posts.map((post: any) => ({
        type: 'post' as const,
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        category: post.category,
        image: post.image,
        language: 'fr' as const,
      })),
      ...frContent.products.map((product: any) => ({
        type: 'product' as const,
        slug: product.slug,
        title: product.name,
        description: product.shortDescription,
        category: product.category,
        image: product.image,
        cas: product.cas,
        language: 'fr' as const,
      })),
      // 西班牙文内容
      ...esContent.posts.map((post: any) => ({
        type: 'post' as const,
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        category: post.category,
        image: post.image,
        language: 'es' as const,
      })),
      ...esContent.products.map((product: any) => ({
        type: 'product' as const,
        slug: product.slug,
        title: product.name,
        description: product.shortDescription,
        category: product.category,
        image: product.image,
        cas: product.cas,
        language: 'es' as const,
      })),
      // 阿拉伯文内容
      ...arContent.posts.map((post: any) => ({
        type: 'post' as const,
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        category: post.category,
        image: post.image,
        language: 'ar' as const,
      })),
      ...arContent.products.map((product: any) => ({
        type: 'product' as const,
        slug: product.slug,
        title: product.name,
        description: product.shortDescription,
        category: product.category,
        image: product.image,
        cas: product.cas,
        language: 'ar' as const,
      })),
    ];

    return new Fuse(items, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'cas', weight: 2 },
        { name: 'description', weight: 1 },
        { name: 'category', weight: 0.5 },
      ],
      threshold: 0.3,
      minMatchCharLength: 2,
      includeScore: true,
    });
  }, [enContent, ruContent, frContent]);

  const search = (query: string): SearchResult[] => {
    if (!query.trim()) return [];
    const results = searchIndex.search(query);
    
    // 按相关性排序，并去重（同一内容的不同语言版本只保留一个）
    const deduped = new Map<string, SearchResult>();
    
    results.forEach(result => {
      const key = `${result.item.type}-${result.item.slug}`;
      
      // 优先保留当前语言的版本，其次保留英文版本
      if (!deduped.has(key) || 
          result.item.language === currentLocale ||
          (result.item.language === 'en' && deduped.get(key)?.language !== currentLocale)) {
        deduped.set(key, {
          ...result.item,
          score: result.score,
        });
      }
    });

    return Array.from(deduped.values())
      .sort((a, b) => (a.score || 1) - (b.score || 1));
  };

  const getTotalItems = () => {
    // 返回去重后的总数（同一内容的不同语言版本只计一次）
    const uniqueKeys = new Set<string>();
    
    [...enContent.posts, ...ruContent.posts, ...frContent.posts, ...esContent.posts, ...arContent.posts].forEach((post: any) => {
      uniqueKeys.add(`post-${post.slug}`);
    });
    
    [...enContent.products, ...ruContent.products, ...frContent.products, ...esContent.products, ...arContent.products].forEach((product: any) => {
      uniqueKeys.add(`product-${product.slug}`);
    });

    return uniqueKeys.size;
  };

  return { search, totalItems: getTotalItems() };
}
