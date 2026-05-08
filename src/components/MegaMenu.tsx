import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Beaker, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { MEGA_MENU_CATEGORIES, MEGA_MENU_TRANSLATIONS } from "@/constants/megaMenuData";

interface MegaMenuProps {
  lang: 'en' | 'ru' | 'fr' | 'es' | 'ar';
  products: any[];
  posts: any[];
  onClose: () => void;
}

export default function MegaMenu({ lang, products, posts, onClose }: MegaMenuProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(MEGA_MENU_CATEGORIES[0].id);
  const [hoveredProductSlug, setHoveredProductSlug] = useState<string | null>(null);

  const activeCategory = useMemo(() => 
    MEGA_MENU_CATEGORIES.find(c => c.id === activeCategoryId) || MEGA_MENU_CATEGORIES[0]
  , [activeCategoryId]);

  const filteredProducts = useMemo(() => {
    // 动态根据产品的 categories 数组进行匹配
    const filtered = products.filter(p => {
      if (p.categories && Array.isArray(p.categories)) {
        return p.categories.includes(activeCategory.id);
      }
      // 兼容旧的单分类属性
      return p.category === activeCategory.id;
    });

    return filtered;
  }, [products, activeCategory]);

  const featuredPost = useMemo(() => {
    if (!posts || posts.length === 0) return null;
    
    // 基于时间的随机逻辑：每10分钟更换一篇文章
    // 使用当前小时 * 6 + 分钟 / 10 作为种子
    const now = new Date();
    const seed = now.getHours() * 6 + Math.floor(now.getMinutes() / 10);
    
    // 为了让每个语言下看到的文章都比较相关，先过滤出有描述或图片的文章
    const qualityPosts = posts.filter(p => p.image && (p.excerpt || p.description));
    const pool = qualityPosts.length > 0 ? qualityPosts : posts;
    
    // 使用种子选取文章
    return pool[seed % pool.length];
  }, [posts]);

  const langPrefix = lang === 'en' ? '/en' : `/${lang}`;
  const t = (key: keyof typeof MEGA_MENU_TRANSLATIONS) => MEGA_MENU_TRANSLATIONS[key][lang];

  return (
    <div className="relative w-full">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-95"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 shadow-2xl border-t border-slate-700">
        <div className="container mx-auto flex h-[420px]">
          
          {/* Left Column: Categories with Glassmorphism */}
          <div className="w-1/4 border-r border-slate-700/50 py-8 px-0 overflow-y-auto">
            <div className="space-y-2 px-4">
              {MEGA_MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActiveCategoryId(cat.id)}
                  className={`w-full text-left px-6 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    activeCategoryId === cat.id 
                      ? "bg-white/15 backdrop-blur-md text-white border border-white/30 shadow-lg" 
                      : "text-slate-300 hover:bg-white/8 hover:backdrop-blur-sm border border-transparent hover:border-white/20"
                  }`}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-center justify-between">
                    <span className="font-bold text-sm uppercase tracking-wider">{cat.labels[lang]}</span>
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${activeCategoryId === cat.id ? "translate-x-1 text-blue-300" : "opacity-0 group-hover:opacity-100"}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Middle Column: Products Grid with Enhanced Cards */}
          <div className="w-1/2 p-8 overflow-y-auto bg-gradient-to-b from-white/5 to-white/0">
            {/* Category Header */}
            <div className="mb-8 px-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em]">
                  {activeCategory.labels[lang]}
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                {activeCategory.descriptions[lang]}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.slug}
                  to={`${langPrefix}/topics/${product.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredProductSlug(product.slug)}
                  onMouseLeave={() => setHoveredProductSlug(null)}
                  className={`relative group rounded-xl p-3 transition-all duration-300 overflow-hidden ${
                    hoveredProductSlug === product.slug
                      ? "bg-white/20 backdrop-blur-md border border-white/40 shadow-xl"
                      : "bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-white/12 hover:border-white/20"
                  }`}
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-all duration-300"></div>

                  {/* Content */}
                  <div className="relative flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      hoveredProductSlug === product.slug
                        ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"
                        : "bg-white/10 border border-white/20"
                    }`}>
                      <Beaker className={`w-6 h-6 ${hoveredProductSlug === product.slug ? "text-white" : "text-blue-300"}`} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors truncate">
                        {product.name}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">CAS: {product.cas}</span>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${hoveredProductSlug === product.slug ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                    <ArrowRight className="w-4 h-4 text-blue-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Knowledge with Magazine Layout */}
          <div className="w-1/4 p-8 border-l border-slate-700/50 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">
                {t('featuredKnowledge')}
              </h3>
            </div>

            {featuredPost ? (
              <div className="flex flex-col h-full">
                {/* Featured Image with Overlay */}
                <div className="aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group mb-3 flex-shrink-0">
                  <img 
                    src={featuredPost.image || "/blog-placeholder.jpg"} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-blue-400/50">
                    {featuredPost.category || 'Featured'}
                  </div>

                  {/* Read More Link */}
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      to={`${langPrefix}/blog/${featuredPost.slug}`}
                      onClick={onClose}
                      className="text-white text-xs font-bold flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/30 transition-all"
                    >
                      {t('readMore')} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Article Info */}
                <div className="flex-1 flex flex-col">
                  <h4 className="font-bold text-slate-100 leading-tight mb-2 line-clamp-2 text-sm">
                    {featuredPost.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed flex-1">
                    {featuredPost.excerpt || featuredPost.description}
                  </p>
                  
                  {/* View All Link */}
                  <Link 
                    to={`${langPrefix}/topics`}
                    onClick={onClose}
                    className="text-blue-300 text-xs font-bold uppercase tracking-tighter hover:text-blue-200 transition-colors flex items-center gap-1 group"
                  >
                    {t('viewAllTopics')}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <BookOpen className="w-12 h-12 mb-2 opacity-30" />
                <p className="text-xs font-medium italic">No featured articles yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
