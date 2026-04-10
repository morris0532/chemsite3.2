import { Award, Globe, Users, TrendingUp, CheckCircle, ShieldCheck, Microscope, Zap, Factory, Ship, Search, GraduationCap } from "lucide-react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";

const LAB_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/08108beb-b4ff-4efc-b6fa-1c545073bedd.png";
const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/0821521e-e54b-4dff-b118-4f4b9ba70803.png";

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sinopeakchem",
  url: "https://sinopeakchem.com",
  description: "Sinopeakchem is a multi-functional and innovative chemical company integrating brand operation and global platform services since 1998.",
  foundingDate: "1998",
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
  description: "Sinopeakchem — это многофункциональная и инновационная химическая компания, объединяющая управление брендами и глобальные платформенные услуги с 1998 года.",
};

const jsonLdFr = {
  ...jsonLdEn,
  description: "Sinopeakchem est une entreprise chimique multifonctionnelle et innovante intégrant l'exploitation de marques et les services de plateforme mondiale depuis 1998.",
};

const jsonLdEs = {
  ...jsonLdEn,
  description: "Sinopeakchem es una empresa química multifuncional e innovadora que integra la operación de marcas y servicios de plataforma global desde 1998.",
};

const statsEn = [
  { icon: Award, value: "22+", label: "Premier Products" },
  { icon: TrendingUp, value: "28+", label: "Years Experience" },
  { icon: Globe, value: "30+", label: "Countries Served" },
  { icon: Users, value: "150+", label: "Satisfied Clients" },
];

const statsRu = [
  { icon: Award, value: "22+", label: "Премиум-продуктов" },
  { icon: TrendingUp, value: "28+", label: "Лет опыта" },
  { icon: Globe, value: "30+", label: "Обслуживаемых стран" },
  { icon: Users, value: "150+", label: "Довольных клиентов" },
];

const statsFr = [
  { icon: Award, value: "22+", label: "Produits Phares" },
  { icon: TrendingUp, value: "28+", label: "Années d'Expérience" },
  { icon: Globe, value: "30+", label: "Pays Desservis" },
  { icon: Users, value: "150+", label: "Clients Satisfaits" },
];

const statsEs = [
  { icon: Award, value: "22+", label: "Productos Premier" },
  { icon: TrendingUp, value: "28+", label: "Años de Experiencia" },
  { icon: Globe, value: "30+", label: "Países Atendidos" },
  { icon: Users, value: "150+", label: "Clientes Satisfechos" },
];

