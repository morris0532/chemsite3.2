import { useParams, Link, useLocation } from "react-router-dom";
import { 
  ChevronRight, FileText, Share2, Facebook, Twitter, Linkedin, 
  Download, CheckCircle2, Info, Package, Truck, ShieldCheck, 
  ArrowRight, HelpCircle, Layers, Target, Mail, Beaker, 
  Globe, Shield, Zap, Award, Microscope
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
import Layout from "@/components/Layout";
import { products } from "@/data/products";
import { productsRu } from "@/data/products_ru";
import { JsonLd, generateProductSchema } from "../components/JsonLd";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const locale = isRu ? "ru" : "en";
  const langPrefix = isRu ? "/ru" : "/en";
  
  const currentProducts = isRu ? productsRu : products;
  const product = currentProducts.find(p => p.slug === slug) as any;
  
  const [docEmail, setDocEmail] = useState("");
  const [docCompany, setDocCompany] = useState("");
  const [docMSDS, setDocMSDS] = useState(true);
  const [docCOA, setDocCOA] = useState(true);
  const [docSubmitted, setDocSubmitted] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return currentProducts
      .filter(p => p.slug !== product.slug && p.category === product.category)
      .slice(0, 4);
  }, [product, currentProducts]);

  if (!product) {
    return (
      <Layout title={isRu ? "Продукт не найден" : "Product Not Found"}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{isRu ? "Продукт не найден" : "Product Not Found"}</h1>
          <p className="text-gray-600 mb-6">{isRu ? "Продукт, который вы ищете, не существует." : "The product you are looking for does not exist."}</p>
          <Link to={`${langPrefix}/products`}><Button className="bg-[#0066B3] text-white">{isRu ? "Все продукты" : "Browse All Products"}</Button></Link>
        </div>
      </Layout>
    );
  }

  const handleDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDocSubmitted(true);
    setTimeout(() => {
      setDocSubmitted(false);
      setDocModalOpen(false);
      setDocEmail("");
      setDocCompany("");
    }, 3000);
  };

  const currentUrl = `https://sinopeakchem.com${location.pathname}`;

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
  };

  return (
    <Layout 
      title={`${product.name} (CAS: ${product.cas}) | SinoPeak`}
      description={product.shortDescription}
      image={product.image}
      jsonLd={generateProductSchema(product, currentUrl)}
    >
      {/* Hero Section - Premium Split Layout */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
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
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Loading</p>
                    <p className="text-base font-bold text-slate-900">{product.loading}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="h-14 px-8 bg-[#0066B3] hover:bg-[#004a82] text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1">
                        {content.getQuote} <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-8">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900">{content.getQuote}</DialogTitle>
                      </DialogHeader>
                      {docSubmitted ? (
                        <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                          <p className="text-slate-500">Our team will contact you within 24 hours.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleDocSubmit} className="space-y-6 mt-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Work Email</Label>
                            <Input required type="email" placeholder="name@company.com" className="h-12 rounded-xl border-slate-200 focus:ring-[#0066B3]" value={docEmail} onChange={e => setDocEmail(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name</Label>
                            <Input required placeholder="Your Company Ltd." className="h-12 rounded-xl border-slate-200 focus:ring-[#0066B3]" value={docCompany} onChange={e => setDocCompany(e.target.value)} />
                          </div>
                          <div className="flex gap-6 py-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="msds" checked={docMSDS} onCheckedChange={(v) => setDocMSDS(!!v)} />
                              <label htmlFor="msds" className="text-sm font-bold text-slate-700">MSDS</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="coa" checked={docCOA} onCheckedChange={(v) => setDocCOA(!!v)} />
                              <label htmlFor="coa" className="text-sm font-bold text-slate-700">COA</label>
                            </div>
                          </div>
                          <Button type="submit" className="w-full h-14 bg-[#0066B3] hover:bg-[#004a82] text-white rounded-xl font-bold text-base">
                            Submit Request
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" className="h-14 px-8 border-slate-200 rounded-2xl font-bold text-base text-slate-600 hover:bg-slate-50 transition-all">
                    <Download className="mr-2 w-5 h-5" /> {content.techDocs}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Asymmetric Layout */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-8">
            {/* Left: Detailed Content Sections */}
            <div className="w-full lg:w-2/3 px-8">
              {/* Overview Section */}
              <div id="overview" className="mb-24 scroll-mt-32">
                <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight flex items-center gap-4">
                  <span className="w-12 h-1 bg-[#0066B3] rounded-full" />
                  {content.overview}
                </h2>
                <div className="prose prose-slate max-w-none prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-p:font-medium prose-strong:text-slate-900 prose-strong:font-black prose-headings:font-black prose-headings:tracking-tight">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {product.description}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Specifications Section */}
              <div id="specs" className="mb-24 scroll-mt-32">
                <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight flex items-center gap-4">
                  <span className="w-12 h-1 bg-[#0066B3] rounded-full" />
                  {content.specifications}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specs.map((spec: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{spec.label}</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-[#0066B3] transition-colors">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications Section - Modern Card Grid */}
              <div id="apps" className="mb-24 scroll-mt-32">
                <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight flex items-center gap-4">
                  <span className="w-12 h-1 bg-[#0066B3] rounded-full" />
                  {content.applications}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.applications.map((app: string, i: number) => (
                    <div key={i} className="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 hover:-translate-y-1">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0066B3] transition-all duration-500">
                        <Beaker className="w-7 h-7 text-[#0066B3] group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-[#0066B3] transition-colors">{app}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        High-performance application in {app.toLowerCase()} industries, ensuring optimal results and cost-efficiency.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sticky Navigation & Trust Badges */}
            <div className="w-full lg:w-1/3 px-8 mb-16 lg:mb-0 order-last">
              <div className="lg:sticky lg:top-32">
                <div className="mb-12 hidden lg:block">
                  <h2 className="text-[11px] font-black text-[#0066B3] uppercase tracking-[0.3em] mb-4">Navigation</h2>
                  <nav className="space-y-2">
                    {[
                      {id: 'overview', label: content.overview},
                      {id: 'specs', label: content.specifications},
                      {id: 'apps', label: content.applications}
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center w-full p-4 rounded-2xl text-left font-bold text-slate-600 hover:bg-white hover:text-[#0066B3] hover:shadow-sm transition-all group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-4 group-hover:bg-[#0066B3] transition-colors" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm mb-8">
                  <h3 className="text-lg font-black text-slate-900 mb-6">{content.trustTitle}</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-[#0066B3]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{content.trustQuality}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">SGS & BV Inspected</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-[#0066B3]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{content.trustGlobal}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">50+ Countries Served</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Microscope className="w-5 h-5 text-[#0066B3]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{content.trustSupport}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">Expert Lab Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full h-14 px-8 bg-[#0066B3] hover:bg-[#004a82] text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1">
                        {content.getQuote} <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-8">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900">{content.getQuote}</DialogTitle>
                      </DialogHeader>
                      {docSubmitted ? (
                        <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                          <p className="text-slate-500">Our team will contact you within 24 hours.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleDocSubmit} className="space-y-6 mt-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Work Email</Label>
                            <Input required type="email" placeholder="name@company.com" className="h-12 rounded-xl border-slate-200 focus:ring-[#0066B3]" value={docEmail} onChange={e => setDocEmail(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name</Label>
                            <Input required placeholder="Your Company Ltd." className="h-12 rounded-xl border-slate-200 focus:ring-[#0066B3]" value={docCompany} onChange={e => setDocCompany(e.target.value)} />
                          </div>
                          <div className="flex gap-6 py-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="msds" checked={docMSDS} onCheckedChange={(v) => setDocMSDS(!!v)} />
                              <label htmlFor="msds" className="text-sm font-bold text-slate-700">MSDS</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="coa" checked={docCOA} onCheckedChange={(v) => setDocCOA(!!v)} />
                              <label htmlFor="coa" className="text-sm font-bold text-slate-700">COA</label>
                            </div>
                          </div>
                          <Button type="submit" className="w-full h-14 bg-[#0066B3] hover:bg-[#004a82] text-white rounded-xl font-bold text-base">
                            Submit Request
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

      {/* FAQ Section - Clean & Minimal */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-[11px] font-black text-[#0066B3] uppercase tracking-[0.3em] mb-4">Support</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">{content.faqTitle}</h3>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {product.faqs.map((faq: any, i: number) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-slate-100 rounded-3xl px-8 bg-slate-50/30 overflow-hidden transition-all hover:bg-white hover:shadow-lg hover:shadow-blue-900/5">
                  <AccordionTrigger className="hover:no-underline py-6 text-left font-bold text-slate-900 text-lg hover:text-[#0066B3] transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-8 leading-relaxed text-base font-medium">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Related Products - Premium Carousel Style */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-slate-900 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Discovery</h2>
                <h3 className="text-4xl font-black text-white tracking-tight">{isRu ? "Похожие продукты" : "Related Products"}</h3>
              </div>
              <Link to={`${langPrefix}/products`} className="flex items-center gap-2 text-blue-400 font-black text-sm hover:gap-4 transition-all duration-300">
                {content.viewAll} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p: any) => (
                <Link key={p.slug} to={`${langPrefix}/products/${p.slug}`} className="group relative bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-8 border border-white/10 hover:bg-white transition-all duration-500 hover:-translate-y-2">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 mb-8 p-6 group-hover:bg-slate-50 transition-all duration-500">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-slate-900 transition-colors duration-500 mb-2">{p.name}</h3>
                  <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest">{p.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
