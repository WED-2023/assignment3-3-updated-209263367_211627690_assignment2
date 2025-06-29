localStorage.clear();
import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router/index';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.bundle.js'; - fuck shit move this shittt

// BootstrapVue 3
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import Vuelidate from '@vuelidate/core';

// Shared store
const store = reactive({
  username: localStorage.getItem('username'),
  firstname: localStorage.getItem('firstname'),
  lastname: localStorage.getItem('lastname'),
  server_domain: 'http://localhost:3000',
  login(username, firstname, lastname) {
    localStorage.setItem('username', username);
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('login', this.username, this.firstname, this.lastname);
  },
  logout() {
    console.log('logout');
    localStorage.removeItem('username');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    this.username = undefined;
    this.firstname = undefined;
    this.lastname = undefined;
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

// Global properties
app.config.globalProperties.store = store;
app.config.globalProperties.toast = (title, message, variant = 'info') => {
  alert(`${title}\n\n${message}\n\n${variant}`);
};
app.config.globalProperties.router = router;

window.axios = axios;
window.router = router;
window.toast = app.config.globalProperties.toast;

// Mount app
app.mount('#app');