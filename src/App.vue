<template>
	<div id="app">
		<Index></Index>
	</div>
</template>

<script>

	export default {
		name: 'app'
	}

</script>

<style lang="stylus">
body,div,p,ul,ol,li,img
	margin: 0
	padding: 0
	ul
		list-style: none
html
	-webkit-overflow-scrolling : touch
	-webkit-tap-highlight-color: rgba(0,0,0,0)
	body
		width: 500px
		font-family: "PingFang SC", "Microsoft YaHei"
		font-size: 0
		box-sizing: border-box
		#app
			font-family: 'Avenir', Helvetica, Arial, sans-serif
			-webkit-font-smoothing: antialiased
			-moz-osx-font-smoothing: grayscale
			color: #2c3e50
			width: 100%
			height: 100%
			.wrap
				width: 100%
				color: red
@media screen and (min-width: 600px)
	html
		background-color: #f5f5f5
		body
			width: 500px
			margin: 0 auto
			box-shadow: 1px 1px 1px 1px rgba(255,255,255,02), -1px -1px 1px 1px rgba(255,255,255,02)
</style>
