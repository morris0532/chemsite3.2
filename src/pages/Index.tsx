import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { ArrowRight, Shield, Globe, Truck, FlaskConical, Award, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";

const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/0821521e-e54b-4dff-b118-4f4b9ba70803.png";
const SHIP_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/e6ad8468-80af-478a-a520-d0ca3ba12cdb.png";

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sinopeakchem",
  url: "https://www.sinopeakchem.com",
  logo: "https://www.sinopeakchem.com/logo.png",
  description: "Sinopeakchem is a premier B2B chemical supply partner from China, providing high-purity industrial chemicals and comprehensive supply chain solutions.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+86-13583262050",
    contactType: "sales",
    availableLanguage: ["English", "Chinese"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 182, Jinshui Road, Licang District",
    addressLocality: "Qingdao",
    addressRegion: "Shandong",
    postalCode: "266000",
    addressCountry: "CN",
  },
  sameAs: [
    "https://www.facebook.com/sinopeakchem",
    "https://twitter.com/sinopeakchem",
    "https://www.linkedin.com/company/sinopeakchem",
    "https://www.instagram.com/sinopeakchem"
  ],
};

const jsonLdRu = {
  ...jsonLdEn,
  description: "Sinopeakchem — ведущий партнер по поставкам химикатов B2B из Китая, предлагающий высокочистые промышленные химикаты и комплексные решения для цепочки поставок.",
  contactPoint: {
    ...jsonLdEn.contactPoint,
    availableLanguage: ["English", "Chinese", "Russian"],
  },
};

const jsonLdFr = {
  ...jsonLdEn,
  description: "Sinopeakchem est un partenaire de premier plan pour l'approvisionnement en produits chimiques B2B en provenance de Chine, fournissant des produits chimiques industriels de haute pureté et des solutions complètes de chaîne d'approvisionnement.",
  contactPoint: {
    ...jsonLdEn.contactPoint,
    availableLanguage: ["English", "Chinese", "French"],
  },
};

const featuresEn = [
  { icon: FlaskConical, title: "Premier Portfolio", desc: "Access to 22+ high-purity industrial chemicals optimized for global industrial standards" },
  { icon: Shield, title: "Quality Leadership", desc: "Rigorous multi-stage quality control with full batch traceability and COA/MSDS documentation" },
  { icon: Globe, title: "Strategic Export", desc: "Seamless global distribution from China's primary maritime hubs to over 50 countries" },
  { icon: Truck, title: "Supply Chain Excellence", desc: "Optimized logistics solutions with efficient container management and priority freight" },
  { icon: Award, title: "Global Compliance", desc: "Products meeting international regulatory requirements with rigorous internal testing" },
  { icon: Users, title: "Strategic Support", desc: "Dedicated industry experts providing technical guidance and responsive global service" },
];

const featuresRu = [
  { icon: FlaskConical, title: "Премиальный портфель", desc: "Доступ к 22+ высокочистым промышленным химикатам, оптимизированным под мировые стандарты" },
  { icon: Shield, title: "Лидерство в качестве", desc: "Строгий многоступенчатый контроль качества с полной прослеживаемостью партий и документацией" },
  { icon: Globe, title: "Стратегический экспорт", desc: "Бесперебойная глобальная дистрибуция из основных морских узлов Китая в более чем 50 стран" },
  { icon: Truck, title: "Совершенство цепочки поставок", desc: "Оптимизированные логистические решения с эффективным управлением контейнерами" },
  { icon: Award, title: "Глобальное соответствие", desc: "Продукция, отвечающая международным нормативным требованиям, с строгим внутренним тестированием" },
  { icon: Users, title: "Стратегическая поддержка", desc: "Отраслевые эксперты, предоставляющие техническое руководство и оперативный сервис" },
];

const featuresFr = [
  { icon: FlaskConical, title: "Portefeuille de Premier Plan", desc: "Accès à plus de 22 produits chimiques industriels de haute pureté optimisés pour les normes industrielles mondiales" },
  { icon: Shield, title: "Leadership Qualité", desc: "Contrôle qualité rigoureux à plusieurs étapes avec traçabilité complète des lots et documentation COA/MSDS" },
  { icon: Globe, title: "Exportation Stratégique", desc: "Distribution mondiale fluide depuis les principaux hubs maritimes de Chine vers plus de 50 pays" },
  { icon: Truck, title: "Excellence de la Chaîne d'Approvisionnement", desc: "Solutions logistiques optimisées avec gestion efficace des conteneurs et fret prioritaire" },
  { icon: Award, title: "Conformité Mondiale", desc: "Produits répondant aux exigences réglementaires internationales avec des tests internes rigoureux" },
  { icon: Users, title: "Support Stratégique", desc: "Experts de l'industrie dédiés fournissant des conseils techniques et un service mondial réactif" },
];

