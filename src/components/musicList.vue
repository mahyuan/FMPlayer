<template>
	<div class="musiclist">
		<span>click me</span>
		<ul>
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
			<li>5</li>
		</ul>
	</div>
</template>

<script>
	// import { getToplistDetail } from '../dataStore/music'
	
	export default {
		name: 'musicList',
		mounted() {},
		data() {
			return {
				show: true
			}
		},
		created() {
			// getToplistDetail()
			// 	.then((res) => {
			// 		if (res.data.code === 200) {
			// 			console.log('res', res)
			// 			this.musicList = res.data
			// 		}
			// 	})
		},
		methods: {
	
		}
	}
</script>

<style>
	/* // .musiclist
	// 	width: 200px;
	// 	font-size: 14px;
	// 	ul
	// 		list-style: none;
	// 		li
	// 			display: block; */

</style>
