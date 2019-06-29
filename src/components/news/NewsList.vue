<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newslist/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                        	<span>发表时间:{{ item.add_time | dateFormat('YYYY-MM-DD h:mm:ss') }}</span>
                        	<span>点击:{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
	data () {
		return {
			newsList: []
		}
	},
	created () {
		this.getNewsList()
	},
	methods: {
		getNewsList () { //获取新闻列表
			this.$http.get('api/newslist.php').then(result => {
				if (result.body.status === 0) return this.newsList = result.body.message
				Toast({ message: '获取新闻列表失败', position: 'top', duration: 1000 })
			})
		}
	}
}

</script>
<style lang="less" scoped>
.mui-table-view {
	li {
		h1 {
			font-size: 14px;
			line-height: 14px;
			padding-top: 2px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.mui-ellipsis {
			font-size: 12px;
			color: #26A2FF;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>