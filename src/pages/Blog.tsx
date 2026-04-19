import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, User, ChevronLeft, ChevronRight, Home } from "lucide-react";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";

const PAGE_1_COUNT = 10; // 1 featured + 9 grid items
const PAGE_REST_COUNT = 12; // 12 grid items for page 2+

// Skeleton loader component for blog posts
const BlogPostSkeleton = ({ featured = false }) => (
  <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse ${featured ? 'md:col-span-2' : ''}`}>
    <div className={`${featured ? 'h-96' : 'h-48'} bg-gray-200`} />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-32" />
      <div className="h-6 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-10 bg-gray-200 rounded w-24 mt-4" />
    </div>
  </div>
);

export default function BlogPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  
  const { posts: markdownPosts, isLoading } = useMarkdownContent(isRu ? 'ru' : (isFr ? 'fr' : (isEs ? 'es' : (isAr ? 'ar' : 'en'))));
  const [currentPage, setCurrentPage] = useState(1);

  const sorted = useMemo(() => {
    return [...markdownPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [markdownPosts]);

  // Reset page when language changes
  useEffect(() => {
    setCurrentPage(1);
  }, [langPrefix]);

  const totalPages = useMemo(() => {
    if (sorted.length <= PAGE_1_COUNT) return 1;
    const remainingPosts = sorted.length - PAGE_1_COUNT;
    return 1 + Math.ceil(remainingPosts / PAGE_REST_COUNT);
  }, [sorted]);

  const paginatedPosts = useMemo(() => {
    if (currentPage === 1) {
      return sorted.slice(0, PAGE_1_COUNT);
    } else {
      const start = PAGE_1_COUNT + (currentPage - 2) * PAGE_REST_COUNT;
      return sorted.slice(start, start + PAGE_REST_COUNT);
    }
  }, [sorted, currentPage]);

  const featuredPost = currentPage === 1 ? paginatedPosts[0] : null;
  const gridPosts = currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: isRu ? "Блог Sinopeakchem - Новости химической промышленности" : (isFr ? "Blog Sinopeakchem - Actualités de l'Industrie Chimique" : (isEs ? "Blog Sinopeakchem - Perspectivas de la Industria Química" : (isAr ? "مدونة Sinopeakchem - رؤى الصناعة الكيميائية" : "Sinopeakchem Blog - Chemical Industry Insights"))),
    description: isRu ? "Новости отрасли, руководства по продуктам и технические статьи о промышленных химикатах." : (isFr ? "Actualités de l'industrie, guides de produits et articles techniques sur les produits chimiques industriels." : (isEs ? "Noticias de la industria, guías de productos y artículos técnicos sobre productos químicos industriales." : (isAr ? "أخبار الصناعة وأدلة المنتجات والمقالات الفنية حول المواد الكيميائية الصناعية." : "Industry news, product guides, and technical articles about industrial chemicals."))),
    url: `https://sinopeakchem.com${langPrefix}/blog`,
    publisher: { "@type": "Organization", name: "Sinopeakchem" },
    blogPost: sorted.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
      url: `https://sinopeakchem.com${langPrefix}/blog/${post.slug}`,
    })),
  };

  const content = isRu ? {
    title: "Блог - Новости химической промышленности и руководства по продуктам",
    description: "Читайте последние новости отрасли, руководства по продуктам и технические статьи о промышленных химикатах от экспертной команды Sinopeakchem.",
    heroTitle: "Блог",
    heroDesc: "Новости отрасли, руководства по продуктам и технические статьи от нашей экспертной команды.",
    readMore: "Читать далее",
    prev: "Назад",
    next: "Вперед",
    page: "Страница",
  } : (isFr ? {
    title: "Blog - Actualités de l'Industrie Chimique et Guides de Produits",
    description: "Lisez les dernières actualités de l'industrie, les guides de produits et les articles techniques sur les produits chimiques industriels de l'équipe d'experts de Sinopeakchem.",
    heroTitle: "Blog",
    heroDesc: "Actualités de l'industrie, guides de produits et articles techniques de notre équipe d'experts.",
    readMore: "Lire la suite",
    prev: "Précédent",
    next: "Suivant",
    page: "Page",
  } : isEs ? {
    title: "Blog - Perspectivas de la Industria Química y Guías de Productos",
    description: "Lea las últimas noticias de la industria, guías de productos y artículos técnicos sobre productos químicos industriales del equipo de expertos de Sinopeakchem.",
    heroTitle: "Blog",
    heroDesc: "Perspectivas de la industria, guías de productos y artículos técnicos de nuestro equipo de expertos.",
    readMore: "Leer más",
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
  } : isAr ? {
    title: "المدونة - رؤى الصناعة الكيميائية وأدلة المنتجات",
    description: "اقرأ أحدث أخبار الصناعة وأدلة المنتجات والمقالات الفنية حول المواد الكيميائية الصناعية من فريق خبراء Sinopeakchem.",
    heroTitle: "المدونة",
    heroDesc: "رؤى الصناعة، أدلة المنتجات، والمقالات الفنية من فريق الخبراء لدينا.",
    readMore: "اقرأ المزيد",
    prev: "السابق",
    next: "التالي",
    page: "صفحة",
  } : {
    title: "Blog - Chemical Industry Insights and Product Guides",
    description: "Read the latest industry news, product guides, and technical articles about industrial chemicals from Sinopeakchem's expert team.",
    heroTitle: "Blog",
    heroDesc: "Industry insights, product guides, and technical articles from our expert team.",
    readMore: "Read More",
    prev: "Previous",
    next: "Next",
    page: "Page",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout
      title={content.title}
      description={content.description}
      jsonLd={jsonLd}
    >
      <div className={isAr ? 'text-right' : ''}>
        {/* Hero Section - Restored to original blue gradient style */}
        <section className="bg-gradient-to-br from-[#0066B3] to-[#004A82] text-white py-16">
          <div className="container mx-auto px-4">
            <div className={`max-w-3xl ${isAr ? 'mr-0 ml-auto' : ''}`}>
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight ${isAr ? 'font-arabic' : ''}`}>
                {content.heroTitle}
              </h1>
              <p className={`text-blue-100 text-lg leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
                {content.heroDesc}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {/* Featured Post */}
            {featuredPost ? (
              <div className="mb-16">
                <Link
                  to={`${langPrefix}/blog/${featuredPost.slug}`}
                  className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 ${isAr ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className={`flex items-center gap-4 text-sm text-slate-500 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString(isRu ? 'ru-RU' : (isFr ? 'fr-FR' : (isEs ? 'es-ES' : (isAr ? 'ar-SA' : 'en-US'))), {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                    </div>
                    <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 mb-6 group-hover:text-[#0066B3] transition-colors leading-tight ${isAr ? 'font-arabic' : ''}`}>
                      {featuredPost.title}
                    </h2>
                    <p className={`text-lg text-slate-600 mb-8 line-clamp-3 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
                      {featuredPost.description}
                    </p>
                    <div className={`flex items-center gap-2 text-[#0066B3] font-bold group/btn ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className={isAr ? 'font-arabic' : ''}>{content.readMore}</span>
                      {isAr ? <ArrowLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-2" /> : <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />}
                    </div>
                  </div>
                </Link>
              </div>
            ) : null}

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`${langPrefix}/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className={`flex items-center gap-3 text-xs text-slate-500 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString(isRu ? 'ru-RU' : (isFr ? 'fr-FR' : (isEs ? 'es-ES' : (isAr ? 'ar-SA' : 'en-US'))), {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold text-slate-900 mb-4 group-hover:text-[#0066B3] transition-colors line-clamp-2 leading-snug ${isAr ? 'font-arabic' : ''}`}>
                      {post.title}
                    </h3>
                    <p className={`text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow ${isAr ? 'font-arabic' : ''}`}>
                      {post.description}
                    </p>
                    <div className={`flex items-center gap-2 text-[#0066B3] font-bold text-sm mt-auto group/btn ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className={isAr ? 'font-arabic' : ''}>{content.readMore}</span>
                      {isAr ? <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" /> : <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`mt-16 flex items-center justify-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-full w-10 h-10"
                >
                  {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={`rounded-full w-10 h-10 font-bold ${currentPage === page ? 'bg-[#0066B3] hover:bg-[#004A82]' : ''}`}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-full w-10 h-10"
                >
                  {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
