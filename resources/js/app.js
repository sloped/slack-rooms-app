import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@components/app.vue';

Vue.config.devtools = process.env.NODE_ENV === 'production' ? false : true;

Vue.use(VueRouter);

const app = new Vue(App);
app.$mount('#app');
