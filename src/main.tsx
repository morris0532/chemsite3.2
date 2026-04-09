import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { loadRuntimeConfig } from './lib/config.ts';

// Optimized initialization to reduce TBT (Total Blocking Time)
function initializeApp() {
  const rootElement = document.getElementById('root')!;
  
  // 1. Immediately add loaded class to root to reveal static content if present
  rootElement.classList.add('loaded');
  
  // 2. Start rendering React IMMEDIATELY without waiting for config
  const root = createRoot(rootElement);
  root.render(<App />);

  // 3. Load runtime configuration in the background
  // This prevents blocking the main thread during initial hydration
  loadRuntimeConfig()
    .then(() => {
      console.log('Runtime configuration loaded successfully');
    })
    .catch((error) => {
      console.warn(
        'Failed to load runtime configuration, using defaults:',
        error
      );
    })
    .finally(() => {
      // 4. Remove loading mask and animations after a short delay
      // Using requestAnimationFrame to ensure the browser has painted the first frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const mask = document.getElementById('loading-mask');
          if (mask) {
            mask.classList.add('fade-out');
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
    });
}

// Initialize the app
initializeApp();
