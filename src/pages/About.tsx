import { Award, Globe, Users, TrendingUp, CheckCircle, ShieldCheck, Microscope, Zap, Factory, Ship, Search, GraduationCap } from "lucide-react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";

const LAB_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/08108beb-b4ff-4efc-b6fa-1c545073bedd.png";
const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/0821521e-e54b-4dff-b118-4f4b9ba70803.png";

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sinopeakchem",
  url: "https://www.sinopeakchem.com",
  description: "Sinopeakchem is a multi-functional and innovative chemical company integrating production, brand operation, and global platform services since 2010.",
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
  description: "Sinopeakchem — это многофункциональная и инновационная химическая компания, объединяющая производство, управление брендами и глобальные платформенные услуги с 2010 года.",
};

const jsonLdFr = {
  ...jsonLdEn,
  description: "Sinopeakchem est une entreprise chimique multifonctionnelle et innovante intégrant la production, l'exploitation de marques et les services de plateforme mondiale depuis 2010.",
};

const statsEn = [
  { icon: Award, value: "22+", label: "Premier Products" },
  { icon: TrendingUp, value: "15+", label: "Years Experience" },
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Users, value: "500+", label: "Global Partners" },
];

const statsRu = [
  { icon: Award, value: "22+", label: "Премиум-продуктов" },
  { icon: TrendingUp, value: "15+", label: "Лет опыта" },
  { icon: Globe, value: "50+", label: "Обслуживаемых стран" },
  { icon: Users, value: "500+", label: "Глобальных партнеров" },
];

const statsFr = [
  { icon: Award, value: "22+", label: "Produits Phares" },
  { icon: TrendingUp, value: "15+", label: "Années d'Expérience" },
  { icon: Globe, value: "50+", label: "Pays Desservis" },
  { icon: Users, value: "500+", label: "Partenaires Mondiaux" },
];

const hubsEn = [
  {
    icon: Factory,
    title: "Research & Production Center",
    location: "Shandong, China",
    desc: "The main production base of our group. We invest heavily in R&D and quality experimentation annually to ensure leading quality and innovative solutions.",
  },
  {
    icon: Ship,
    title: "International Trade & Logistics",
    location: "Qingdao Port, China",
    desc: "Located at one of the world's major container ports, our Qingdao branch provides the fastest delivery speed and flexible warehousing solutions for global export.",
  },
  {
    icon: Search,
    title: "Strategic Data Center",
    location: "Jinan, China",
    desc: "Our operation center in the chemical raw material distribution hub of East China, closely following market trends and ensuring rapid response.",
  },
  {
    icon: GraduationCap,
    title: "Personnel Training Center",
    location: "Internal Academy",
    desc: "Regular professional training to facilitate the supply of talents and ensure our team understands the evolving needs of the global industry.",
  },
];

const hubsRu = [
  {
    icon: Factory,
    title: "Центр исследований и производства",
    location: "Шаньдун, Китай",
    desc: "Основная производственная база нашей группы. Мы ежегодно инвестируем значительные средства в НИОКР для обеспечения ведущего качества и инноваций.",
  },
  {
    icon: Ship,
    title: "Международная торговля и логистика",
    location: "Порт Циндао, Китай",
    desc: "Расположенный в одном из крупнейших контейнерных портов мира, наш филиал в Циндао обеспечивает максимальную скорость доставки и гибкие складские решения.",
  },
  {
    icon: Search,
    title: "Центр стратегических данных",
    location: "Цзинань, Китай",
    desc: "Наш операционный центр в хабе распределения химического сырья Восточного Китая, внимательно следящий за рыночными тенденциями.",
  },
  {
    icon: GraduationCap,
    title: "Центр подготовки персонала",
    location: "Внутренняя академия",
    desc: "Регулярное профессиональное обучение для обеспечения притока талантов и понимания меняющихся потребностей мировой промышленности.",
  },
];

const hubsFr = [
  {
    icon: Factory,
    title: "Centre de Recherche et Production",
    location: "Shandong, Chine",
    desc: "La principale base de production de notre groupe. Nous investissons massivement dans la R&D et l'expérimentation qualité chaque année pour garantir une qualité de pointe.",
  },
  {
    icon: Ship,
    title: "Commerce International et Logistique",
    location: "Port de Qingdao, Chine",
    desc: "Située dans l'un des principaux ports à conteneurs du monde, notre succursale de Qingdao offre la rapidité de livraison la plus élevée et des solutions d'entreposage flexibles.",
  },
  {
    icon: Search,
    title: "Centre de Données Stratégiques",
    location: "Jinan, Chine",
    desc: "Notre centre d'opérations dans le hub de distribution de matières premières chimiques de l'Est de la Chine, suivant de près les tendances du marché.",
  },
  {
    icon: GraduationCap,
    title: "Centre de Formation du Personnel",
    location: "Académie Interne",
    desc: "Formation professionnelle régulière pour faciliter l'apport de talents et s'assurer que notre équipe comprend les besoins évolutifs de l'industrie mondiale.",
  },
];

