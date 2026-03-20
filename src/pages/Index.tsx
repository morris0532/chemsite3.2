import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Shield, Globe, Truck, FlaskConical, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { getFeaturedProducts } from "@/data/products";
import { getRecentBlogs } from "@/data/blogs";
import { getFeaturedProductsRu } from "@/data/products_ru";
import { getRecentBlogsRu } from "@/data/blogs_ru";

const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/0821521e-e54b-4dff-b118-4f4b9ba70803.png";
const SHIP_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/e6ad8468-80af-478a-a520-d0ca3ba12cdb.png";

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sinochemi",
  url: "https://sinochemi.com",
  logo: "https://sinochemi.com/logo.png",
  description: "Sinochemi is a leading B2B chemical supplier from China, offering high-quality industrial chemicals with global shipping.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+86-13583262050",
    contactType: "sales",
    availableLanguage: ["English", "Chinese"],
  },
  sameAs: [],
};

const jsonLdRu = {
  ...jsonLdEn,
  description: "Sinochemi - ведущий поставщик химикатов B2B из Китая, предлагающий высококачественные промышленные химикаты с глобальной доставкой.",
  contactPoint: {
    ...jsonLdEn.contactPoint,
    availableLanguage: ["English", "Chinese", "Russian"],
  },
};

const featuresEn = [
  { icon: FlaskConical, title: "22+ Chemical Products", desc: "Comprehensive range of industrial chemicals for diverse applications" },
  { icon: Shield, title: "Quality Assured", desc: "Strict quality control with COA and MSDS documentation for every shipment" },
  { icon: Globe, title: "Global Shipping", desc: "Export from major Chinese ports to destinations worldwide" },
  { icon: Truck, title: "Reliable Logistics", desc: "Efficient container loading and competitive freight rates" },
  { icon: Award, title: "Industry Certified", desc: "ISO certified manufacturing with international quality standards" },
  { icon: Users, title: "Expert Support", desc: "Dedicated sales team with technical expertise and responsive service" },
];

const featuresRu = [
  { icon: FlaskConical, title: "22+ химических продукта", desc: "Широкий ассортимент промышленных химикатов для различных областей применения" },
  { icon: Shield, title: "Гарантия качества", desc: "Строгий контроль качества с документацией COA и MSDS для каждой партии" },
  { icon: Globe, title: "Глобальная доставка", desc: "Экспорт из крупнейших китайских портов в пункты назначения по всему миру" },
  { icon: Truck, title: "Надежная логистика", desc: "Эффективная загрузка контейнеров и конкурентоспособные фрахтовые ставки" },
  { icon: Award, title: "Сертифицировано", desc: "Производство, сертифицированное по ISO, с международными стандартами качества" },
  { icon: Users, title: "Экспертная поддержка", desc: "Специализированная команда продаж с техническим опытом и оперативным обслуживанием" },
];

