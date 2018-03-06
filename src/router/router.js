import Vue from 'vue'
import Router from 'vue-router'
import getToplistDetail from '../components/musicList'

Vue.use(Router)

var routers = [
    {
        path: '/',
        name: 'musicList',
        component: 'getToplistDetail'    
    },
    
]

export default new Router({
    routers,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})