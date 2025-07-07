import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Required for React JSX/TSX processing
    tailwindcss(), // Tailwind CSS integration
  ],
  base: '/movie-app/', // Matches your repository name
});