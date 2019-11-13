require('./bootstrap');
window.Vue = require('vue');
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


require('./font-awesome')
import BootstrapVue from 'bootstrap-vue'
import router from './router/index' 
import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { extend , ValidationObserver , ValidationProvider } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { email } from 'vee-validate/dist/rules';
import { min } from 'vee-validate/dist/rules';


// Add the required rule
extend('required', required);
extend('email', email);
extend('min', min);





// No 'extend' is needed

// Use the provider immediately
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('Loading', Loading);



Vue.use(Loading);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)
Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
   auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});
export const bus = new Vue();

const app = new Vue({
    el: '#app',
    router
});
