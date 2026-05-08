import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { loadRuntimeConfig } from './lib/config.ts';

// Ultra-Smooth initialization for UX
function initializeApp() {
  const rootElement = document.getElementById('root')!;
  
  // 1. Start rendering React immediately
  const root = createRoot(rootElement);
  root.render(<App />);

  // 2. Seamless transition logic
  // We use double rAF to ensure React has actually mounted and painted
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // REMOVED: setTimeout delay to prevent "flash" and "lag"
      const initialUI = document.getElementById('initial-ui');
      
      // Show the React root immediately when ready
      rootElement.classList.add('ready');
      
      // Then fade out the initial UI stub
      if (initialUI) {
        initialUI.style.transition = 'opacity 0.3s ease-out'; // Faster transition
        initialUI.style.opacity = '0';
        setTimeout(() => {
          initialUI.remove();
          // Clear the temporary background color from root after transition
          rootElement.style.backgroundColor = 'transparent';
        }, 300);
      }
    });
  });

  // 3. Handle non-critical tasks in the background
  loadRuntimeConfig()
    .then(() => {
      console.log('Runtime configuration loaded');
    })
    .catch((error) => {
      console.warn('Failed to load runtime config:', error);
    });
}

// Initialize the app
initializeApp();
