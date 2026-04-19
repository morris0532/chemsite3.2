import { useMemo } from 'react';

// Dynamic imports for each locale to enable code splitting
const localeModules: Record<string, () => Promise<any>> = {
  en: () => import('virtual:markdown-content-en'),
  ru: () => import('virtual:markdown-content-ru'),
  fr: () => import('virtual:markdown-content-fr'),
  es: () => import('virtual:markdown-content-es'),
  ar: () => import('virtual:markdown-content-ar'),
};

// Cache for loaded content to avoid re-importing
const contentCache: Record<string, any> = {};

export function useMarkdownContent(locale: 'en' | 'ru' | 'fr' | 'es' | 'ar') {
  const content = useMemo(() => {
    // Return cached content if available
    if (contentCache[locale]) {
      return contentCache[locale];
    }

    // For synchronous access, we need to handle this carefully
    // Since dynamic imports are async, we'll use a fallback approach
    // that loads all locales once on first use (for backward compatibility)
    // but this will be optimized in the future with async loading
    try {
      // Try to import the old virtual module as fallback
      const markdownContent = require('virtual:markdown-content').default;
      const localeData = markdownContent[locale] || { posts: [], products: [] };
      contentCache[locale] = localeData;
      return localeData;
    } catch (e) {
      return { posts: [], products: [] };
    }
  }, [locale]);

  return {
    posts: content.posts || [],
    products: content.products || [],
    getPostBySlug: (slug: string) => content.posts?.find((p: any) => p.slug === slug),
    getProductBySlug: (slug: string) => content.products?.find((p: any) => p.slug === slug),
  };
}
