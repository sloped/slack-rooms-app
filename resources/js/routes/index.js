import VueRouter from 'vue-router';
import Events from '../vue-components/events.vue';
const routes = [
  { name: 'events', path: '/events/:name', component: Events, props:true },
];

const router = new VueRouter({
  routes // short for routes: routes
})

export default router;
