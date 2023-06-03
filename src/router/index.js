import { createWebHistory, createRouter } from 'vue-router';
import CryptoApp from '@/components/CryptoApp.vue';
import CryptoNews from '@/views/CryptoNews.vue';

const routes = [
  { path: '/', name: 'Home', component: CryptoApp},
  { path: '/news', name: 'News', component: CryptoNews},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;