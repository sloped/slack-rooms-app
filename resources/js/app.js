import Vue from 'vue';
import VueRouter from 'vue-router'
import main from "../sass/main.scss"
Vue.use(VueRouter)

//the root component
import App from './vue-components/app.vue';

const app = new Vue(App);
app.$mount('#app');