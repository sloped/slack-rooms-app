import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//the root component
import App from '@components/app.vue';

const app = new Vue(App);
app.$mount('#app');