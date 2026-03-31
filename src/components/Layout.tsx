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
  const langPrefix = isRu ? "/ru" : "/en";
  const { products: markdownProducts } = useMarkdownContent(isRu ? 'ru' : 'en');
  const currentProducts = markdownProducts;

  const pageTitle = title 
    ? `${title} | Sinopeakchem` 
    : (isRu ? "Sinopeakchem - Глобальный поставщик химикатов" : "Sinopeakchem - Global Chemical Supplier");
  
  const pageDescription = description || (isRu 
    ? "Sinopeakchem - ведущий поставщик химикатов B2B, предлагающий высококачественные промышленные химикаты, включая тиосульфат натрия, каустическую соду, щавелевую кислоту и другие. Глобальная доставка из Китая."
    : "Sinopeakchem is a leading B2B chemical supplier offering high-quality industrial chemicals including sodium thiosulphate, caustic soda, oxalic acid, and more. Global shipping from China.");

  const pageImage = image || "https://sinopeakchem.com/logo.png";

  useEffect(() => {
    // Anti-scraping logic for Phone
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
    
    // Open Graph
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', pageDescription, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', `https://sinopeakchem.com${location.pathname}`, true);
    setMeta('og:image', pageImage, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageDescription);
    setMeta('twitter:image', pageImage);

    // Canonical and Hreflang
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

    setLink('canonical', `https://sinopeakchem.com${location.pathname}`);
    setLink('alternate', `https://sinopeakchem.com${location.pathname.replace(/^\/ru/, '/en')}`, 'en');
    setLink('alternate', `https://sinopeakchem.com${location.pathname.startsWith('/en') ? location.pathname.replace(/^\/en/, '/ru') : '/ru' + location.pathname}`, 'ru');

  }, [pageTitle, pageDescription, pageImage, location.pathname]);

  const navLinks = isRu ? [
    { href: "/ru", label: "Главная" },
    { href: "/ru/products", label: "Продукты" },
    { href: "/ru/about", label: "О нас" },
    { href: "/ru/blog", label: "Блог" },
    { href: "/ru/contact", label: "Контакты" },
  ] : [
    { href: "/en", label: "Home" },
    { href: "/en/products", label: "Products" },
    { href: "/en/about", label: "About Us" },
    { href: "/en/blog", label: "Blog" },
    { href: "/en/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/en" || href === "/ru") return location.pathname === href || (href === "/en" && location.pathname === "/");
    return location.pathname.startsWith(href);
  };

  const toggleLanguage = () => {
    const targetLocale = isRu ? 'en' : 'ru';
    const targetPrefix = isRu ? '/en' : '/ru';
    
    // Handle Blog Detail pages
    if (location.pathname.includes('/blog/')) {
      const currentSlug = location.pathname.split('/blog/')[1];
      const { posts: currentPosts } = useMarkdownContent(isRu ? 'ru' : 'en');
      const { posts: targetPosts } = useMarkdownContent(targetLocale);
      
      const currentPost = currentPosts.find((p: any) => p.slug === currentSlug);
      if (currentPost && currentPost.id) {
        const targetPost = targetPosts.find((p: any) => p.id === currentPost.id);
        if (targetPost) {
          navigate(`${targetPrefix}/blog/${targetPost.slug}`);
          return;
        }
      }
    }

    // Handle Product Detail pages
    if (location.pathname.includes('/products/')) {
      const currentSlug = location.pathname.split('/products/')[1];
      const { products: currentProducts } = useMarkdownContent(isRu ? 'ru' : 'en');
      const { products: targetProducts } = useMarkdownContent(targetLocale);
      
      const currentProduct = currentProducts.find((p: any) => p.slug === currentSlug);
      if (currentProduct && currentProduct.id) {
        const targetProduct = targetProducts.find((p: any) => p.id === currentProduct.id);
        if (targetProduct) {
          navigate(`${targetPrefix}/products/${targetProduct.slug}`);
          return;
        }
      }
    }

    // Default fallback for other pages
    const newPath = isRu 
      ? location.pathname.replace("/ru", "/en") 
      : (location.pathname === "/" ? "/ru" : location.pathname.replace("/en", "/ru"));
    navigate(newPath);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Top Bar - Premium Styling */}
      <div className="bg-gradient-to-r from-[#003d66] to-[#004a82] text-white text-xs py-2.5 hidden md:block border-b border-[#002d4d]">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-medium"><Mail className="w-3.5 h-3.5 opacity-80" /> info@sinopeakchem.com</span>
            <span className="flex items-center gap-2 font-medium">
              <Phone className="w-3.5 h-3.5 opacity-80" /> {phoneDisplay || "Loading..."}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60 font-medium">Follow us:</span>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"><Facebook className="w-3.5 h-3.5" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"><Twitter className="w-3.5 h-3.5" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"><Linkedin className="w-3.5 h-3.5" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"><Instagram className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>

      {/* Header - Premium Navigation */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to={langPrefix} className="flex items-center gap-2.5 flex-shrink-0 group">
              <img src="/logo.png" alt="Sinopeakchem Logo" className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-lg group-hover:shadow-md transition-all duration-300" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-[#0066B3] leading-tight tracking-tight">Sinopeakchem</span>
                <span className="hidden sm:block text-[9px] md:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Chemical Supplier</span>
              </div>
            </Link>

            {/* Desktop Nav */}
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

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-gray-500 hover:text-[#0066B3] hover:bg-gray-50/60 flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 font-semibold text-xs"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{isRu ? "EN" : "RU"}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="text-gray-500 hover:text-[#0066B3] hover:bg-gray-50/60 rounded-lg transition-all duration-300"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Link to={`${langPrefix}/contact`}>
                <Button className="hidden sm:inline-flex bg-[#0066B3] hover:bg-[#004a82] text-white font-semibold px-6 h-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5">
                  {isRu ? "Запросить цену" : "Get a Quote"}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-600 hover:text-[#0066B3] hover:bg-gray-50/60 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-[#0066B3] bg-blue-50/80"
                      : "text-gray-600 hover:text-[#0066B3] hover:bg-gray-50/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to={`${langPrefix}/contact`} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-2 bg-[#0066B3] hover:bg-[#004a82] text-white font-semibold rounded-lg transition-all duration-300 shadow-md">
                  {isRu ? "Запросить цену" : "Get a Quote"}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer - Premium Styling */}
      <footer className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] text-gray-300 border-t border-gray-700/30">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <img src="/logo.png" alt="Sinopeakchem Logo" className="w-9 h-9 object-contain rounded-lg" />
                <span className="text-lg font-bold text-white">Sinopeakchem</span>
              </div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed font-medium">
                {isRu 
                  ? "Ваш надежный глобальный поставщик химикатов. Промышленные химикаты премиум-класса по конкурентоспособным ценам и с надежной доставкой." 
                  : "Your trusted global chemical supplier. Premium industrial chemicals with competitive pricing and reliable shipping."}
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-[#0066B3] flex items-center justify-center transition-all duration-300 hover:scale-110"><Facebook className="w-3.5 h-3.5 text-white" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-[#0066B3] flex items-center justify-center transition-all duration-300 hover:scale-110"><Twitter className="w-3.5 h-3.5 text-white" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-[#0066B3] flex items-center justify-center transition-all duration-300 hover:scale-110"><Linkedin className="w-3.5 h-3.5 text-white" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-[#0066B3] flex items-center justify-center transition-all duration-300 hover:scale-110"><Instagram className="w-3.5 h-3.5 text-white" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{isRu ? "Быстрые ссылки" : "Quick Links"}</h4>
              <ul className="space-y-3 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}><Link to={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">{link.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{isRu ? "Продукты" : "Products"}</h4>
              <ul className="space-y-3 text-sm">
                {currentProducts.slice(0, 4).map((p) => (
                  <li key={p.slug}>
                    <Link to={`${langPrefix}/products/${p.slug}`} className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{isRu ? "Свяжитесь с нами" : "Contact Us"}</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#0066B3] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 font-medium">info@sinopeakchem.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#0066B3] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 font-medium">
                    {phoneDisplay || "Loading..."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0066B3] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 font-medium">
                    {isRu 
                      ? "№ 182, ул. Цзиньшуй, Лицан, Циндао, Китай" 
                      : "No. 182, Jinshui Road, Licang, Qingdao, China"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700/30 text-center text-xs text-gray-500 font-medium">
            <p>© {new Date().getFullYear()} Sinopeakchem. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button - Premium Styling */}
      <a
        href="https://wa.me/8613583262050"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>

      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
