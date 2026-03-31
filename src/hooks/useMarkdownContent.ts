import { useMemo } from 'react';
import markdownContent from 'virtual:markdown-content';

export function useMarkdownContent(locale: 'en' | 'ru') {
  const content = useMemo(() => {
    return markdownContent[locale] || { posts: [], products: [] };
  }, [locale]);

  return {
    posts: content.posts || [],
    products: content.products || [],
    getPostBySlug: (slug: string) => content.posts?.find((p: any) => p.slug === slug),
    getProductBySlug: (slug: string) => content.products?.find((p: any) => p.slug === slug),
  };
}
