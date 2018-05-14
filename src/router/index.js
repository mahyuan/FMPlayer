import Vue from 'vue'
import Router from 'vue-router'
import MusicList from '../components/musicList'
import Find from '../components/find'
import Social from '../components/social'
// import main from '../components/main'

Vue.use(Router)

var routes = [
    {
        path: '/',
        component: MusicList
    },
    {
        path: '/musiclist',
        component: MusicList
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
