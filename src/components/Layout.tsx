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
  keywords?: string;
  image?: string;
  jsonLd?: object;
}

export default function Layout({ children, title, description, keywords, image, jsonLd }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [phoneLink, setPhoneLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : "/en");
  
  const enContent = useMarkdownContent('en');
  const ruContent = useMarkdownContent('ru');
  const frContent = useMarkdownContent('fr');
  const currentContent = isRu ? ruContent : (isFr ? frContent : enContent);

  const pageTitle = title 
    ? `${title} | Sinopeakchem` 
    : (isRu ? "Sinopeakchem - Глобальный поставщик химикатов" : (isFr ? "Sinopeakchem - Fournisseur mondial de produits chimiques" : "Sinopeakchem - Global Chemical Supplier"));
  
  const defaultDesc = isRu 
    ? "Sinopeakchem - ведущий поставщик химикатов B2B, предлагающий высококачественные промышленные химикаты, включая тиосульфат натрия, каустическую соду, щавелевую кислоту и другие. Глобальная доставка из Китая."
    : (isFr ? "Sinopeakchem est un fournisseur leader de produits chimiques B2B proposant des produits chimiques industriels de haute qualité, notamment le thiosulfate de sodium, la soude caustique, l'acide oxalique, etc. Expédition mondiale depuis la Chine." : "Sinopeakchem is a leading B2B chemical supplier offering high-quality industrial chemicals including sodium thiosulphate, caustic soda, oxalic acid, and more. Global shipping from China.");
  
  const pageDescription = description || defaultDesc;
  
  const defaultKeywords = isRu
    ? "химикаты, промышленная химия, поставщик из Китая, тиосульфат натрия, каустическая сода, щавелевая кислота, B2B химия"
    : (isFr ? "produits chimiques, chimie industrielle, fournisseur de Chine, thiosulfate de sodium, soude caustique, acide oxalique, chimie B2B" : "chemicals, industrial chemicals, China supplier, sodium thiosulphate, caustic soda, oxalic acid, B2B chemicals");
  
  const pageKeywords = keywords || defaultKeywords;

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
    setMeta('keywords', pageKeywords);
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
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.replace(/^\/(ru|fr)/, '/en')}`, 'en');
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.startsWith('/en') ? location.pathname.replace(/^\/en/, '/ru') : (location.pathname.startsWith('/fr') ? location.pathname.replace(/^\/fr/, '/ru') : '/ru' + location.pathname)}`, 'ru');
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.startsWith('/en') ? location.pathname.replace(/^\/en/, '/fr') : (location.pathname.startsWith('/ru') ? location.pathname.replace(/^\/ru/, '/fr') : '/fr' + location.pathname)}`, 'fr');
    setLink('alternate', `https://www.sinopeakchem.com${location.pathname.replace(/^\/(en|ru|fr)\/(privacy-policy|terms-of-service)/, '/en/$2')}`, 'x-default');

  }, [pageTitle, pageDescription, pageKeywords, pageImage, location.pathname]);

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
  ] : [
    { href: "/en", label: "Home" },
    { href: "/en/products", label: "Products" },
    { href: "/en/about", label: "About Us" },
    { href: "/en/blog", label: "Blog" },
    { href: "/en/contact", label: "Contact" },
  ]);

  const isActive = (href: string) => {
    if (href === "/en" || href === "/ru" || href === "/fr") return location.pathname === href || (href === "/en" && location.pathname === "/");
    return location.pathname.startsWith(href);
  };

  const handleLanguageChange = (targetLocale: 'en' | 'ru' | 'fr') => {
    const targetPrefix = `/${targetLocale}`;
    const targetContent = targetLocale === 'en' ? enContent : (targetLocale === 'ru' ? ruContent : frContent);
    const currentContent = isRu ? ruContent : (isFr ? frContent : enContent);
    
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
              : location.pathname.replace("/fr", targetPrefix)));
    navigate(newPath);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
              <Phone className="w-3.5 h-3.5 opacity-80" /> {phoneDisplay || "Loading..."}
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
                  <span className="uppercase">{isRu ? "RU" : (isFr ? "FR" : "EN")}</span>
                  <ChevronDown className="w-3 h-3 opacity-50 group-hover/lang:rotate-180 transition-transform duration-300" />
                </Button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 z-[60]">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[120px] overflow-hidden">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'ru', label: 'Русский' },
                      { code: 'fr', label: 'Français' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code as 'en' | 'ru' | 'fr')}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                          (lang.code === 'ru' && isRu) || (lang.code === 'fr' && isFr) || (lang.code === 'en' && !isRu && !isFr)
                            ? "text-[#0066B3] bg-blue-50"
                            : "text-gray-600 hover:bg-gray-50"
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
                className="text-gray-500 hover:text-[#0066B3] hover:bg-gray-50/60 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </Button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-inner">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive(link.href)
                      ? "text-[#0066B3] bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#1A1A2E] text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="Sinopeakchem" className="w-10 h-10 rounded-lg" />
                <div>
                  <h2 className="text-lg font-bold">Sinopeakchem</h2>
                  <p className="text-xs text-gray-400">{isFr ? "Fournisseur mondial de produits chimiques" : "Global Chemical Supplier"}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {isRu 
                  ? "Ведущий мировой поставщик промышленной химии, специализирующийся на высококачественных решениях для водоподготовки, горнодобывающей и текстильной промышленности. Обладая более чем 15-летним опытом и экспортом в 50+ стран, мы обеспечиваем надежные поставки и профессиональную техническую поддержку."
                  : (isFr ? "Premier fournisseur mondial de produits chimiques industriels, spécialisé dans les solutions de haute qualité pour le traitement de l'eau, l'exploitation minière et le textile. Avec plus de 15 ans d'expertise et des exportations vers plus de 50 pays, nous garantissons une chaîne d'approvisionnement fiable et un support technique professionnel." : "A leading global industrial chemical supplier specializing in high-performance solutions for water treatment, mining, and textile industries. With over 15 years of expertise and exports to 50+ countries, we ensure reliable supply chains and professional technical support.")}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">{isRu ? "Быстрые ссылки" : (isFr ? "Liens rapides" : "Quick Links")}</h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066B3] opacity-0 group-hover:opacity-100 transition-all"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">{isRu ? "Продукты" : (isFr ? "Produits" : "Products")}</h3>
              <ul className="space-y-4">
                {currentContent.products.slice(0, 5).map((product: any) => (
                  <li key={product.slug}>
                    <Link to={`${langPrefix}/products/${product.slug}`} className="text-gray-400 hover:text-white transition-colors">
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">{isRu ? "Контакты" : (isFr ? "Contact" : "Contact Us")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-[#0066B3] flex-shrink-0" />
                  <span className="text-sm">Qingdao, Shandong, China</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-[#0066B3] flex-shrink-0" />
                  <a href={phoneLink} className="text-sm hover:text-white transition-colors">{phoneDisplay}</a>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-[#0066B3] flex-shrink-0" />
                  <a href="mailto:info@sinopeakchem.com" className="text-sm hover:text-white transition-colors">info@sinopeakchem.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Sinopeakchem. {isRu ? "Все права защищены." : (isFr ? "Tous droits réservés." : "All rights reserved.")}
            </p>
            <div className="flex gap-6">
              <Link to="/en/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
                {isRu ? "Политика конфиденциальности" : (isFr ? "Politique de confidentialité" : "Privacy Policy")}
              </Link>
              <Link to="/en/terms-of-service" className="text-gray-500 hover:text-white text-sm transition-colors">
                {isRu ? "Условия использования" : (isFr ? "Conditions d'utilisation" : "Terms of Service")}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      <a
        href="https://wa.me/8613583262050"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
          {isRu ? "Свяжитесь с нами" : (isFr ? "Contactez-nous" : "Chat with us")}
        </span>
      </a>
    </div>
  );
}