export default function HomePage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : "/en");
  
  const { products: markdownProducts, posts: markdownPosts } = useMarkdownContent(isRu ? 'ru' : (isFr ? 'fr' : 'en'));
  const featuredProducts = useMemo(() => {
    const order = ['oxalic-acid', 'caustic-soda', 'sodium-sulfate-anhydrous'];
    return markdownProducts
      .filter((p: any) => p.featured === true)
      .sort((a: any, b: any) => order.indexOf(a.slug) - order.indexOf(b.slug))
      .slice(0, 3);
  }, [markdownProducts]);
  const recentBlogs = [...markdownPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const features = isRu ? featuresRu : (isFr ? featuresFr : featuresEn);
  const jsonLd = isRu ? jsonLdRu : (isFr ? jsonLdFr : jsonLdEn);

  const content = isRu ? {
    title: "Ведущий поставщик химикатов | Промышленные решения из Китая | Sinopeakchem",
    description: "Sinopeakchem — ведущий поставщик химикатов B2B, предлагающий 22+ высококачественных промышленных химиката. Глобальная дистрибуция из Китая с гарантией качества.",
    heroBadge: "Выбор ведущих предприятий в 50+ странах",
    heroTitle: "Ваш стратегический партнер по <span class=\"text-blue-100\">химическим</span> решениям",
    heroDesc: "Sinopeakchem поставляет высокочистые промышленные химикаты по всему миру. Мы обеспечиваем превосходное качество продукции и надежную глобальную логистику.",
    viewProducts: "Продуктовый портфель",
    getQuote: "Запросить предложение",
    whyChoose: "Почему выбирают Sinopeakchem?",
    whyChooseDesc: "Мы объединяем передовое производство, стратегическую логистику и глубокую экспертизу для обеспечения бесперебойных поставок по всему миру.",
    featuredTitle: "Ключевые продукты",
    featuredDesc: "Наши наиболее востребованные химические решения, которым доверяют лидеры отрасли",
    viewAll: "Все продукты",
    ctaTitle: "Необходимы надежные поставки химикатов?",
    ctaDesc: "Получите доступ к 22+ высококачественным промышленным химикатам с гарантированной глобальной доставкой. Наша команда экспертов готова помочь.",
    chatWhatsApp: "Связаться в WhatsApp",
    latestInsights: "Отраслевая экспертиза",
    latestInsightsDesc: "Новости рынка, технические руководства и аналитические статьи",
    viewAllArticles: "Все статьи",
  } : (isFr ? {
    title: "Premier Fournisseur de Produits Chimiques | Solutions Industrielles de Chine | Sinopeakchem",
    description: "Sinopeakchem est un fournisseur de produits chimiques B2B de premier plan proposant plus de 22 produits chimiques industriels de haute pureté. Distribution mondiale depuis la Chine.",
    heroBadge: "Partenaire privilégié des entreprises dans plus de 50 pays",
    heroTitle: "Votre Partenaire Stratégique en Solutions <span class=\"text-blue-100\">Chimiques</span>",
    heroDesc: "Sinopeakchem livre des produits chimiques industriels de haute pureté dans le monde entier. Nous garantissons une qualité de produit supérieure et une logistique mondiale fiable.",
    viewProducts: "Explorer le Portefeuille",
    getQuote: "Demander un Devis",
    whyChoose: "Pourquoi Choisir Sinopeakchem ?",
    whyChooseDesc: "Nous intégrons une fabrication de premier plan, une logistique stratégique et une expertise approfondie de l'industrie pour servir les marchés mondiaux.",
    featuredTitle: "Produits Phares",
    featuredDesc: "Nos solutions chimiques les plus recherchées, approuvées par les leaders de l'industrie dans le monde entier",
    viewAll: "Voir Tous les Produits",
    ctaTitle: "Vous Recherchez un Partenaire Chimique de Premier Plan ?",
    ctaDesc: "Accédez à plus de 22 produits chimiques industriels de haute pureté avec expédition mondiale garantie. Notre équipe d'experts est prête à vous aider.",
    chatWhatsApp: "Contactez-nous sur WhatsApp",
    latestInsights: "Expertise de l'Industrie",
    latestInsightsDesc: "Actualités du marché, guides techniques des produits et analyses de l'industrie",
    viewAllArticles: "Voir Tous les Articles",
  } : {
    title: "Premier Chemical Supplier | Industrial Solutions from China | Sinopeakchem",
    description: "Sinopeakchem is a premier B2B chemical supplier offering 22+ high-purity industrial chemicals. Global distribution from China with guaranteed quality leadership.",
    heroBadge: "Preferred partner for enterprises in 50+ countries",
    heroTitle: "Your Strategic <span class=\"text-blue-100\">Chemical</span> Solution Partner",
    heroDesc: "Sinopeakchem delivers high-purity industrial chemicals worldwide. We ensure superior product quality, competitive supply chain value, and dependable global logistics.",
    viewProducts: "Explore Portfolio",
    getQuote: "Request a Quote",
    whyChoose: "Why Choose Sinopeakchem?",
    whyChooseDesc: "We integrate premier manufacturing, strategic logistics, and deep industry expertise to serve global chemical markets with excellence.",
    featuredTitle: "Core Products",
    featuredDesc: "Our most sought-after chemical solutions trusted by industry leaders worldwide",
    viewAll: "View All Products",
    ctaTitle: "Looking for a Premier Chemical Partner?",
    ctaDesc: "Access 22+ high-purity industrial chemicals with guaranteed global shipping. Our expert team is ready to support your procurement needs.",
    chatWhatsApp: "Contact on WhatsApp",
    latestInsights: "Industry Expertise",
    latestInsightsDesc: "Market news, technical product guides, and industry analysis",
    viewAllArticles: "View All Articles",
  });

  return (
    <Layout
      title={content.title}
      description={content.description}
      jsonLd={jsonLd}
    >
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Sinopeakchem Strategic Chemical Supply" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003d66]/95 via-[#004a82]/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-xl border border-white/15 rounded-full px-5 py-2.5 text-xs font-semibold mb-8 shadow-lg">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {content.heroBadge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: content.heroTitle }} />
            <p className="text-lg md:text-xl text-blue-50/85 mb-8 leading-relaxed max-w-2xl font-medium">
              {content.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={`${langPrefix}/products`}>
                <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50 h-14 px-8 text-base font-bold rounded-xl shadow-xl shadow-black/10 transition-all hover:-translate-y-1">
                  {content.viewProducts}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={`${langPrefix}/contact`}>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 h-14 px-8 text-base font-bold rounded-xl transition-all hover:-translate-y-1">
                  {content.getQuote}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{content.whyChoose}</h2>
            <p className="text-gray-600 text-lg">{content.whyChooseDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#0066B3] transition-colors">
                  <feature.icon className="w-7 h-7 text-[#0066B3] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{content.featuredTitle}</h2>
              <p className="text-gray-600 text-lg">{content.featuredDesc}</p>
            </div>
            <Link to={`${langPrefix}/products`}>
              <Button variant="outline" className="border-[#0066B3] text-[#0066B3] hover:bg-[#0066B3] hover:text-white font-bold px-6">
                {content.viewAll}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product: any) => (
              <Link key={product.slug} to={`${langPrefix}/products/${product.slug}`} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square bg-slate-50 p-12 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold text-[#0066B3] uppercase tracking-widest mb-2 block">{product.category}</span>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#0066B3] transition-colors">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-6 leading-relaxed">{product.shortDescription}</p>
                  <div className="flex items-center text-sm font-bold text-[#1A1A2E] group-hover:gap-2 transition-all">
                    {isRu ? "Подробнее" : (isFr ? "Détails" : "View Details")}
                    <ArrowRight className="w-4 h-4 ml-2 text-[#0066B3]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-[#003d66] p-8 md:p-16">
            <img src={SHIP_IMG} alt="Global Chemical Logistics" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#003d66] via-[#003d66]/80 to-transparent" />
            <div className="relative z-10 max-w-2xl text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.ctaTitle}</h2>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                {content.ctaDesc}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={`${langPrefix}/contact`}>
                  <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50 h-14 px-8 font-bold rounded-xl">
                    {content.getQuote}
                  </Button>
                </Link>
                <a href="https://wa.me/8613583262050" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 font-bold rounded-xl">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {content.chatWhatsApp}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{content.latestInsights}</h2>
              <p className="text-gray-600 text-lg">{content.latestInsightsDesc}</p>
            </div>
            <Link to={`${langPrefix}/blog`}>
              <Button variant="outline" className="border-[#0066B3] text-[#0066B3] hover:bg-[#0066B3] hover:text-white font-bold px-6">
                {content.viewAllArticles}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogs.map((post: any) => (
              <Link key={post.slug} to={`${langPrefix}/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-[#0066B3] bg-blue-50 px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString(isRu ? 'ru-RU' : (isFr ? 'fr-FR' : 'en-US'), { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#0066B3] transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
