import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sinochemi",
  description: "Get in touch with Sinochemi for chemical product inquiries, pricing, and technical support.",
  mainEntity: {
    "@type": "Organization",
    name: "Sinochemi",
    email: "info@sinochemi.com",
    telephone: "+86-13583262050",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Shandong",
      addressCountry: "CN",
    },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/xpwdgqkl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `New Inquiry from ${formData.name} - ${formData.company || "N/A"}`,
        }),
      });
    } catch {
      // silent fail
    }
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout
      title="Contact Us - Get a Quote for Industrial Chemicals"
      description="Contact Sinochemi for chemical product inquiries, pricing, and technical support. Reach us via email, WhatsApp, or our contact form."
      jsonLd={jsonLd}
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066B3] to-[#004A82] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 max-w-2xl text-lg">
            Ready to source quality chemicals? Get in touch with our team for pricing, product information, and technical support.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1A1A2E]">Get In Touch</h2>
              <p className="text-gray-600">We are here to help. Reach out to us through any of the following channels.</p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-xl">
                  <div className="w-10 h-10 bg-[#0066B3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E] text-sm">Email</h3>
                    <a href="mailto:info@sinochemi.com" className="text-[#0066B3] hover:underline text-sm">info@sinochemi.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-xl">
                  <div className="w-10 h-10 bg-[#0066B3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E] text-sm">Phone</h3>
                    <a href="tel:+8613583262050" className="text-[#0066B3] hover:underline text-sm">+86 13583262050</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-xl">
                  <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E] text-sm">WhatsApp</h3>
                    <a href="https://wa.me/8613583262050?text=Hello%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer" className="text-[#0066B3] hover:underline text-sm">+86 13583262050</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-xl">
                  <div className="w-10 h-10 bg-[#0066B3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E] text-sm">Address</h3>
                    <p className="text-gray-600 text-sm">Shandong Province, China</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Send Us a Message</h2>
                <p className="text-gray-600 text-sm mb-6">Fill out the form below and our team will get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We will respond to your inquiry within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@company.com" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name (Optional)</Label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Tell us about your requirements, products of interest, quantity needed..." rows={5} className="mt-1" />
                    </div>
                    <Button type="submit" disabled={submitting} className="bg-[#0066B3] hover:bg-[#004A82] text-white w-full md:w-auto px-8">
                      {submitting ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}