import { Award, Globe, Users, TrendingUp, CheckCircle, ShieldCheck, Microscope, Zap } from "lucide-react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";

const LAB_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/08108beb-b4ff-4efc-b6fa-1c545073bedd.png";
const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/0821521e-e54b-4dff-b118-4f4b9ba70803.png";

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sinopeakchem",
  url: "https://sinopeakchem.com",
  description: "Sinopeakchem is a premier B2B chemical supply partner from China with over 15 years of excellence in international chemical distribution and quality management.",
  foundingDate: "2010",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "50+" },
  address: { 
    "@type": "PostalAddress", 
    streetAddress: "No. 182, Jinshui Road, Licang District",
    addressLocality: "Qingdao",
    addressRegion: "Shandong",
    postalCode: "266000",
    addressCountry: "CN" 
  },
};

const jsonLdRu = {
  ...jsonLdEn,
  description: "Sinopeakchem — ведущий партнер по поставкам химикатов B2B из Китая с более чем 15-летним опытом в международной дистрибуции химикатов и управлении качеством.",
};

const milestonesEn = [
  { year: "2010", title: "Strategic Foundation", desc: "Sinopeakchem established in Shandong, China, with a vision to redefine chemical export standards." },
  { year: "2013", title: "Global Footprint", desc: "Accelerated expansion across Southeast Asia, the Middle East, and Africa, building a robust global network." },
  { year: "2016", title: "Portfolio Optimization", desc: "Strategic diversification of product range to 15+ high-purity chemicals for specialized industries." },
  { year: "2019", title: "Quality Excellence", desc: "Implementation of a comprehensive internal quality management system with advanced batch traceability." },
  { year: "2022", title: "Industry Leadership", desc: "Recognized as a premier global supplier of sodium thiosulphate and oxalic acid." },
  { year: "2025", title: "Supply Chain Innovation", desc: "Advanced digital procurement platform launched to optimize the global chemical supply chain." },
];

const milestonesRu = [
  { year: "2010", title: "Стратегическое основание", desc: "Основание Sinopeakchem в Шаньдуне, Китай, с видением пересмотра стандартов экспорта химикатов." },
  { year: "2013", title: "Глобальное присутствие", desc: "Ускоренное расширение в Юго-Восточной Азии, на Ближнем Востоке и в Африке." },
  { year: "2016", title: "Оптимизация портфеля", desc: "Стратегическая диверсификация ассортимента до 15+ высокочистых химикатов." },
  { year: "2019", title: "Превосходство качества", desc: "Внедрение комплексной внутренней системы управления качеством с прослеживаемостью партий." },
  { year: "2022", title: "Лидерство в отрасли", desc: "Признание в качестве ведущего мирового поставщика тиосульфата натрия и щавелевой кислоты." },
  { year: "2025", title: "Инновации в цепочке поставок", desc: "Запуск цифровой платформы для оптимизации глобальных поставок химикатов." },
];

const statsEn = [
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Award, value: "22+", label: "Premier Products" },
  { icon: Users, value: "500+", label: "Global Partners" },
  { icon: TrendingUp, value: "15+", label: "Years Excellence" },
];

const statsRu = [
  { icon: Globe, value: "50+", label: "Обслуживаемых стран" },
  { icon: Award, value: "22+", label: "Премиум-продуктов" },
  { icon: Users, value: "500+", label: "Глобальных партнеров" },
  { icon: TrendingUp, value: "15+", label: "Лет опыта" },
];

const valuesEn = [
  { icon: ShieldCheck, title: "Quality Leadership", desc: "Uncompromising internal quality control protocols with full COA/MSDS batch verification." },
  { icon: Microscope, title: "Technical Expertise", desc: "Deep industry knowledge providing specialized technical support for complex applications." },
  { icon: Zap, title: "Logistics Agility", desc: "Strategic supply chain management ensuring rapid response and priority global shipping." },
  { icon: Users, title: "Strategic Partnership", desc: "Committed to long-term value creation through transparent and reliable supply solutions." },
];

const valuesRu = [
  { icon: ShieldCheck, title: "Лидерство в качестве", desc: "Бескомпромиссные внутренние протоколы контроля качества с полной проверкой партий COA/MSDS." },
  { icon: Microscope, title: "Техническая экспертиза", desc: "Глубокие отраслевые знания, обеспечивающие специализированную поддержку сложных областей применения." },
  { icon: Zap, title: "Логистическая гибкость", desc: "Стратегическое управление цепочками поставок, обеспечивающее быстрый отклик и приоритетную доставку." },
  { icon: Users, title: "Стратегическое партнерство", desc: "Стремление к долгосрочному созданию ценности через прозрачные и надежные решения." },
];