const hubsEn = [
  {
    icon: Factory,
    title: "Quality Control Center",
    location: "Shandong, China",
    desc: "The main quality assurance base of our group. We invest heavily in R&D and quality experimentation annually to ensure leading quality and innovative solutions.",
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
    title: "Центр контроля качества",
    location: "Шаньдун, Китай",
    desc: "Основная база обеспечения качества нашей группы. Мы ежегодно инвестируем значительные средства в НИОКР для обеспечения ведущего качества и инноваций.",
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
    title: "Centre de Contrôle Qualité",
    location: "Shandong, Chine",
    desc: "La principale base d'assurance qualité de notre groupe. Nous investissons massivement dans la R&D et l'expérimentation qualité chaque année pour garantir une qualité de pointe.",
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

const hubsEs = [
  {
    icon: Factory,
    title: "Centro de Control de Calidad",
    location: "Shandong, China",
    desc: "La principal base de garantía de calidad de nuestro grupo. Invertimos fuertemente en I+D y experimentación de calidad anualmente para asegurar una calidad líder y soluciones innovadoras.",
  },
  {
    icon: Ship,
    title: "Comercio Internacional y Logística",
    location: "Puerto de Qingdao, China",
    desc: "Ubicada en uno de los puertos de contenedores más importantes del mundo, nuestra sucursal en Qingdao ofrece la mayor velocidad de entrega y soluciones de almacenamiento flexibles.",
  },
  {
    icon: Search,
    title: "Centro de Datos Estratégicos",
    location: "Jinan, China",
    desc: "Nuestro centro de operaciones en el centro de distribución de materias primas químicas del este de China, siguiendo de cerca las tendencias del mercado.",
  },
  {
    icon: GraduationCap,
    title: "Centro de Formación de Personal",
    location: "Academia Interna",
    desc: "Capacitación profesional regular para facilitar el suministro de talento y asegurar que nuestro equipo comprenda las necesidades cambiantes de la industria global.",
  },
];

const valuesEn = [
  { icon: ShieldCheck, title: "Quality First", desc: "Full-process quality management system from raw material procurement to product delivery." },
  { icon: Microscope, title: "Advanced Detection", desc: "Equipped with HPLC and GC-MS, providing third-party testing reports for each batch of products." },
  { icon: Zap, title: "Efficiency & Stability", desc: "Warehouses at major Chinese ports ensure immediate delivery and supply chain stability." },
  { icon: Users, title: "Bilingual Support", desc: "24-hour bilingual technical support to address communication and application issues for global customers." },
];

const valuesRu = [
  { icon: ShieldCheck, title: "Качество прежде всего", desc: "Система управления качеством на всех этапах — от закупки сырья до поставки продукции." },
  { icon: Microscope, title: "Современный контроль", desc: "Оснащение ВЭЖХ и ГХ-МС, предоставление отчетов о сторонних испытаниях для каждой партии." },
  { icon: Zap, title: "Эффективность и стабильность", desc: "Склады в крупнейших портах Китая обеспечивают немедленную доставку и стабильность поставок." },
  { icon: Users, title: "Двуязычная поддержка", desc: "Круглосуточная техническая поддержка на двух языках для решения вопросов коммуникации и применения." },
];

const valuesFr = [
  { icon: ShieldCheck, title: "La Qualité d'Abord", desc: "Système de gestion de la qualité sur l'ensemble du processus, de l'approvisionnement en matières premières à la livraison." },
  { icon: Microscope, title: "Détection Avancée", desc: "Équipé de HPLC et GC-MS, fournissant des rapports de tests tiers pour chaque lot de produits." },
  { icon: Zap, title: "Efficacité et Stabilité", desc: "Des entrepôts dans les principaux ports chinois garantissent une livraison immédiate et la stabilité de la chaîne d'approvisionnement." },
  { icon: Users, title: "Support Bilingue", desc: "Support technique bilingue 24h/24 pour répondre aux problèmes de communication et d'application des clients mondiaux." },
];

const valuesEs = [
  { icon: ShieldCheck, title: "Calidad Primero", desc: "Sistema de gestión de calidad en todo el proceso, desde la adquisición de materia prima hasta la entrega del producto." },
  { icon: Microscope, title: "Detección Avanzada", desc: "Equipado con HPLC y GC-MS, proporcionando informes de pruebas de terceros para cada lote de productos." },
  { icon: Zap, title: "Eficiencia y Estabilidad", desc: "Almacenes en los principales puertos chinos aseguran una entrega inmediata y estabilidad en la cadena de suministro." },
  { icon: Users, title: "Soporte Bilingüe", desc: "Soporte técnico bilingüe las 24 horas para abordar problemas de comunicación y aplicación para clientes globales." },
];

export default function AboutPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  
  const stats = isRu ? statsRu : (isFr ? statsFr : (isEs ? statsEs : statsEn));
  const hubs = isRu ? hubsRu : (isFr ? hubsFr : (isEs ? hubsEs : hubsEn));
  const values = isRu ? valuesRu : (isFr ? valuesFr : (isEs ? valuesEs : valuesEn));
  const jsonLd = isRu ? jsonLdRu : (isFr ? jsonLdFr : (isEs ? jsonLdEs : jsonLdEn));

  const content = isRu ? {
    title: "О Sinopeakchem — Эксперты по высокостандартному обслуживанию",
    description: "Узнайте о Sinopeakchem, многофункциональной химической компании с более чем 28-летним опытом. Мы объединяем управление брендами и глобальную логистику.",
    heroTitle: "Поиск лучших решений — наша конечная цель",
    heroDesc: "Эксперты по высокостандартному обслуживанию, соединяющие передовое китайское производство с мировыми промышленными потребностями.",
    ourStory: "Наша история",
    storySubtitle: "С 1998 года наша команда успешно понимает потребности отрасли и создает надежные продукты для всех.",
    storyP1: "Основанная в 1998 году в провинции Шаньдун, Китай, компания Sinopeakchem превратилась в многофункциональную и инновационную химическую компанию, объединяющую управление брендами и глобальные платформенные услуги.",
    storyP2: "Наш ассортимент охватывает широкий спектр продукции, включая щавелевую кислоту, тиосульфат натрия, хлорид кальция, сульфит натрия, лимонную кислоту и другие серии фосфатов и сульфатов. Мы стремимся стать яркой звездой в химической промышленности благодаря инновациям и комплексному обслуживанию.",
    strategicHubs: "Стратегические центры",
    serviceCommitment: "Наши обязательства по обслуживанию",
    visionTitle: "Видение бизнеса",
    visionDesc: "Мы стремимся создать профессиональную платформу для экологически чистых химических продуктов, способствуя «зеленому» развитию промышленных предприятий и выводя китайские технологии на мировой рынок.",
    affiliation: "Этот сайт принадлежит Shandong Lan star Technology Group Co.,Ltd"
  } : (isFr ? {
    title: "À propos de Sinopeakchem - Experts en Service de Haut Niveau",
    description: "Découvrez Sinopeakchem, une entreprise chimique multifonctionnelle avec plus de 28 ans d'excellence. Intégrant l'exploitation de marques et la logistique mondiale.",
    heroTitle: "Trouver la Meilleure Solution est Notre Objectif Ultime",
    heroDesc: "Experts en service de haut niveau faisant le pont entre la fabrication chinoise avancée et les besoins industriels mondiaux.",
    ourStory: "Notre Histoire",
    storySubtitle: "Depuis 1998, notre équipe a réussi à comprendre les besoins de l'industrie et à créer des produits fiables pour tous.",
    storyP1: "Fondée en 1998 dans la province du Shandong, en Chine, Sinopeakchem est devenue une entreprise chimique multifonctionnelle et innovante intégrant l'exploitation de marques et les services de plateforme.",
    storyP2: "Nos produits couvrent une large gamme comprenant l'acide oxalique, le thiosulfate de sodium, le chlorure de calcium, le sulfite de sodium, l'acide citrique et d'autres séries de phosphates et de sulfates. Nous nous efforçons de devenir une étoile brillante dans l'industrie chimique.",
    strategicHubs: "Hubs Stratégiques",
    serviceCommitment: "Notre Engagement de Service",
    visionTitle: "Positionnement Commercial",
    visionDesc: "Nous nous engageons à construire une plateforme professionnelle pour les produits chimiques de protection de l'environnement, favorisant le développement vert des entreprises industrielles.",
    affiliation: "Ce site appartient à Shandong Lan star Technology Group Co.,Ltd"
  } : isEs ? {
    title: "Sobre Sinopeakchem - Expertos en Servicio de Alto Estándar",
    description: "Conozca Sinopeakchem, una empresa química multifuncional con más de 28 años de excelencia. Integrando operación de marcas y logística global.",
    heroTitle: "Encontrar la Mejor Solución es Nuestro Objetivo Final",
    heroDesc: "Expertos en servicio de alto estándar que cierran la brecha entre la fabricación china avanzada y las necesidades industriales globales.",
    ourStory: "Nuestra Historia",
    storySubtitle: "Desde 1998, nuestro equipo ha logrado comprender las necesidades de la industria y crear productos confiables para servir a todos.",
    storyP1: "Fundada en 1998 en la provincia de Shandong, China, Sinopeakchem es una empresa química multifuncional e innovadora que integra la operación de marcas y servicios de plataforma.",
    storyP2: "Nuestros productos cubren una amplia gama que incluye ácido oxálico, tiosulfato de sodio, cloruro de calcio, sulfito de sodio, ácido cítrico y otras series de fosfatos y sulfatos. Nos esforzamos por convertirnos en una estrella brillante en la industria química a través de la innovación y el servicio integral.",
    strategicHubs: "Centros Estratégicos",
    serviceCommitment: "Nuestro Compromiso de Servicio",
    visionTitle: "Visión de Negocio",
    visionDesc: "Estamos comprometidos con la construcción de una plataforma profesional para productos químicos de protección ambiental, promoviendo el desarrollo verde de las empresas industriales y llevando la tecnología china al mercado global.",
    affiliation: "Este sitio pertenece a Shandong Lan star Technology Group Co.,Ltd"
  } : isAr ? {
    title: "عن Sinopeakchem - خبراء الخدمة عالية المعايير",
    description: "تعرف على Sinopeakchem، وهي شركة كيميائية متعددة الوظائف تتمتع بخبرة تزيد عن 28 عاماً. نحن نجمع بين تشغيل العلامات التجارية والخدمات اللوجستية العالمية.",
    heroTitle: "البحث عن أفضل الحلول هو هدفنا النهائي",
    heroDesc: "خبراء خدمة بمعايير عالية، نربط التصنيع الصيني المتقدم بالاحتياجات الصناعية العالمية.",
    ourStory: "قصتنا",
    storySubtitle: "منذ عام 1998، نجح فريقنا في فهم احتياجات الصناعة وبناء منتجات موثوقة للجميع.",
    storyP1: "تأسست Sinopeakchem في عام 1998 في مقاطعة شاندونغ بالصين، وتطورت لتصبح شركة كيميائية مبتكرة ومتعددة الوظائف تدمج تشغيل العلامات التجارية وخدمات المنصات العالمية.",
    storyP2: "تغطي مجموعتنا طيفاً واسعاً من المنتجات بما في ذلك حمض الأكساليك، وثيوسلفات الصوديوم، وكلوريد الكالسيوم، وكبريتيت الصوديوم، وحمض الستريك وسلسلة أخرى من الفوسفات والكبريتات. نحن نسعى جاهدين لنصبح نجماً ساطعاً في الصناعة الكيميائية من خلال الابتكار والخدمة الشاملة.",
    strategicHubs: "المراكز الاستراتيجية",
    serviceCommitment: "التزامنا بالخدمة",
    visionTitle: "رؤية العمل",
    visionDesc: "نحن ملتزمون ببناء منصة احترافية للمنتجات الكيميائية لحماية البيئة، وتعزيز التنمية الخضراء للمؤسسات الصناعية وجلب التكنولوجيا الكيميائية الصينية إلى السوق العالمية.",
    affiliation: "هذا الموقع مملوك لشركة Shandong Lan star Technology Group Co.,Ltd"
  } : {
    title: "About Sinopeakchem - High-standard Service Experts",
    description: "Learn about Sinopeakchem, a multi-functional chemical company with 28+ years of excellence. Integrating brand operation and global logistics.",
    heroTitle: "Finding the Best Solution is Our Ultimate Goal",
    heroDesc: "High-standard service experts bridging the gap between advanced Chinese manufacturing and global industrial needs.",
    ourStory: "Our Story",
    storySubtitle: "Since 1998, Our Team Has Succeeded In Understanding The Needs Of The Industry And Creating Reliable Products To Serve All.",
    storyP1: "Founded in 1998 in Shandong Province, China, Sinopeakchem is a multi-functional and innovative chemical company integrating brand operation and platform services.",
    storyP2: "Our products cover a wide range including oxalic acid, sodium thiosulphate, calcium chloride, sodium sulfite, citric acid, and other phosphate and sulfate series. We strive to become a brilliant star in the chemical industry through continuous innovation and comprehensive services.",
    strategicHubs: "Strategic Hubs",
    serviceCommitment: "Our Service Commitment",
    visionTitle: "Business Positioning",
    visionDesc: "We are committed to building a professional platform for environmental protection chemical products, promoting green development of industrial enterprises and bringing Chinese chemical technology to the global market.",
    affiliation: "This website belongs to Shandong Lan star Technology Group Co.,Ltd"
  });

  return (
    <Layout
      title={content.title}
      description={content.description}
      jsonLd={jsonLd}
    >
      <div className={isAr ? 'text-right' : ''}>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Sinopeakchem Global Operations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{content.heroTitle}</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium">
            {content.heroDesc}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-[#0066B3] mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{content.ourStory}</h2>
              <h3 className="text-xl font-bold text-[#0066B3] mb-8 leading-tight">
                {content.storySubtitle}
              </h3>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>{content.storyP1}</p>
                <p>{content.storyP2}</p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={LAB_IMG} alt="Sinopeakchem Production Base" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Hubs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center">{content.strategicHubs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hubs.map((hub, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <hub.icon className="w-7 h-7 text-[#0066B3]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{hub.title}</h3>
                    <p className="text-sm font-bold text-[#0066B3] mb-4 uppercase tracking-wider">{hub.location}</p>
                    <p className="text-gray-600 leading-relaxed">{hub.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Commitment */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">{content.serviceCommitment}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <v.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-blue-100/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">{content.visionTitle}</h2>
          <p className="text-xl text-gray-600 leading-relaxed italic mb-12">
            "{content.visionDesc}"
          </p>
          <p className="text-sm text-gray-400 mt-16">
            {content.affiliation}
          </p>
        </div>
      </section>
      </div>
    </Layout>
  );
}
