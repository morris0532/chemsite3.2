import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, MessageCircle, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { products } from "@/data/products";
import { blogPosts } from "@/data/blogs";
import { productsRu } from "@/data/products_ru";
import { blogPostsRu } from "@/data/blogs_ru";
import { Globe } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  jsonLd?: object;
}

export default function Layout({ children, title, description, jsonLd }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isRu = location.pathname.startsWith("/ru");
  const langPrefix = isRu ? "/ru" : "/en";

  const pageTitle = title 
    ? `${title} | Sinochemi` 
    : (isRu ? "Sinochemi - Глобальный поставщик химикатов" : "Sinochemi - Global Chemical Supplier");
  
  const pageDescription = description || (isRu 
    ? "Sinochemi - ведущий поставщик химикатов B2B, предлагающий высококачественные промышленные химикаты, включая тиосульфат натрия, каустическую соду, щавелевую кислоту и другие. Глобальная доставка из Китая."
    : "Sinochemi is a leading B2B chemical supplier offering high-quality industrial chemicals including sodium thiosulphate, caustic soda, oxalic acid, and more. Global shipping from China.");

  // Update document title and meta tags
  if (typeof document !== "undefined") {
    document.title = pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", pageDescription);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://sinochemi.com${location.pathname}`);

    // Update hreflang tags
    let enLink = document.querySelector('link[hreflang="en"]');
    if (!enLink) {
      enLink = document.createElement('link');
      enLink.setAttribute('rel', 'alternate');
      enLink.setAttribute('hreflang', 'en');
      document.head.appendChild(enLink);
    }
    enLink.setAttribute('href', `https://sinochemi.com${location.pathname.replace(/^\/ru/, '/en')}`);

    let ruLink = document.querySelector('link[hreflang="ru"]');
    if (!ruLink) {
      ruLink = document.createElement('link');
      ruLink.setAttribute('rel', 'alternate');
      ruLink.setAttribute('hreflang', 'ru');
      document.head.appendChild(ruLink);
    }
    ruLink.setAttribute('href', `https://sinochemi.com${location.pathname.startsWith('/en') ? location.pathname.replace(/^\/en/, '/ru') : '/ru' + location.pathname}`);
  }

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

  const currentProducts = isRu ? productsRu : products;
  const currentBlogs = isRu ? blogPostsRu : blogPosts;

  const searchResults = searchQuery.trim().length > 1
    ? [
        ...currentProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.nameCn.includes(searchQuery)
          )
          .map((p) => ({ type: "Product" as const, title: p.name, url: `${langPrefix}/products/${p.slug}`, desc: p.shortDescription })),
        ...currentBlogs
          .filter(
            (b) =>
              b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((b) => ({ type: "Blog" as const, title: b.title, url: `${langPrefix}/blog/${b.slug}`, desc: b.excerpt })),
      ]
    : [];

  const toggleLanguage = () => {
    const newPath = isRu 
      ? location.pathname.replace("/ru", "/en") 
      : (location.pathname === "/" ? "/ru" : location.pathname.replace("/en", "/ru"));
    navigate(newPath);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Top Bar */}
      <div className="bg-[#004A82] text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> info@sinochemi.com</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +86 13583262050</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/70">Follow us:</span>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-300 transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-300 transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-blue-300 transition-colors"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/en" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-[#0066B3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#0066B3]">Sinochemi</span>
                <span className="hidden sm:block text-[10px] text-gray-500 -mt-1">Global Chemical Supplier</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[#0066B3] bg-blue-50"
                      : "text-gray-700 hover:text-[#0066B3] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-gray-600 hover:text-[#0066B3] flex items-center gap-1 px-2"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium uppercase">{isRu ? "EN" : "RU"}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="text-gray-600 hover:text-[#0066B3]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Link to={`${langPrefix}/contact`}>
                <Button className="hidden sm:inline-flex bg-[#0066B3] hover:bg-[#004A82] text-white">
                  {isRu ? "Запросить цену" : "Get a Quote"}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-600"
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
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[#0066B3] bg-blue-50"
                      : "text-gray-700 hover:text-[#0066B3] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/en/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-2 bg-[#0066B3] hover:bg-[#004A82] text-white">
                  Get a Quote
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-gray-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#0066B3] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-lg font-bold text-white">Sinochemi</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Your trusted global chemical supplier. We provide high-quality industrial chemicals with competitive pricing and reliable shipping worldwide.
              </p>
              <div className="flex gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#0066B3] transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#0066B3] transition-colors"><Twitter className="w-4 h-4" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#0066B3] transition-colors"><Linkedin className="w-4 h-4" /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#0066B3] transition-colors"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/en" className="hover:text-[#0066B3] transition-colors">Home</Link></li>
                <li><Link to="/en/products" className="hover:text-[#0066B3] transition-colors">Products</Link></li>
                <li><Link to="/en/about" className="hover:text-[#0066B3] transition-colors">About Us</Link></li>
                <li><Link to="/en/blog" className="hover:text-[#0066B3] transition-colors">Blog</Link></li>
                <li><Link to="/en/contact" className="hover:text-[#0066B3] transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Featured Products */}
            <div>
              <h3 className="text-white font-semibold mb-4">Featured Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/en/products/sodium-thiosulphate" className="hover:text-[#0066B3] transition-colors">Sodium Thiosulphate</Link></li>
                <li><Link to="/en/products/oxalic-acid" className="hover:text-[#0066B3] transition-colors">Oxalic Acid</Link></li>
                <li><Link to="/en/products/caustic-soda" className="hover:text-[#0066B3] transition-colors">Caustic Soda</Link></li>
                <li><Link to="/en/products/calcium-chloride" className="hover:text-[#0066B3] transition-colors">Calcium Chloride</Link></li>
                <li><Link to="/en/products/sodium-tripolyphosphate" className="hover:text-[#0066B3] transition-colors">STPP</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0066B3]" />
                  <span>info@sinochemi.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0066B3]" />
                  <span>+86 13583262050</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0066B3]" />
                  <a
                    href="https://wa.me/8613583262050?text=Hello%2C%20I%27m%20interested%20in%20your%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0066B3] transition-colors"
                  >
                    WhatsApp: +86 13583262050
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0066B3]" />
                  <span>Shandong Province, China</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Sinochemi. All rights reserved. | Your Trusted Global Chemical Supplier</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/8613583262050?text=Hello%2C%20I%27m%20interested%20in%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#20BA5C] transition-all hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute right-full mr-3 bg-white text-gray-800 text-sm px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Search Products & Articles</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search products, articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-base"
              autoFocus
            />
            {searchQuery.trim().length > 1 && (
              <div className="max-h-80 overflow-y-auto space-y-2">
                {searchResults.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No results found for "{searchQuery}"</p>
                ) : (
                  searchResults.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        navigate(result.url);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          result.type === "Product" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                        }`}>
                          {result.type}
                        </span>
                        <span className="text-sm font-medium text-gray-900 line-clamp-1">{result.title}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">{result.desc}</p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}