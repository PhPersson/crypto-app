import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CryptoNews from '@/views/CryptoNews.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage},
  { path: '/news', name: 'News', component: CryptoNews},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;