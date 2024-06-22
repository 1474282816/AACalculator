import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/bill', component: 'Bill' }
  ],
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  manifest: {
    basePath: '/'
  },
  hash: true,
  base: '/',
  history: { type: 'hash' },
  npmClient: 'pnpm'
});
