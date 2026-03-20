import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import Layout from "@/components/Layout";
import { blogPosts } from "@/data/blogs";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Sinochemi Blog - Chemical Industry Insights",
  description: "Industry news, product guides, and technical articles about industrial chemicals.",
  url: "https://sinochemi.com/en/blog",
  publisher: { "@type": "Organization", name: "Sinochemi" },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    url: `https://sinochemi.com/en/blog/${post.slug}`,
  })),
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Layout
      title="Blog - Chemical Industry Insights and Product Guides"
      description="Read the latest industry news, product guides, and technical articles about industrial chemicals from Sinochemi's expert team."
      jsonLd={jsonLd}
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066B3] to-[#004A82] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-blue-100 max-w-2xl text-lg">
            Industry insights, product guides, and technical articles from our expert team.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          {sorted.length > 0 && (
            <Link
              to={`/en/blog/${sorted[0].slug}`}
              className="group block mb-12 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <img src={sorted[0].image} alt={sorted[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-1 rounded-full">{sorted[0].category}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(sorted[0].date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#0066B3] transition-colors">{sorted[0].title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{sorted[0].excerpt}</p>
                  <span className="text-[#0066B3] font-medium flex items-center gap-1">Read More <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
            </Link>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.slice(1).map((post) => (
              <Link
                key={post.id}
                to={`/en/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="aspect-video bg-gray-50 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h2 className="text-base font-semibold text-[#1A1A2E] mb-2 group-hover:text-[#0066B3] transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
                    <User className="w-3 h-3" /> {post.author}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}