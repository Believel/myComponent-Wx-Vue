// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import App from './App'
import $ from 'n-zepto'
import router from './router'
import './resources/rem.js'
import store from "./store.js"
import vueUtil from "./util/vueUtil.js"
import axios from 'axios'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
Vue.use(MintUI);
Vue.use(vueUtil);
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
