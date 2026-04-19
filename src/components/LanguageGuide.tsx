import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMarkdownContent } from "@/hooks/useMarkdownContent";

const LanguageGuide: React.FC = () => {
  const [show, setShow] = useState(false);
  const [targetLang, setTargetLang] = useState<{ code: string; name: string } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current language from URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentLang = (pathParts[0] || 'en') as 'en' | 'ru' | 'fr' | 'es' | 'ar';

  useEffect(() => {
    // 1. 获取浏览器语言 (例如 'ar-SA', 'ru-RU', 'en-US')
    const browserLang = navigator.language.toLowerCase();

    // 3. 定义支持自动引导的语言映射
    const langMap: Record<string, { code: string; name: string }> = {
      'ar': { code: 'ar', name: 'العربية' },
      'ru': { code: 'ru', name: 'Русский' },
      'fr': { code: 'fr', name: 'Français' },
      'es': { code: 'es', name: 'Español' }
    };

    // 4. 检查浏览器语言是否在支持列表中，且当前页面不是该语言
    const matchedLangKey = Object.keys(langMap).find(key => browserLang.startsWith(key));

    if (matchedLangKey && matchedLangKey !== currentLang) {
      // 检查用户是否已经关闭过此提示 (使用 sessionStorage，仅在当前会话有效)
      const isDismissed = sessionStorage.getItem(`dismiss-lang-guide-${matchedLangKey}`);
      if (!isDismissed) {
        setTargetLang(langMap[matchedLangKey]);
        setShow(true);
      }
    } else {
      setShow(false);
    }
  }, [location.pathname, currentLang]);

  // Only load content for current language and target language (if showing guide)
  // This avoids loading all languages upfront
  const currentContent = useMarkdownContent(currentLang);
  const targetContent = useMemo(() => {
    if (!show || !targetLang) {
      return null;
    }
    return useMarkdownContent(targetLang.code as 'en' | 'ru' | 'fr' | 'es' | 'ar');
  }, [show, targetLang]);

  const handleSwitch = () => {
    if (!targetLang || !targetContent) return;

    const targetLocale = targetLang.code as 'en' | 'ru' | 'fr' | 'es' | 'ar';
    const targetPrefix = `/${targetLocale}`;

    const pathParts = location.pathname.split('/').filter(Boolean);

    if (location.pathname.includes('/blog/')) {
      const currentSlug = location.pathname.split('/blog/')[1];
      const currentPost = currentContent.posts.find((p: any) => p.slug === currentSlug);
      if (currentPost) {
        const targetPost = targetContent.posts.find((p: any) =>
          (p.id && currentPost.id && p.id === currentPost.id) ||
          (p.RootnoTouch && currentPost.RootnoTouch && p.RootnoTouch === currentPost.RootnoTouch)
        );
        if (targetPost) {
          setShow(false);
          navigate(`${targetPrefix}/blog/${targetPost.slug}`);
          return;
        }
      }
    }

    if (location.pathname.includes('/products/')) {
      const currentSlug = location.pathname.split('/products/')[1];
      const currentProduct = currentContent.products.find((p: any) => p.slug === currentSlug);
      if (currentProduct) {
        const targetProduct = targetContent.products.find((p: any) =>
          (p.id && currentProduct.id && p.id === currentProduct.id) ||
          (p.RootnoTouch && currentProduct.RootnoTouch && p.RootnoTouch === currentProduct.RootnoTouch)
        );
        if (targetProduct) {
          setShow(false);
          navigate(`${targetPrefix}/products/${targetProduct.slug}`);
          return;
        }
      }
    }

    const newPath = `/${targetLocale}/${pathParts.slice(1).join('/')}`;
    setShow(false);
    navigate(newPath);
  };

  const handleDismiss = () => {
    if (targetLang) {
      sessionStorage.setItem(`dismiss-lang-guide-${targetLang.code}`, 'true');
    }
    setShow(false);
  };

  if (!show || !targetLang) return null;

  // 针对阿拉伯语使用 RTL 布局
  const isRtl = targetLang.code === 'ar';

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-8 md:max-w-sm bg-white border border-gray-200 shadow-2xl rounded-lg p-4 animate-in fade-in slide-in-from-bottom-4 duration-300 ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            {targetLang.code === 'ar' ? 'هل تفضل تصفح الموقع باللغة العربية؟' :
              targetLang.code === 'ru' ? 'Предпочитаете просматривать сайт на русском языке?' :
                targetLang.code === 'fr' ? 'Préférez-vous naviguer sur le site en français ?' :
                  targetLang.code === 'es' ? '¿Prefieres navegar por el sitio en español?' :
                    `Switch to ${targetLang.name}?`}
          </p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={handleSwitch}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {targetLang.code === 'ar' ? 'نعم، قم بالتبديل' :
                targetLang.code === 'ru' ? 'Да, переключить' :
                  targetLang.code === 'fr' ? 'Oui, changer' :
                    targetLang.code === 'es' ? 'Sí, cambiar' :
                      'Yes, switch'}
            </button>
            <button
              onClick={handleDismiss}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {targetLang.code === 'ar' ? 'ليس الآن' :
                targetLang.code === 'ru' ? 'Не сейчас' :
                  targetLang.code === 'fr' ? 'Pas maintenant' :
                    targetLang.code === 'es' ? 'Ahora no' :
                      'Not now'}
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LanguageGuide;
