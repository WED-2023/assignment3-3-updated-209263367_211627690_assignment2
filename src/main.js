import { createApp, reactive } from 'vue';
import App from './App.vue';
import routes from './router/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createRouter, createWebHistory } from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// BootstrapVue 3
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import { BContainer, BRow, BCol } from 'bootstrap-vue-3';
import Vuelidate from '@vuelidate/core';


// Router setup
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Shared store
const store = reactive({
  username: localStorage.getItem('username'),
  server_domain: 'http://localhost:3000',
  login(username) {
    localStorage.setItem('username', username);
    this.username = username;
    console.log('login', this.username);
  },
  logout() {
    console.log('logout');
    localStorage.removeItem('username');
    this.username = undefined;
  },
});

window.store = store;


// Axios interceptors
axios.interceptors.request.use((config) => config, (error) => Promise.reject(error));
axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

// Create app
const app = createApp(App);

// Plugins
app.use(router);
app.use(VueAxios, axios);
app.use(BootstrapVue3);
app.use(Vuelidate); 

// Register global BootstrapVue3 components
app.component('BContainer', BContainer);
app.component('BRow', BRow);
app.component('BCol', BCol);

// Global store
app.config.globalProperties.store = store;

window.axios = axios;
window.router = router;
window.toast = (title, message, variant = 'info') => {
  alert(`${title}\n\n${message}\n\n${variant}`); // או תחליף ל-toast אמיתי
};

// Mount app
app.mount('#app');
