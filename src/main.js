import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex'
import Index from './components/index'

const isDebug_mode = process.env.NODE_ENV !== 'production'

Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

Vue.component('Index', Index)

new Vue({
	el: "#app",
	router,
	store,
	// components: {
	// 	Tab: Tab
	// },
	render: h => h(App)
})
