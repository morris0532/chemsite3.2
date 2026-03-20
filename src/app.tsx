import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to /en */}
          <Route path="/" element={<Navigate to="/en" replace />} />

          {/* English routes */}
          <Route path="/en" element={<Index />} />
          <Route path="/en/products" element={<Products />} />
          <Route path="/en/products/:slug" element={<ProductDetail />} />
          <Route path="/en/about" element={<About />} />
          <Route path="/en/blog" element={<Blog />} />
          <Route path="/en/blog/:slug" element={<BlogDetail />} />
          <Route path="/en/contact" element={<Contact />} />

          {/* Future language routes - redirect to English for now */}
          <Route path="/ru/*" element={<Navigate to="/en" replace />} />
          <Route path="/fr/*" element={<Navigate to="/en" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;