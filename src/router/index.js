import Vue from 'vue'
import Router from 'vue-router'
import Toplist from '../components/Toplist'
import Find from '../components/find'
import Social from '../components/social'
// import index from '../components/index'

Vue.use(Router)

var routes = [
    {
        path: '/',
        component: Toplist
    },
    {
        path: '/Toplist',
        component: Toplist
    },
    {
        path: '/find',
        component: Find
    },
    {
        path: '/social',
        component: Social
    }
]

export default new Router({
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})
