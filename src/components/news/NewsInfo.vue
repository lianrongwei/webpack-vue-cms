<template>
	<div class="newsinfo-container">
		<h3 class="title">{{ newsInfo.title }}</h3>
		<p class="subtitle">
			<span>发表时间:{{ newsInfo.add_time | dateFormat('YYYY-MM-DD h:mm:ss') }}</span>
			<span>点击:{{ newsInfo.click }}次</span>
		</p>
		<hr>
		<div class="content" v-html="newsInfo.content"></div>
		<comment :id="id"></comment>
	</div>
</template>
<script>
/*导入 评论子组件*/
import comment from '../subcomponents/comment.vue'


import { Toast } from 'mint-ui'
export default {
	data () {
		return {
			id: this.$route.params.id,
			newsInfo: []
		}
	},
	created () {
		this.getNewsInfo()
	},
	methods: {
		getNewsInfo () {
			this.$http.get('api/newslistid.php?id=' + this.id).then(result => {
				if (result.body.status === 0 ) return this.newsInfo = result.body.message
				Toast({ message: '获取新闻失败', position: 'top', duration: 1000 })
			})
		}
	},
	components: {
		comment
	}
}
</script>
<style lang="less">
.newsinfo-container {
	padding: 0 4px;
	.title {
		font-size: 16px;
		/*text-align: center;*/
		margin: 15px 0;
		color: red;
	}
	.subtitle {
		font-size: 13px;
		color: #26A2FF;
		display: flex;
		justify-content: space-between;
	}
	.content {
		font-size: 15px;
		color: #666;
		img {
			width: 100%;
			margin: 5px 0;
		}
	}
}
</style>