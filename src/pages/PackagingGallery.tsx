import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

interface GalleryItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  cas?: string;
  shortDescription: string;
  order?: number;
}

export default function PackagingGalleryPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Load gallery data dynamically only when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import("@/data/packaging-gallery.json");
        if (data && data.default && data.default.items) {
          const sorted = [...data.default.items].sort((a: any, b: any) => {
            if (a.order !== undefined && b.order !== undefined) {
              return a.order - b.order;
            }
            return a.name.localeCompare(b.name);
          });
          setGalleryItems(sorted);
        }
      } catch (error) {
        console.error("Failed to load gallery data:", error);
      }
    };
    loadData();
  }, []);

  const filtered = useMemo(() => {
    return galleryItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, galleryItems]);

  const content = isRu ? {
    title: "Галерея упаковки продуктов",
    description: "Просмотрите упаковку наших промышленных химических продуктов. Высокое качество и профессиональное оформление.",
    heroTitle: "Галерея упаковки продуктов",
    heroDesc: "Откройте для себя профессиональную упаковку наших промышленных химических продуктов. Каждый продукт упакован с соблюдением строгих стандартов качества и безопасности.",
    searchPlaceholder: "Поиск по названию продукта...",
    noResults: "Продукты не найдены",
    emptyGallery: "Галерея упаковки пока пуста. Пожалуйста, вернитесь позже.",
    viewProduct: "Просмотреть продукт",
    closeModal: "Закрыть",
    clearSearch: "Очистить поиск",
  } : (isFr ? {
    title: "Galerie d'emballage des produits",
    description: "Découvrez l'emballage de nos produits chimiques industriels. Qualité supérieure et présentation professionnelle.",
    heroTitle: "Galerie d'emballage des produits",
    heroDesc: "Découvrez l'emballage professionnel de nos produits chimiques industriels. Chaque produit est emballé selon les normes strictes de qualité et de sécurité.",
    searchPlaceholder: "Rechercher par nom de produit...",
    noResults: "Produits non trouvés",
    emptyGallery: "La galerie d'emballage est actuellement vide. Veuillez revenir plus tard.",
    viewProduct: "Voir le produit",
    closeModal: "Fermer",
    clearSearch: "Effacer la recherche",
  } : isEs ? {
    title: "Galería de embalaje de productos",
    description: "Descubre el embalaje de nuestros productos químicos industriales. Calidad superior y presentación profesional.",
    heroTitle: "Galería de embalaje de productos",
    heroDesc: "Descubre el embalaje profesional de nuestros productos químicos industriales. Cada producto está embalado según normas estrictas de calidad y seguridad.",
    searchPlaceholder: "Buscar por nombre de producto...",
    noResults: "Productos no encontrados",
    emptyGallery: "La galería de embalaje está actualmente vacía. Por favor, vuelva más tarde.",
    viewProduct: "Ver producto",
    closeModal: "Cerrar",
    clearSearch: "Limpiar búsqueda",
  } : isAr ? {
    title: "معرض تغليف المنتجات",
    description: "استكشف تغليف منتجاتنا الكيميائية الصناعية. جودة فائقة وعرض احترافي.",
    heroTitle: "معرض تغليف المنتجات",
    heroDesc: "اكتشف التغليف الاحترافي لمنتجاتنا الكيميائية الصناعية. يتم تعبئة كل منتج وفقاً لمعايير الجودة والسلامة الصارمة.",
    searchPlaceholder: "البحث حسب اسم المنتج...",
    noResults: "لم يتم العثور على منتجات",
    emptyGallery: "معرض التغليف فارغ حالياً. يرجى التحقق لاحقاً.",
    viewProduct: "عرض المنتج",
    closeModal: "إغلاق",
    clearSearch: "مسح البحث",
  } : {
    title: "Product Packaging Gallery",
    description: "Explore the packaging of our industrial chemical products. Superior quality and professional presentation.",
    heroTitle: "Product Packaging Gallery",
    heroDesc: "Discover the professional packaging of our industrial chemical products. Each product is packaged according to strict quality and safety standards.",
    searchPlaceholder: "Search by product name...",
    noResults: "No products found",
    emptyGallery: "The packaging gallery is currently empty. Please check back later.",
    viewProduct: "View Product",
    closeModal: "Close",
    clearSearch: "Clear Search",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: content.description,
    url: `https://sinopeakchem.com${langPrefix}/packaging-gallery`,
    numberOfItems: galleryItems.length,
  };

  return (
    <Layout
      title={content.title}
      description={content.description}
      jsonLd={jsonLd}
    >
      <div className={isAr ? 'text-right' : ''}>
        {/* Breadcrumbs */}
        <div className="bg-slate-50 border-b border-slate-100 py-3">
          <div className="container mx-auto px-4">
            <nav className={`flex items-center gap-2 text-xs font-medium text-slate-500 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Link to={langPrefix} className="hover:text-[#0066B3] transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" />
                {isRu ? "Главная" : (isFr ? "Accueil" : (isEs ? "Inicio" : (isAr ? "الرئيسية" : "Home")))}
              </Link>
              <ChevronRight className={`w-3 h-3 opacity-50 ${isAr ? 'rotate-180' : ''}`} />
              <Link to={`${langPrefix}/products`} className="hover:text-[#0066B3] transition-colors">
                {isRu ? "Продукты" : (isFr ? "Produits" : (isEs ? "Productos" : (isAr ? "المنتجات" : "Products")))}
              </Link>
              <ChevronRight className={`w-3 h-3 opacity-50 ${isAr ? 'rotate-180' : ''}`} />
              <span className="text-slate-900">{isRu ? "Галерея упаковки" : (isFr ? "Galerie d'emballage" : (isEs ? "Galería de Embalaje" : (isAr ? "معرض التغليف" : "Packaging Gallery")))}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0066B3] to-[#004A82] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isAr ? 'font-arabic' : ''}`}>{content.heroTitle}</h1>
            <p className={`text-blue-100 max-w-2xl text-lg ${isAr ? 'font-arabic' : ''}`}>
              {content.heroDesc}
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className={`mb-8 flex ${isAr ? 'justify-end' : 'justify-start'}`}>
              <div className="relative max-w-md w-full">
                <Search className={`absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type="text"
                  placeholder={content.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${isAr ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066B3] focus:border-transparent ${isAr ? 'font-arabic' : ''}`}
                />
              </div>
            </div>

            {/* Gallery Grid or Empty State */}
            {galleryItems.length === 0 ? (
              <div className="text-center py-16">
                <p className={`text-gray-500 text-lg mb-4 ${isAr ? 'font-arabic' : ''}`}>{content.emptyGallery}</p>
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer"
                    onClick={() => setSelectedProduct(item)}
                  >
                    <div className="aspect-square bg-gray-50 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={`${item.name} Packaging - ${item.category} Industrial Chemical`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <button className={`opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#0066B3] px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 text-sm ${isAr ? 'font-arabic' : ''}`}>
                          {isRu ? "Просмотр" : (isFr ? "Voir" : (isEs ? "Ver" : (isAr ? "عرض" : "View")))}
                        </button>
                      </div>
                    </div>
                    <div className={`p-4 ${isAr ? 'text-right' : ''}`}>
                      <span className={`text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-0.5 rounded-full ${isAr ? 'font-arabic' : ''}`}>
                        {item.category}
                      </span>
                      <h3 className={`text-base font-semibold text-[#1A1A2E] mt-2 group-hover:text-[#0066B3] transition-colors ${isAr ? 'font-arabic' : ''}`}>
                        {item.name}
                      </h3>
                      {item.cas && <p className="text-xs text-gray-500 mt-1">CAS: {item.cas}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className={`text-gray-500 text-lg mb-4 ${isAr ? 'font-arabic' : ''}`}>{content.noResults}</p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className={isAr ? 'font-arabic' : ''}
                >
                  {content.clearSearch}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                <h2 className={`text-xl font-bold text-[#1A1A2E] ${isAr ? 'font-arabic' : ''}`}>{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <img
                    src={selectedProduct.image}
                    alt={`${selectedProduct.name} Packaging - ${selectedProduct.category} Industrial Chemical`}
                    className="w-full h-auto rounded-lg border border-gray-200"
                  />
                </div>

                <div className="space-y-4 mb-6">
                  <div className={isAr ? 'text-right' : ''}>
                    <p className={`text-sm text-gray-500 mb-1 ${isAr ? 'font-arabic' : ''}`}>{isRu ? "Категория" : (isFr ? "Catégorie" : (isEs ? "Categoría" : (isAr ? "الفئة" : "Category")))}</p>
                    <p className={`font-semibold text-[#1A1A2E] ${isAr ? 'font-arabic' : ''}`}>{selectedProduct.category}</p>
                  </div>
                  {selectedProduct.cas && (
                    <div className={isAr ? 'text-right' : ''}>
                      <p className={`text-sm text-gray-500 mb-1 ${isAr ? 'font-arabic' : ''}`}>CAS Number</p>
                      <p className="font-semibold text-[#1A1A2E]">{selectedProduct.cas}</p>
                    </div>
                  )}
                  <div className={isAr ? 'text-right' : ''}>
                    <p className={`text-sm text-gray-500 mb-1 ${isAr ? 'font-arabic' : ''}`}>{isRu ? "Описание" : (isFr ? "Description" : (isEs ? "Descripción" : (isAr ? "الوصف" : "Description")))}</p>
                    <p className={`text-gray-700 ${isAr ? 'font-arabic leading-relaxed' : ''}`}>{selectedProduct.shortDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
