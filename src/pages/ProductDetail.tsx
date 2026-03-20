import { useParams, Link } from "react-router-dom";
import { ChevronRight, FileText, Share2, Facebook, Twitter, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
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
            <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div>
              <span className="text-sm font-medium text-[#0066B3] bg-blue-50 px-3 py-1 rounded-full">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mt-4 mb-2">{product.name}</h1>
              <p className="text-gray-500 text-sm mb-4">{product.nameCn} | CAS: {product.cas} | HS Code: {product.hsCode}</p>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              {/* Quick Specs */}
              <div className="bg-[#F5F7FA] rounded-xl p-5 mb-6">
                <h3 className="font-semibold text-[#1A1A2E] mb-3">Quick Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.specs.slice(0, 6).map((spec, i) => (
                    <div key={i}>
                      <span className="text-xs text-gray-500">{spec.label}</span>
                      <p className="text-sm font-medium text-[#1A1A2E]">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#0066B3] hover:bg-[#004A82] text-white">
                      <FileText className="w-4 h-4 mr-2" /> Request Technical Documents
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
                  <Button variant="outline" className="border-[#0066B3] text-[#0066B3]">Get a Quote</Button>
                </Link>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                <span className="text-sm text-gray-500 flex items-center gap-1"><Share2 className="w-4 h-4" /> Share:</span>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4 text-gray-600" /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on Facebook"><Facebook className="w-4 h-4 text-gray-600" /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on Twitter"><Twitter className="w-4 h-4 text-gray-600" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      <section className="py-8 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Specifications</h2>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
            <table className="w-full">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-3 text-sm font-medium text-gray-700 w-1/3 border-r border-gray-100">{spec.label}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.applications.map((app, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#0066B3] font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700">{app}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {product.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-lg border border-gray-200 px-5">
                  <AccordionTrigger className="text-left text-sm font-medium text-[#1A1A2E] hover:text-[#0066B3] py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/en/products/${rp.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#0066B3] transition-colors">{rp.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">CAS: {rp.cas}</p>
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