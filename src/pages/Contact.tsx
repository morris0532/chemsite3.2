import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sinopeakchem",
  description: "Get in touch with Sinopeakchem for chemical product inquiries, pricing, and technical support.",
  mainEntity: {
    "@type": "Organization",
    name: "Sinopeakchem",
    email: "info@sinopeakchem.com",
    telephone: "+86-13583262050",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 182, Jinshui Road, Licang District",
      addressLocality: "Qingdao",
      addressRegion: "Shandong",
      postalCode: "266000",
      addressCountry: "CN",
    },
  },
};

const jsonLdRu = {
  ...jsonLdEn,
  name: "Связаться с Sinopeakchem",
  description: "Свяжитесь с Sinopeakchem для запросов о химической продукции, ценах и технической поддержке.",
};

export default function ContactPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [waDisplay, setWaDisplay] = useState("");

  // Anti-scraping logic for WhatsApp/Phone
  useEffect(() => {
    const country = "86";
    const part1 = "135";
    const part2 = "8326";
    const part3 = "2050";
    const full = country + part1 + part2 + part3;
    setWaLink(`https://wa.me/${full}?text=Hello%2C%20I%27m%20interested%20in%20your%20products.`);
    setWaDisplay(`+${country} ${part1} ${part2} ${part3}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `New Inquiry from ${formData.company || "N/A"}`,
          message: formData.message,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const content = isRu ? {
    title: "Свяжитесь с нами - Получите предложение на промышленные химикаты",
    description: "Свяжитесь с Sinopeakchem для запросов о химической продукции, ценах и технической поддержке. Свяжитесь с нами по электронной почте, WhatsApp или через нашу контактную форму.",
    heroTitle: "Свяжитесь с нами",
    heroDesc: "Готовы закупать качественные химикаты? Свяжитесь с нашей командой для получения информации о ценах, продукции и технической поддержке.",
    getInTouch: "Связаться",
    getInTouchDesc: "Мы здесь, чтобы помочь. Свяжитесь с нами по любому из следующих каналов.",
    email: "Электронная почта",
    whatsapp: "WhatsApp",
    address: "Адрес",
    addressValue: "№ 182, ул. Цзиньшуй, район Лицан, Циндао, провинция Шаньдун, Китай",
    sendMessage: "Отправьте нам сообщение",
    sendMessageDesc: "Заполните форму ниже, и наша команда свяжется с вами в течение 24 часов.",
    successTitle: "Сообщение успешно отправлено!",
    successDesc: "Благодарим вас за обращение. Мы ответим на ваш запрос в течение 24 часов.",
    fullName: "Полное имя *",
    emailAddress: "Адрес электронной почты *",
    companyName: "Название компании (необязательно)",
    message: "Сообщение *",
    messagePlaceholder: "Расскажите нам о ваших требованиях, интересующих продуктах, необходимом количестве...",
    sending: "Отправка...",
    sendButton: "Отправить сообщение",
  } : {
    title: "Contact Us - Get a Quote for Industrial Chemicals",
    description: "Contact Sinopeakchem for chemical product inquiries, pricing, and technical support. Reach us via email, WhatsApp, or our contact form.",
    heroTitle: "Contact Us",
    heroDesc: "Ready to source quality chemicals? Get in touch with our team for pricing, product information, and technical support.",
    getInTouch: "Get In Touch",
    getInTouchDesc: "We are here to help. Reach out to us through any of the following channels.",
    email: "Email",
    whatsapp: "WhatsApp",
    address: "Address",
    addressValue: "No. 182, Jinshui Road, Licang District, Qingdao, Shandong Province, China",
    sendMessage: "Send Us a Message",
    sendMessageDesc: "Fill out the form below and our team will get back to you within 24 hours.",
    successTitle: "Message Sent Successfully!",
    successDesc: "Thank you for contacting us. We will respond to your inquiry within 24 hours.",
    fullName: "Full Name *",
    emailAddress: "Email Address *",
    companyName: "Company Name (Optional)",
    message: "Message *",
    messagePlaceholder: "Tell us about your requirements, products of interest, quantity needed...",
    sending: "Sending...",
    sendButton: "Send Message",
  };

  return (
    <Layout
      title={content.title}
      description={content.description}
      jsonLd={isRu ? jsonLdRu : jsonLdEn}
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066B3] to-[#004A82] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.heroTitle}</h1>
          <p className="text-blue-100 max-w-2xl text-lg">
            {content.heroDesc}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1A1A2E]">{content.getInTouch}</h2>
              <p className="text-gray-600">{content.getInTouchDesc}</p>

              <div className="space-y-4">
                {/* Phone removed as per previous request */}

                <div className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-xl">
                  <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E] text-sm">{content.whatsapp}</h3>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-[#0066B3] hover:underline text-sm">
                      {waDisplay || "Loading..."}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-xl">
                  <div className="w-10 h-10 bg-[#0066B3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E] text-sm">{content.address}</h3>
                    <p className="text-gray-600 text-sm">{content.addressValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">{content.sendMessage}</h2>
                <p className="text-gray-600 text-sm mb-6">{content.sendMessageDesc}</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{content.successTitle}</h3>
                    <p className="text-gray-600">{content.successDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="name">{content.fullName}</Label>
                        <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">{content.emailAddress}</Label>
                        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@company.com" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">{content.companyName}</Label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder={isRu ? "Название вашей компании" : "Your company name"} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="message">{content.message}</Label>
                      <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder={content.messagePlaceholder} rows={5} className="mt-1" />
                    </div>
                    <Button type="submit" disabled={submitting} className="bg-[#0066B3] hover:bg-[#004A82] text-white w-full md:w-auto px-8">
                      {submitting ? content.sending : <><Send className="w-4 h-4 mr-2" /> {content.sendButton}</>}
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
