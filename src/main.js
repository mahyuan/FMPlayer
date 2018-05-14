import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex'
import Main from './components/main'

const isDebug_mode = false

// const isDebug_mode = process.env.NODE_ENV !== 'production'
// development
// production
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode
Vue.component('Main', Main)


new Vue({
	el: "#app",
	router,
	store,
	// components: {
	// 	Tab: Tab
	// },
	render: h => h(App)
})
