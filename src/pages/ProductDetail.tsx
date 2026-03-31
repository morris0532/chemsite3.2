import { useParams, Link, useLocation } from "react-router-dom";
import { ChevronRight, FileText, Share2, Facebook, Twitter, Linkedin, Download, CheckCircle2, Info, Package, Truck, ShieldCheck, ArrowRight, HelpCircle, Layers, Target, Mail } from "lucide-react";
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
  };

  return (
    <Layout
      title={`${product.name} - CAS ${product.cas} | ${isRu ? "Поставщик промышленной химии" : "Industrial Chemical Supplier"}`}
      description={product.shortDescription}
      image={product.image}
    >
      <JsonLd data={generateProductSchema(product, locale)} />

      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-[#F8FAFC] to-[#F0F4F8] border-b border-gray-100/50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-semibold" aria-label="Breadcrumb">
            <Link to={langPrefix} className="hover:text-[#0066B3] transition-colors duration-300">{isRu ? "Главная" : "Home"}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link to={`${langPrefix}/products`} className="hover:text-[#0066B3] transition-colors duration-300">{isRu ? "Продукты" : "Products"}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-[#0066B3] font-bold">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <section className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F0F4F8] rounded-3xl overflow-hidden aspect-square border border-gray-100/50 shadow-md relative group transition-all hover:shadow-xl hover:shadow-blue-900/10 p-6 md:p-10">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="text-[9px] font-bold text-[#0066B3] bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider inline-block mb-4">{product.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3 tracking-tight">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600 font-semibold">
                  {product.nameCn && <span className="flex items-center gap-1.5 text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5" /> {product.nameCn}</span>}
                  <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-blue-500" /> CAS: {product.cas}</span>
                  <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-blue-500" /> HS Code: {product.hsCode}</span>
                </div>
              </div>

              <p className="text-base text-gray-600 leading-relaxed mb-8 font-medium">
                {product.shortDescription}
              </p>

              {/* Quick Specs Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl border border-blue-100/30 group hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-[#0066B3] transition-all duration-300">
                    <Package className="w-5 h-5 text-[#0066B3] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-gray-400 font-extrabold tracking-widest mb-0.5">{content.packaging}</p>
                    <p className="text-sm font-bold text-gray-900">{product.packaging}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl border border-blue-100/30 group hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-[#0066B3] transition-all duration-300">
                    <Truck className="w-5 h-5 text-[#0066B3] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-gray-400 font-extrabold tracking-widest mb-0.5">{content.loading}</p>
                    <p className="text-sm font-bold text-gray-900">{product.loading}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#0066B3] hover:bg-[#004a82] text-white px-6 h-12 rounded-lg font-bold shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> {content.techDocs}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px] rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">{isRu ? "Запросить технические документы" : "Request Technical Documents"}</DialogTitle>
                    </DialogHeader>
                    {docSubmitted ? (
                      <div className="py-8 text-center">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{isRu ? "Запрос отправлен!" : "Request Submitted!"}</h3>
                        <p className="text-sm text-gray-600">{isRu ? "Мы отправим документы на вашу электронную почту в ближайшее время." : "We will send the documents to your email shortly."}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleDocSubmit} className="space-y-4 py-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-bold text-gray-700">{isRu ? "Адрес электронной почты *" : "Email Address *"}</Label>
                          <Input id="email" type="email" required value={docEmail} onChange={(e) => setDocEmail(e.target.value)} placeholder="your@email.com" className="h-10 rounded-lg border-gray-200 focus:border-[#0066B3] focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="company" className="text-sm font-bold text-gray-700">{isRu ? "Название компании" : "Company Name"}</Label>
                          <Input id="company" value={docCompany} onChange={(e) => setDocCompany(e.target.value)} className="h-10 rounded-lg border-gray-200 focus:border-[#0066B3] focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="space-y-3 pt-1">
                          <Label className="text-sm font-bold text-gray-700">{isRu ? "Необходимые документы" : "Documents Needed"}</Label>
                          <div className="flex gap-6">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="msds" checked={docMSDS} onCheckedChange={(checked) => setDocMSDS(!!checked)} className="w-4 h-4 rounded" />
                              <label htmlFor="msds" className="text-xs font-bold text-gray-600 cursor-pointer">MSDS</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="coa" checked={docCOA} onCheckedChange={(checked) => setDocCOA(!!checked)} className="w-4 h-4 rounded" />
                              <label htmlFor="coa" className="text-xs font-bold text-gray-600 cursor-pointer">COA</label>
                            </div>
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-[#0066B3] hover:bg-[#004a82] h-11 rounded-lg font-bold text-base mt-2 shadow-md transition-all duration-300 hover:-translate-y-0.5">
                          {isRu ? "Отправить запрос" : "Submit Request"}
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>

                <Link to={`${langPrefix}/contact`}>
                  <Button variant="outline" className="border-2 border-gray-200 text-gray-700 h-12 px-8 rounded-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                    {content.getQuote}
                  </Button>
                </Link>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                <span className="text-[9px] uppercase font-extrabold text-gray-400 tracking-widest">{content.share}</span>
                <div className="flex items-center gap-2">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition-all duration-300 text-gray-400 hover:text-[#0077B5] hover:scale-110" aria-label="Share on LinkedIn"><Linkedin className="w-3.5 h-3.5" /></a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition-all duration-300 text-gray-400 hover:text-[#1877F2] hover:scale-110" aria-label="Share on Facebook"><Facebook className="w-3.5 h-3.5" /></a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition-all duration-300 text-gray-400 hover:text-[#1DA1F2] hover:scale-110" aria-label="Share on Twitter"><Twitter className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Content Section */}
      <section className="py-12 bg-gradient-to-b from-white to-[#F8FAFC] border-t border-gray-100/50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-10 overflow-x-auto flex-nowrap scrollbar-hide">
              <TabsTrigger value="overview" className="rounded-none border-b-[2px] border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent px-6 py-4 font-bold text-gray-500 data-[state=active]:text-gray-900 text-base transition-all duration-300">{content.overview}</TabsTrigger>
              {product.specs && product.specs.length > 0 && (
                <TabsTrigger value="specs" className="rounded-none border-b-[2px] border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent px-6 py-4 font-bold text-gray-500 data-[state=active]:text-gray-900 text-base transition-all duration-300">{content.specifications}</TabsTrigger>
              )}
              {product.applications && product.applications.length > 0 && (
                <TabsTrigger value="apps" className="rounded-none border-b-[2px] border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent px-6 py-4 font-bold text-gray-500 data-[state=active]:text-gray-900 text-base transition-all duration-300">{content.applications}</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="mt-0 animate-in fade-in duration-500">
              <div className="prose prose-blue max-w-3xl prose-sm md:prose-base prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6 prose-li:mb-2">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {product.description}
                </ReactMarkdown>
              </div>
            </TabsContent>

            {product.specs && (
              <TabsContent value="specs" className="mt-0 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 border-t border-gray-100/50 pt-4">
                  {product.specs.map((spec: any, i: number) => (
                    <div key={i} className="flex justify-between items-baseline py-4 border-b border-gray-100/50 group hover:bg-slate-50/50 px-2 -mx-2 rounded-lg transition-all duration-300">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap mr-8">{spec.label}</span>
                      <span className="text-sm font-semibold text-slate-900 text-right leading-relaxed">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {product.applications && (
              <TabsContent value="apps" className="mt-0 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.applications.map((app: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:from-[#0066B3] group-hover:to-[#004a82] transition-all duration-300">
                        <CheckCircle2 className="w-4 h-4 text-[#0066B3] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-gray-700 font-bold text-sm leading-tight pt-1.5">{app}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-[#F8FAFC] to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">{content.faqTitle}</h2>
              <p className="text-sm text-gray-600 font-medium">{content.faqDesc}</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {product.faqs.map((faq: any, i: number) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-none rounded-2xl px-5 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
                  <AccordionTrigger className="hover:no-underline py-5 text-left font-bold text-gray-900 text-base hover:text-[#0066B3] transition-colors duration-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5 leading-relaxed text-sm font-medium">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">{isRu ? "Похожие продукты" : "Related Products"}</h2>
                <p className="text-sm text-gray-600 font-medium">{content.relatedTitle}</p>
              </div>
              <Link to={`${langPrefix}/products`} className="hidden md:flex items-center gap-2 text-[#0066B3] font-bold text-sm hover:gap-3 transition-all duration-300 hover:text-[#004a82]">
                {content.viewAll} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p: any) => (
                <Link key={p.slug} to={`${langPrefix}/products/${p.slug}`} className="group bg-white rounded-3xl p-5 border border-gray-100/50 shadow-sm hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#F0F4F8] mb-4 p-4 group-hover:from-white group-hover:to-blue-50/30 transition-all duration-300">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0066B3] transition-colors duration-300 line-clamp-1 mb-1">{p.name}</h3>
                  <p className="text-[9px] text-gray-400 uppercase font-extrabold tracking-widest">{p.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
