import { useMemo } from 'react';
import markdownContent from 'virtual:markdown-content';

export function useMarkdownContent(locale: 'en' | 'ru' | 'fr' | 'es' | 'ar') {
  const content = useMemo(() => {
    // Use the virtual:markdown-content module which contains all locale data
    // This is loaded at build time and available synchronously
    return markdownContent[locale] || { posts: [], products: [] };
  }, [locale]);

  return {
    posts: content.posts || [],
    products: content.products || [],
    getPostBySlug: (slug: string) => content.posts?.find((p: any) => p.slug === slug),
    getProductBySlug: (slug: string) => content.products?.find((p: any) => p.slug === slug),
  };
}
