import { useMemo } from 'react';
import siteConfigData from '../content/site-config.json';

export function useSiteConfig(locale: 'en' | 'ru') {
  const config = useMemo(() => {
    return siteConfigData[locale] || siteConfigData.en;
  }, [locale]);

  return {
    navigation: config.navigation,
    footer: config.footer,
    ui: config.ui,
  };
}
