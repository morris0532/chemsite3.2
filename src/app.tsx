import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';

// IMPORTANT: Import Index synchronously to enable "Progressive Top-Down Rendering"
// This ensures the Hero and Header appear instantly without waiting for lazy loading.
import Index from './pages/Index';

// Other pages remain lazy-loaded to optimize bundle size
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Topics = lazy(() => import('./pages/Topics'));
const TopicDetail = lazy(() => import('./pages/TopicDetail'));
const PackagingGallery = lazy(() => import('./pages/PackagingGallery'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SpeedInsights />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            {/* Redirect root to /en */}
            <Route path="/" element={<Navigate to="/en" replace />} />

            {/* English routes */}
            <Route path="/en" element={<Index />} />
            <Route path="/en/products" element={<Products />} />
            <Route path="/en/products/:slug" element={<ProductDetail />} />
            <Route path="/en/topics" element={<Topics />} />
            <Route path="/en/topics/:slug" element={<TopicDetail />} />
            <Route path="/en/packaging-gallery" element={<PackagingGallery />} />
            <Route path="/en/about" element={<About />} />
            <Route path="/en/blog" element={<Blog />} />
            <Route path="/en/blog/page/:page" element={<Blog />} />
            <Route path="/en/blog/:slug" element={<BlogDetail />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/en/terms-of-service" element={<TermsOfService />} />

            {/* Russian routes */}
            <Route path="/ru" element={<Index />} />
            <Route path="/ru/products" element={<Products />} />
            <Route path="/ru/products/:slug" element={<ProductDetail />} />
            <Route path="/ru/topics" element={<Topics />} />
            <Route path="/ru/topics/:slug" element={<TopicDetail />} />
            <Route path="/ru/packaging-gallery" element={<PackagingGallery />} />
            <Route path="/ru/about" element={<About />} />
            <Route path="/ru/blog" element={<Blog />} />
            <Route path="/ru/blog/page/:page" element={<Blog />} />
            <Route path="/ru/blog/:slug" element={<BlogDetail />} />
            <Route path="/ru/contact" element={<Contact />} />
            <Route path="/ru/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/ru/terms-of-service" element={<TermsOfService />} />

            {/* French routes */}
            <Route path="/fr" element={<Index />} />
            <Route path="/fr/products" element={<Products />} />
            <Route path="/fr/products/:slug" element={<ProductDetail />} />
            <Route path="/fr/topics" element={<Topics />} />
            <Route path="/fr/topics/:slug" element={<TopicDetail />} />
            <Route path="/fr/packaging-gallery" element={<PackagingGallery />} />
            <Route path="/fr/about" element={<About />} />
            <Route path="/fr/blog" element={<Blog />} />
            <Route path="/fr/blog/page/:page" element={<Blog />} />
            <Route path="/fr/blog/:slug" element={<BlogDetail />} />
            <Route path="/fr/contact" element={<Contact />} />
            <Route path="/fr/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/fr/terms-of-service" element={<TermsOfService />} />

            {/* Spanish routes */}
            <Route path="/es" element={<Index />} />
            <Route path="/es/products" element={<Products />} />
            <Route path="/es/products/:slug" element={<ProductDetail />} />
            <Route path="/es/topics" element={<Topics />} />
            <Route path="/es/topics/:slug" element={<TopicDetail />} />
            <Route path="/es/packaging-gallery" element={<PackagingGallery />} />
            <Route path="/es/about" element={<About />} />
            <Route path="/es/blog" element={<Blog />} />
            <Route path="/es/blog/page/:page" element={<Blog />} />
            <Route path="/es/blog/:slug" element={<BlogDetail />} />
            <Route path="/es/contact" element={<Contact />} />
            <Route path="/es/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/es/terms-of-service" element={<TermsOfService />} />

            {/* Arabic routes */}
            <Route path="/ar" element={<Index />} />
            <Route path="/ar/products" element={<Products />} />
            <Route path="/ar/products/:slug" element={<ProductDetail />} />
            <Route path="/ar/topics" element={<Topics />} />
            <Route path="/ar/topics/:slug" element={<TopicDetail />} />
            <Route path="/ar/packaging-gallery" element={<PackagingGallery />} />
            <Route path="/ar/about" element={<About />} />
            <Route path="/ar/blog" element={<Blog />} />
            <Route path="/ar/blog/page/:page" element={<Blog />} />
            <Route path="/ar/blog/:slug" element={<BlogDetail />} />
            <Route path="/ar/contact" element={<Contact />} />
            <Route path="/ar/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/ar/terms-of-service" element={<TermsOfService />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
