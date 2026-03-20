import { useParams, Link } from "react-router-dom";
import { ChevronRight, FileText, Share2, Facebook, Twitter, Linkedin, Download, CheckCircle2, Info, Package, Truck, ShieldCheck } from "lucide-react";
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

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [docEmail, setDocEmail] = useState("");
  const [docCompany, setDocCompany] = useState("");
  const [docMSDS, setDocMSDS] = useState(true);
  const [docCOA, setDocCOA] = useState(true);
  const [docSubmitted, setDocSubmitted] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <Link to="/en/products"><Button className="bg-[#0066B3] text-white">Browse All Products</Button></Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getRelatedProducts(product.slug, 4);
  const currentUrl = `https://sinochemi.com/en/products/${product.slug}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.cas,
    brand: { "@type": "Brand", name: "Sinochemi" },
    manufacturer: { "@type": "Organization", name: "Sinochemi" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: "Sinochemi" },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
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

  return (
    <Layout
      title={`${product.name} - CAS ${product.cas} | Industrial Chemical Supplier`}
      description={product.shortDescription}
      jsonLd={productJsonLd}
    >
      {/* Extra JSON-LD for FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumb */}
      <div className="bg-[#F5F7FA] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/en" className="hover:text-[#0066B3]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/en/products" className="hover:text-[#0066B3]">Products</Link>
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
                    <p className="text-[10px] uppercase text-gray-500 font-bold">Packaging</p>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{product.packaging}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <Truck className="w-5 h-5 text-[#0066B3]" />
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 font-bold">Loading</p>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{product.loading}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-auto">
                <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-[#0066B3] hover:bg-[#004A82] text-white px-8">
                      <FileText className="w-4 h-4 mr-2" /> Technical Docs
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Technical Documents</DialogTitle>
                    </DialogHeader>
                    {docSubmitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Submitted!</h3>
                        <p className="text-gray-600">We will send the documents to your email shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleDocSubmit} className="space-y-4">
                        <p className="text-sm text-gray-600">Product: <strong>{product.name}</strong></p>
                        <div>
                          <Label htmlFor="doc-email">Email Address *</Label>
                          <Input id="doc-email" type="email" required value={docEmail} onChange={(e) => setDocEmail(e.target.value)} placeholder="your@email.com" />
                        </div>
                        <div>
                          <Label htmlFor="doc-company">Company Name</Label>
                          <Input id="doc-company" value={docCompany} onChange={(e) => setDocCompany(e.target.value)} placeholder="Your company" />
                        </div>
                        <div>
                          <Label>Documents Needed</Label>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <Checkbox checked={docMSDS} onCheckedChange={(v) => setDocMSDS(!!v)} /> MSDS
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <Checkbox checked={docCOA} onCheckedChange={(v) => setDocCOA(!!v)} /> COA
                            </label>
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-[#0066B3] hover:bg-[#004A82] text-white">Submit Request</Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>

                <Link to="/en/contact">
                  <Button size="lg" variant="outline" className="border-[#0066B3] text-[#0066B3] hover:bg-blue-50 px-8">Get a Quote</Button>
                </Link>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-widest">Share</span>
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
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-base">
                <Info className="w-4 h-4 mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-base">
                <FileText className="w-4 h-4 mr-2" /> Specifications
              </TabsTrigger>
              <TabsTrigger value="applications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0066B3] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-base">
                <ShieldCheck className="w-4 h-4 mr-2" /> Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm">
                <div className="prose prose-blue max-w-none prose-headings:text-[#1A1A2E] prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-[#1A1A2E] prose-strong:font-bold">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {product.description}
                  </ReactMarkdown>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-sm font-bold text-[#1A1A2E] uppercase tracking-wider">Property</th>
                      <th className="px-6 py-4 text-sm font-bold text-[#1A1A2E] uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {product.specs.map((spec, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700 bg-gray-50/30 w-1/3">{spec.label}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.applications.map((app, i) => (
                  <div key={i} className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:border-[#0066B3] hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0066B3] transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-[#0066B3] group-hover:text-white" />
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{app}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Find quick answers to common questions about {product.name}</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {product.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-gray-200 rounded-xl px-6 bg-white overflow-hidden">
                <AccordionTrigger className="text-left font-semibold text-[#1A1A2E] hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">Related Products</h2>
              <p className="text-gray-500">Explore other high-quality chemicals in our catalog</p>
            </div>
            <Link to="/en/products" className="text-[#0066B3] font-semibold hover:underline hidden md:block">View All Products</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/en/products/${p.slug}`} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#0066B3] transition-colors mb-2 line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-gray-500 mb-4">CAS: {p.cas}</p>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto text-[#0066B3] font-bold hover:bg-transparent">
                    View Details <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
