<template>
	<div id="app">
		<div>click</div>
		<router-view/>
	</div>

</template>

<script>
	import {mapGetter, mapMutations} from 'vuex'
	import {getToplistDetail} from './dataStore/music'
	
	export default {
		name: 'app',
		components: {musicList},
		methods: {

		},
		created() {
			// getmusic() {
			// 	console.log(getToplistDetail)
			// 	return this.getToplistDetail
			// }
		},
		computed: {
			...mapGetter([
			])
		},

	}
</script>

<style>
	
</style>