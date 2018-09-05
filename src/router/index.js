import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/view/HomePage.vue'
import ScrollAdsorb from '@/view/demo/scrollAdsorb';

Vue.use(Router)

export default new Router({
    routes: [
        /*{ path: '*', component: NotFoundComponent },//404页面*/
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
            title: "首页"
        },
        {
            path: '/ScrollAdsorb',
            name: 'ScrollAdsorb',
            component: ScrollAdsorb,
            title: "滚动吸附"
        },

    ]
})
