import { Link, useLocation } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function NotFoundPage() {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const langPrefix = isRu ? "/ru" : (isFr ? "/fr" : "/en");

  const content = isRu ? {
    title: "Страница не найдена - 404",
    heading: "Страница не найдена",
    description: "Извините, страница, которую вы ищете, не существует или была перемещена. Пожалуйста, проверьте URL или вернитесь на нашу главную страницу.",
    goHome: "На главную",
    browseProducts: "Просмотреть продукты"
  } : (isFr ? {
    title: "Page non trouvée - 404",
    heading: "Page non trouvée",
    description: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Veuillez vérifier l'URL ou revenir à notre page d'accueil.",
    goHome: "Accueil",
    browseProducts: "Parcourir les produits"
  } : {
    title: "Page Not Found - 404",
    heading: "Page Not Found",
    description: "Sorry, the page you are looking for does not exist or has been moved. Please check the URL or navigate back to our homepage.",
    goHome: "Go to Homepage",
    browseProducts: "Browse Products"
  });

  return (
    <Layout title={content.title}>
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl font-bold text-[#0066B3]/20 mb-4">404</div>
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">
            {content.heading}
          </h1>
          <p className="text-gray-600 mb-8">
            {content.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to={langPrefix}>
              <Button className="bg-[#0066B3] hover:bg-[#004A82] text-white">
                <Home className="w-4 h-4 mr-2" /> {content.goHome}
              </Button>
            </Link>
            <Link to={`${langPrefix}/products`}>
              <Button variant="outline" className="border-[#0066B3] text-[#0066B3]">
                <Search className="w-4 h-4 mr-2" /> {content.browseProducts}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
