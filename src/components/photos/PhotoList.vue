<template>
    <div class="">
    	<!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id === 10 ? 'mui-active' : '']" v-for="item in categorys" :key="item.id" @tap="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
		  <router-link v-for="item in lists" :key="item.title" :to="'/home/photoinfo/' + item.id" tag="li">
		    <img v-lazy="item.img_url">
		    <div class="info">
		    	<h1 class="info-title">{{ item.title }}</h1>
		    	<div class="info-body">{{ item.zhaiyao }}</div>
		    </div>
		  </router-link>
		</ul>
    </div>
</template>
<script>
/*1.导入 mui js文件*/
import mui from '../../lib/mui/js/mui.min.js'

export default {
	data () {
		return {
			categorys: [],
			lists: []
		}
	},
	created (){
		this.getAllCategory()
		this.getPhotoListByCateId(10)
	},
	mounted () {
		/*2.初始化滑动控件*/
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 /*flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006*/
		})
	},
	methods: {
		getAllCategory () { //获取所有图片分类
			this.$http.get('api/getcategory.php').then(result => {
				if (result.body.status === 0) {
					result.body.message.unshift({title: '全部', id: 10})
					this.categorys = result.body.message
				}
			})
		},
		getPhotoListByCateId (cateId) {
			this.$http.get('api/getimages.php?id=' + cateId).then(result => {
				if (result.body.status === 0) return this.lists = result.body.message 
			})
		}
	}
}
</script>
<style lang="less" scoped>
* {
	touch-action: pan-y;
}


.photo-list {
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li {
		background-color: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 10px #999;
		position: relative;
		overflow: hidden;
		img {
			width: 100%;
			// display: block;
			vertical-align: middle;
			// object-fit: cover;
		}
		img[lazy=loading] {
		  width: 40px;
		  height: 300px;
		  margin: auto;
		}
		.info {
			color: #fff;
			position: absolute;
			bottom: 0;
			text-align: left;
			background-color: rgba(0, 0, 0, 0.4);
			max-height: 84px;
			.info-title {
				font-size: 14px;
			}
			.info-body {
				font-size: 13px;
			}
		}
	}
}
</style>