const valuesEn = [
  { icon: ShieldCheck, title: "Quality First", desc: "Full-process ISO 9001 quality management system from raw material procurement to product delivery." },
  { icon: Microscope, title: "Advanced Detection", desc: "Equipped with HPLC and GC-MS, providing third-party testing reports for each batch of products." },
  { icon: Zap, title: "Efficiency & Stability", desc: "Warehouses at major Chinese ports ensure immediate delivery and supply chain stability." },
  { icon: Users, title: "Bilingual Support", desc: "24-hour bilingual technical support to address communication and application issues for global customers." },
];

const valuesRu = [
  { icon: ShieldCheck, title: "Качество прежде всего", desc: "Система управления качеством ISO 9001 на всех этапах — от закупки сырья до поставки продукции." },
  { icon: Microscope, title: "Современный контроль", desc: "Оснащение ВЭЖХ и ГХ-МС, предоставление отчетов о сторонних испытаниях для каждой партии." },
  { icon: Zap, title: "Эффективность и стабильность", desc: "Склады в крупнейших портах Китая обеспечивают немедленную доставку и стабильность поставок." },
  { icon: Users, title: "Двуязычная поддержка", desc: "Круглосуточная техническая поддержка на двух языках для решения вопросов коммуникации и применения." },
];

const valuesFr = [
  { icon: ShieldCheck, title: "La Qualité d'Abord", desc: "Système de gestion de la qualité ISO 9001 sur l'ensemble du processus, de l'approvisionnement en matières premières à la livraison." },
  { icon: Microscope, title: "Détection Avancée", desc: "Équipé de HPLC et GC-MS, fournissant des rapports de tests tiers pour chaque lot de produits." },
  { icon: Zap, title: "Efficacité et Stabilité", desc: "Des entrepôts dans les principaux ports chinois garantissent une livraison immédiate et la stabilité de la chaîne d'approvisionnement." },
  { icon: Users, title: "Support Bilingue", desc: "Support technique bilingue 24h/24 pour répondre aux problèmes de communication et d'application des clients mondiaux." },
];

