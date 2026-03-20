import { Award, Globe, Users, TrendingUp, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

const LAB_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/08108beb-b4ff-4efc-b6fa-1c545073bedd.png";
const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/0821521e-e54b-4dff-b118-4f4b9ba70803.png";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sinochemi",
  url: "https://sinochemi.com",
  description: "Sinochemi is a leading B2B chemical supplier from China with years of experience in international chemical trade.",
  foundingDate: "2010",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "50+" },
  address: { "@type": "PostalAddress", addressRegion: "Shandong", addressCountry: "CN" },
};

const milestones = [
  { year: "2010", title: "Company Founded", desc: "Sinochemi established in Shandong Province, China, focusing on chemical export trade." },
  { year: "2013", title: "Global Expansion", desc: "Expanded export operations to Southeast Asia, Middle East, and Africa." },
  { year: "2016", title: "Product Diversification", desc: "Grew product portfolio to 15+ chemical products across multiple categories." },
  { year: "2019", title: "Quality Certification", desc: "Achieved ISO 9001 quality management system certification." },
  { year: "2022", title: "Market Leadership", desc: "Became a leading supplier of sodium thiosulphate and oxalic acid in international markets." },
  { year: "2025", title: "Digital Transformation", desc: "Launched digital platform for streamlined global chemical procurement." },
];

const stats = [
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Award, value: "22+", label: "Chemical Products" },
  { icon: Users, value: "500+", label: "Global Clients" },
  { icon: TrendingUp, value: "15+", label: "Years Experience" },
];

const values = [
  { title: "Quality First", desc: "Every product undergoes rigorous quality testing with complete COA documentation." },
  { title: "Customer Focus", desc: "Dedicated support team providing responsive service and technical guidance." },
  { title: "Global Reach", desc: "Efficient logistics network connecting Chinese manufacturers to worldwide buyers." },
  { title: "Integrity", desc: "Transparent pricing, honest communication, and reliable delivery commitments." },
];

export default function AboutPage() {
  return (
    <Layout
      title="About Sinochemi - Leading Chemical Supplier from China"
      description="Learn about Sinochemi, a trusted B2B chemical supplier with 15+ years of experience serving 500+ clients in 50+ countries. ISO certified quality management."
      jsonLd={jsonLd}
    >
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Sinochemi Chemical Plant" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066B3]/90 to-[#0066B3]/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Sinochemi</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Your trusted partner in global chemical trade. We connect quality Chinese chemical manufacturers with buyers worldwide.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-7 h-7 text-[#0066B3]" />
                </div>
                <p className="text-3xl font-bold text-[#0066B3]">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2010 in Shandong Province, China, Sinochemi has grown from a small trading company into a leading B2B chemical supplier serving clients across 50+ countries. Our journey has been driven by a commitment to quality, reliability, and customer satisfaction.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We specialize in sourcing and exporting a comprehensive range of industrial chemicals, including sodium thiosulphate, caustic soda, oxalic acid, calcium chloride, and many more. Our deep relationships with top Chinese manufacturers ensure consistent quality and competitive pricing.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With an experienced team of chemical industry professionals, we provide end-to-end service from product selection and quality inspection to logistics coordination and after-sales support.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={LAB_IMG} alt="Sinochemi Quality Control Laboratory" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-[#0066B3] mb-4" />
                <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-8 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#0066B3] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-blue-200 mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-[#1A1A2E]">{m.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 md:py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4">Certifications and Quality Assurance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We maintain the highest quality standards through rigorous testing and internationally recognized certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["ISO 9001:2015", "ISO 14001", "SGS Verified", "Intertek Certified", "REACH Compliant"].map((cert) => (
              <div key={cert} className="bg-white rounded-lg px-6 py-4 border border-gray-200 shadow-sm">
                <Award className="w-8 h-8 text-[#0066B3] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#1A1A2E]">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}