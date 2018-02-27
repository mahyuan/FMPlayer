<template>
	<div id="app">
		<div @click="getmusic">click</div>
	</div>
</template>

<script>
	import {mapGetter, mapMutations} from 'Vuex'
	import {getToplistDetail} from './dataStore/music'

	export default {
		name: 'app',
		components: {},
		methods: {

		},
		created() {
			getmusic() {
				console.log(getToplistDetail)
				return this.getToplistDetail
			}
		},
		computed: {
			...mapGetter([

			])
		},

	}
</script>

<style>
	
</style>