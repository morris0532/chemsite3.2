import { useMemo, useState, useCallback } from 'react';
import Fuse from 'fuse.js';
import { useMarkdownContent } from './useMarkdownContent';

export interface SearchResult {
  type: 'post' | 'product';
  id: string;
  slug: string;
  RootnoTouch: string;
  title: string;
  description: string;
  category: string;
  image: string;
  cas?: string;
  language: 'en' | 'ru' | 'fr' | 'es' | 'ar';
  score?: number;
}

// Global cache for search indices to avoid rebuilding
const searchIndexCache: Record<string, Fuse<SearchResult>> = {};
let isIndexBuilding = false;

export function useSearch(currentLocale: 'en' | 'ru' | 'fr' | 'es' | 'ar') {
  const enContent = useMarkdownContent('en');
  const ruContent = useMarkdownContent('ru');
  const frContent = useMarkdownContent('fr');
  const esContent = useMarkdownContent('es');
  const arContent = useMarkdownContent('ar');

  const [isIndexReady, setIsIndexReady] = useState(false);

  // Build search index only when needed (lazy initialization)
  const buildSearchIndex = useCallback(() => {
    if (searchIndexCache['global']) {
      setIsIndexReady(true);
      return searchIndexCache['global'];
    }

    if (isIndexBuilding) {
      return null;
    }

    isIndexBuilding = true;

    try {
      // 合并英文、俄文、法文、西班牙文和阿拉伯文的所有内容
      const items: SearchResult[] = [
        // 英文内容
        ...enContent.posts.map((post: any) => ({
          type: 'post' as const,
          id: post.id,
          slug: post.slug,
          RootnoTouch: post.RootnoTouch,
          title: post.title,
          description: post.excerpt,
          category: post.category,
          image: post.image,
          language: 'en' as const,
        })),
        ...enContent.products.map((product: any) => ({
          type: 'product' as const,
          id: product.id,
          slug: product.slug,
          RootnoTouch: product.RootnoTouch,
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
          id: post.id,
          slug: post.slug,
          RootnoTouch: post.RootnoTouch,
          title: post.title,
          description: post.excerpt,
          category: post.category,
          image: post.image,
          language: 'ru' as const,
        })),
        ...ruContent.products.map((product: any) => ({
          type: 'product' as const,
          id: product.id,
          slug: product.slug,
          RootnoTouch: product.RootnoTouch,
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
          id: post.id,
          slug: post.slug,
          RootnoTouch: post.RootnoTouch,
          title: post.title,
          description: post.excerpt,
          category: post.category,
          image: post.image,
          language: 'fr' as const,
        })),
        ...frContent.products.map((product: any) => ({
          type: 'product' as const,
          id: product.id,
          slug: product.slug,
          RootnoTouch: product.RootnoTouch,
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
          id: post.id,
          slug: post.slug,
          RootnoTouch: post.RootnoTouch,
          title: post.title,
          description: post.excerpt,
          category: post.category,
          image: post.image,
          language: 'es' as const,
        })),
        ...esContent.products.map((product: any) => ({
          type: 'product' as const,
          id: product.id,
          slug: product.slug,
          RootnoTouch: product.RootnoTouch,
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
          id: post.id,
          slug: post.slug,
          RootnoTouch: post.RootnoTouch,
          title: post.title,
          description: post.excerpt,
          category: post.category,
          image: post.image,
          language: 'ar' as const,
        })),
        ...arContent.products.map((product: any) => ({
          type: 'product' as const,
          id: product.id,
          slug: product.slug,
          RootnoTouch: product.RootnoTouch,
          title: product.name,
          description: product.shortDescription,
          category: product.category,
          image: product.image,
          cas: product.cas,
          language: 'ar' as const,
        })),
      ];

      const index = new Fuse(items, {
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

      searchIndexCache['global'] = index;
      setIsIndexReady(true);
      isIndexBuilding = false;
      return index;
    } catch (error) {
      console.error('Failed to build search index:', error);
      isIndexBuilding = false;
      return null;
    }
  }, [enContent, ruContent, frContent, esContent, arContent]);

  // Lazy-built search index (only built when search is actually used)
  const searchIndex = useMemo(() => {
    // Don't build index on component mount, only when explicitly called
    return null;
  }, []);

  const search = (query: string): SearchResult[] => {
    if (!query.trim()) return [];

    // Build index on-demand when search is performed
    const index = buildSearchIndex();
    if (!index) return [];

    const results = index.search(query);

    // 按相关性排序，并去重（同一内容的不同语言版本只保留一个）
    const deduped = new Map<string, SearchResult>();

    results.forEach(result => {
      // Use id or RootnoTouch as the unique key for deduplication across languages
      const key = `${result.item.type}-${result.item.id || result.item.RootnoTouch}`;

      // 优先保留当前语言的版本，其次保留英文版本
      const existing = deduped.get(key);
      if (!existing ||
        result.item.language === currentLocale ||
        (result.item.language === 'en' && existing.language !== currentLocale)) {
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
      uniqueKeys.add(`post-${post.id || post.RootnoTouch}`);
    });

    [...enContent.products, ...ruContent.products, ...frContent.products, ...esContent.products, ...arContent.products].forEach((product: any) => {
      uniqueKeys.add(`product-${product.id || product.RootnoTouch}`);
    });

    return uniqueKeys.size;
  };

  return { search, totalItems: getTotalItems(), isIndexReady };
}
