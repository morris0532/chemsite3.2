import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, MessageCircle, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "./SearchDialog";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  jsonLd?: object;
}

export default function Layout({ children, title, description, image, jsonLd }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [phoneLink, setPhoneLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  
  const enContent = useMarkdownContent('en');
  const ruContent = useMarkdownContent('ru');
  const frContent = useMarkdownContent('fr');
  const esContent = useMarkdownContent('es');
  const arContent = useMarkdownContent('ar');
  const currentContent = isRu ? ruContent : (isFr ? frContent : (isEs ? esContent : (isAr ? arContent : enContent)));

  const pageTitle = title 
    ? `${title} | Sinopeakchem` 
    : (isRu ? "Sinopeakchem - Глобальный поставщик химикатов" : (isFr ? "Sinopeakchem - Fournisseur mondial de produits chimiques" : (isEs ? "Sinopeakchem - Proveedor Global de Productos Químicos" : (isAr ? "Sinopeakchem - مورد عالمي للمواد الكيميائية" : "Sinopeakchem - Global Chemical Supplier"))));
  
  const pageDescription = description || (isRu 
    ? "Sinopeakchem - ведущий поставщик химикатов B2B, предлагающий высококачественные промышленные химикаты, включая тиосульфат натрия, каустическую соду, щавелевую кислоту и другие. Глобальная доставка из Китая."
    : (isFr ? "Sinopeakchem est un fournisseur leader de produits chimiques B2B proposant des produits chimiques industriels de haute qualité, notamment le thiosulfate de sodium, la soude caustique, l'acide oxalique, etc. Expédition mondiale depuis la Chine." : (isEs ? "Sinopeakchem es un proveedor líder de productos químicos B2B que ofrece productos químicos industriales de alta calidad, incluyendo tiosulfato de sodio, sosa cáustica, ácido oxálico, etc. Envío global desde China." : (isAr ? "Sinopeakchem هي مورد رائد للمواد الكيميائية B2B تقدم مواد كيميائية صناعية عالية الجودة بما في ذلك ثيوسلفات الصوديوم والصودا الكاوية وحمض الأكساليك والمزيد. شحن عالمي من الصين." : "Sinopeakchem is a leading B2B chemical supplier offering high-quality industrial chemicals including sodium thiosulphate, caustic soda, oxalic acid, and more. Global shipping from China."))));

  const pageImage = image || "https://www.sinopeakchem.com/logo.png";

  useEffect(() => {
    const country = "86";
    const p1 = "135";
    const p2 = "8326";
    const p3 = "2050";
    setPhoneDisplay(`+${country} ${p1} ${p2} ${p3}`);
    setPhoneLink(`tel:+${country}${p1}${p2}${p3}`);

    document.title = pageTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      let element = document.querySelector(`meta[${isProperty ? 'property' : 'name'}='${name}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', pageDescription);
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', pageDescription, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', `https://www.sinopeakchem.com${location.pathname}`, true);
    setMeta('og:image', pageImage, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageDescription);
    setMeta('twitter:image', pageImage);

    const setLink = (rel: string, href: string, hreflang?: string) => {
      let element = document.querySelector(`link[rel='${rel}']${hreflang ? `[hreflang='${hreflang}']` : ''}`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (hreflang) element.setAttribute('hreflang', hreflang);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    setLink('canonical', `https://www.sinopeakchem.com${location.pathname}`);
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.replace(/^\/(ru|fr|es|ar)/, '/en')}`, 'en');
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.startsWith('/en') ? location.pathname.replace(/^\/en/, '/ru') : (location.pathname.startsWith('/fr') ? location.pathname.replace(/^\/fr/, '/ru') : (location.pathname.startsWith('/es') ? location.pathname.replace(/^\/es/, '/ru') : (location.pathname.startsWith('/ar') ? location.pathname.replace(/^\/ar/, '/ru') : '/ru' + location.pathname)))}`, 'ru');
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.startsWith('/en') ? location.pathname.replace(/^\/en/, '/fr') : (location.pathname.startsWith('/ru') ? location.pathname.replace(/^\/ru/, '/fr') : (location.pathname.startsWith('/es') ? location.pathname.replace(/^\/es/, '/fr') : (location.pathname.startsWith('/ar') ? location.pathname.replace(/^\/ar/, '/fr') : '/fr' + location.pathname)))}`, 'fr');
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.startsWith('/en') ? location.pathname.replace(/^\/en/, '/es') : (location.pathname.startsWith('/ru') ? location.pathname.replace(/^\/ru/, '/es') : (location.pathname.startsWith('/fr') ? location.pathname.replace(/^\/fr/, '/es') : (location.pathname.startsWith('/ar') ? location.pathname.replace(/^\/ar/, '/es') : '/es' + location.pathname)))}`, 'es');
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.startsWith('/en') ? location.pathname.replace(/^\/en/, '/ar') : (location.pathname.startsWith('/ru') ? location.pathname.replace(/^\/ru/, '/ar') : (location.pathname.startsWith('/fr') ? location.pathname.replace(/^\/fr/, '/ar') : (location.pathname.startsWith('/es') ? location.pathname.replace(/^\/es/, '/ar') : '/ar' + location.pathname)))}`, 'ar');
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.replace(/^\/(en|ru|fr|es|ar)\/(privacy-policy|terms-of-service)/, '/en/$2')}`, 'x-default');

  }, [pageTitle, pageDescription, pageImage, location.pathname]);

  const navLinks = isRu ? [
    { href: "/ru", label: "Главная" },
    { href: "/ru/products", label: "Продукты" },
    { href: "/ru/about", label: "О нас" },
    { href: "/ru/blog", label: "Блог" },
    { href: "/ru/contact", label: "Контакты" },
  ] : (isFr ? [
    { href: "/fr", label: "Accueil" },
    { href: "/fr/products", label: "Produits" },
    { href: "/fr/about", label: "À propos" },
    { href: "/fr/blog", label: "Blog" },
    { href: "/fr/contact", label: "Contact" },
  ] : isEs ? [
    { href: "/es", label: "Inicio" },
    { href: "/es/products", label: "Productos" },
    { href: "/es/about", label: "Sobre Nosotros" },
    { href: "/es/blog", label: "Blog" },
    { href: "/es/contact", label: "Contacto" },
  ] : isAr ? [
    { href: "/ar", label: "الرئيسية" },
    { href: "/ar/products", label: "المنتجات" },
    { href: "/ar/about", label: "من نحن" },
    { href: "/ar/blog", label: "المدونة" },
    { href: "/ar/contact", label: "اتصل بنا" },
  ] : [
    { href: "/en", label: "Home" },
    { href: "/en/products", label: "Products" },
    { href: "/en/about", label: "About Us" },
    { href: "/en/blog", label: "Blog" },
    { href: "/en/contact", label: "Contact" },
  ]);

  const isActive = (href: string) => {
    if (href === "/en" || href === "/ru" || href === "/fr" || href === "/es" || href === "/ar") return location.pathname === href || (href === "/en" && location.pathname === "/");
    return location.pathname.startsWith(href);
  };

  const handleLanguageChange = (targetLocale: 'en' | 'ru' | 'fr' | 'es' | 'ar') => {
    const targetPrefix = `/${targetLocale}`;
    const targetContent = targetLocale === 'en' ? enContent : (targetLocale === 'ru' ? ruContent : (targetLocale === 'fr' ? frContent : (targetLocale === 'es' ? esContent : arContent)));
    const currentContent = isRu ? ruContent : (isFr ? frContent : (isEs ? esContent : (isAr ? arContent : enContent)));
    
    if (location.pathname.includes('/privacy-policy') || location.pathname.includes('/terms-of-service')) {
      const policyPath = location.pathname.includes('/privacy-policy') ? '/en/privacy-policy' : '/en/terms-of-service';
      navigate(policyPath);
      return;
    }
    
    if (location.pathname.includes('/blog/')) {
      const currentSlug = location.pathname.split('/blog/')[1];
      const currentPost = currentContent.posts.find((p: any) => p.slug === currentSlug);
      if (currentPost && currentPost.id) {
        const targetPost = targetContent.posts.find((p: any) => p.id === currentPost.id);
        if (targetPost) {
          navigate(`${targetPrefix}/blog/${targetPost.slug}`);
          return;
        }
      }
    }

    if (location.pathname.includes('/products/')) {
      const currentSlug = location.pathname.split('/products/')[1];
      const currentProduct = currentContent.products.find((p: any) => p.slug === currentSlug);
      if (currentProduct && currentProduct.id) {
        const targetProduct = targetContent.products.find((p: any) => p.id === currentProduct.id);
        if (targetProduct) {
          navigate(`${targetPrefix}/products/${targetProduct.slug}`);
          return;
        }
      }
    }

    const newPath = location.pathname === "/" 
      ? targetPrefix 
      : (location.pathname.startsWith('/en') 
          ? location.pathname.replace("/en", targetPrefix) 
          : (location.pathname.startsWith('/ru') 
              ? location.pathname.replace("/ru", targetPrefix) 
              : (location.pathname.startsWith('/fr') 
                  ? location.pathname.replace("/fr", targetPrefix) 
                  : (location.pathname.startsWith('/es')
                      ? location.pathname.replace("/es", targetPrefix)
                      : location.pathname.replace("/ar", targetPrefix)))));
    navigate(newPath);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white ${isAr ? 'font-arabic' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="bg-gradient-to-r from-[#003d66] to-[#004a82] text-white text-xs py-2.5 hidden md:block border-b border-[#002d4d]">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-medium"><Mail className="w-3.5 h-3.5 opacity-80" /> info@sinopeakchem.com</span>
            <span className="flex items-center gap-2 font-medium">
              <Phone className="w-3.5 h-3.5 opacity-80" /> 
              <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{phoneDisplay || "Loading..."}</span>
            </span>
          </div>

        </div>
      </div>

      <header className="bg-white sticky top-0 z-50 border-b border-gray-100/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            <Link to={langPrefix} className="flex items-center gap-2.5 flex-shrink-0 group">
              <img src="/logo.png" alt="Sinopeakchem Logo" className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-lg group-hover:shadow-md transition-all duration-300" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-[#0066B3] leading-tight tracking-tight">Sinopeakchem</span>
                <span className="hidden sm:block text-[9px] md:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Chemical Supplier</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-[#0066B3] bg-blue-50/80"
                      : "text-gray-600 hover:text-[#0066B3] hover:bg-gray-50/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <div className="relative group/lang">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-[#0066B3] hover:bg-gray-50/60 flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 font-semibold text-xs"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{isRu ? "RU" : (isFr ? "FR" : (isEs ? "ES" : (isAr ? "AR" : "EN")))}</span>
                  <ChevronDown className="w-3 h-3 opacity-50 group-hover/lang:rotate-180 transition-transform duration-300" />
                </Button>
                <div className={`${isAr ? 'left-0' : 'right-0'} absolute top-full pt-2 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 z-[60]`}>
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[120px] overflow-hidden">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'ru', label: 'Русский' },
                      { code: 'fr', label: 'Français' },
                      { code: 'es', label: 'Español' },
                      { code: 'ar', label: 'العربية' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code as any)}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                          (lang.code === 'en' && !isRu && !isFr && !isEs && !isAr) || (lang.code === 'ru' && isRu) || (lang.code === 'fr' && isFr) || (lang.code === 'es' && isEs) || (lang.code === 'ar' && isAr)
                            ? "text-[#0066B3] bg-blue-50"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#0066B3]"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="text-gray-500 hover:text-[#0066B3] hover:bg-gray-50/60 rounded-lg transition-all duration-300"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Link to={`${langPrefix}/contact`}>
                <Button className={`hidden sm:inline-flex bg-[#0066B3] hover:bg-[#004a82] text-white font-semibold px-6 h-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 ${isAr ? 'font-arabic' : ''}`}>
                  {isRu ? "Запросить цену" : (isFr ? "Demander un devis" : (isEs ? "Obtener Cotización" : (isAr ? "طلب عرض سعر" : "Get a Quote")))}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-600 hover:text-[#0066B3] hover:bg-gray-50/60 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-[#0066B3] bg-blue-50/80"
                      : "text-gray-600 hover:text-[#0066B3] hover:bg-gray-50/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gradient-to-b from-[#0a2540] to-[#051a2f] text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <img src="/logo.png" alt="Sinopeakchem" className="w-10 h-10 rounded-lg" />
                <div className={isAr ? 'text-right' : ''}>
                  <h2 className="text-lg font-bold">Sinopeakchem</h2>
                  <p className="text-xs text-gray-400">{isFr ? "Fournisseur mondial de produits chimiques" : (isEs ? "Proveedor Global de Productos Químicos" : (isAr ? "مورد عالمي للمواد الكيميائية" : "Global Chemical Supplier"))}</p>
                </div>
              </div>
              <p className={`text-gray-400 text-sm leading-relaxed mb-6 ${isAr ? 'text-right' : ''}`}>
                {isRu 
                  ? "Ведущий мировой поставщик промышленной химии, специализирующийся на высококачественных решениях для водоподготовки, горнодобывающей и текстильной промышленности. Обладая более чем 15-летним опытом и экспортом в 50+ стран, мы обеспечиваем надежные поставки и профессиональную техническую поддержку."
                  : (isFr ? "Premier fournisseur mondial de produits chimiques industriels, spécialisé dans les solutions de haute qualité pour le traitement de l'eau, l'exploitation minière et le textile. Avec plus de 15 ans d'expertise et des exportations vers plus de 50 pays, nous garantissons une chaîne d'approvisionnement fiable et un support technique professionnel." : (isEs ? "Un proveedor líder mundial de productos químicos industriales especializado en soluciones de alto rendimiento para las industrias de tratamiento de agua, minería y textil. Con más de 15 años de experiencia y exportaciones a más de 50 países, garantizamos cadenas de suministro confiables y soporte técnico profesional." : (isAr ? "مورد عالمي رائد للمواد الكيميائية الصناعية متخصص في الحلول عالية الأداء لصناعات معالجة المياه والتعدين والمنسوجات. مع أكثر من 15 عاماً من الخبرة والتصدير إلى أكثر من 50 دولة، نضمن سلاسل توريد موثوقة ودعماً فنياً محترفاً." : "A leading global industrial chemical supplier specializing in high-performance solutions for water treatment, mining, and textile industries. With over 15 years of expertise and exports to 50+ countries, we ensure reliable supply chains and professional technical support."))) }
              </p>

            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">{isRu ? "Быстрые ссылки" : (isFr ? "Liens rapides" : (isEs ? "Enlaces Rápidos" : (isAr ? "روابط سريعة" : "Quick Links")))}</h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={`text-gray-400 hover:text-white transition-colors flex items-center gap-2 group ${isAr ? 'flex-row-reverse' : ''}`}>
                      <ChevronDown className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all ${isAr ? 'rotate-90' : '-rotate-90'}`} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">{isRu ? "Продукты" : (isFr ? "Produits" : (isEs ? "Productos" : (isAr ? "المنتجات" : "Products")))}</h3>
              <ul className="space-y-4">
                {currentContent.products.slice(0, 5).map((product: any) => (
                  <li key={product.slug}>
                    <Link to={`${langPrefix}/products/${product.slug}`} className={`text-gray-400 hover:text-white transition-colors flex items-center gap-2 group ${isAr ? 'flex-row-reverse' : ''}`}>
                      <ChevronDown className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all ${isAr ? 'rotate-90' : '-rotate-90'}`} />
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>



            <div>
              <h3 className="text-lg font-bold mb-6">{isRu ? "Контакты" : (isFr ? "Contact" : (isEs ? "Información de Contacto" : (isAr ? "اتصل بنا" : "Contact Info")))}</h3>
              <ul className="space-y-5">
                <li className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-[#0066B3]" /></div>
                  <span className={`text-gray-400 text-sm leading-relaxed ${isAr ? 'text-right' : ''}`}>
                    {isRu 
                      ? "№ 182, улица Цзиньшуй, район Лицан, Циндао, провинция Шаньдун, Китай"
                      : (isFr ? "No. 182, Jinshui Road, district de Licang, Qingdao, province du Shandong, Chine" : (isEs ? "No. 182, Jinshui Road, Distrito de Licang, Qingdao, Provincia de Shandong, China" : (isAr ? "رقم 182، طريق جينشوي، منطقة ليتسانغ، تشينغداو، مقاطعة شاندونغ، الصين" : "No. 182, Jinshui Road, Licang District, Qingdao, Shandong Province, China")))}
                  </span>
                </li>
                <li className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-[#0066B3]" /></div>
                  <a href={phoneLink} className="text-gray-400 hover:text-white transition-colors" dir="ltr" style={{ unicodeBidi: 'isolate' }}>{phoneDisplay}</a>
                </li>
                <li className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-[#0066B3]" /></div>
                  <a href="mailto:info@sinopeakchem.com" className="text-gray-400 hover:text-white transition-colors">info@sinopeakchem.com</a>
                </li>

              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {isRu 
                ? "© 2024 Sinopeakchem. Все права защищены."
                : (isFr ? "© 2024 Sinopeakchem. Tous droits réservés." : (isEs ? "© 2024 Sinopeakchem. Todos los derechos reservados." : "© 2024 Sinopeakchem. All rights reserved."))}
            </p>
            <div className="flex items-center gap-6">
              <Link to={`${langPrefix}/privacy-policy`} className="text-gray-400 hover:text-white text-sm transition-colors">{isRu ? "Политика конфиденциальности" : (isFr ? "Confidentialité" : (isEs ? "Privacidad" : (isAr ? "الخصوصية" : "Privacy")))}</Link>
              <Link to={`${langPrefix}/terms-of-service`} className="text-gray-400 hover:text-white text-sm transition-colors">{isRu ? "Условия использования" : (isFr ? "Conditions" : (isEs ? "Términos" : (isAr ? "الشروط" : "Terms")))}</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/8613583262050" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className={`absolute ${isAr ? 'left-full ml-4' : 'right-full mr-4'} bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none`}>
          {isRu ? "Свяжитесь с нами" : (isFr ? "Discutez avec nous" : (isEs ? "Chatea con nosotros" : (isAr ? "تحدث معنا" : "Chat with us")))}
        </span>
      </a>
    </div>
  );
}
