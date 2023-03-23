import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import svg from 'vite-plugin-svgo';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      envDir: './.env',
      plugins: [react(), svgr(), svg(), tsconfigPaths()],
      define: {
        'process.env': {},
      },
    };
  }

  return {
    envDir: './.env',
    plugins: [react(), svgr(), svg(), tsconfigPaths()],
    define: {
      'process.env': {},
    },
  };
});
