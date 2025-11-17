// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
// import node from '@astrojs/node';
import nurodevbun from '@nurodev/astro-bun';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), nurodevbun()],
  adapter: nurodevbun()
});