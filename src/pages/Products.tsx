import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid3X3, List, ArrowRight, ChevronRight, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";

// Skeleton loader component for product grid
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-gray-200 m-3 rounded-2xl" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-20" />
      <div className="h-5 bg-gray-200 rounded w-40" />
      <div className="h-3 bg-gray-200 rounded w-24" />
      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  </div>
);

export default function ProductsPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  
  const { products: markdownProducts, isLoading } = useMarkdownContent(isRu ? 'ru' : (isFr ? 'fr' : (isEs ? 'es' : (isAr ? 'ar' : 'en'))));
  const currentProducts = markdownProducts;
  const defaultCategory = isRu ? "Все" : (isFr ? "Tous" : (isEs ? "Todos" : (isAr ? "جميع المنتجات" : "All Products")));
  const currentCategories = useMemo(() => {
    const categories = Array.from(new Set(currentProducts.map((p: any) => p.category)));
    return [defaultCategory, ...categories];
  }, [currentProducts, defaultCategory]);

  const [category, setCategory] = useState(defaultCategory);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Reset category when language changes to avoid "No products found"
  useEffect(() => {
    setCategory(defaultCategory);
  }, [isRu, isFr, isEs, isAr, defaultCategory]);

  const filtered = useMemo(() => {
    return currentProducts.filter((p) => {
      const matchCategory = category === defaultCategory || p.category === category;
      return matchCategory;
    });
  }, [category, currentProducts, defaultCategory]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isRu ? "Каталог промышленной химической продукции" : (isFr ? "Catalogue de Produits Chimiques Industriels" : (isEs ? "Catálogo de Productos Químicos Industriales" : "Industrial Chemical Products")),
    description: isRu ? "Полный каталог промышленных химикатов от Sinopeakchem" : (isFr ? "Catalogue complet des produits chimiques industriels de Sinopeakchem" : (isEs ? "Catálogo completo de productos químicos industriales de Sinopeakchem" : "Complete catalog of industrial chemicals from Sinopeakchem")),
    numberOfItems: currentProducts.length,
    itemListElement: currentProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.shortDescription,
        url: `https://sinopeakchem.com${langPrefix}/products/${p.slug}`,
        sku: p.cas,
      },
    })),
  };

  const content = isRu ? {
    title: "Каталог промышленной химической продукции",
    description: "Просмотрите наш полный каталог из 22+ промышленных химикатов, включая тиосульфат натрия, каустическую соду, щавелевую кислоту, хлорид кальция и другие. Конкурентоспособные цены с глобальной доставкой.",
    heroTitle: "Наши химические продукты",
    heroDesc: "Изучите наш широкий ассортимент высококачественных промышленных химикатов. Все продукты доступны для глобального экспорта с полной документацией.",
    found: "найдено продуктов",
    viewDetails: "Подробнее",
    noProducts: "Продукты, соответствующие вашим критериям, не найдены.",
    clearFilters: "Очистить фильтры",
  } : (isFr ? {
    title: "Catalogue de Produits Chimiques Industriels",
    description: "Parcourez notre catalogue complet de plus de 22 produits chimiques industriels, notamment le thiosulfate de sodium, la soude caustique, l'acide oxalique, le chlorure de calcium, etc. Prix compétitifs avec expédition mondiale.",
    heroTitle: "Nos Produits Chimiques",
    heroDesc: "Explorez notre gamme complète de produits chimiques industriels de haute qualité. Tous les produits sont disponibles pour l'exportation mondiale avec une documentation complète.",
    found: "produits trouvés",
    viewDetails: "Voir les Détails",
    noProducts: "Aucun produit trouvé correspondant à vos critères.",
    clearFilters: "Effacer les Filtres",
  } : isEs ? {
    title: "Catálogo de Productos Químicos Industriales",
    description: "Explore nuestro catálogo completo de más de 22 productos químicos industriales, incluyendo tiosulfato de sodio, sosa cáustica, ácido oxálico, cloruro de calcio y más. Precios competitivos con envío global.",
    heroTitle: "Nuestros Productos Químicos",
    heroDesc: "Explore nuestra amplia gama de productos químicos industriales de alta calidad. Todos los productos están disponibles para exportación global con documentación completa.",
    found: "productos encontrados",
    viewDetails: "Ver Detalles",
    noProducts: "No se encontraron productos que coincidan con sus criterios.",
    clearFilters: "Limpiar Filtros",
  } : isAr ? {
    title: "كتالوج المنتجات الكيميائية الصناعية",
    description: "تصفح كتالوجنا الكامل الذي يضم أكثر من 22 مادة كيميائية صناعية بما في ذلك ثيوسلفات الصوديوم والصودا الكاوية وحمض الأكساليك وكلوريد الكالسيوم وغيرها. أسعار تنافسية مع شحن عالمي.",
    heroTitle: "منتجاتنا الكيميائية",
    heroDesc: "استكشف مجموعتنا الشاملة من المواد الكيميائية الصناعية عالية الجودة. جميع المنتجات متاحة للتصدير العالمي مع وثائق كاملة.",
    found: "تم العثور على منتجات",
    viewDetails: "عرض التفاصيل",
    noProducts: "لم يتم العثور على منتجات تطابق معاييرك.",
    clearFilters: "مسح التصفية",
  } : {
    title: "Industrial Chemical Products Catalog",
    description: "Browse our complete catalog of 22+ industrial chemicals including sodium thiosulphate, caustic soda, oxalic acid, calcium chloride, and more. Competitive pricing with global shipping.",
    heroTitle: "Our Chemical Products",
    heroDesc: "Explore our comprehensive range of high-quality industrial chemicals. All products are available for global export with complete documentation.",
    found: "products found",
    viewDetails: "View Details",
    noProducts: "No products found matching your criteria.",
    clearFilters: "Clear Filters",
  });

  return (
    <Layout
      title={content.title}
      description={content.description}
      jsonLd={jsonLd}
    >
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link to={langPrefix} className="hover:text-[#0066B3] transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" />
              {isRu ? "Главная" : (isFr ? "Accueil" : (isEs ? "Inicio" : (isAr ? "الرئيسية" : "Home")))}
            </Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-slate-900">{isRu ? "Продукты" : (isFr ? "Produits" : (isEs ? "Productos" : (isAr ? "المنتجات" : "Products")))}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066B3] to-[#004A82] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{content.heroTitle}</h1>
              <p className="text-blue-100 max-w-2xl text-lg leading-relaxed">
                {content.heroDesc}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                to={`${langPrefix}/packaging-gallery`}
                className="group relative inline-flex items-center gap-3 bg-white text-[#0066B3] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-lg">
                  {isRu ? "Галерея упаковки" : (isFr ? "Galerie d'emballage" : (isEs ? "Galería de Embalaje" : (isAr ? "معرض التعبئة والتغليف" : "Packaging Gallery")))}
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {currentCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                  className={category === cat ? "bg-[#0066B3] hover:bg-[#004A82] text-white" : "text-gray-600"}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count & view toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">{filtered.length} {content.found}</p>
            <div className="flex gap-1">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-[#0066B3] text-white" : ""}>
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-[#0066B3] text-white" : ""}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    to={`${langPrefix}/products/${product.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] bg-gray-50 overflow-hidden m-3 rounded-2xl">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-0.5 rounded-full">{product.category}</span>
                      <h2 className="text-base font-semibold text-[#1A1A2E] mt-2 mb-1 group-hover:text-[#0066B3] transition-colors">{product.name}</h2>
                      <p className="text-xs text-gray-500 mb-2">CAS: {product.cas}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>
                      <div className="mt-3 flex items-center text-sm text-[#0066B3] font-medium">
                        {content.viewDetails} <ArrowRight className="ml-1 w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    to={`${langPrefix}/products/${product.slug}`}
                    className="group flex gap-4 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all p-4"
                  >
                    <div className="w-32 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-0.5 rounded-full">{product.category}</span>
                        <span className="text-xs text-gray-500">CAS: {product.cas}</span>
                      </div>
                      <h2 className="text-base font-semibold text-[#1A1A2E] group-hover:text-[#0066B3] transition-colors">{product.name}</h2>
                      <p className="text-sm text-gray-600 line-clamp-1 mt-1">{product.shortDescription}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>{isRu ? "Порты" : (isFr ? "Ports" : (isEs ? "Puertos" : (isAr ? "الموانئ" : "Ports")))}: {product.ports}</span>
                        <span>{isRu ? "Загрузка" : (isFr ? "Chargement" : (isEs ? "Carga" : (isAr ? "التحميل" : "Loading")))}: {product.loading}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{content.noProducts}</p>
              <Button variant="outline" className="mt-4" onClick={() => { setCategory(defaultCategory); }}>
                {content.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
