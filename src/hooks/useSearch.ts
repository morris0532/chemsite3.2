import { useState, useCallback, useMemo } from 'react';
import { useMarkdownContent } from './useMarkdownContent';
import Fuse from 'fuse.js';

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

export function useSearch(currentLocale: 'en' | 'ru' | 'fr' | 'es' | 'ar') {
  const enContent = useMarkdownContent('en');
  const ruContent = useMarkdownContent('ru');
  const frContent = useMarkdownContent('fr');
  const esContent = useMarkdownContent('es');
  const arContent = useMarkdownContent('ar');

  // isReady is always true now since we're not waiting for a worker
  const isReady = true;
  // Set isSearching to false by default and remove dynamic toggling to avoid flickering
  const [isSearching] = useState(false);

  // Prepare items for indexing synchronously
  const allItems = useMemo(() => {
    const items: SearchResult[] = [
      ...enContent.posts.map((post: any) => ({
        type: 'post' as const, id: post.id, slug: post.slug, RootnoTouch: post.RootnoTouch,
        title: post.title, description: post.excerpt, category: post.category, image: post.image, language: 'en' as const,
      })),
      ...enContent.products.map((product: any) => ({
        type: 'product' as const, id: product.id, slug: product.slug, RootnoTouch: product.RootnoTouch,
        title: product.name, description: product.shortDescription, category: product.category, image: product.image, cas: product.cas, language: 'en' as const,
      })),
      ...ruContent.posts.map((post: any) => ({
        type: 'post' as const, id: post.id, slug: post.slug, RootnoTouch: post.RootnoTouch,
        title: post.title, description: post.excerpt, category: post.category, image: post.image, language: 'ru' as const,
      })),
      ...ruContent.products.map((product: any) => ({
        type: 'product' as const, id: product.id, slug: product.slug, RootnoTouch: product.RootnoTouch,
        title: product.name, description: product.shortDescription, category: product.category, image: product.image, cas: product.cas, language: 'ru' as const,
      })),
      ...frContent.posts.map((post: any) => ({
        type: 'post' as const, id: post.id, slug: post.slug, RootnoTouch: post.RootnoTouch,
        title: post.title, description: post.excerpt, category: post.category, image: post.image, language: 'fr' as const,
      })),
      ...frContent.products.map((product: any) => ({
        type: 'product' as const, id: product.id, slug: product.slug, RootnoTouch: product.RootnoTouch,
        title: product.name, description: product.shortDescription, category: product.category, image: product.image, cas: product.cas, language: 'fr' as const,
      })),
      ...esContent.posts.map((post: any) => ({
        type: 'post' as const, id: post.id, slug: post.slug, RootnoTouch: post.RootnoTouch,
        title: post.title, description: post.excerpt, category: post.category, image: post.image, language: 'es' as const,
      })),
      ...esContent.products.map((product: any) => ({
        type: 'product' as const, id: product.id, slug: product.slug, RootnoTouch: product.RootnoTouch,
        title: product.name, description: product.shortDescription, category: product.category, image: product.image, cas: product.cas, language: 'es' as const,
      })),
      ...arContent.posts.map((post: any) => ({
        type: 'post' as const, id: post.id, slug: post.slug, RootnoTouch: post.RootnoTouch,
        title: post.title, description: post.excerpt, category: post.category, image: post.image, language: 'ar' as const,
      })),
      ...arContent.products.map((product: any) => ({
        type: 'product' as const, id: product.id, slug: product.slug, RootnoTouch: product.RootnoTouch,
        title: product.name, description: product.shortDescription, category: product.category, image: product.image, cas: product.cas, language: 'ar' as const,
      })),
    ];
    return items;
  }, [enContent, ruContent, frContent, esContent, arContent]);

  // Initialize Fuse.js instance
  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'cas', weight: 2 },
        { name: 'description', weight: 1 },
        { name: 'category', weight: 0.5 },
      ],
      threshold: 0.3,
      minMatchCharLength: 1,
      includeScore: true,
    });
  }, [allItems]);

  const search = useCallback(async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) {
      return [];
    }

    // Removed setIsSearching(true) to avoid flicker
    
    try {
      const results = fuse.search(query);
      
      // Deduplication logic
      const deduped = new Map<string, SearchResult>();
      results.forEach(result => {
        const key = `${result.item.type}-${result.item.id || result.item.RootnoTouch}`;
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

      const finalResults = Array.from(deduped.values())
        .sort((a, b) => (a.score || 1) - (b.score || 1));

      return finalResults;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
    // Removed finally { setIsSearching(false) } to avoid flicker
  }, [fuse, currentLocale]);

  const getTotalItems = useCallback(() => {
    const uniqueKeys = new Set<string>();
    allItems.forEach(item => {
      uniqueKeys.add(`${item.type}-${item.id || item.RootnoTouch}`);
    });
    return uniqueKeys.size;
  }, [allItems]);

  return { search, totalItems: getTotalItems(), isReady, isSearching };
}
