<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入你要BB的内容(最多吐槽120个字)" maxlength="120" v-model="content"></textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item, index) in comments" :key="index">
				<div class="cmt-title">
					<span>第{{ index + 1}}楼&nbsp;&nbsp;用户:<i>{{ item.user_name }}</i> &nbsp;&nbsp;</span>
					<span>发表时间:{{ item.add_time | dateFormat('YYYY-MM-DD hh:mm:ss') }}</span>
				</div>
				<div class="cmt-body">
					{{ item.content }}
				</div>
			</div>

		</div>
		<mt-button type="danger" v-show="flag" size="large" style="margin-bottom: 5px;" @click="getMore" plain>加载更多</mt-button>
	</div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
	data () {
		return {
			pageIndex: 1,
			comments: [],
			content: '',
			flag: true
		}
	},
	created () {
		this.getComment()
	},
	methods: {
		getComment () { //获取评论数据
			this.$http.get('api/getcomments.php?id='+ this.id +'&page=' + this.pageIndex).then(result => {
				if (result.body !== null) {
					if (result.body.status === 0) {
						this.comments = this.comments.concat(result.body.message)
						return this.$http.get('api/getcomments.php?id='+ this.id +'&page=' + (this.pageIndex + 1))
					}
				}else{
					return this.flag = false
				}
			}).then(result => {
				if (result.body === null) return this.flag = false
			})
		},
		getMore () { //获取更多
			this.pageIndex++;
			this.getComment()
		},
		postComment () { //发表评论
			if (this.content.trim() === 0 || this.content.trim() === '') return Toast({ message: '评论内容不能为空', position: 'top', duration: 1000 })
			let obj = {
				user_name: '匿名用户',
				add_time: Date(),
				content: this.content.trim()
			}
			this.comments.unshift(obj)
			this.content = ''
		}
	},
	props: ['id']
}
</script>
<style lang="less" scoped>
.cmt-container {
	h3 {
		font-size: 18px;
	}
	textarea {
		font-size: 14px;
		height: 85px;
		margin: 0;
	}
	.cmt-list {
		margin: 5px 0;
		.cmt-item {
			font-size: 13px;
			.cmt-title {
				background-color: #ccc;
				display: flex;
				justify-content: space-between;
				i {
					font-style: normal;
					font-weight: 700;
				}
			}
			.cmt-body {
				line-height: 20px;
				/*height: 20px;*/
				text-indent: 2em;
				padding: 5px 0;
			}
		}
	}
}
</style>