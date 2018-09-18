import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex'
import Index from './components/index'
let Music = require('./lib/audio.js');

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
	methods: {
	},
	mounted() {
		new Music({selector: 'div[data-audio]'});
	},
	render: h => h(App)
})
