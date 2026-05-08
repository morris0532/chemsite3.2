export interface MegaMenuCategory {
  id: string;
  labels: Record<string, string>;
  descriptions: Record<string, string>;
  // productIds logic is replaced by dynamic category matching in the component
}

export const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: "Alkali & Basic Chemicals",
    labels: {
      en: "Alkali & Basic Chemicals",
      ru: "Щелочи и основные химикаты",
      fr: "Alcalis et Produits Chimiques de Base",
      es: "Álcalis y Productos Químicos Básicos",
      ar: "القلويات والمواد الكيميائية الأساسية"
    },
    descriptions: {
      en: "Essential basic chemicals including Caustic Soda and Soda Ash for diverse industrial sectors",
      ru: "Основные химические вещества, включая каустическую соду и кальцинированную соду",
      fr: "Produits chimiques de base essentiels, y compris la soude caustique et le carbonate de soude",
      es: "Productos químicos básicos esenciales, incluyendo soda cáustica y ceniza de soda",
      ar: "المواد الكيميائية الأساسية الأساسية بما في ذلك الصودا الكاوية ورماد الصودا"
    }
  },
  {
    id: "Water Treatment Chemicals",
    labels: {
      en: "Water Treatment Chemicals",
      ru: "Химикаты для очистки воды",
      fr: "Produits Chimiques pour le Traitement de l'Eau",
      es: "Productos Químicos para el Tratamiento de Agua",
      ar: "مواد كيميائية لمعالجة المياه"
    },
    descriptions: {
      en: "Advanced solutions for water purification, pH adjustment, and industrial processes",
      ru: "Передовые решения для очистки воды, регулирования pH и промышленных процессов",
      fr: "Solutions avancées pour la purification de l'eau, l'ajustement du pH et les processus industriels",
      es: "Soluciones avanzadas para purificación de agua, ajuste de pH y procesos industriales",
      ar: "حلول متقدمة لتنقية المياه وتعديل الأس الهيدروجيني والعمليات الصناعية"
    }
  },
  {
    id: "Organic Acids & Salts",
    labels: {
      en: "Organic Acids & Salts",
      ru: "Органические кислоты и соли",
      fr: "Acides Organiques et Sels",
      es: "Ácidos Orgánicos y Sales",
      ar: "الأحماض العضوية والأملاح"
    },
    descriptions: {
      en: "High-purity organic acids and their salts for industrial and laboratory applications",
      ru: "Высокочистые органические кислоты и их соли для промышленности и лабораторий",
      fr: "Acides organiques de haute pureté et leurs sels pour applications industrielles et de laboratoire",
      es: "Ácidos orgánicos de alta pureza y sus sales para aplicaciones industriales y de laboratorio",
      ar: "أحماض عضوية عالية النقاء وأملاحها للتطبيقات الصناعية والمخبرية"
    }
  },
  {
    id: "Industrial Salts & Sulfates",
    labels: {
      en: "Industrial Salts & Sulfates",
      ru: "Промышленные соли и сульфаты",
      fr: "Sels Industriels et Sulfates",
      es: "Sales Industriales y Sulfatos",
      ar: "الأملاح الصناعية والكبريتات"
    },
    descriptions: {
      en: "Specialized salts and sulphates for fertilizers, detergents, and paper industry",
      ru: "Специализированные соли и сульфаты для удобрений, моющих средств и бумажной промышленности",
      fr: "Sels et sulfates spécialisés pour les engrais, les détergents et l'industrie papetière",
      es: "Sales y sulfatos especializados para fertilizantes, detergentes e industria papelera",
      ar: "الأملاح والكبريتات المتخصصة للأسمدة والمنظفات وصناعة الورق"
    }
  },
  {
    id: "Phosphates & Boron",
    labels: {
      en: "Phosphates & Boron",
      ru: "Фосфаты и бор",
      fr: "Phosphates et Bore",
      es: "Fosfatos y Boro",
      ar: "الفوسفات والبورون"
    },
    descriptions: {
      en: "High-quality phosphates and boron compounds for various industrial uses",
      ru: "Высококачественные фосфаты и соединения бора для различных промышленных нужд",
      fr: "Phosphates et composés de bore de haute qualité pour divers usages industriels",
      es: "Fosfatos y compuestos de boro de alta calidad para diversos usos industriales",
      ar: "فوسفات ومركبات بورون عالية الجودة لمختلف الاستخدامات الصناعية"
    }
  }
];

export const MEGA_MENU_TRANSLATIONS = {
  resources: {
    en: "Resources",
    ru: "Ресурсы",
    fr: "Ressources",
    es: "Recursos",
    ar: "الموارد"
  },
  featuredKnowledge: {
    en: "Featured Knowledge",
    ru: "Избранные знания",
    fr: "Connaissances Vedettes",
    es: "Conocimiento Destacado",
    ar: "المعرفة المختارة"
  },
  readMore: {
    en: "Read More",
    ru: "Читать далее",
    fr: "Lire la suite",
    es: "Leer más",
    ar: "اقرأ المزيد"
  },
  viewAllTopics: {
    en: "View All Topics",
    ru: "Все темы",
    fr: "Toutes les thèmes",
    es: "Todos los temas",
    ar: "عرض جميع المواضيع"
  }
};
