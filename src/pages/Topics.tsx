import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight, Beaker, BookOpen, ArrowRight, Search, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";

export default function TopicsPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  
  const currentLang = isRu ? 'ru' : (isFr ? 'fr' : (isEs ? 'es' : (isAr ? 'ar' : 'en')));
  const { products, posts: currentPosts } = useMarkdownContent(currentLang);
  const { products: enProducts, posts: enPosts } = useMarkdownContent('en');

  // 聚合当前语言文章和英文文章，确保计数和显示不为空
  const posts = useMemo(() => {
    if (currentLang === 'en') return currentPosts;
    const combined = [...enPosts].map(enP => {
      const translated = currentPosts.find(p => p.slug === enP.slug || (p.RootnoTouch && p.RootnoTouch === enP.RootnoTouch));
      return translated ? translated : { ...enP, isFallback: true };
    });
    return combined;
  }, [currentLang, currentPosts, enPosts]);

  const displayProducts = useMemo(() => {
    if (currentLang === 'en') return products;
    const baseProducts = [...enProducts];
    return baseProducts.map(enP => {
      const translated = products.find((p: any) => 
        (p.id && enP.id && p.id === enP.id) || 
        (p.RootnoTouch && enP.RootnoTouch && p.RootnoTouch === enP.RootnoTouch) ||
        (p.slug === enP.slug)
      );
      return translated ? translated : { ...enP, isFallback: true };
    });
  }, [currentLang, products, enProducts]);

  const [searchQuery, setSearchQuery] = useState("");

  const topicCards = useMemo(() => {
    const cards = displayProducts.map(product => {
      const productSlug = product.slug;
      const productNameLower = (product.name || '').toLowerCase();
      
      const relatedPosts = posts.filter(post => {
        const productProductAttr = (product.Product || '').trim().toLowerCase();
        // 1. 优先通过 Product 属性关联 (忽略大小写和空格)
        if (post.Product) {
          const postProductAttr = String(post.Product).trim().toLowerCase();
          if (postProductAttr === productProductAttr) return true;
          if (postProductAttr === productSlug) return true;
        }

        // 2. 备选关联逻辑：匹配 topic 字段或 tags
        const postTopic = (post.topic || '').trim().toLowerCase();
        if (postTopic === productSlug || postTopic === productNameLower) return true;
        
        if (post.tags && Array.isArray(post.tags)) {
          return post.tags.some((tag: string) => 
            tag.trim().toLowerCase() === productNameLower || 
            tag.trim().toLowerCase() === product.name?.trim().toLowerCase()
          );
        }

        return false;
      });
      
      return {
        ...product,
        postCount: relatedPosts.length
      };
    });

    if (!searchQuery.trim()) return cards;

    const query = searchQuery.toLowerCase().trim();
    return cards.filter(card => 
      (card.name || "").toLowerCase().includes(query) ||
      (card.shortDescription || "").toLowerCase().includes(query) ||
      (card.cas || "").toLowerCase().includes(query)
    );
  }, [displayProducts, posts, searchQuery]);

  const content = isRu ? {
    title: "Темы и знания",
    description: "Исследуйте нашу базу знаний по промышленным химикатам. Технические статьи, руководства по применению и информация о продуктах.",
    heroTitle: "Центр знаний о химикатах",
    heroDesc: "Глубокое погружение в технические детали, рыночную аналитику и руководства по применению для всех наших основных продуктов.",
    searchPlaceholder: "Поиск тем или статей...",
    relatedContent: "Статьи",
    viewHub: "Открыть центр знаний"
  } : (isFr ? {
    title: "Sujets et Connaissances",
    description: "Explorez notre base de connaissances sur les produits chimiques industriels. Articles techniques, guides d'application et informations sur les produits.",
    heroTitle: "Centre de Connaissances Chimiques",
    heroDesc: "Plongez dans les détails techniques, les analyses de marché et les guides d'application pour tous nos produits phares.",
    searchPlaceholder: "Rechercher des sujets ou des articles...",
    relatedContent: "Articles",
    viewHub: "Voir le centre de connaissances"
  } : isEs ? {
    title: "Temas y Conocimiento",
    description: "Explore nuestra base de conocimientos sobre productos químicos industriales. Artículos técnicos, guías de aplicación e información sobre productos.",
    heroTitle: "Centro de Conocimiento Químico",
    heroDesc: "Profundice en los detalles técnicos, los conocimientos del mercado y las guías de aplicación de todos nuestros productos principales.",
    searchPlaceholder: "Buscar temas o artículos...",
    relatedContent: "Artículos",
    viewHub: "Ver centro de conocimiento"
  } : isAr ? {
    title: "المواضيع والمعرفة",
    description: "استكشف قاعدة معرفتنا بالمواد الكيميائية الصناعية. مقالات تقنية، أدلة تطبيق، ومعلومات المنتج.",
    heroTitle: "مركز المعرفة الكيميائية",
    heroDesc: "تعمق في التفاصيل التقنية، ورؤى السوق، وأدلة التطبيق لجميع منتجاتنا الأساسية.",
    searchPlaceholder: "البحث عن المواضيع أو المقالات...",
    relatedContent: "مقالات",
    viewHub: "عرض مركز المعرفة"
  } : {
    title: "Topics & Knowledge Hub",
    description: "Explore our comprehensive knowledge base on industrial chemicals. Technical articles, application guides, and product insights.",
    heroTitle: "Chemical Knowledge Hub",
    heroDesc: "Deep dive into technical details, market insights, and application guides for all our core products.",
    searchPlaceholder: "Search topics or articles...",
    relatedContent: "Articles",
    viewHub: "View Knowledge Hub"
  });

  return (
    <Layout
      title={content.title}
      description={content.description}
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
            <span className="text-slate-900">{content.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white pt-16 pb-12 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              {content.heroTitle}
            </h1>
            <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed">
              {content.heroDesc}
            </p>
            
	            <div className="relative max-w-xl">
	              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
	              <input 
	                type="text" 
	                placeholder={content.searchPlaceholder}
	                value={searchQuery}
	                onChange={(e) => setSearchQuery(e.target.value)}
	                className="w-full h-14 pl-12 pr-6 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-900 font-medium"
	              />
	            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topicCards.map((topic) => (
              <Link 
                key={topic.slug}
                to={`${langPrefix}/topics/${topic.slug}`}
                className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[3rem] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0066B3] transition-all duration-500">
                  <Beaker className="w-7 h-7 text-[#0066B3] group-hover:text-white transition-colors duration-500" />
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#0066B3] transition-colors">
                  {topic.name}
                </h3>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <BookOpen className="w-3 h-3" />
                    {topic.postCount} {content.relatedContent}
                  </span>
                </div>
                
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3">
                  {topic.shortDescription}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs font-black text-[#0066B3] uppercase tracking-widest gap-2">
                    {content.viewHub} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  {topic.isFallback && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                      <Globe className="w-2.5 h-2.5" />
                      EN
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
