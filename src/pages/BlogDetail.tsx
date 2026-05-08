import { useParams, Link, useLocation } from "react-router-dom";
import { 
  ChevronRight, Calendar, User, Share2, Facebook, Twitter, Linkedin, 
  ArrowLeft, Tag, Globe, CheckCircle2, Package, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "../hooks/useMarkdownContent";
import { useSiteConfig } from "../hooks/useSiteConfig";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { JsonLd, generateBlogSchema } from "../components/JsonLd";
import { useMemo, useState } from "react";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");
  const isAr = location.pathname.startsWith("/ar");
  const locale = isRu ? "ru" : (isFr ? "fr" : (isEs ? "es" : (isAr ? "ar" : "en")));
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : (isEs ? "/es" : (isAr ? "/ar" : "/en")));
  
  const { posts, products, getPostBySlug } = useMarkdownContent(locale);
  const { toast } = useToast();
  const post = getPostBySlug(slug || "");

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryQuantity, setInquiryQuantity] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubscribe, setInquirySubscribe] = useState(true);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const recentPosts = useMemo(() => {
    if (!post) return [];
    return posts
      .filter((b: any) => b.slug !== post.slug)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [post, posts]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
          type: 'blog_inquiry',
          postTitle: post?.title,
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
    quickInquiry: "Быстрый запрос",
    inquiryDesc: "Есть вопросы? Наша команда готова помочь.",
    name: "Ваше имя",
    email: "Ваш Email",
    company: "Компания",
    phone: "Телефон",
    quantity: "Количество",
    message: "Ваше сообщение",
    submit: "Отправить запрос",
    subscribeText: "Подпишитесь на нашу рассылку.",
    relatedProducts: "Похожие продукты",
  } : (isFr ? {
    home: "Accueil",
    blog: "Blog",
    backToBlog: "Retour au blog",
    share: "Partager :",
    recentArticles: "Articles Récents",
    quickInquiry: "Demande Rapide",
    inquiryDesc: "Une question ? Notre équipe est là pour vous aider.",
    name: "Votre Nom",
    email: "Votre Email",
    company: "Entreprise",
    phone: "Téléphone",
    quantity: "Quantité",
    message: "Votre Message",
    submit: "Envoyer la Demande",
    subscribeText: "Abonnez-vous à notre newsletter.",
    relatedProducts: "Produits Connexes",
  } : (isEs ? {
    home: "Inicio",
    blog: "Blog",
    backToBlog: "Volver al Blog",
    share: "Compartir:",
    recentArticles: "Artículos Recientes",
    quickInquiry: "Consulta Rápida",
    inquiryDesc: "¿Tiene alguna pregunta? Nuestro equipo está aquí.",
    name: "Su Nombre",
    email: "Su Email",
    company: "Empresa",
    phone: "Teléfono",
    quantity: "Cantidad",
    message: "Su Mensaje",
    submit: "Enviar Consulta",
    subscribeText: "Suscríbase a nuestro boletín.",
    relatedProducts: "Productos Relacionados",
  } : isAr ? {
    home: "الرئيسية",
    blog: "المدونة",
    backToBlog: "العودة إلى المدونة",
    share: "مشاركة:",
    recentArticles: "مقالات حديثة",
    quickInquiry: "استفسار سريع",
    inquiryDesc: "هل لديك سؤال؟ فريقنا هنا للمساعدة.",
    name: "اسمك",
    email: "بريدك الإلكتروني",
    company: "الشركة",
    phone: "الهاتف",
    quantity: "الكمية",
    message: "رسالتك",
    submit: "إرسال الطلب",
    subscribeText: "اشترك في نشرتنا الإخبارية.",
    relatedProducts: "منتجات ذات صلة",
  } : {
    home: "Home",
    blog: "Blog",
    backToBlog: "Back to Blog",
    share: "Share:",
    recentArticles: "Recent Articles",
    quickInquiry: "Quick Inquiry",
    inquiryDesc: "Have a question? Our team is here to help.",
    name: "Full Name *",
    email: "Work Email *",
    company: "Company Name",
    phone: "Phone Number *",
    quantity: "Target Quantity *",
    message: "Your Message *",
    submit: "Submit Inquiry",
    subscribeText: "Subscribe to our newsletter for updates.",
    relatedProducts: "Related Products",
  }));

  const fallbackNotice = {
    ru: "Этот контент в настоящее время доступен только на английском языке и переводится.",
    fr: "Ce contenu n'est actuellement disponible qu'en anglais et est en cours de traduction.",
    es: "Este contenido actualmente solo está disponible en inglés y se está traduciendo.",
    ar: "هذا المحتوى متاح حاليًا باللغة الإنجليزية فقط وجاري ترجمته.",
    en: "This content is currently only available in English and is being translated."
  };

  return (
    <Layout
      title={`${post.title} | Sinopeakchem Blog`}
      description={post.excerpt}
      image={post.image}
    >
      {post.isFallback && locale !== 'en' && (
        <div className="bg-amber-50 border-b border-amber-100 py-2">
          <div className="container mx-auto px-4">
            <p className="text-xs text-amber-700 flex items-center gap-2 font-medium">
              <Globe className="w-3 h-3" />
              {fallbackNotice[locale as keyof typeof fallbackNotice]}
            </p>
          </div>
        </div>
      )}
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
            <aside className="space-y-8">
              <div className="sticky top-24 space-y-8">
                {/* Quick Inquiry Card */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-blue-900/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  
                  <h3 className={`text-xl font-black text-slate-900 mb-2 relative z-10 ${isAr ? 'font-arabic text-right' : ''}`}>{content.quickInquiry}</h3>
                  <p className={`text-sm text-slate-500 font-medium mb-8 relative z-10 ${isAr ? 'font-arabic text-right' : ''}`}>{content.inquiryDesc}</p>
                  
                  {inquirySubmitted ? (
                    <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className={`text-xl font-bold text-slate-900 mb-2 ${isAr ? 'font-arabic' : ''}`}>{isRu ? "Запрос успешно отправлен!" : (isFr ? "Demande envoyée avec succès !" : (isEs ? "¡Consulta enviada con éxito!" : (isAr ? "تم إرسال الطلب بنجاح!" : "Inquiry Sent Successfully!")))}</h3>
                      <p className={`text-slate-500 ${isAr ? 'font-arabic' : ''}`}>{isRu ? "Мы отправили подтверждение на вашу почту. Наша команда скоро свяжется с вами." : (isFr ? "Nous avons envoyé une confirmation à votre adresse e-mail. Notre équipe vous contactera sous peu." : (isEs ? "Hemos enviado una confirmación a su correo electrónico. Nuestro equipo se pondrá en contacto con usted en breve." : (isAr ? "لقد أرسلنا تأكيداً إلى بريدك الإلكتروني. سيتصل بك فريقنا قريباً." : "We've sent a confirmation to your email. Our team will contact you shortly.")))}</p>
                    </div>
                  ) : (
                    <form 
                      onSubmit={handleInquirySubmit} 
                      className="space-y-4 relative z-10"
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          if (!inquiryName && !inquiryEmail && !inquiryPhone && !inquiryQuantity && !inquiryMessage) {
                            setIsFormExpanded(false);
                          }
                        }
                      }}
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest ${isAr ? 'text-right block' : ''}`}>{content.name}</Label>
                          <Input 
                            required 
                            placeholder="John Doe" 
                            className={`h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all ${isAr ? 'text-right' : ''}`} 
                            value={inquiryName} 
                            onChange={e => setInquiryName(e.target.value)}
                            onFocus={() => setIsFormExpanded(true)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest ${isAr ? 'text-right block' : ''}`}>{content.email}</Label>
                          <Input 
                            required 
                            type="email" 
                            placeholder="john@company.com" 
                            className={`h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all ${isAr ? 'text-right' : ''}`} 
                            value={inquiryEmail} 
                            onChange={e => setInquiryEmail(e.target.value)}
                            onFocus={() => setIsFormExpanded(true)}
                          />
                        </div>

                        <div className={`space-y-4 overflow-hidden transition-all duration-500 ease-in-out ${isFormExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                          <div className="space-y-2">
                            <Label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest ${isAr ? 'text-right block' : ''}`}>{content.phone}</Label>
                            <Input 
                              required={isFormExpanded}
                              type="tel" 
                              placeholder="+1 234 567 890" 
                              className={`h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all ${isAr ? 'text-right' : ''}`} 
                              value={inquiryPhone} 
                              onChange={e => setInquiryPhone(e.target.value)} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest ${isAr ? 'text-right block' : ''}`}>{content.quantity}</Label>
                            <Input 
                              required={isFormExpanded}
                              placeholder="e.g. 25 MT" 
                              className={`h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all ${isAr ? 'text-right' : ''}`} 
                              value={inquiryQuantity} 
                              onChange={e => setInquiryQuantity(e.target.value)} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest ${isAr ? 'text-right block' : ''}`}>{content.company}</Label>
                            <Input 
                              placeholder="Optional" 
                              className={`h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all ${isAr ? 'text-right' : ''}`} 
                              value={inquiryCompany} 
                              onChange={e => setInquiryCompany(e.target.value)} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest ${isAr ? 'text-right block' : ''}`}>{content.message}</Label>
                            <Textarea 
                              required={isFormExpanded}
                              placeholder="Tell us about your requirements..." 
                              className={`min-h-[100px] rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all ${isAr ? 'text-right' : ''}`}
                              value={inquiryMessage}
                              onChange={e => setInquiryMessage(e.target.value)}
                            />
                          </div>
                          <div className={`flex items-center space-x-2 py-2 ${isAr ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <Checkbox 
                              id="inquiry-subscribe" 
                              checked={inquirySubscribe} 
                              onCheckedChange={(checked) => setInquirySubscribe(checked === true)}
                            />
                            <Label htmlFor="inquiry-subscribe" className={`text-xs text-slate-500 font-medium cursor-pointer ${isAr ? 'font-arabic' : ''}`}>
                              {content.subscribeText}
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className={`w-full h-14 bg-[#0066B3] hover:bg-[#005596] text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-900/10 mt-4 ${isAr ? 'font-arabic' : ''}`}>
                        {content.submit}
                      </Button>
                    </form>
                  )}
                </div>

                {/* Recent Articles */}
                <div>
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
                </div>

                {/* Related Products Sidebar (New addition to match Topic style layout) */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                  <h3 className={`text-lg font-black mb-6 flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <Package className="w-5 h-5 text-blue-400" />
                    <span className={isAr ? 'font-arabic' : ''}>{content.relatedProducts}</span>
                  </h3>
                  <div className="space-y-6">
                    {products.slice(0, 4).map((p) => (
                      <Link 
                        key={p.slug}
                        to={`${langPrefix}/topics/${p.slug}`}
                        className={`flex items-center gap-4 group ${isAr ? 'flex-row-reverse text-right' : ''}`}
                      >
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="min-w-0">
                          <h4 className={`text-sm font-bold truncate group-hover:text-blue-400 transition-colors ${isAr ? 'font-arabic' : ''}`}>{p.name}</h4>
                          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">CAS: {p.cas}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
