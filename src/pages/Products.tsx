import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Grid3X3, List, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { products, productCategories } from "@/data/products";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Industrial Chemical Products",
  description: "Complete catalog of industrial chemicals from Sinochemi",
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.shortDescription,
      url: `https://sinochemi.com/en/products/${p.slug}`,
      sku: p.cas,
    },
  })),
};

export default function ProductsPage() {
  const [category, setCategory] = useState("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = category === "All Products" || p.category === category;
      return matchCategory;
    });
  }, [category]);

  return (
    <Layout
      title="Industrial Chemical Products Catalog"
      description="Browse our complete catalog of 22+ industrial chemicals including sodium thiosulphate, caustic soda, oxalic acid, calcium chloride, and more. Competitive pricing with global shipping."
      jsonLd={jsonLd}
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066B3] to-[#004A82] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Chemical Products</h1>
          <p className="text-blue-100 max-w-2xl text-lg">
            Explore our comprehensive range of high-quality industrial chemicals. All products are available for global export with complete documentation.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {productCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                  className={category === cat ? "bg-[#0066B3] hover:bg-[#004A82] text-white" : "text-gray-600"}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count & view toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="flex gap-1">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-[#0066B3] text-white" : ""}>
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-[#0066B3] text-white" : ""}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  to={`/en/products/${product.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-0.5 rounded-full">{product.category}</span>
                    <h2 className="text-base font-semibold text-[#1A1A2E] mt-2 mb-1 group-hover:text-[#0066B3] transition-colors">{product.name}</h2>
                    <p className="text-xs text-gray-500 mb-2">CAS: {product.cas}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>
                    <div className="mt-3 flex items-center text-sm text-[#0066B3] font-medium">
                      View Details <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  to={`/en/products/${product.slug}`}
                  className="group flex gap-4 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all p-4"
                >
                  <div className="w-32 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[#0066B3] bg-blue-50 px-2 py-0.5 rounded-full">{product.category}</span>
                      <span className="text-xs text-gray-500">CAS: {product.cas}</span>
                    </div>
                    <h2 className="text-base font-semibold text-[#1A1A2E] group-hover:text-[#0066B3] transition-colors">{product.name}</h2>
                    <p className="text-sm text-gray-600 line-clamp-1 mt-1">{product.shortDescription}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>Ports: {product.ports}</span>
                      <span>Loading: {product.loading}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setCategory("All Products"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
