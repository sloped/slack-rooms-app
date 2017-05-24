import VueRouter from 'vue-router';
import Events from '@components/events/events.vue';
import Login from '@components/auth/login.vue';
import AvailableRooms from '@components/rooms/available.vue';
import Admin from '@components/admin/index.vue';

const About = resolve => require(['@components/static/about.vue'], resolve);

const routes = [
  { name: 'root', path: '/', component: AvailableRooms },
  { name: 'events', path: '/events/:name', component: Events, props:true },
  { name: 'login', path: '/login', component: Login },
  { name: 'about', path: '/about', component: About },
  { name: 'admin', path: '/admin', component: Admin }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
