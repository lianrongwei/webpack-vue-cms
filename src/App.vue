<template>
	<div class="app-container">
		<!--  顶部 Header 区域 -->
		<mt-header fixed title="Gonefour">
			<span slot="left" v-show="flag" >
			    <mt-button icon="back" @click="goBack">返回</mt-button>
			</span>
		</mt-header>
		<!-- 中间路由 router-view 区域 -->
		<transition>
			<router-view></router-view>
		</transition>
		<!--  顶部 Tabbar 区域 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home" >
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search" >
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcart" >
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member" >
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">我</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
export default {
	data () {
		return {
			flag: false
		}
	},
	created () {
		this.flag = this.$route.path === '/home' ? false : true 
	},
	methods: {
		goBack () { /* 点击后退 */
			this.$router.go(-1)
		} 
	},
	watch: {
		'$route.path': function (newVal) {
			this.flag = newVal === '/home' ? false : true
		}
	}
}
</script>
<style lang="less" scoped>
.mint-header {
	z-index: 1000;
}
.app-container {
	padding-top: 40px;
	overflow-x: hidden;
	padding-bottom: 50px;
	max-width: 540px;
	margin: 0 auto;
}

.v-enter {
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}

/*改类名，解决导航栏 bug ， 当图片分享里面滑动块可以滑动出现tabbar不能滑动 */
.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>