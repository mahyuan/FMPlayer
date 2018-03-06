import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router/router'

var app = new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>',

})