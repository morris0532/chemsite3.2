import { useState, useEffect } from 'react';

export interface MarkdownContent {
  posts: any[];
  products: any[];
  getPostBySlug: (slug: string) => any;
  getProductBySlug: (slug: string) => any;
  isLoading: boolean;
}

// Cache for loaded content to avoid re-fetching
const contentCache: Record<string, any> = {};
const loadingPromises: Record<string, Promise<any>> = {};

export function useMarkdownContent(locale: 'en' | 'ru' | 'fr' | 'es' | 'ar'): MarkdownContent {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If content is already cached, use it immediately
    if (contentCache[locale]) {
      setContent(contentCache[locale]);
      setIsLoading(false);
      return;
    }

    // If loading is already in progress, wait for it
    if (loadingPromises[locale]) {
      loadingPromises[locale]
        .then((data) => {
          setContent(data);
          setIsLoading(false);
        })
        .catch(() => {
          setContent({ posts: [], products: [] });
          setIsLoading(false);
        });
      return;
    }

    // Start new loading
    setIsLoading(true);

    // Create a promise for this locale's data
    const loadPromise = (async () => {
      try {
        // Dynamically import the locale-specific module
        const module = await import(`virtual:markdown-content-${locale}`);
        const data = module.default || { posts: [], products: [] };
        
        // Cache the result
        contentCache[locale] = data;
        
        return data;
      } catch (error) {
        console.warn(`Failed to load markdown content for locale: ${locale}`, error);
        
        // Fallback: try to load from the combined module
        try {
          const markdownContent = await import('virtual:markdown-content');
          const data = markdownContent.default[locale] || { posts: [], products: [] };
          contentCache[locale] = data;
          return data;
        } catch (fallbackError) {
          console.error('Failed to load markdown content from fallback', fallbackError);
          return { posts: [], products: [] };
        }
      }
    })();

    loadingPromises[locale] = loadPromise;

    loadPromise
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      })
      .catch(() => {
        setContent({ posts: [], products: [] });
        setIsLoading(false);
      });
  }, [locale]);

  const resolvedContent = content || { posts: [], products: [] };

  return {
    posts: resolvedContent.posts || [],
    products: resolvedContent.products || [],
    getPostBySlug: (slug: string) => resolvedContent.posts?.find((p: any) => p.slug === slug),
    getProductBySlug: (slug: string) => resolvedContent.products?.find((p: any) => p.slug === slug),
    isLoading,
  };
}
