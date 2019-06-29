<template>
	<div class="goodsdesc-container">
		<h3>{{ info.title }}</h3>
		<hr>
		<div class="content" v-html="info.content"></div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			id: this.$route.params.id,
			info: {}
		}
	},
	created () {
		this.getGoodsDesc()
		this.setScrollTop()
	},
	methods: {
		getGoodsDesc () {
			this.$http.get('api/newslistid.php?id=' + this.id).then(result => {
				if (result.body.status === 0) return this.info = result.body.message
			})
		},
		setScrollTop () { //进入页面滚动bug
			document.documentElement.scrollTop = 0
			window.pageYOffset = 0
			document.body.scrollTop = 0
		}
	}
}
</script>
<style lang="less">
.goodsdesc-container {
	padding: 4px;
	h3 {
		font-size: 16px;
		color: #226aff;
		margin: 5px 0;
		line-height: 25px;
	}
	.content {
		color: #666;
		img {
			width: 100%;
		}
	}
}
</style>