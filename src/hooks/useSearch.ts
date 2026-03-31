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
  language: 'en' | 'ru';
  score?: number;
}

export function useSearch(currentLocale: 'en' | 'ru') {
  const enContent = useMarkdownContent('en');
  const ruContent = useMarkdownContent('ru');

  const searchIndex = useMemo(() => {
    // 合并英文和俄文的所有内容
    const items: SearchResult[] = [
      // 英文博客
      ...enContent.posts.map((post: any) => ({
        type: 'post' as const,
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        category: post.category,
        image: post.image,
        language: 'en' as const,
      })),
      // 俄文博客
      ...ruContent.posts.map((post: any) => ({
        type: 'post' as const,
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        category: post.category,
        image: post.image,
        language: 'ru' as const,
      })),
      // 英文产品
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
      // 俄文产品
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
  }, [enContent, ruContent]);

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
    
    [...enContent.posts, ...ruContent.posts].forEach((post: any) => {
      uniqueKeys.add(`post-${post.slug}`);
    });
    
    [...enContent.products, ...ruContent.products].forEach((product: any) => {
      uniqueKeys.add(`product-${product.slug}`);
    });

    return uniqueKeys.size;
  };

  return { search, totalItems: getTotalItems() };
}
