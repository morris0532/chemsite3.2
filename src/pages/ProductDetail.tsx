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
          name: docEmail.split('@')[0], // 临时从邮箱获取名称
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

  const currentUrl = `https://www.sinopeakchem.com${location.pathname}`;

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
      title={`${product.name} (CAS: ${product.cas}) | Sinopeakchem`}
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
                  <Link to={`${langPrefix}/contact`} className="flex-1 sm:flex-none">
                    <Button className="w-full sm:w-auto h-14 px-10 bg-[#0066B3] hover:bg-[#004A82] text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/10 transition-all hover:-translate-y-1">
                      {content.getQuote}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  
                  <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 sm:flex-none h-14 px-10 border-2 border-slate-200 text-slate-600 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all">
                        <Download className="w-4 h-4 mr-2" />
                        {content.techDocs}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-slate-900">
                          {isRu ? "Запросить документы" : (isFr ? "Demander des documents" : "Request Documents")}
                        </DialogTitle>
                      </DialogHeader>
                      {docSubmitted ? (
                        <div className="py-12 text-center">
                          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {isRu ? "Запрос отправлен!" : (isFr ? "Demande envoyée !" : "Request Sent!")}
                          </h3>
                          <p className="text-slate-500">
                            {isRu ? "Мы отправим документы на вашу почту в ближайшее время." : (isFr ? "Nous vous enverrons les documents par e-mail sous peu." : "We will send the documents to your email shortly.")}
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleDocSubmit} className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-slate-700">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="your@email.com" 
                              required 
                              value={docEmail}
                              onChange={(e) => setDocEmail(e.target.value)}
                              className="h-12 rounded-xl border-slate-200 focus:ring-[#0066B3]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="text-sm font-bold text-slate-700">
                              {isRu ? "Компания" : (isFr ? "Entreprise" : "Company")}
                            </Label>
                            <Input 
                              id="company" 
                              placeholder="Company Name" 
                              required 
                              value={docCompany}
                              onChange={(e) => setDocCompany(e.target.value)}
                              className="h-12 rounded-xl border-slate-200 focus:ring-[#0066B3]"
                            />
                          </div>
                          <div className="flex gap-6">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="msds" checked={docMSDS} onCheckedChange={(checked) => setDocMSDS(!!checked)} />
                              <label htmlFor="msds" className="text-sm font-medium text-slate-600">MSDS</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="coa" checked={docCOA} onCheckedChange={(checked) => setDocCOA(!!checked)} />
                              <label htmlFor="coa" className="text-sm font-medium text-slate-600">COA</label>
                            </div>
                          </div>
                          <Button type="submit" className="w-full h-12 bg-[#0066B3] hover:bg-[#004A82] text-white font-bold rounded-xl">
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

      {/* Product Content Tabs */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm h-auto">
                <TabsTrigger value="overview" className="px-8 py-3 rounded-xl data-[state=active]:bg-[#0066B3] data-[state=active]:text-white text-sm font-bold transition-all">
                  {content.overview}
                </TabsTrigger>
                <TabsTrigger value="specifications" className="px-8 py-3 rounded-xl data-[state=active]:bg-[#0066B3] data-[state=active]:text-white text-sm font-bold transition-all">
                  {content.specifications}
                </TabsTrigger>
                <TabsTrigger value="applications" className="px-8 py-3 rounded-xl data-[state=active]:bg-[#0066B3] data-[state=active]:text-white text-sm font-bold transition-all">
                  {content.applications}
                </TabsTrigger>
                <TabsTrigger value="faq" className="px-8 py-3 rounded-xl data-[state=active]:bg-[#0066B3] data-[state=active]:text-white text-sm font-bold transition-all">
                  {content.faq}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="max-w-4xl mx-auto">
              <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                  <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-[#0066B3]">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {product.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-0 focus-visible:outline-none">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-6 py-4 text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100">
                            {isRu ? "Параметр" : (isFr ? "Paramètre" : "Parameter")}
                          </th>
                          <th className="px-6 py-4 text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100">
                            {isRu ? "Значение" : (isFr ? "Valeur" : "Value")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {product.specifications.map((spec: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{spec.label}</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-10 p-6 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-4">
                    <Info className="w-6 h-6 text-[#0066B3] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {isRu 
                        ? "Приведенные выше характеристики являются стандартными. Мы также можем предоставить продукцию в соответствии с вашими специфическими требованиями. Пожалуйста, свяжитесь с нами для получения подробного COA." 
                        : (isFr ? "Les spécifications ci-dessus sont standard. Nous pouvons également fournir des produits selon vos exigences spécifiques. Veuillez nous contacter pour un COA détaillé." : "The above specifications are standard. We can also provide products according to your specific requirements. Please contact us for a detailed COA.")}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="mt-0 focus-visible:outline-none">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.applications.map((app: any, idx: number) => (
                      <div key={idx} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#0066B3] group-hover:text-white transition-colors">
                          <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{app.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{app.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-0 focus-visible:outline-none">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                  <div className="mb-10">
                    <h2 className="text-2xl font-black text-slate-900 mb-2">{content.faqTitle}</h2>
                    <p className="text-slate-500">{content.faqDesc}</p>
                  </div>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {product.faqs.map((faq: any, idx: number) => (
                      <AccordionItem key={idx} value={`faq-${idx}`} className="border border-slate-100 rounded-2xl px-6 overflow-hidden data-[state=open]:bg-slate-50/50 transition-all">
                        <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline py-5">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{content.trustTitle}</h2>
            <div className="w-20 h-1.5 bg-[#0066B3] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 text-[#0066B3] flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{content.trustQuality}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isRu 
                  ? "Строгий контроль качества на каждом этапе производства и соответствие международным стандартам." 
                  : (isFr ? "Contrôle qualité strict à chaque étape de la production et conformité aux normes internationales." : "Strict quality control at every stage of production and compliance with international standards.")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 text-[#0066B3] flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{content.trustGlobal}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isRu 
                  ? "Надежная логистическая сеть, обеспечивающая своевременную доставку в более чем 50 стран мира." 
                  : (isFr ? "Réseau logistique fiable assurant une livraison rapide dans plus de 50 pays à travers le monde." : "Reliable logistics network ensuring timely delivery to over 50 countries worldwide.")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 text-[#0066B3] flex items-center justify-center mx-auto mb-6">
                <Microscope className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{content.trustSupport}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isRu 
                  ? "Профессиональная техническая поддержка и помощь в выборе оптимальных решений для вашего бизнеса." 
                  : (isFr ? "Support technique professionnel et assistance dans le choix des solutions optimales pour votre entreprise." : "Professional technical support and assistance in choosing the optimal solutions for your business.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">{content.relatedProducts}</h2>
                <p className="text-slate-500 font-medium">{content.relatedTitle}</p>
              </div>
              <Link to={`${langPrefix}/products`} className="hidden md:flex items-center gap-2 text-[#0066B3] font-bold hover:gap-3 transition-all">
                {content.viewAll}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((rp: any) => (
                <Link 
                  key={rp.slug} 
                  to={`${langPrefix}/products/${rp.slug}`}
                  className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-square bg-slate-50 p-8 overflow-hidden relative">
                    <img 
                      src={rp.image} 
                      alt={rp.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#0066B3]/0 group-hover:bg-[#0066B3]/5 transition-colors duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-black text-[#0066B3] uppercase tracking-widest mb-2 block">{rp.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0066B3] transition-colors line-clamp-1">{rp.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{rp.shortDescription}</p>
                    <div className="flex items-center text-xs font-black text-slate-900 uppercase tracking-widest group-hover:gap-2 transition-all">
                      {isRu ? "Подробнее" : (isFr ? "Détails" : "View Details")}
                      <ChevronRight className="w-4 h-4 text-[#0066B3]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
