import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/view/HomePage.vue'
import ScrollAdsorb from '@/view/demo/scrollAdsorb';
import Calendar from '@/view/Calendar'; // 日历组件使用
import List from '@/view/List'; // 列表页，带分页

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
        {
            path: '/list',
            name: 'list',
            component: List,
            title: '列表带分页'
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar,
            title: '日历'
        }

    ]
})
