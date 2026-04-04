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
  createRoot(rootElement).render(<App />);
  
  // Add 'loaded' class to trigger the smooth fade-in after hydration
  setTimeout(() => {
    rootElement.classList.add('loaded');
  }, 50);
}

// Initialize the app
initializeApp();
