
<style lang="stylus" scoped>
.content
	width: 100%;
	.wrap
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		padding: 10px 15px;
		text-align: center;
		.item
			font-size: 0;
			a:link, a:visited, a:hover, a:active
				color: #333;
				font-size: 25px;
				line-height: 30px;
				font-weight: 400;
				text-decoration: none;
	.main
		color: red;
	.footer
		color: blue;
		// compose: text_overflow from 'stylesheets/layout.css';
</style>

<template>
	<div class="content">
		<!-- <div :class="{link: currentTabIndex==1}" class="item">
						</div>
						<div :class="{link: currentTabIndex==2}" class="item">
						</div>
						<div :class="{link: currentTabIndex==3}" class="item">
						</div> -->
		<div class="wrap">
			<div class="item">
				<router-link to="/Toplist">排行榜</router-link>
			</div>
			<div class="item">
				<router-link to="/find">发现</router-link>
			</div>
			<div class="item">
				<router-link to="/social">我的</router-link>
			</div>
		</div>
		<!-- <banner></banner> -->

		<router-view></router-view>
		<div class="main">
			<span>{{msg}}</span>
		</div>
		<div class="footer">
			
			<span>footer</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Index',
		mounted() {},
		data() {
			return {
				msg: 'tab component'
			}
		},
		computed: {
			//   currentTabIndex() {
			//     //   return this.$state.currentTabIndex
			//   }
		},
		mounted() {
			
			
		}
	};
</script>
