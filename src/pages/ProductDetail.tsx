import { useParams, Link, useLocation } from "react-router-dom";
import { ChevronRight, FileText, Share2, Facebook, Twitter, Linkedin, Download, CheckCircle2, Info, Package, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "@/components/Layout";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getProductBySlugRu, getRelatedProductsRu } from "@/data/products_ru";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const langPrefix = isRu ? "/ru" : "/en";
  
  const product = isRu ? getProductBySlugRu(slug || "") : getProductBySlug(slug || "");
  
  const [docEmail, setDocEmail] = useState("");
  const [docCompany, setDocCompany] = useState("");
  const [docMSDS, setDocMSDS] = useState(true);
  const [docCOA, setDocCOA] = useState(true);
  const [docSubmitted, setDocSubmitted] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);

  if (!product) {
    return (
      <Layout title={isRu ? "Продукт не найден" : "Product Not Found"}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{isRu ? "Продукт не найден" : "Product Not Found"}</h1>
          <p className="text-gray-600 mb-6">{isRu ? "Продукт, который вы ищете, не существует." : "The product you are looking for does not exist."}</p>
          <Link to={`${langPrefix}/products`}><Button className="bg-[#0066B3] text-white">{isRu ? "Все продукты" : "Browse All Products"}</Button></Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = isRu ? getRelatedProductsRu(product.slug, 4) : getRelatedProducts(product.slug, 4);
  const currentUrl = `https://sinopeakchem.com${langPrefix}/products/${product.slug}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.cas,
    brand: { "@type": "Brand", name: "Sinopeakchem" },
    manufacturer: { "@type": "Organization", name: "Sinopeakchem" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: "Sinopeakchem" },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (product.faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const handleDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formspree.io/f/xpwdgqkl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: docEmail,
          company: docCompany,
          product: product.name,
          documents: [docMSDS && "MSDS", docCOA && "COA"].filter(Boolean).join(", "),
          _subject: `Document Request: ${product.name}`,
        }),
      });
    } catch {
      // silent fail
    }
    setDocSubmitted(true);
    setTimeout(() => {
      setDocSubmitted(false);
      setDocModalOpen(false);
      setDocEmail("");
      setDocCompany("");
    }, 3000);
  };

  const content = isRu ? {
    home: "Главная",
    products: "Продукты",
    packaging: "Упаковка",
    loading: "Загрузка",
    techDocs: "Тех. документы",
    getQuote: "Запросить цену",
    share: "Поделиться",
    overview: "Обзор",
    specifications: "Характеристики",
    applications: "Применение",
    faq: "Часто задаваемые вопросы",
    relatedProducts: "Похожие продукты",
    requestDocs: "Запросить технические документы",
    requestSubmitted: "Запрос отправлен!",
    requestSuccess: "Мы отправим документы на вашу электронную почту в ближайшее время.",
    emailAddress: "Адрес электронной почты *",
    companyName: "Название компании",
    docsNeeded: "Необходимые документы",
    submitRequest: "Отправить запрос",
  } : {
    home: "Home",
    products: "Products",
    packaging: "Packaging",
    loading: "Loading",
    techDocs: "Technical Docs",
    getQuote: "Get a Quote",
    share: "Share",
    overview: "Overview",
    specifications: "Specifications",
    applications: "Applications",
    faq: "FAQ",
    relatedProducts: "Related Products",
    requestDocs: "Request Technical Documents",
    requestSubmitted: "Request Submitted!",
    requestSuccess: "We will send the documents to your email shortly.",
    emailAddress: "Email Address *",
    companyName: "Company Name",
    docsNeeded: "Documents Needed",
    submitRequest: "Submit Request",
  };

  return (
    <Layout
      title={`${product.name} - CAS ${product.cas} | ${isRu ? "Поставщик промышленной химии" : "Industrial Chemical Supplier"}`}
      description={product.shortDescription}
      jsonLd={productJsonLd}
    >
      {/* Extra JSON-LD for FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumb */}
      <div className="bg-[#F5F7FA] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to={langPrefix} className="hover:text-[#0066B3]">{content.home}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`${langPrefix}/products`} className="hover:text-[#0066B3]">{content.products}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0066B3] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] border border-gray-100 shadow-sm">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="eager" />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="text-sm font-semibold text-[#0066B3] bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{product.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mt-4 mb-2">{product.name}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> {product.nameCn}</span>
                  <span>CAS: {product.cas}</span>
                  <span>HS Code: {product.hsCode}</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-gray-600 mb-8 line-clamp-3">
                {product.shortDescription}
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <Package className="w-5 h-5 text-[#0066B3]" />
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 font-bold">{content.packaging}</p>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{product.packaging}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <Truck className="w-5 h-5 text-[#0066B3]" />
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 font-bold">{content.loading}</p>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{product.loading}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-auto">
                <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-[#0066B3] hover:bg-[#004A82] text-white px-8">
                      <FileText className="w-4 h-4 mr-2" /> {content.techDocs}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{content.requestDocs}</DialogTitle>
                    </DialogHeader>
                    {docSubmitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.requestSubmitted}</h3>
                        <p className="text-gray-600">{content.requestSuccess}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleDocSubmit} className="space-y-4">
                        <p className="text-sm text-gray-600">{isRu ? "Продукт" : "Product"}: <strong>{product.name}</strong></p>
                        <div>
                          <Label htmlFor="doc-email">{content.emailAddress}</Label>
                          <Input id="doc-email" type="email" required value={docEmail} onChange={(e) => setDocEmail(e.target.value)} placeholder="your@email.com" />
                        </div>
                        <div>
                          <Label htmlFor="doc-company">{content.companyName}</Label>
                          <Input id="doc-company" value={docCompany} onChange={(e) => setDocCompany(e.target.value)} placeholder={isRu ? "Ваша компания" : "Your company"} />
                        </div>
                        <div>
                          <Label>{content.docsNeeded}</Label>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <Checkbox checked={docMSDS} onCheckedChange={(v) => setDocMSDS(!!v)} /> MSDS
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <Checkbox checked={docCOA} onCheckedChange={(v) => setDocCOA(!!v)} /> COA
                            </label>
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-[#0066B3] hover:bg-[#004A82] text-white">{content.submitRequest}</Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>

                <Link to={`${langPrefix}/contact`}>
                  <Button size="lg" variant="outline" className="border-[#0066B3] text-[#0066B3] hover:bg-blue-50 px-8">{content.getQuote}</Button>
                </Link>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-widest">{content.share}</span>
                <div className="flex gap-2">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-[#0066B3] transition-all" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-[#0066B3] transition-all" aria-label="Share on Facebook"><Facebook className="w-4 h-4" /></a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-[#0066B3] transition-all" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-12 bg-[#F8FAFC] border-y border-gray-200">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-gray-200 rounded-none h-auto p-0 mb-8 overflow-x-auto flex-nowrap">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent data-[state=active]:text-[#0066B3] px-6 py-3 text-sm font-semibold transition-all whitespace-nowrap">{content.overview}</TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent data-[state=active]:text-[#0066B3] px-6 py-3 text-sm font-semibold transition-all whitespace-nowrap">{content.specifications}</TabsTrigger>
              <TabsTrigger value="applications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent data-[state=active]:text-[#0066B3] px-6 py-3 text-sm font-semibold transition-all whitespace-nowrap">{content.applications}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-0 focus-visible:outline-none">
              <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{product.description}</ReactMarkdown>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-0 focus-visible:outline-none">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">{isRu ? "Параметр" : "Parameter"}</th>
                      <th className="px-6 py-4">{isRu ? "Значение" : "Value"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(product.specs || []).map((spec, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{spec.label}</td>
                        <td className="px-6 py-4 text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-0 focus-visible:outline-none">
              <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(product.applications || []).map((app, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#0066B3]" />
                      </div>
                      <p className="text-gray-700 font-medium">{app}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4">{content.faq}</h2>
            <p className="text-gray-600">{isRu ? "Найдите ответы на распространенные вопросы о" : "Find answers to common questions about"} {product.name}</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {(product.faqs || []).map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-gray-200 rounded-xl px-4 bg-white shadow-sm overflow-hidden">
                <AccordionTrigger className="text-left font-semibold text-[#1A1A2E] hover:no-underline py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 md:py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4">{content.relatedProducts}</h2>
              <p className="text-gray-600">{isRu ? "Другие высококачественные химикаты, которые могут вас заинтересовать" : "Other high-quality chemicals you might be interested in"}</p>
            </div>
            <Link to={`${langPrefix}/products`} className="hidden md:inline-flex items-center text-[#0066B3] font-medium hover:underline">
              {isRu ? "Все продукты" : "View All Products"} <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                to={`${langPrefix}/products/${p.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#0066B3] transition-colors line-clamp-1">{p.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">CAS: {p.cas}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
