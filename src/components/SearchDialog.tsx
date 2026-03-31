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
  const locale = isRu ? 'ru' : 'en';
  const langPrefix = isRu ? '/ru' : '/en';

  const { search } = useSearch(locale as 'en' | 'ru');
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
              placeholder={isRu ? "Поиск продуктов, статей..." : "Search products, articles..."}
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
                {isRu ? "Введите поисковый запрос" : "Enter a search query"}
              </div>
            ) : results.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isRu ? "Результаты не найдены" : "No results found"}
                </h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                  {isRu 
                    ? "Не нашли нужный CAS номер или продукт? Как ваш надежный партнер, мы можем помочь найти специфические химикаты через нашу сеть проверенных заводов." 
                    : "Can't find the CAS number or product you need? As your trusted partner, we can help source specific chemicals through our network of verified factories."}
                </p>
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <a
                    href="https://wa.me/8613583262050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg shadow-green-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {isRu ? "Спросить в WhatsApp" : "Ask on WhatsApp"}
                  </a>
                  <button
                    onClick={() => {
                      navigate(isRu ? '/ru/contact' : '/en/contact');
                      onClose();
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    {isRu ? "Отправить запрос" : "Send Inquiry"}
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
                          {result.type === 'product' ? (isRu ? "Продукт" : "Product") : (isRu ? "Статья" : "Article")}
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
              {isRu ? `Найдено ${results.length} результатов` : `Found ${results.length} results`}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
