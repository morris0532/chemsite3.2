import { useParams, Link, useLocation } from "react-router-dom";
import { ChevronRight, Calendar, User, Share2, Facebook, Twitter, Linkedin, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "../hooks/useMarkdownContent";
import { useSiteConfig } from "../hooks/useSiteConfig";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { JsonLd, generateBlogSchema } from "../components/JsonLd";
import { useMemo } from "react";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const locale = isRu ? "ru" : (isFr ? "fr" : (isEs ? "es" : (isAr ? "ar" : "en")));
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  
  const { posts, getPostBySlug, isLoading } = useMarkdownContent(locale);
  const { ui } = useSiteConfig(locale);
  const post = getPostBySlug(slug || "");

  const recentPosts = useMemo(() => {
    if (!post) return [];
    return posts
      .filter((b: any) => b.slug !== post.slug)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [post, posts]);

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-200 rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title={isRu ? "Статья не найдена" : (isFr ? "Article non trouvé" : (isEs ? "Artículo no encontrado" : (isAr ? "المقال غير موجود" : "Article Not Found")))}>
        <div className={`container mx-auto px-4 py-20 text-center ${isAr ? 'text-right' : ''}`}>
          <h1 className={`text-2xl font-bold text-gray-800 mb-4 ${isAr ? 'font-arabic' : ''}`}>{isRu ? "Статья не найдена" : (isFr ? "Article non trouvé" : (isEs ? "Artículo no encontrado" : (isAr ? "المقال غير موجود" : "Article Not Found")))}</h1>
          <p className={`text-gray-600 mb-6 ${isAr ? 'font-arabic' : ''}`}>{isRu ? "Статья, которую вы ищете, не существует." : (isFr ? "L'article que vous recherchez n'existe pas." : (isEs ? "El artículo que busca no existe." : (isAr ? "المقال الذي تبحث عنه غير موجود." : "The article you are looking for does not exist.")))}</p>
          <Link to={`${langPrefix}/blog`}><Button className={`bg-[#0066B3] text-white ${isAr ? 'font-arabic' : ''}`}>{isRu ? "Просмотреть все статьи" : (isFr ? "Voir tous les articles" : (isEs ? "Ver todos los artículos" : (isAr ? "تصفح جميع المقالات" : "Browse All Articles")))}</Button></Link>
        </div>
      </Layout>
    );
  }

  const currentUrl = `https://sinopeakchem.com${langPrefix}/blog/${post.slug}`;

  const content = isRu ? {
    home: "Главная",
    blog: "Блог",
    backToBlog: "Назад в блог",
    share: "Поделиться:",
    recentArticles: "Последние статьи",
    needChemicals: "Нужны химические продукты?",
    getQuoteDesc: "Получите конкурентоспособные цены на 22+ промышленных химиката.",
    getQuote: "Получить предложение",
  } : (isFr ? {
    home: "Accueil",
    blog: "Blog",
    backToBlog: "Retour au blog",
    share: "Partager :",
    recentArticles: "Articles Récents",
    needChemicals: "Besoin de Produits Chimiques ?",
    getQuoteDesc: "Obtenez des tarifs compétitifs sur plus de 22 produits chimiques industriels.",
    getQuote: "Obtenir un Devis",
  } : (isEs ? {
    home: "Inicio",
    blog: "Blog",
    backToBlog: "Volver al Blog",
    share: "Compartir:",
    recentArticles: "Artículos Recientes",
    needChemicals: "¿Necesita productos químicos?",
    getQuoteDesc: "Obtenga precios competitivos en más de 22 productos químicos industriales.",
    getQuote: "Obtener una Cotización",
  } : isAr ? {
    home: "الرئيسية",
    blog: "المدونة",
    backToBlog: "العودة إلى المدونة",
    share: "مشاركة:",
    recentArticles: "مقالات حديثة",
    needChemicals: "هل تحتاج إلى منتجات كيميائية؟",
    getQuoteDesc: "احصل على أسعار تنافسية لأكثر من 22 مادة كيميائية صناعية.",
    getQuote: "احصل على عرض سعر",
  } : {
    home: "Home",
    blog: "Blog",
    backToBlog: "Back to Blog",
    share: "Share:",
    recentArticles: "Recent Articles",
    needChemicals: "Need Chemical Products?",
    getQuoteDesc: "Get competitive pricing on 22+ industrial chemicals.",
    getQuote: "Get a Quote",
  }));

  return (
    <Layout
      title={`${post.title} | Sinopeakchem Blog`}
      description={post.excerpt}
      image={post.image}
    >
      <JsonLd data={generateBlogSchema(post, locale)} />

      {/* Breadcrumb */}
      <div className="bg-[#F5F7FA] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to={langPrefix} className="hover:text-[#0066B3]">{content.home}</Link>
            <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            <Link to={`${langPrefix}/blog`} className="hover:text-[#0066B3]">{content.blog}</Link>
            <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            <span className={`text-[#0066B3] font-medium line-clamp-1 ${isAr ? 'font-arabic' : ''}`}>{post.title}</span>
          </nav>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Article */}
            <article className={`lg:col-span-2 ${isAr ? 'text-right' : ''}`}>
              <Link to={`${langPrefix}/blog`} className="inline-flex items-center text-sm text-[#0066B3] hover:underline mb-4">
                <ArrowLeft className={`w-4 h-4 mr-1 ${isAr ? 'rotate-180' : ''}`} /> {content.backToBlog}
              </Link>

              <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-1 rounded-full">{post.category}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString(isRu ? "ru-RU" : (isFr ? "fr-FR" : (isEs ? "es-ES" : (isAr ? "ar-SA" : "en-US"))), { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              </div>
    
              <h1 className={`text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6 ${isAr ? 'font-arabic' : ''}`}>{post.title}</h1>

              <div className="prose prose-gray max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                <Tag className="w-4 h-4 text-gray-400 mr-1" />
                {post.tags.map((tag: string) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">#{tag}</span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                <span className="text-sm text-gray-500 flex items-center gap-1"><Share2 className="w-4 h-4" /> {content.share}</span>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4 text-gray-600" /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on Facebook"><Facebook className="w-4 h-4 text-gray-600" /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on Twitter"><Twitter className="w-4 h-4 text-gray-600" /></a>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-24">
                <h3 className={`text-lg font-bold text-[#1A1A2E] mb-4 ${isAr ? 'font-arabic text-right' : ''}`}>{content.recentArticles}</h3>
                <div className="space-y-4">
                  {recentPosts.map((rp: any) => (
                    <Link key={rp.slug} to={`${langPrefix}/blog/${rp.slug}`} className={`group flex gap-3 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="w-20 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={rp.image} alt={rp.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-medium text-[#1A1A2E] group-hover:text-[#0066B3] transition-colors line-clamp-2 ${isAr ? 'font-arabic' : ''}`}>{rp.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{new Date(rp.date).toLocaleDateString(isRu ? "ru-RU" : (isFr ? "fr-FR" : (isEs ? "es-ES" : (isAr ? "ar-SA" : "en-US"))), { month: "short", day: "numeric" })}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <div className={`mt-8 bg-[#0066B3] rounded-xl p-6 text-white ${isAr ? 'text-right' : ''}`}>
                  <h3 className={`font-bold mb-2 ${isAr ? 'font-arabic' : ''}`}>{content.needChemicals}</h3>
                  <p className={`text-sm text-blue-100 mb-4 ${isAr ? 'font-arabic' : ''}`}>{content.getQuoteDesc}</p>
                  <Link to={`${langPrefix}/contact`}>
                    <Button className={`w-full bg-white text-[#0066B3] hover:bg-blue-50 ${isAr ? 'font-arabic' : ''}`}>{content.getQuote}</Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
