import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      rollupOptions: {
        external: [/tests\/.*/, /.*\.test\.(js|ts|jsx|tsx)$/],
      },
    },
    base: '/',
    plugins: [react(), svgr({ include: '**/*.svg?react' }), tsconfigPaths()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