export default function AboutPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  
  const milestones = isRu ? milestonesRu : milestonesEn;
  const stats = isRu ? statsRu : statsEn;
  const values = isRu ? valuesRu : valuesEn;
  const jsonLd = isRu ? jsonLdRu : jsonLdEn;

  const content = isRu ? {
    title: "О Sinopeakchem — Ведущий партнер по поставкам химикатов",
    description: "Узнайте о Sinopeakchem, ведущем поставщике химикатов B2B с 15-летним опытом обслуживания 500+ клиентов в 50+ странах. Лидерство в качестве и логистике.",
    heroTitle: "О Sinopeakchem",
    heroDesc: "Ваш стратегический партнер в глобальной торговле химикатами. Мы обеспечиваем связь между высокотехнологичным производством Китая и мировым рынком.",
    ourStory: "Наша история",
    storyP1: "Основанная в 2010 году в провинции Шаньдун, Китай, компания Sinopeakchem превратилась из специализированного торгового предприятия в ведущего мирового партнера по поставкам химикатов B2B. Наш путь был продиктован стремлением к безупречному качеству, операционной эффективности и стратегическому партнерству.",
    storyP2: "Мы специализируемся на поставках широкого спектра высокочистых промышленных химикатов, включая тиосульфат натрия, каустическую соду, щавелевую кислоту и хлорид кальция. Наши глубокие связи с ведущими производственными базами Китая гарантируют стабильное качество и исключительную ценность цепочки поставок.",
    storyP3: "Благодаря команде экспертов с глубоким пониманием химической отрасли, мы предоставляем комплексные решения: от строгого контроля качества на этапе производства до сложной международной логистики и технической поддержки.",
    coreValues: "Наши стратегические ценности",
    ourJourney: "Этапы развития",
    certTitle: "Гарантия качества и соответствие стандартам",
    certDesc: "Мы обеспечиваем превосходство продукции через строгие внутренние протоколы тестирования и сотрудничество с ведущими мировыми инспекционными агентствами.",
  } : {
    title: "About Sinopeakchem - Premier Chemical Supply Partner",
    description: "Learn about Sinopeakchem, a premier B2B chemical supplier with 15+ years of excellence serving 500+ clients in 50+ countries. Quality leadership and logistics expertise.",
    heroTitle: "About Sinopeakchem",
    heroDesc: "Your strategic partner in the global chemical trade. We bridge the gap between advanced Chinese manufacturing and the global industrial market.",
    ourStory: "Our Story",
    storyP1: "Founded in 2010 in Shandong Province, China, Sinopeakchem has evolved from a specialized trading entity into a premier global B2B chemical supply partner. Our trajectory has been defined by a commitment to uncompromising quality, operational excellence, and strategic partnership.",
    storyP2: "We specialize in the strategic sourcing and distribution of a comprehensive range of high-purity industrial chemicals, including sodium thiosulphate, caustic soda, oxalic acid, and calcium chloride. Our deep-rooted relationships with China's leading manufacturing bases ensure consistent quality and superior supply chain value.",
    storyP3: "With a team of industry veterans possessing deep technical insight, we provide end-to-end supply chain solutions—from rigorous production-stage quality audits to complex international logistics and dedicated technical support.",
    coreValues: "Our Strategic Values",
    ourJourney: "Our Strategic Journey",
    certTitle: "Quality Assurance & Compliance",
    certDesc: "We ensure product excellence through rigorous internal testing protocols and collaboration with world-leading third-party inspection agencies.",
  };

  return (
    <Layout
      title={content.title}
      description={content.description}
      jsonLd={jsonLd}
    >
      {/* Hero */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Sinopeakchem Strategic Chemical Operations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003d66]/95 via-[#004a82]/85 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl">{content.heroTitle}</h1>
          <p className="text-lg md:text-xl text-blue-50/90 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
            {content.heroDesc}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#0066B3] transition-all duration-300 shadow-sm">
                  <stat.icon className="w-8 h-8 text-[#0066B3] group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-4xl font-extrabold text-[#0066B3] tracking-tight">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-2 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-[#0066B3] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
                Established 2010
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-8 tracking-tight">{content.ourStory}</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-base md:text-lg">
                <p>{content.storyP1}</p>
                <p>{content.storyP2}</p>
                <p>{content.storyP3}</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-[3rem] blur-2xl -z-10" />
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20 border-8 border-white">
                <img src={LAB_IMG} alt="Sinopeakchem Quality Excellence Center" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4 tracking-tight">{content.coreValues}</h2>
          <div className="w-20 h-1.5 bg-[#0066B3] mx-auto rounded-full" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group hover:-translate-y-2">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0066B3] transition-all duration-300">
                  <v.icon className="w-7 h-7 text-[#0066B3] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 tracking-tight group-hover:text-[#0066B3] transition-colors">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-16 text-center tracking-tight">{content.ourJourney}</h2>
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2 hidden md:block" />
            <div className="space-y-12 md:space-y-20">
              {milestones.map((m, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 flex justify-start md:justify-end px-0 md:px-12">
                    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="inline-block px-3 py-1 bg-blue-50 text-[#0066B3] text-xs font-bold rounded-full mb-3">{m.year}</span>
                      <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{m.title}</h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-[23px] md:left-1/2 w-12 h-12 bg-white border-4 border-[#0066B3] rounded-full -translate-x-1/2 z-10 flex items-center justify-center shadow-lg hidden md:flex">
                    <div className="w-3 h-3 bg-[#0066B3] rounded-full animate-pulse" />
                  </div>
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Quality Assurance
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6 tracking-tight">{content.certTitle}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-12 font-medium text-lg">
            {content.certDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Strict Internal QC", "Batch Traceability", "SGS Inspection Support", "BV Verified", "REACH Compliant"].map((cert) => (
              <div key={cert} className="bg-white rounded-2xl px-8 py-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                <Microscope className="w-8 h-8 text-[#0066B3] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-bold text-[#1A1A2E] uppercase tracking-wider">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
