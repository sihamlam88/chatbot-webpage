// vite.config.js
export default {
  root: 'docs',
  build: {
    outDir: 'docs/dist',
    rollupOptions: {
      input: '/docs/index.html',
    }
  }
};
