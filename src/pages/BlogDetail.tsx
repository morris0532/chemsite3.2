import { useParams, Link, useLocation } from "react-router-dom";
import { ChevronRight, Calendar, User, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { getBlogBySlug, getRecentBlogs } from "@/data/blogs";
import { getBlogBySlugRu, getRecentBlogsRu } from "@/data/blogs_ru";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const langPrefix = isRu ? "/ru" : "/en";
  
  const post = isRu ? getBlogBySlugRu(slug || "") : getBlogBySlug(slug || "");

  if (!post) {
    return (
      <Layout title={isRu ? "Статья не найдена" : "Article Not Found"}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{isRu ? "Статья не найдена" : "Article Not Found"}</h1>
          <p className="text-gray-600 mb-6">{isRu ? "Статья, которую вы ищете, не существует." : "The article you are looking for does not exist."}</p>
          <Link to={`${langPrefix}/blog`}><Button className="bg-[#0066B3] text-white">{isRu ? "Просмотреть все статьи" : "Browse All Articles"}</Button></Link>
        </div>
      </Layout>
    );
  }

  const currentUrl = `https://sinopeakchem.com${langPrefix}/blog/${post.slug}`;
  const recentPosts = isRu 
    ? getRecentBlogsRu(4).filter((b) => b.slug !== post.slug).slice(0, 3)
    : getRecentBlogs(4).filter((b) => b.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Sinopeakchem", logo: { "@type": "ImageObject", url: "https://sinopeakchem.com/logo.png" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": currentUrl },
  };

  const content = isRu ? {
    home: "Главная",
    blog: "Блог",
    backToBlog: "Назад в блог",
    share: "Поделиться:",
    recentArticles: "Последние статьи",
    needChemicals: "Нужны химические продукты?",
    getQuoteDesc: "Получите конкурентоспособные цены на 22+ промышленных химиката.",
    getQuote: "Получить предложение",
  } : {
    home: "Home",
    blog: "Blog",
    backToBlog: "Back to Blog",
    share: "Share:",
    recentArticles: "Recent Articles",
    needChemicals: "Need Chemical Products?",
    getQuoteDesc: "Get competitive pricing on 22+ industrial chemicals.",
    getQuote: "Get a Quote",
  };

  // Simple markdown-to-HTML converter
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const html: string[] = [];
    let inList = false;
    let inTable = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        if (inList) { html.push("</ul>"); inList = false; }
        if (inTable) { html.push("</tbody></table></div>"); inTable = false; }
        html.push(`<h2 class="text-2xl font-bold text-[#1A1A2E] mt-8 mb-4">${trimmed.slice(3)}</h2>`);
      } else if (trimmed.startsWith("### ")) {
        if (inList) { html.push("</ul>"); inList = false; }
        html.push(`<h3 class="text-xl font-semibold text-[#1A1A2E] mt-6 mb-3">${trimmed.slice(4)}</h3>`);
      } else if (trimmed.startsWith("- **")) {
        if (!inList) { html.push('<ul class="space-y-2 mb-4">'); inList = true; }
        const boldMatch = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)/);
        if (boldMatch) {
          html.push(`<li class="text-gray-700"><strong class="text-[#1A1A2E]">${boldMatch[1]}</strong>${boldMatch[2] ? ": " + boldMatch[2] : ""}</li>`);
        } else {
          html.push(`<li class="text-gray-700">${trimmed.slice(2)}</li>`);
        }
      } else if (trimmed.startsWith("- ")) {
        if (!inList) { html.push('<ul class="list-disc list-inside space-y-1 mb-4 text-gray-700">'); inList = true; }
        html.push(`<li>${trimmed.slice(2)}</li>`);
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (!inList) { html.push('<ol class="list-decimal list-inside space-y-1 mb-4 text-gray-700">'); inList = true; }
        html.push(`<li>${trimmed.replace(/^\d+\.\s/, "")}</li>`);
      } else if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        if (inList) { html.push("</ul>"); inList = false; }
        if (trimmed.includes("---")) continue;
        const cells = trimmed.split("|").filter(Boolean).map((c) => c.trim());
        if (!inTable) {
          html.push('<div class="overflow-x-auto mb-4"><table class="w-full border-collapse border border-gray-200 text-sm">');
          html.push(`<thead><tr>${cells.map((c) => `<th class="border border-gray-200 px-3 py-2 bg-gray-50 text-left font-medium text-[#1A1A2E]">${c}</th>`).join("")}</tr></thead><tbody>`);
          inTable = true;
        } else {
          html.push(`<tr>${cells.map((c) => `<td class="border border-gray-200 px-3 py-2 text-gray-700">${c}</td>`).join("")}</tr>`);
        }
      } else if (trimmed === "") {
        if (inList) { html.push("</ul>"); inList = false; }
        if (inTable) { html.push("</tbody></table></div>"); inTable = false; }
      } else {
        if (inList) { html.push("</ul>"); inList = false; }
        // Handle inline bold
        const processed = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html.push(`<p class="text-gray-700 leading-relaxed mb-4">${processed}</p>`);
      }
    }
    if (inList) html.push("</ul>");
    if (inTable) html.push("</tbody></table></div>");
    return html.join("\n");
  };

  return (
    <Layout
      title={`${post.title} | Sinopeakchem Blog`}
      description={post.excerpt}
      jsonLd={articleJsonLd}
    >
      {/* Breadcrumb */}
      <div className="bg-[#F5F7FA] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to={langPrefix} className="hover:text-[#0066B3]">{content.home}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`${langPrefix}/blog`} className="hover:text-[#0066B3]">{content.blog}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0066B3] font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Article */}
            <article className="lg:col-span-2">
              <Link to={`${langPrefix}/blog`} className="inline-flex items-center text-sm text-[#0066B3] hover:underline mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" /> {content.backToBlog}
              </Link>

              <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-1 rounded-full">{post.category}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString(isRu ? "ru-RU" : "en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">{post.title}</h1>

              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">#{tag}</span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                <span className="text-sm text-gray-500 flex items-center gap-1"><Share2 className="w-4 h-4" /> {content.share}</span>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4 text-gray-600" /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on Facebook"><Facebook className="w-4 h-4 text-gray-600" /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Share on Twitter"><Twitter className="w-4 h-4 text-gray-600" /></a>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">{content.recentArticles}</h3>
                <div className="space-y-4">
                  {recentPosts.map((rp) => (
                    <Link key={rp.id} to={`${langPrefix}/blog/${rp.slug}`} className="group flex gap-3">
                      <div className="w-20 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={rp.image} alt={rp.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#1A1A2E] group-hover:text-[#0066B3] transition-colors line-clamp-2">{rp.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{new Date(rp.date).toLocaleDateString(isRu ? "ru-RU" : "en-US", { month: "short", day: "numeric" })}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 bg-[#0066B3] rounded-xl p-6 text-white">
                  <h3 className="font-bold mb-2">{content.needChemicals}</h3>
                  <p className="text-sm text-blue-100 mb-4">{content.getQuoteDesc}</p>
                  <Link to={`${langPrefix}/contact`}>
                    <Button className="w-full bg-white text-[#0066B3] hover:bg-blue-50">{content.getQuote}</Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
