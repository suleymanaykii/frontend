// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import './assets/css/tailwind.css';


store.dispatch('restoreToken');

const app = createApp(App)

app.config.globalProperties.$store = {
    isLoggedIn: false, // Varsayılan olarak kullanıcı oturumu kapalı
};

app.use(router);
app.use(store);

app.mount('#app');