export default function HomePage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const langPrefix = isRu ? "/ru" : "/en";
  
  const featuredProducts = isRu ? getFeaturedProductsRu() : getFeaturedProducts();
  const recentBlogs = isRu ? getRecentBlogsRu(3) : getRecentBlogs(3);
  const features = isRu ? featuresRu : featuresEn;
  const jsonLd = isRu ? jsonLdRu : jsonLdEn;

  const content = isRu ? {
    heroBadge: "Нам доверяют покупатели в 50+ странах",
    heroTitle: "Ваш надежный партнер по поставкам <span class=\"text-blue-200\">химикатов</span>",
    heroDesc: "Sinochemi поставляет промышленные химикаты премиум-класса по всему миру. От тиосульфата натрия до каустической соды — мы обеспечиваем качество и надежную логистику.",
    viewProducts: "Посмотреть продукты",
    getQuote: "Запросить цену",
    whyChoose: "Почему выбирают Sinochemi?",
    whyChooseDesc: "Мы сочетаем качественную продукцию, конкурентоспособные цены и надежную логистику для обслуживания покупателей химикатов по всему миру.",
    featuredTitle: "Популярные продукты",
    featuredDesc: "Наши самые популярные промышленные химикаты, которым доверяют покупатели во всем мире",
    viewAll: "Все продукты",
    ctaTitle: "Готовы закупать качественные химикаты?",
    ctaDesc: "Получите конкурентоспособные цены на 22+ промышленных химиката с надежной глобальной доставкой. Наша команда готова помочь вам.",
    chatWhatsApp: "Чат в WhatsApp",
    latestInsights: "Последние новости",
    latestInsightsDesc: "Новости отрасли, руководства по продуктам и технические статьи",
    viewAllArticles: "Все статьи",
  } : {
    heroBadge: "Trusted by buyers in 50+ countries",
    heroTitle: "Your Reliable <span class=\"text-blue-200\">Chemical</span> Supply Partner",
    heroDesc: "Sinochemi delivers premium industrial chemicals worldwide. From sodium thiosulphate to caustic soda, we provide quality products with competitive pricing and dependable logistics.",
    viewProducts: "View Products",
    getQuote: "Get a Quote",
    whyChoose: "Why Choose Sinochemi?",
    whyChooseDesc: "We combine quality products, competitive pricing, and reliable logistics to serve chemical buyers worldwide.",
    featuredTitle: "Featured Products",
    featuredDesc: "Our most popular industrial chemicals trusted by buyers worldwide",
    viewAll: "View All Products",
    ctaTitle: "Ready to Source Quality Chemicals?",
    ctaDesc: "Get competitive pricing on 22+ industrial chemicals with reliable global shipping. Our team is ready to assist you.",
    chatWhatsApp: "Chat on WhatsApp",
    latestInsights: "Latest Insights",
    latestInsightsDesc: "Industry news, product guides, and technical articles",
    viewAllArticles: "View All Articles",
  };

  return (
    <Layout
      title={isRu ? "Глобальный поставщик химикатов | Промышленные химикаты из Китая" : "Global Chemical Supplier | Industrial Chemicals from China"}
      description={isRu 
        ? "Sinochemi - ведущий поставщик химикатов B2B, предлагающий 22+ высококачественных промышленных химиката, включая тиосульфат натрия, каустическую соду, щавелевую кислоту. Глобальная доставка из Китая."
        : "Sinochemi is a leading B2B chemical supplier offering 22+ high-quality industrial chemicals including sodium thiosulphate, caustic soda, oxalic acid. Global shipping from China."}
      jsonLd={jsonLd}
    >
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Sinochemi Chemical Manufacturing Plant" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066B3]/90 via-[#0066B3]/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {content.heroBadge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" dangerouslySetInnerHTML={{ __html: content.heroTitle }} />
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              {content.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={`${langPrefix}/products`}>
                <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50 font-semibold text-base px-8">
                  {content.viewProducts} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={`${langPrefix}/contact`}>
                <Button size="lg" variant="outline" className="!bg-transparent border-2 border-white text-white hover:!bg-white/10 font-semibold text-base px-8">
                  {content.getQuote}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{content.whyChoose}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{content.whyChooseDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0066B3] transition-colors">
                  <f.icon className="w-6 h-6 text-[#0066B3] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{content.featuredTitle}</h2>
              <p className="text-gray-600">{content.featuredDesc}</p>
            </div>
            <Link to={`${langPrefix}/products`} className="hidden md:inline-flex items-center text-[#0066B3] font-medium hover:underline">
              {content.viewAll} <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`${langPrefix}/products/${product.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-1 rounded-full">{product.category}</span>
                  <h3 className="text-lg font-semibold text-[#1A1A2E] mt-3 mb-2 group-hover:text-[#0066B3] transition-colors">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.shortDescription}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>CAS: {product.cas}</span>
                    <span>{product.loading}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to={`${langPrefix}/products`}>
              <Button variant="outline" className="border-[#0066B3] text-[#0066B3]">
                {content.viewAll} <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={SHIP_IMG} alt="Global Chemical Shipping" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0066B3]/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.ctaTitle}</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            {content.ctaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={`${langPrefix}/contact`}>
              <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50 font-semibold px-8">
                {content.getQuote}
              </Button>
            </Link>
            <a href="https://wa.me/8613583262050?text=Hello%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="!bg-transparent border-2 border-white text-white hover:!bg-white/10 font-semibold px-8">
                {content.chatWhatsApp}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{content.latestInsights}</h2>
              <p className="text-gray-600">{content.latestInsightsDesc}</p>
            </div>
            <Link to={`${langPrefix}/blog`} className="hidden md:inline-flex items-center text-[#0066B3] font-medium hover:underline">
              {content.viewAllArticles} <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogs.map((post) => (
              <Link
                key={post.id}
                to={`${langPrefix}/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="aspect-video bg-gray-50 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString(isRu ? "ru-RU" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#1A1A2E] mb-2 group-hover:text-[#0066B3] transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