export default function AboutPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  
  const stats = isRu ? statsRu : (isFr ? statsFr : statsEn);
  const hubs = isRu ? hubsRu : (isFr ? hubsFr : hubsEn);
  const values = isRu ? valuesRu : (isFr ? valuesFr : valuesEn);
  const jsonLd = isRu ? jsonLdRu : (isFr ? jsonLdFr : jsonLdEn);

  const content = isRu ? {
    title: "О Sinopeakchem | Эксперты по высокостандартному обслуживанию | Химический поставщик",
    description: "Узнайте о Sinopeakchem, многофункциональной химической компании с 15-летним опытом. Мы объединяем производство, НИОКР и глобальную логистику из Китая.",
    heroTitle: "Поиск лучших решений — наша конечная цель",
    heroDesc: "Эксперты по высокостандартному обслуживанию, соединяющие передовое китайское производство с мировыми промышленными потребностями.",
    ourStory: "Наша история",
    storySubtitle: "С 2010 года наша команда успешно понимает потребности отрасли и создает надежные продукты для всех.",
    storyP1: "Основанная в 2010 году в провинции Шаньдун, Китай, компания Sinopeakchem превратилась в многофункциональную и инновационную химическую компанию, объединяющую производство химической продукции, управление брендами и глобальные платформенные услуги.",
    storyP2: "Наш ассортимент охватывает широкий спектр продукции, включая щавелевую кислоту, тиосульфат натрия, хлорид кальция, сульфит натрия, лимонную кислоту и другие серии фосфатов и сульфатов. Мы стремимся стать яркой звездой в химической промышленности благодаря инновациям и комплексному обслуживанию.",
    strategicHubs: "Стратегические центры",
    serviceCommitment: "Наши обязательства по обслуживанию",
    visionTitle: "Видение бизнеса",
    visionDesc: "Мы стремимся создать профессиональную платформу для экологически чистых химических продуктов, способствуя «зеленому» развитию промышленных предприятий и выводя китайские технологии на мировой рынок.",
  } : (isFr ? {
    title: "À propos de Sinopeakchem | Experts en Service de Haut Niveau | Fournisseur Chimique",
    description: "Découvrez Sinopeakchem, une entreprise chimique multifonctionnelle avec plus de 15 ans d'excellence. Intégrant production, R&D et logistique mondiale depuis la Chine.",
    heroTitle: "Trouver la Meilleure Solution est Notre Objectif Ultime",
    heroDesc: "Experts en service de haut niveau faisant le pont entre la fabrication chinoise avancée et les besoins industriels mondiaux.",
    ourStory: "Notre Histoire",
    storySubtitle: "Depuis 2010, notre équipe a réussi à comprendre les besoins de l'industrie et à créer des produits fiables pour tous.",
    storyP1: "Fondée en 2010 dans la province du Shandong, en Chine, Sinopeakchem est devenue une entreprise chimique multifonctionnelle et innovante intégrant la production de produits chimiques, l'exploitation de marques et les services de plateforme.",
    storyP2: "Nos produits couvrent une large gamme comprenant l'acide oxalique, le thiosulfate de sodium, le chlorure de calcium, le sulfite de sodium, l'acide citrique et d'autres séries de phosphates et de sulfates. Nous nous efforçons de devenir une étoile brillante dans l'industrie chimique.",
    strategicHubs: "Hubs Stratégiques",
    serviceCommitment: "Notre Engagement de Service",
    visionTitle: "Positionnement Commercial",
    visionDesc: "Nous nous engageons à construire une plateforme professionnelle pour les produits chimiques de protection de l'environnement, favorisant le développement vert des entreprises industrielles.",
  } : {
    title: "About Sinopeakchem | High-standard Service Experts | Chemical Supplier",
    description: "Learn about Sinopeakchem, a multi-functional chemical company with 15+ years of excellence. Integrating production, R&D, and global logistics from China.",
    heroTitle: "Finding the Best Solution is Our Ultimate Goal",
    heroDesc: "High-standard service experts bridging the gap between advanced Chinese manufacturing and global industrial needs.",
    ourStory: "Our Story",
    storySubtitle: "Since 2010, Our Team Has Succeeded In Understanding The Needs Of The Industry And Creating Reliable Products To Serve All.",
    storyP1: "Founded in 2010 in Shandong Province, China, Sinopeakchem is a multi-functional and innovative chemical company integrating the production of chemical products, brand operation, and platform services.",
    storyP2: "Our products cover a wide range including oxalic acid, sodium thiosulphate, calcium chloride, sodium sulfite, citric acid, and other phosphate and sulfate series. We strive to become a bright star in the chemical industry through innovation and comprehensive service.",
    strategicHubs: "Strategic Hubs",
    serviceCommitment: "Our Service Commitment",
    visionTitle: "Business Vision",
    visionDesc: "We are committed to building a professional platform for environmental protection chemical products, promoting the green development of industrial enterprises, and bringing Chinese technology to the global market.",
  });

  return (
    <Layout
      title={content.title}
      description={content.description}
      jsonLd={jsonLd}
    >
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Sinopeakchem Global Operations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#003d66]/80 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            {content.heroTitle}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {content.heroDesc}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-[#0066B3]" />
                </div>
                <div className="text-3xl font-bold text-[#1A1A2E] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-[#0066B3] text-sm font-bold rounded-full mb-6">
                {content.ourStory}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6 leading-tight">
                {content.storySubtitle}
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>{content.storyP1}</p>
                <p>{content.storyP2}</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img src={LAB_IMG} alt="Sinopeakchem Quality Control Laboratory" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#0066B3] text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold mb-1">15+</div>
                <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Hubs */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{content.strategicHubs}</h2>
            <div className="w-20 h-1.5 bg-[#0066B3] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hubs.map((hub, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0066B3] transition-colors">
                    <hub.icon className="w-7 h-7 text-[#0066B3] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0066B3] uppercase tracking-widest mb-1">{hub.location}</div>
                    <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{hub.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{hub.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{content.serviceCommitment}</h2>
            <div className="w-20 h-1.5 bg-[#0066B3] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-50 transition-colors">
                  <value.icon className="w-8 h-8 text-[#0066B3]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-[#003d66] text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{content.visionTitle}</h2>
          <p className="text-xl text-blue-100 leading-relaxed italic">
            "{content.visionDesc}"
          </p>
        </div>
      </section>
    </Layout>
  );
}
