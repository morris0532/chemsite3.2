import { useParams, Link, useLocation } from "react-router-dom";
import { 
  ChevronRight, FileText, Share2, Facebook, Twitter, Linkedin, 
  Download, CheckCircle2, Info, Package, Truck, ShieldCheck, 
  ArrowRight, HelpCircle, Layers, Target, Mail, Beaker, 
  Globe, Shield, Zap, Award, Microscope, MessageCircle, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Layout from "@/components/Layout";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";
import { generateProductSchema } from "../components/JsonLd";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const locale = isRu ? "ru" : (isFr ? "fr" : "en");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : "/en");
  
  const { products: markdownProducts } = useMarkdownContent(locale);
  const product = markdownProducts.find((p: any) => p.slug === slug);
  
  const [docEmail, setDocEmail] = useState("");
  const [docCompany, setDocCompany] = useState("");
  const [docMSDS, setDocMSDS] = useState(true);
  const [docCOA, setDocCOA] = useState(true);
  const [docSubmitted, setDocSubmitted] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return markdownProducts
      .filter((p: any) => p.slug !== product.slug && p.category === product.category)
      .slice(0, 4);
  }, [product, markdownProducts]);

  if (!product) {
    return (
      <Layout title={isRu ? "Продукт не найден" : (isFr ? "Produit non trouvé" : "Product Not Found")}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{isRu ? "Продукт не найден" : (isFr ? "Produit non trouvé" : "Product Not Found")}</h1>
          <p className="text-gray-600 mb-6">{isRu ? "Продукт, который вы ищете, не существует." : (isFr ? "Le produit que vous recherchez n'existe pas." : "The product you are looking for does not exist.")}</p>
          <Link to={`${langPrefix}/products`}><Button className="bg-[#0066B3] text-white">{isRu ? "Все продукты" : (isFr ? "Tous les produits" : "Browse All Products")}</Button></Link>
        </div>
      </Layout>
    );
  }

  const handleDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: docEmail.split('@')[0],
          email: docEmail,
          company: docCompany,
          type: 'doc_request',
          product: product.name,
          documents: [docMSDS ? 'MSDS' : '', docCOA ? 'COA' : ''].filter(Boolean).join(', ')
        }),
      });

      if (response.ok) {
        setDocSubmitted(true);
        setTimeout(() => {
          setDocSubmitted(false);
          setDocModalOpen(false);
          setDocEmail("");
          setDocCompany("");
        }, 3000);
      } else {
        console.error('Failed to send request');
        alert(isRu ? 'Ошибка при отправке запроса. Пожалуйста, попробуйте еще раз.' : (isFr ? 'Échec de l\'envoi de la demande. Veuillez réessayer.' : 'Failed to send request. Please try again.'));
      }
    } catch (error) {
      console.error('Error submitting document request:', error);
      alert(isRu ? 'Произошла ошибка. Пожалуйста, попробуйте позже.' : (isFr ? 'Une erreur est survenue. Veuillez réessayer plus tard.' : 'An error occurred. Please try again later.'));
    }
  };

  const content = isRu ? {
    specifications: "Технические характеристики",
    applications: "Применение",
    faq: "Часто задаваемые вопросы",
    relatedProducts: "Похожие продукты",
    getQuote: "Запросить цену",
    techDocs: "Тех. документы",
    packaging: "Упаковка",
    loading: "Загрузка",
    overview: "Обзор",
    share: "Поделиться",
    faqTitle: "Часто задаваемые вопросы",
    faqDesc: "Найдите ответы на распространенные вопросы о продукте",
    relatedTitle: "Другие высококачественные химикаты",
    viewAll: "Все продукты",
    trustTitle: "Почему выбирают нас",
    trustQuality: "Гарантия качества",
    trustGlobal: "Глобальная логистика",
    trustSupport: "Техническая поддержка"
  } : (isFr ? {
    specifications: "Spécifications",
    applications: "Applications",
    faq: "FAQ",
    relatedProducts: "Produits Connexes",
    getQuote: "Obtenir un Devis",
    techDocs: "Docs Techniques",
    packaging: "Emballage",
    loading: "Chargement",
    overview: "Aperçu",
    share: "Partager",
    faqTitle: "FAQ",
    faqDesc: "Trouvez des réponses aux questions courantes sur le produit",
    relatedTitle: "Autres produits chimiques de haute qualité",
    viewAll: "Voir tous les produits",
    trustTitle: "Pourquoi nous choisir",
    trustQuality: "Assurance Qualité",
    trustGlobal: "Logistique Mondiale",
    trustSupport: "Support Technique"
  } : {
    specifications: "Specifications",
    applications: "Applications",
    faq: "FAQ",
    relatedProducts: "Related Products",
    getQuote: "Get a Quote",
    techDocs: "Technical Docs",
    packaging: "Packaging",
    loading: "Loading",
    overview: "Overview",
    share: "Share",
    faqTitle: "FAQ",
    faqDesc: "Find answers to common questions about the product",
    relatedTitle: "Other high-quality chemicals you might be interested in",
    viewAll: "View All Products",
    trustTitle: "Why Choose SinoPeak",
    trustQuality: "Quality Assurance",
    trustGlobal: "Global Logistics",
    trustSupport: "Technical Support"
  });

  return (
    <Layout 
      title={`${product.name} (CAS: ${product.cas}) | SinoPeak`}
      description={product.shortDescription}
      image={product.image}
      jsonLd={generateProductSchema(product, locale)}
    >
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link to={langPrefix} className="hover:text-[#0066B3] transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" />
              {isRu ? "Главная" : (isFr ? "Accueil" : "Home")}
            </Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link to={`${langPrefix}/products`} className="hover:text-[#0066B3] transition-colors">
              {isRu ? "Продукты" : (isFr ? "Produits" : "Products")}
            </Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-slate-900 truncate max-w-[200px] md:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Premium Split Layout */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,102,179,0.03),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap -mx-4 items-center">
            {/* Left: Image with Premium Frame */}
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl shadow-blue-900/5">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-12 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Right: Content with High-End Typography */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="lg:pl-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-blue-50 text-[#0066B3] text-[11px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-100/50">
                    {product.category}
                  </span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-400 text-[11px] font-bold tracking-widest uppercase">CAS: {product.cas}</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                  {product.name}
                  <span className="block text-xl md:text-2xl font-bold text-slate-400 mt-2 tracking-normal">{product.nameCn}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-xl">
                  {product.shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">HS Code</p>
                    <p className="text-base font-bold text-slate-900">{product.hsCode}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">CAS Number</p>
                    <p className="text-base font-bold text-slate-900">{product.cas}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to={`${langPrefix}/contact`} className="flex-1 min-w-[200px]">
                    <Button size="lg" className="w-full bg-[#0066B3] hover:bg-[#004a82] text-white h-14 rounded-xl font-bold text-base shadow-xl shadow-blue-900/10 transition-all hover:-translate-y-1">
                      <Mail className="w-5 h-5 mr-2" />
                      {content.getQuote}
                    </Button>
                  </Link>
                  
                  <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="outline" className="flex-1 min-w-[200px] border-slate-200 text-slate-600 hover:bg-slate-50 h-14 rounded-xl font-bold text-base transition-all hover:-translate-y-1">
                        <FileText className="w-5 h-5 mr-2" />
                        {content.techDocs}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-slate-900">{isRu ? "Запросить документы" : (isFr ? "Demander des documents" : "Request Documents")}</DialogTitle>
                      </DialogHeader>
                      {docSubmitted ? (
                        <div className="py-12 text-center">
                          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{isRu ? "Запрос отправлен!" : (isFr ? "Demande envoyée !" : "Request Sent!")}</h3>
                          <p className="text-slate-500">{isRu ? "Мы отправим документы на вашу почту в ближайшее время." : (isFr ? "Nous enverrons les documents à votre adresse e-mail sous peu." : "We'll send the documents to your email shortly.")}</p>
                        </div>
                      ) : (
                        <form onSubmit={handleDocSubmit} className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-slate-700">{isRu ? "Электронная почта" : (isFr ? "E-mail" : "Email Address")}</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="buyer@company.com" 
                              required 
                              value={docEmail}
                              onChange={(e) => setDocEmail(e.target.value)}
                              className="h-12 rounded-xl border-slate-200 focus:ring-[#0066B3]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="text-sm font-bold text-slate-700">{isRu ? "Компания" : (isFr ? "Entreprise" : "Company Name")}</Label>
                            <Input 
                              id="company" 
                              placeholder="Global Chemicals Ltd" 
                              required 
                              value={docCompany}
                              onChange={(e) => setDocCompany(e.target.value)}
                              className="h-12 rounded-xl border-slate-200 focus:ring-[#0066B3]"
                            />
                          </div>
                          <div className="flex gap-6 pt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="msds" checked={docMSDS} onCheckedChange={(checked) => setDocMSDS(!!checked)} />
                              <label htmlFor="msds" className="text-sm font-medium text-slate-600">MSDS</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="coa" checked={docCOA} onCheckedChange={(checked) => setDocCOA(!!checked)} />
                              <label htmlFor="coa" className="text-sm font-medium text-slate-600">COA</label>
                            </div>
                          </div>
                          <Button type="submit" className="w-full bg-[#0066B3] hover:bg-[#004a82] text-white h-12 rounded-xl font-bold">
                            {isRu ? "Отправить запрос" : (isFr ? "Envoyer la demande" : "Send Request")}
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-slate-200 rounded-none h-auto p-0 mb-12 overflow-x-auto flex-nowrap">
                <TabsTrigger value="overview" className="px-8 py-4 text-sm font-bold border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:text-[#0066B3] rounded-none bg-transparent shadow-none">
                  {content.overview}
                </TabsTrigger>
                <TabsTrigger value="specifications" className="px-8 py-4 text-sm font-bold border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:text-[#0066B3] rounded-none bg-transparent shadow-none">
                  {content.specifications}
                </TabsTrigger>
                <TabsTrigger value="applications" className="px-8 py-4 text-sm font-bold border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:text-[#0066B3] rounded-none bg-transparent shadow-none">
                  {content.applications}
                </TabsTrigger>
                <TabsTrigger value="packaging" className="px-8 py-4 text-sm font-bold border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:text-[#0066B3] rounded-none bg-transparent shadow-none">
                  {content.packaging}
                </TabsTrigger>
              </TabsList>
              
              <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-blue-900/5">
                <TabsContent value="overview" className="mt-0 focus-visible:ring-0">
                  <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-[#0066B3]">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {product.description}
                    </ReactMarkdown>
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications" className="mt-0 focus-visible:ring-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="py-4 font-bold text-slate-900">{isRu ? "Параметр" : (isFr ? "Paramètre" : "Parameter")}</th>
                          <th className="py-4 font-bold text-slate-900">{isRu ? "Значение" : (isFr ? "Valeur" : "Value")}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {product.specifications?.map((spec: any, idx: number) => (
                          <tr key={idx}>
                            <td className="py-4 text-slate-500 font-medium">{spec.label}</td>
                            <td className="py-4 text-slate-900 font-bold">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="applications" className="mt-0 focus-visible:ring-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.applications?.map((app: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <CheckCircle2 className="w-5 h-5 text-[#0066B3]" />
                        </div>
                        <p className="text-slate-700 font-bold leading-tight pt-2">{app}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="packaging" className="mt-0 focus-visible:ring-0">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-slate-900 mb-6">{isRu ? "Стандартная упаковка" : (isFr ? "Emballage Standard" : "Standard Packaging")}</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
                          <Package className="w-6 h-6 text-[#0066B3]" />
                          <span className="font-bold text-slate-700">{product.packaging}</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
                          <Truck className="w-6 h-6 text-[#0066B3]" />
                          <span className="font-bold text-slate-700">{product.loading}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 aspect-square rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center p-12">
                      <Package className="w-full h-full text-slate-200" />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{content.trustTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-50 text-[#0066B3] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{content.trustQuality}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isRu ? "Строгий контроль качества каждой партии с полной документацией." : (isFr ? "Contrôle qualité rigoureux pour chaque lot avec documentation complète." : "Rigorous quality control for every batch with full documentation.")}
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-50 text-[#0066B3] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{content.trustGlobal}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isRu ? "Надежная доставка в более чем 50 стран мира." : (isFr ? "Expédition fiable vers plus de 50 pays à travers le monde." : "Reliable shipping to over 50 countries worldwide.")}
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-50 text-[#0066B3] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Microscope className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{content.trustSupport}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isRu ? "Экспертная техническая поддержка для всех ваших потребностей." : (isFr ? "Support technique expert pour tous vos besoins en produits chimiques." : "Expert technical support for all your chemical needs.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">{content.faqTitle}</h2>
              <p className="text-slate-500">{content.faqDesc}</p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {product.faqs?.map((faq: any, idx: number) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="bg-white border border-slate-100 rounded-2xl px-6 overflow-hidden shadow-sm">
                  <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black text-slate-900 mb-4">{content.relatedProducts}</h2>
              <p className="text-slate-500">{content.relatedTitle}</p>
            </div>
            <Link to={`${langPrefix}/products`}>
              <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 font-bold px-6 rounded-xl">
                {content.viewAll}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p: any) => (
              <Link key={p.slug} to={`${langPrefix}/products/${p.slug}`} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square bg-slate-50 p-8 overflow-hidden relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0066B3] transition-colors line-clamp-1">{p.name}</h3>
                  <p className="text-slate-500 text-xs line-clamp-2 mb-4">{p.shortDescription}</p>
                  <div className="flex items-center text-xs font-bold text-[#0066B3]">
                    {isRu ? "Подробнее" : (isFr ? "Détails" : "View Details")}
                    <ArrowRight className="w-3 h-3 ml-1.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#003d66] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 max-w-2xl mx-auto leading-tight">
            {isRu ? "Готовы обсудить ваши потребности в химикатах?" : (isFr ? "Prêt à discuter de vos besoins en produits chimiques ?" : "Ready to discuss your chemical requirements?")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={`${langPrefix}/contact`}>
              <Button size="lg" className="bg-white text-[#0066B3] hover:bg-blue-50 h-14 px-10 rounded-xl font-bold text-base shadow-2xl shadow-black/20">
                {content.getQuote}
              </Button>
            </Link>
            <a href="https://wa.me/8613583262050" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-10 rounded-xl font-bold text-base">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
