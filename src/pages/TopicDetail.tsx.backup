import { useMemo, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { 
  Home, ChevronRight, Beaker, BookOpen, ArrowRight, 
  FileText, Download, ShieldCheck, Zap,
  TrendingUp, Calendar, MessageSquare, Globe,
  CheckCircle2, Mail, Phone, Info, Package, Truck, Award
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function TopicDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  const currentLang = isRu ? 'ru' : (isFr ? 'fr' : (isEs ? 'es' : (isAr ? 'ar' : 'en')));

  const { products, posts: currentPosts, getProductBySlug } = useMarkdownContent(currentLang);
  const { posts: enPosts } = useMarkdownContent('en');

  // 聚合当前语言文章和英文文章，确保多语言版本不为空
  const posts = useMemo(() => {
    if (currentLang === 'en') return currentPosts;
    
    // 以英文文章为基准，如果当前语言有对应的翻译则替换，否则使用英文原版
    const combined = [...enPosts].map(enP => {
      // 统一使用 RootnoTouch 进行多语言聚合匹配
      const translated = currentPosts.find(p => 
        (p.RootnoTouch && enP.RootnoTouch && p.RootnoTouch === enP.RootnoTouch) ||
        p.slug === enP.slug
      );
      return translated ? translated : { ...enP, isFallback: true };
    });
    
    return combined;
  }, [currentLang, currentPosts, enPosts]);

  const [activeTab, setActiveTab] = useState<"products" | "articles" | "market">("products");
  const { toast } = useToast();

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryQuantity, setInquiryQuantity] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubscribe, setInquirySubscribe] = useState(true);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const product = useMemo(() => 
    getProductBySlug(slug || "")
  , [getProductBySlug, slug]);

  const relatedPosts = useMemo(() => {
    if (!product) return [];
    
    // 获取产品的 Product 标识符（例如 soda-ash），并进行标准化处理
    const productId = String(product.Product || '').trim().toLowerCase();
    const productSlug = String(product.slug || '').trim().toLowerCase();
    
    return posts.filter(post => {
      // 核心逻辑：通过 Product 字段进行精确关联 (忽略大小写和空格)
      if (post.Product && productId) {
        const postProductAttr = String(post.Product).trim().toLowerCase();
        return postProductAttr === productId || postProductAttr === productSlug;
      }
      
      // 备选逻辑：如果 Product 字段缺失，尝试匹配 topic 字段
      if (post.topic) {
        const postTopic = String(post.topic).trim().toLowerCase();
        return postTopic === productId || postTopic === productSlug;
      }

      return false;
    });
  }, [posts, product]);

  // Filter posts by category for Technical Articles and Market Insights
  const technicalArticles = useMemo(() => {
    return relatedPosts.filter(post => {
      const category = String(post.category || '').trim().toLowerCase();
      // 兼容 'technical', 'tech', 'Technical' 等
      return category === 'technical' || category === 'tech';
    });
  }, [relatedPosts]);

  const marketInsights = useMemo(() => {
    return relatedPosts.filter(post => {
      const category = String(post.category || '').trim().toLowerCase();
      // 兼容 'marketing', 'market', 'Marketing' 等
      return category === 'marketing' || category === 'market';
    });
  }, [relatedPosts]);

  const fallbackNotice = {
    ru: "Этот контент в настоящее время доступен только на английском языке и переводится.",
    fr: "Ce contenu n'est actuellement disponible qu'en anglais et est en cours de traduction.",
    es: "Este contenido actualmente solo está disponible en inglés y se está traduciendo.",
    ar: "هذا المحتوى متاح حاليًا باللغة الإنجليزية فقط وجاري ترجمته.",
    en: "This content is currently only available in English and is being translated."
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inquiryName,
          email: inquiryEmail,
          company: inquiryCompany,
          phone: inquiryPhone,
          quantity: inquiryQuantity,
          message: inquiryMessage,
          type: 'product_inquiry',
          product: product.name,
          subscribe: inquirySubscribe
        }),
      });

      if (response.ok) {
        setInquirySubmitted(true);
        toast({
          title: isRu ? "Запрос отправлен" : (isFr ? "Demande envoyée" : (isEs ? "Consulta enviada" : (isAr ? "تم إرسال الطلب" : "Inquiry Sent"))),
          description: isRu ? "Мы получили ваш запрос и отправили письмо с подтверждением." : (isFr ? "Nous avons reçu votre demande et envoyé un e-mail de confirmation." : (isEs ? "Hemos recibido su solicitud y enviado un correo electrónico de confirmación." : (isAr ? "لقد تلقينا طلبك وأرسلنا بريدًا إلكترونيًا للتأكيد." : "We have received your request and sent a confirmation email."))),
        });
        setTimeout(() => {
          setInquirySubmitted(false);
          setInquiryName("");
          setInquiryEmail("");
          setInquiryCompany("");
          setInquiryPhone("");
          setInquiryQuantity("");
          setInquiryMessage("");
        }, 3000);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send inquiry. Please try again.",
        });
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
    }
  };

  const content = isRu ? {
    products: "Продукты",
    technicalArticles: "Технические статьи",
    marketInsights: "Анализ рынка",
    documents: "Документы",
    relatedProducts: "Похожие продукты",
    quickInquiry: "Быстрый запрос",
    inquiryDesc: "Есть вопросы? Наша команда готова помочь.",
    name: "Ваше имя",
    email: "Ваш Email",
    company: "Компания",
    phone: "Телефон",
    quantity: "Количество",
    message: "Ваше сообщение",
    submit: "Отправить запрос",
    readMore: "Читать далее",
    viewProduct: "Посмотреть продукт",
    subscribeText: "Подпишитесь на нашу рассылку."
  } : (isFr ? {
    products: "Produits",
    technicalArticles: "Articles Techniques",
    marketInsights: "Aperçu du Marché",
    documents: "Documents",
    relatedProducts: "Produits Connexes",
    quickInquiry: "Demande Rapide",
    inquiryDesc: "Une question ? Notre équipe est là pour vous aider.",
    name: "Votre Nom",
    email: "Votre Email",
    company: "Entreprise",
    phone: "Téléphone",
    quantity: "Quantité",
    message: "Votre Message",
    submit: "Envoyer la Demande",
    readMore: "Lire la suite",
    viewProduct: "Voir le produit",
    subscribeText: "Abonnez-vous à notre newsletter."
  } : isEs ? {
    products: "Productos",
    technicalArticles: "Artículos Técnicos",
    marketInsights: "Información del Mercado",
    documents: "Documentos",
    relatedProducts: "Productos Relacionados",
    quickInquiry: "Consulta Rápida",
    inquiryDesc: "¿Tiene alguna pregunta? Nuestro equipo está aquí.",
    name: "Su Nombre",
    email: "Su Email",
    company: "Empresa",
    phone: "Teléfono",
    quantity: "Cantidad",
    message: "Su Mensaje",
    submit: "Enviar Consulta",
    readMore: "Leer más",
    viewProduct: "Ver producto",
    subscribeText: "Suscríbase a nuestro boletín."
  } : isAr ? {
    products: "المنتجات",
    technicalArticles: "مقالات تقنية",
    marketInsights: "رؤى السوق",
    documents: "المستندات",
    relatedProducts: "منتجات ذات صلة",
    quickInquiry: "استفسار سريع",
    inquiryDesc: "هل لديك سؤال؟ فريقنا هنا للمساعدة.",
    name: "اسمك",
    email: "بريدك الإلكتروني",
    company: "الشركة",
    phone: "الهاتف",
    quantity: "الكمية",
    message: "رسالتك",
    submit: "إرسال الطلب",
    readMore: "اقرأ المزيد",
    viewProduct: "عرض المنتج",
    subscribeText: "اشترك في نشرتنا الإخبارية."
  } : {
    products: "Products",
    technicalArticles: "Technical Articles",
    marketInsights: "Market Insights",
    documents: "Safety & Docs",
    relatedProducts: "Related Products",
    quickInquiry: "Quick Inquiry",
    inquiryDesc: "Have a question? Our team is here to help.",
    name: "Full Name *",
    email: "Work Email *",
    company: "Company Name",
    phone: "Phone Number *",
    quantity: "Target Quantity *",
    message: "Your Message *",
    submit: "Submit Inquiry",
    readMore: "Read More",
    viewProduct: "View Product",
    subscribeText: "Subscribe to our newsletter for updates."
  });

  if (!product) return null;

  return (
    <Layout title={`${product.name} | Topic Hub`}>
      {product.isFallback && currentLang !== 'en' && (
        <div className="bg-amber-50 border-b border-amber-100 py-2">
          <div className="container mx-auto px-4">
            <p className="text-xs text-amber-700 flex items-center gap-2 font-medium">
              <Globe className="w-3 h-3" />
              {fallbackNotice[currentLang as keyof typeof fallbackNotice]}
            </p>
          </div>
        </div>
      )}
      {/* Breadcrumbs */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Link to={langPrefix} className="hover:text-[#0066B3] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <Link to={`${langPrefix}/topics`} className="hover:text-[#0066B3] transition-colors">Topic Hub</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-slate-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Optimized Height */}
      <section className="relative bg-gradient-to-r from-[#0A1D37] to-[#1a3a5f] overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] border-[0.5px] border-white rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-white">
            <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded mb-4">
              Topic Hub
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              {product.name}
            </h1>
            <p className="text-lg text-blue-100/80 max-w-2xl leading-relaxed font-medium">
              {product.shortDescription || product.description?.slice(0, 180) + "..."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Content Column */}
            <div className="flex-1 min-w-0">
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-full">
                <button 
                  onClick={() => setActiveTab("products")}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-center ${activeTab === "products" ? "bg-[#0066B3] text-white shadow-lg shadow-blue-900/10" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  {content.products}
                </button>
                <button 
                  onClick={() => setActiveTab("articles")}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-center ${activeTab === "articles" ? "bg-[#0066B3] text-white shadow-lg shadow-blue-900/10" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  {content.technicalArticles}
                </button>
                <button 
                  onClick={() => setActiveTab("market")}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-center ${activeTab === "market" ? "bg-[#0066B3] text-white shadow-lg shadow-blue-900/10" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  {content.marketInsights}
                </button>

              </div>

              {/* Tab Content */}
              <div className="space-y-12">
                {activeTab === "products" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      
                      <div className="relative flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-2/5 aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-4">
                            <Beaker className="w-5 h-5 text-[#0066B3]" />
                            <span className="text-xs font-black text-[#0066B3] uppercase tracking-widest">{product.category}</span>
                          </div>
                          <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{product.name}</h2>
                          <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CAS Number</p>
                              <p className="text-sm font-bold text-slate-900">{product.cas}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Formula</p>
                              <p className="text-sm font-bold text-slate-900">{product.formula || "N/A"}</p>
                            </div>
                          </div>
                          <p className="text-slate-600 font-medium leading-relaxed mb-8">
                            {product.shortDescription}
                          </p>
                          <Link to={`${langPrefix}/products/${product.slug}`}>
                            <Button className="h-14 px-8 bg-[#0066B3] hover:bg-[#005596] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/10">
                              {content.viewProduct} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "articles" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {technicalArticles.length > 0 ? (
                      technicalArticles.map((post) => (
                        <Link 
                          key={post.slug}
                          to={`${langPrefix}/blog/${post.slug}`}
                          className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                        >
                          <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-50">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="flex items-center gap-3 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <h3 className="text-lg font-black text-slate-900 mb-4 group-hover:text-[#0066B3] transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto flex items-center text-[10px] font-black text-[#0066B3] uppercase tracking-widest gap-2">
                            {content.readMore} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-100">
                        <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No technical articles found for this topic yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "market" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {marketInsights.length > 0 ? (
                      marketInsights.map((post) => (
                        <Link 
                          key={post.slug}
                          to={`${langPrefix}/blog/${post.slug}`}
                          className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                        >
                          <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-50">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="flex items-center gap-3 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <h3 className="text-lg font-black text-slate-900 mb-4 group-hover:text-[#0066B3] transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto flex items-center text-[10px] font-black text-[#0066B3] uppercase tracking-widest gap-2">
                            {content.readMore} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-100">
                        <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No market insights found for this topic yet.</p>
                      </div>
                    )}
                  </div>
                )}


              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-[380px] space-y-8">
              {/* Quick Inquiry Card */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-blue-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <h3 className="text-xl font-black text-slate-900 mb-2 relative z-10">{content.quickInquiry}</h3>
                <p className="text-sm text-slate-500 font-medium mb-8 relative z-10">{content.inquiryDesc}</p>
                
                {inquirySubmitted ? (
                  <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{isRu ? "Запрос успешно отправлен!" : (isFr ? "Demande envoyée avec succès !" : (isEs ? "¡Consulta enviada con éxito!" : (isAr ? "تم إرسال الطلب بنجاح!" : "Inquiry Sent Successfully!")))}</h3>
                    <p className="text-slate-500">{isRu ? "Мы отправили подтверждение на вашу почту. Наша команда скоро свяжется с вами." : (isFr ? "Nous avons envoyé une confirmation à votre adresse e-mail. Notre équipe vous contactera sous peu." : (isEs ? "Hemos enviado una confirmación a su correo electrónico. Nuestro equipo se pondrá en contacto con usted en breve." : (isAr ? "لقد أرسلنا تأكيداً إلى بريدك الإلكتروني. سيتصل بك فريقنا قريباً." : "We've sent a confirmation to your email. Our team will contact you shortly.")))}</p>
                  </div>
                ) : (
	                  <form 
	                    onSubmit={handleInquirySubmit} 
	                    className="space-y-4 relative z-10"
	                    onBlur={(e) => {
	                      // 如果焦点移出了整个表单，且关键字段为空，则折叠
	                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
	                        if (!inquiryName && !inquiryEmail && !inquiryPhone && !inquiryQuantity && !inquiryMessage) {
	                          setIsFormExpanded(false);
	                        }
	                      }
	                    }}
	                  >
                    <div className="space-y-4">
                      {/* Always visible: Name and Email */}
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{content.name}</Label>
                        <Input 
                          required 
                          placeholder="John Doe" 
                          className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all" 
                          value={inquiryName} 
                          onChange={e => setInquiryName(e.target.value)}
                          onFocus={() => setIsFormExpanded(true)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{content.email}</Label>
                        <Input 
                          required 
                          type="email" 
                          placeholder="john@company.com" 
                          className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all" 
                          value={inquiryEmail} 
                          onChange={e => setInquiryEmail(e.target.value)}
                          onFocus={() => setIsFormExpanded(true)}
                        />
                      </div>

                      {/* Expandable fields */}
                      <div className={`space-y-4 overflow-hidden transition-all duration-500 ease-in-out ${isFormExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{content.phone}</Label>
                          <Input 
                            required={isFormExpanded}
                            type="tel" 
                            placeholder="+1 234 567 890" 
                            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all" 
                            value={inquiryPhone} 
                            onChange={e => setInquiryPhone(e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{content.quantity}</Label>
                          <Input 
                            required={isFormExpanded}
                            placeholder="e.g. 25 MT" 
                            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all" 
                            value={inquiryQuantity} 
                            onChange={e => setInquiryQuantity(e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{content.company}</Label>
                          <Input 
                            placeholder="Optional" 
                            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all" 
                            value={inquiryCompany} 
                            onChange={e => setInquiryCompany(e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{content.message}</Label>
                          <Textarea 
                            required={isFormExpanded}
                            placeholder="Tell us about your requirements..." 
                            className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all"
                            value={inquiryMessage}
                            onChange={e => setInquiryMessage(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2 py-2">
                          <Checkbox 
                            id="inquiry-subscribe" 
                            checked={inquirySubscribe} 
                            onCheckedChange={(checked) => setInquirySubscribe(checked === true)}
                          />
                          <Label htmlFor="inquiry-subscribe" className="text-xs text-slate-500 font-medium cursor-pointer">
                            {content.subscribeText}
                          </Label>
                        </div>
                      </div>
                    </div>

	                    <Button type="submit" className="w-full h-14 bg-[#0066B3] hover:bg-[#005596] text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-900/10 mt-4">
                      {content.submit}
                    </Button>
                  </form>
                )}
              </div>

              {/* Related Products Sidebar */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-400" />
                  {content.relatedProducts}
                </h3>
                <div className="space-y-6">
                  {products.slice(0, 4).map((p) => (
                    <Link 
                      key={p.slug}
                      to={`${langPrefix}/topics/${p.slug}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold truncate group-hover:text-blue-400 transition-colors">{p.name}</h4>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">CAS: {p.cas}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
