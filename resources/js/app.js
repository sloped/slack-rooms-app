import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@components/app.vue';
Vue.use(VueRouter);

const app = new Vue(App);
app.$mount('#app');
