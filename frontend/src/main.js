import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faUsers, faLock, faEnvelope, faUserPlus, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUser, faUsers, faLock, faEnvelope, faUserPlus, faEye, faEyeSlash);


/**
 * Layouts
 */
import Default from "./layouts/Default.vue";
import Auth from "./layouts/Auth.vue";

/**
 * VueX
 */
import store from "./store/index";


const app = createApp(App);
app.use(store);
app.use(router, VueAxios, axios);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('default-layout', Default);
app.component('auth-layout', Auth);

app.mount('#app');
app.config.globalProperties.axios = axios;
axios.interceptors.request.use(function (config) {
    config.headers = {'Authorization' : `bearer ${localStorage.getItem('token')}`}
    return config
});