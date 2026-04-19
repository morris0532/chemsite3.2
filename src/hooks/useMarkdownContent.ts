import { useState, useEffect, useMemo } from 'react';
import markdownContent from 'virtual:markdown-content';

export interface MarkdownContent {
  posts: any[];
  products: any[];
  getPostBySlug: (slug: string) => any;
  getProductBySlug: (slug: string) => any;
  isLoading: boolean;
}

// Cache for loaded content
const contentCache: Record<string, any> = {};

export function useMarkdownContent(locale: 'en' | 'ru' | 'fr' | 'es' | 'ar'): MarkdownContent {
  // Get data synchronously from the virtual module
  // This ensures SSG/Prerendering works correctly and content is included in the static HTML
  const syncData = useMemo(() => {
    if (contentCache[locale]) {
      return contentCache[locale];
    }
    
    try {
      const data = markdownContent[locale] || { posts: [], products: [] };
      contentCache[locale] = data;
      return data;
    } catch (error) {
      console.error(`Failed to load markdown content for locale: ${locale}`, error);
      return { posts: [], products: [] };
    }
  }, [locale]);

  // For client-side optimization, we can add a brief loading state
  // but the data is already available from syncData
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Data is already loaded synchronously, so we don't need to load it again
    // Just ensure isLoading is false
    setIsLoading(false);
  }, [locale]);

  return {
    posts: syncData.posts || [],
    products: syncData.products || [],
    getPostBySlug: (slug: string) => syncData.posts?.find((p: any) => p.slug === slug),
    getProductBySlug: (slug: string) => syncData.products?.find((p: any) => p.slug === slug),
    isLoading,
  };
}
