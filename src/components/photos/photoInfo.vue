<template>
	<div class="photoinfo-container">
		<h3>{{ photoInfo.title }}</h3>
		<p class="subtitle">
			<span>发表时间:{{ photoInfo.add_time | dateFormat('YYYY-MM-DD hh:mm:ss') }}</span>
			<span>点击:{{ photoInfo.click }}次</span>
		</p>
		<hr>
		<!-- 缩略图 -->
		<vue-preview :slides="smallImg" class="smallimg"></vue-preview>
		<!-- 图片内容区域 -->
		<div class="content" v-html="photoInfo.content"></div>
		<!-- 评论子组件 -->
		<comment :id="id"></comment>
	</div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
	data () {
		return {
			id: this.$route.params.id,
			photoInfo: {},
			smallImg: []
		}
	},
	created () {
		this.setScrollTop()
		this.getPhotoInfo()
		this.getThumbs()
	},
	methods: {
		getPhotoInfo () {/*获取页面信息*/
			this.$http.get('api/getimagesid.php?id=' + this.id).then(result => {
				if (result.body.status === 0) return this.photoInfo = result.body.message
			})
		},
		getThumbs () { /*获取缩略图*/
			this.$http.get('api/getthumbs.php?id=' + this.id).then(result => {
				if (result.body.status === 0) {
					result.body.message[0].src.forEach(item => {
						item.title = result.body.message[0].title
						item.alt = result.body.message[0].title
						item.msrc = item.src
					})
					return this.smallImg = result.body.message[0].src
				}
			})
		},
		setScrollTop () { //进入页面滚动bug
			document.documentElement.scrollTop = 0
			window.pageYOffset = 0
			document.body.scrollTop = 0
		}
	},
	components: {
		comment
	}
}
</script>
<style lang="less">
.photoinfo-container {
	padding: 3px;
	h3 {
		font-size: 15px !important;
		// color: #26A2FF;
		display: inline-block;
		margin: 10px 0;
	}
	.subtitle {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
	}
	.content {
		font-size: 13px;
		line-height: 25px;
		float:left;
	}
}
.smallimg{
	// padding: 1%;
	figure {
		margin: 0;
		width: 32%;
		height: 100px;
		display: inline-block;
		margin: 0.6666%;
		box-shadow: 0 0 5px #999;
		padding: 1px;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}

</style>