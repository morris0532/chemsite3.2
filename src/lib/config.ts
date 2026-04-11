// Runtime configuration
let runtimeConfig: {
  API_BASE_URL: string;
} | null = null;

// Configuration loading state
let configLoading = false; // Set to false as we're no longer loading from endpoint

// Default fallback configuration
const defaultConfig = {
  API_BASE_URL: 'https://www.sinopeakchem.com', // Updated to production domain
};

/**
 * Function to load runtime configuration
 * @deprecated /api/config is no longer used to reduce TTFB. Using static config instead.
 */
export async function loadRuntimeConfig(): Promise<void> {
  // No-op to reduce TTFB by avoiding unnecessary network requests
  configLoading = false;
  return Promise.resolve();
}

// Get current configuration
export function getConfig() {
  if (runtimeConfig) {
    return runtimeConfig;
  }

  if (import.meta.env.VITE_API_BASE_URL) {
    return {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    };
  }

  return defaultConfig;
}

// Dynamic API_BASE_URL getter
export function getAPIBaseURL(): string {
  const baseURL = getConfig().API_BASE_URL;
  if (baseURL === '/') {
    return '';
  }
  return baseURL;
}

export const config = {
  get API_BASE_URL() {
    return getAPIBaseURL();
  },
};
