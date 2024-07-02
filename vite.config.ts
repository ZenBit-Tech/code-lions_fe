/* eslint-disable import/no-extraneous-dependencies */
// / <reference types="vitest" />
// / <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/photos/*',
          dest: 'assets/photos',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
