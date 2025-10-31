// Vite is the tool that runs the app during development and builds it for production.
// This file tells Vite how to handle our React code so it "just works" in the browser.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the configuration Vite will use
export default defineConfig({
  // Enable React support (JSX, fast refresh, etc.)
  plugins: [react()],

  // Make sure files that end with .js/.jsx/.ts/.tsx are treated as React JSX when needed
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },

  // Speed up development by pre-processing dependencies
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
