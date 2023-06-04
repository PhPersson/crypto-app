import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import NewsPage from '@/views/NewsPage.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage},
  { path: '/news', name: 'NewsPage', component: NewsPage},
  { path: "/:catchAll(.*)", name: "NotFound", component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;