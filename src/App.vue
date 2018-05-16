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
html
	margin-left: auto;
	margin-right: auto;
body,html
	width: 450px;
	padding: 0;
body
	background: #eee;
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
@media screen and (max-width:450px)
	body,html
		width: 100%;
		margin: 0;
		box-shadow: 1px 1px 1px 1px rgba(255,255,255,02), -1px -1px 1px 1px rgba(255,255,255,02);
</style>
