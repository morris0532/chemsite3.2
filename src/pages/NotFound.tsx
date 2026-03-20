import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found - 404">
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl font-bold text-[#0066B3]/20 mb-4">404</div>
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for does not exist or has been moved. Please check the URL or navigate back to our homepage.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/en">
              <Button className="bg-[#0066B3] hover:bg-[#004A82] text-white">
                <Home className="w-4 h-4 mr-2" /> Go to Homepage
              </Button>
            </Link>
            <Link to="/en/products">
              <Button variant="outline" className="border-[#0066B3] text-[#0066B3]">
                <Search className="w-4 h-4 mr-2" /> Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}