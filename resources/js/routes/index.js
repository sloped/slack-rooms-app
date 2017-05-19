import VueRouter from 'vue-router';
import Events from '@components/events/events.vue';
import Login from '@components/auth/login.vue';
const routes = [
  { name: 'events', path: '/events/:name', component: Events, props:true },
  { name: 'login', path: '/login', component: Login, props:true}
];

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

export default router;
