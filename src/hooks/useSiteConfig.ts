import { useMemo } from 'react';
import siteConfigData from '../content/site-config.json';

export function useSiteConfig(locale: 'en' | 'ru' | 'fr' | 'es' | 'ar') {
  const config = useMemo(() => {
    return (siteConfigData as any)[locale] || siteConfigData.en;
  }, [locale]);

  return {
    navigation: config.navigation,
    footer: config.footer,
    ui: config.ui,
  };
}
