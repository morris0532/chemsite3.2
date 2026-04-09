import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, Package, BookOpen, MessageCircle, ArrowRight } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isRu = location.pathname.startsWith('/ru');
  const isFr = location.pathname.startsWith('/fr');
  const isEs = location.pathname.startsWith('/es');
  const locale = isRu ? 'ru' : (isFr ? 'fr' : (isEs ? 'es' : 'en'));
  const langPrefix = isRu ? '/ru' : (isFr ? '/fr' : (isEs ? '/es' : '/en'));

  const { search } = useSearch(locale as 'en' | 'ru' | 'fr' | 'es');
  const results = search(query);

  const handleResultClick = useCallback((result: any) => {
    const path = result.type === 'post' 
      ? `${langPrefix}/blog/${result.slug}`
      : `${langPrefix}/products/${result.slug}`;
    
    navigate(path);
    onClose();
    setQuery('');
  }, [langPrefix, navigate, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  const content = isRu ? {
    placeholder: "Поиск продуктов, статей...",
    enterQuery: "Введите поисковый запрос",
    noResults: "Результаты не найдены",
    noResultsDesc: "Не нашли нужный CAS номер или продукт? Как ваш надежный партнер, мы можем помочь найти специфические химикаты через нашу сеть проверенных заводов.",
    askWhatsApp: "Спросить в WhatsApp",
    sendInquiry: "Отправить запрос",
    product: "Продукт",
    article: "Статья",
    foundResults: (count: number) => `Найдено ${count} результатов`
  } : (isFr ? {
    placeholder: "Rechercher des produits, articles...",
    enterQuery: "Entrez une requête de recherche",
    noResults: "Aucun résultat trouvé",
    noResultsDesc: "Vous ne trouvez pas le numéro CAS ou le produit dont vous avez besoin ? En tant que partenaire de confiance, nous pouvons vous aider à trouver des produits chimiques spécifiques via notre réseau d'usines vérifiées.",
    askWhatsApp: "Demander sur WhatsApp",
    sendInquiry: "Envoyer une demande",
    product: "Produit",
    article: "Article",
    foundResults: (count: number) => `${count} résultats trouvés`
  } : isEs ? {
    placeholder: "Buscar productos, artículos...",
    enterQuery: "Ingrese una consulta de búsqueda",
    noResults: "No se encontraron resultados",
    noResultsDesc: "¿No encuentra el número CAS o el producto que necesita? Como su socio de confianza, podemos ayudarle a encontrar productos químicos específicos a través de nuestra red de fábricas verificadas.",
    askWhatsApp: "Preguntar por WhatsApp",
    sendInquiry: "Enviar Consulta",
    product: "Producto",
    article: "Artículo",
    foundResults: (count: number) => `Se encontraron ${count} resultados`
  } : {
    placeholder: "Search products, articles...",
    enterQuery: "Enter a search query",
    noResults: "No results found",
    noResultsDesc: "Can't find the CAS number or product you need? As your trusted partner, we can help source specific chemicals through our network of verified factories.",
    askWhatsApp: "Ask on WhatsApp",
    sendInquiry: "Send Inquiry",
    product: "Product",
    article: "Article",
    foundResults: (count: number) => `Found ${count} results`
  });

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              autoFocus
              type="text"
              placeholder={content.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-lg"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() === '' ? (
              <div className="px-6 py-12 text-center text-gray-500">
                {content.enterQuery}
              </div>
            ) : results.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {content.noResults}
                </h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                  {content.noResultsDesc}
                </p>
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <a
                    href="https://wa.me/8613583262050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg shadow-green-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {content.askWhatsApp}
                  </a>
                  <button
                    onClick={() => {
                      navigate(`${langPrefix}/contact`);
                      onClose();
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    {content.sendInquiry}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {results.map((result, idx) => (
                  <button
                    key={`${result.type}-${result.slug}-${result.language}-${idx}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {result.type === 'product' ? (
                          <Package className="w-4 h-4 text-[#0066B3]" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-[#0066B3]" />
                        )}
                        <span className="text-xs font-bold text-[#0066B3] uppercase">
                          {result.type === 'product' ? content.product : content.article}
                        </span>
                        {result.language !== locale && (
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {result.language.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {result.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {result.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
              {content.foundResults(results.length)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
