import VueRouter from 'vue-router';
import Events from '@components/events/events.vue';
import Login from '@components/auth/login.vue';
import AvailableRooms from '@components/rooms/available.vue';
const routes = [
  { name: 'root', path: '/', component: AvailableRooms },
  { name: 'events', path: '/events/:name', component: Events, props:true },
  { name: 'login', path: '/login', component: Login }
];

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
});

export default router;
