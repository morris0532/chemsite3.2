import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { loadRuntimeConfig } from './lib/config.ts';

// Load runtime configuration before rendering the app
async function initializeApp() {
  try {
    await loadRuntimeConfig();
    console.log('Runtime configuration loaded successfully');
  } catch (error) {
    console.warn(
      'Failed to load runtime configuration, using defaults:',
      error
    );
  }

  // Render the app
  const rootElement = document.getElementById('root')!;
  
  // Add loaded class to root to reveal content
  rootElement.classList.add('loaded');
  
  createRoot(rootElement).render(<App />);

  // Remove loading mask and animations after a short delay to ensure rendering is complete
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const mask = document.getElementById('loading-mask');
      if (mask) {
        mask.classList.add('fade-out');
        // Clean up mask after transition
        setTimeout(() => {
          if (mask && mask.parentNode) {
            mask.remove();
          }
        }, 500);
      }
      
      // Re-enable animations
      document.documentElement.classList.remove('no-animate');
    });
  });
}

// Initialize the app
initializeApp();
