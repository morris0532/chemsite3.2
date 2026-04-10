import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { ArrowRight, Shield, Globe, Truck, FlaskConical, Award, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";

const HERO_IMG = "/images/remote/hero.webp";
const SHIP_IMG = "/images/remote/ship.webp";

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sinopeakchem",
  url: "https://sinopeakchem.com",
  logo: "https://sinopeakchem.com/logo.png",
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

const jsonLdEs = {
  ...jsonLdEn,
  description: "Sinopeakchem es un socio líder en el suministro de productos químicos B2B de China, que proporciona productos químicos industriales de alta pureza y soluciones integrales para la cadena de suministro.",
  contactPoint: {
    ...jsonLdEn.contactPoint,
    availableLanguage: ["English", "Chinese", "Spanish"],
  },
};

const jsonLdAr = {
  ...jsonLdEn,
  description: "Sinopeakchem هو شريك توريد كيميائي رائد من الصين، يوفر مواد كيميائية صناعية عالية النقاء وحلول سلسلة توريد شاملة.",
  contactPoint: {
    ...jsonLdEn.contactPoint,
    availableLanguage: ["English", "Chinese", "Arabic"],
  },
};

const featuresAr = [
  { icon: FlaskConical, title: "محفظة منتجات متميزة", desc: "الوصول إلى أكثر من 22 مادة كيميائية صناعية عالية النقاء محسنة للمعايير الصناعية العالمية" },
  { icon: Shield, title: "الريادة في الجودة", desc: "رقابة صارمة على الجودة في مراحل متعددة مع تتبع كامل للطلبيات ووثائق COA/MSDS" },
  { icon: Globe, title: "تصدير استراتيجي", desc: "توزيع عالمي سلس من المراكز البحرية الرئيسية في الصين إلى أكثر من 50 دولة" },
  { icon: Truck, title: "التميز في سلسلة التوريد", desc: "حلول لوجستية محسنة مع إدارة فعالة للحاويات وشحن ذو أولوية" },
  { icon: Award, title: "الامتثال العالمي", desc: "منتجات تلبي المتطلبات التنظيمية الدولية مع اختبارات داخلية صارمة" },
  { icon: Users, title: "دعم استراتيجي", desc: "خبراء متخصصون في الصناعة يقدمون إرشادات فنية وخدمة عالمية سريعة الاستجابة" },
];

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

const featuresEs = [
  { icon: FlaskConical, title: "Portafolio Premier", desc: "Acceso a más de 22 productos químicos industriales de alta pureza optimizados para estándares industriales globales" },
  { icon: Shield, title: "Liderazgo en Calidad", desc: "Control de calidad riguroso en múltiples etapas con trazabilidad completa de lotes y documentación COA/MSDS" },
  { icon: Globe, title: "Exportación Estratégica", desc: "Distribución global fluida desde los principales centros marítimos de China a más de 50 países" },
  { icon: Truck, title: "Excelencia en la Cadena de Suministro", desc: "Soluciones logísticas optimizadas con gestión eficiente de contenedores y carga prioritaria" },
  { icon: Award, title: "Cumplimiento Global", desc: "Productos que cumplen con los requisitos regulatorios internacionales con rigurosas pruebas internas" },
  { icon: Users, title: "Soporte Estratégico", desc: "Expertos dedicados de la industria que brindan orientación técnica y un servicio global receptivo" },
];

export default function HomePage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  
  const { products: markdownProducts, posts: markdownPosts } = useMarkdownContent(isRu ? 'ru' : (isFr ? 'fr' : (isEs ? 'es' : (isAr ? 'ar' : 'en'))));
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
  const features = isRu ? featuresRu : (isFr ? featuresFr : (isEs ? featuresEs : (isAr ? featuresAr : featuresEn)));
  const jsonLd = isRu ? jsonLdRu : (isFr ? jsonLdFr : (isEs ? jsonLdEs : (isAr ? jsonLdAr : jsonLdEn)));

  const content = isRu ? {
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
  } : isEs ? {
    heroBadge: "Socio preferido para empresas en más de 50 países",
    heroTitle: "Su Socio Estratégico en Soluciones <span class=\"text-blue-100\">Químicas</span>",
    heroDesc: "Sinopeakchem entrega productos químicos industriales de alta pureza en todo el mundo. Garantizamos una calidad superior del producto y una logística global confiable.",
    viewProducts: "Explorar Portafolio",
    getQuote: "Solicitar Cotización",
    whyChoose: "¿Por qué elegir Sinopeakchem?",
    whyChooseDesc: "Integramos fabricación de primer nivel, logística estratégica y profunda experiencia en la industria para servir a los mercados químicos globales.",
    featuredTitle: "Productos Principales",
    featuredDesc: "Nuestras soluciones químicas más solicitadas, confiadas por líderes de la industria en todo el mundo",
    viewAll: "Ver Todos los Productos",
    ctaTitle: "¿Busca un Socio Químico de Primer Nivel?",
    ctaDesc: "Acceda a más de 22 productos químicos industriales de alta pureza con envío global garantizado. Nuestro equipo de expertos está listo para ayudarle.",
    chatWhatsApp: "Contactar por WhatsApp",
    latestInsights: "Experiencia en la Industria",
    latestInsightsDesc: "Noticias del mercado, guías técnicas de productos y análisis de la industria",
    viewAllArticles: "Ver Todos los Artículos",
  } : isAr ? {
    heroBadge: "الشريك المفضل للمؤسسات في أكثر من 50 دولة",
    heroTitle: "شريكك الاستراتيجي في <span class=\"text-blue-100\">الحلول الكيميائية</span>",
    heroDesc: "تقوم Sinopeakchem بتوريد مواد كيميائية صناعية عالية النقاء في جميع أنحاء العالم. نحن نضمن جودة منتجات فائقة ولوجستيات عالمية موثوقة.",
    viewProducts: "استعراض محفظة المنتجات",
    getQuote: "احصل على عرض سعر",
    whyChoose: "لماذا تختار Sinopeakchem؟",
    whyChooseDesc: "نحن نجمع بين التصنيع المتقدم والخدمات اللوجستية الاستراتيجية والخبرة العميقة في الصناعة لخدمة الأسواق العالمية.",
    featuredTitle: "المنتجات الرئيسية",
    featuredDesc: "حلولنا الكيميائية الأكثر طلباً، والموثوقة من قبل قادة الصناعة في جميع أنحاء العالم",
    viewAll: "عرض جميع المنتجات",
    ctaTitle: "هل تبحث عن شريك كيميائي متميز؟",
    ctaDesc: "احصل على أكثر من 22 مادة كيميائية صناعية عالية الجودة مع ضمان الشحن العالمي. فريق الخبراء لدينا جاهز للمساعدة.",
    chatWhatsApp: "تواصل معنا عبر واتساب",
    latestInsights: "خبرة الصناعة",
    latestInsightsDesc: "أخبار السوق، والأدلة الفنية للمنتجات، وتحليلات الصناعة",
    viewAllArticles: "عرض جميع المقالات",
  } : {
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
      title={isRu ? "Ведущий поставщик химикатов | Промышленные решения из Китая" : (isFr ? "Premier Fournisseur de Produits Chimiques | Solutions Industrielles de Chine" : (isEs ? "Proveedor Líder de Productos Químicos | Soluciones Industriales de China" : "Premier Chemical Supplier | Industrial Solutions from China"))}
      description={isRu 
        ? "Sinopeakchem — ведущий поставщик химикатов B2B, предлагающий 22+ высококачественных промышленных химиката. Глобальная дистрибуция из Китая с гарантией качества."
        : (isFr ? "Sinopeakchem est un fournisseur de produits chimiques B2B de premier plan proposant plus de 22 produits chimiques industriels de haute pureté. Distribution mondiale depuis la Chine." : (isEs ? "Sinopeakchem es un proveedor líder de productos químicos B2B que ofrece más de 22 productos químicos industriales de alta pureza. Distribución global desde China." : "Sinopeakchem is a premier B2B chemical supplier offering 22+ high-purity industrial chemicals. Global distribution from China with guaranteed quality leadership.")) }
      jsonLd={jsonLd}
    >
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Sinopeakchem Strategic Chemical Supply" className="w-full h-full object-cover" fetchPriority="high" />
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
                <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50 font-bold text-base px-8 h-14 rounded-lg shadow-xl shadow-blue-900/25 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/35 hover:-translate-y-1">
                  {content.viewProducts} <ArrowRight className="ml-2.5 w-5 h-5" />
                </Button>
              </Link>
              <Link to={`${langPrefix}/contact`}>
                <Button size="lg" variant="outline" className="!bg-white/8 border-2 border-white/30 text-white hover:!bg-white/15 backdrop-blur-sm font-bold text-base px-8 h-14 rounded-lg transition-all duration-300 hover:border-white/50 hover:-translate-y-1">
                  {content.getQuote}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{content.whyChoose}</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto font-medium leading-relaxed">{content.whyChooseDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/50 group hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:from-[#0066B3] group-hover:to-[#004a82] transition-all duration-300 shadow-sm">
                  <f.icon className="w-7 h-7 text-[#0066B3] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0066B3] transition-colors duration-300">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">{content.featuredTitle}</h2>
              <p className="text-gray-600 text-base font-medium">{content.featuredDesc}</p>
            </div>
            <Link to={`${langPrefix}/products`} className="hidden md:flex items-center gap-2 text-[#0066B3] font-bold text-base hover:gap-3 transition-all duration-300 hover:text-[#004a82]">
              {content.viewAll} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`${langPrefix}/products/${product.slug}`}
                className="group bg-white rounded-3xl border border-gray-100/50 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#0066B3] uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0066B3] transition-colors duration-300">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">CAS: {product.cas}</span>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0066B3] group-hover:bg-[#0066B3] group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="py-16 md:py-24 bg-[#003d66] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={SHIP_IMG} alt="Global Logistics" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{content.ctaTitle}</h2>
            <p className="text-lg md:text-xl text-blue-100/80 mb-12 font-medium leading-relaxed">
              {content.ctaDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to={`${langPrefix}/contact`}>
                <Button size="lg" className="bg-white text-[#003d66] hover:bg-blue-50 font-bold text-lg px-10 h-16 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {content.getQuote}
                </Button>
              </Link>
              <a href="https://wa.me/8613583262050" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="!bg-emerald-500/10 border-2 border-emerald-400/30 text-emerald-400 hover:!bg-emerald-500/20 font-bold text-lg px-10 h-16 rounded-xl transition-all duration-300 hover:-translate-y-1">
                  <MessageCircle className="mr-3 w-6 h-6" /> {content.chatWhatsApp}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">{content.latestInsights}</h2>
              <p className="text-gray-600 text-base font-medium">{content.latestInsightsDesc}</p>
            </div>
            <Link to={`${langPrefix}/blog`} className="hidden md:flex items-center gap-2 text-[#0066B3] font-bold text-base hover:gap-3 transition-all duration-300 hover:text-[#004a82]">
              {content.viewAllArticles} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogs.map((post) => (
              <Link
                key={post.id}
                to={`${langPrefix}/blog/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100/50"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-[#0066B3] text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString(isRu ? 'ru-RU' : (isFr ? 'fr-FR' : 'en-US'), { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#0066B3] transition-colors duration-300 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 font-medium leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
