<template>
    <div>
        

        <!-- 轮播图区域 -->
        <swiper :bannerLists="bannerLists" :isfull="true"></swiper>

        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            	<router-link to="/home/photolist">
                     <img src="../../images/menu2.png">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            	<router-link to="/home/goodslist">
                     <img src="../../images/menu3.png">
                    <div class="mui-media-body">商品导购</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="testclick">
            	<router-link to="#">
                     <img src="../../images/menu4.png">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="testclick">
            	<router-link to="#">
                     <img src="../../images/menu5.png">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="testclick">
            	<router-link to="#">
                     <img src="../../images/menu6.png">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
            
        </ul>
    </div>
</template>
<script>
/* 提示 */
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
export default {
    data() {
        return {
            bannerLists: []
        }
    },
    created() {
        this.getBanner()
    },
    methods: {
        getBanner () { /*获取轮播图*/
            this.$http.get('api/banner.php').then(result => {
                if (result.body.status === 0) return this.bannerLists = result.body.message
                Toast({ message: '轮播图读取失败', position: 'top', duration: 1000 })
            })
        },
        testclick () {
            Toast({ message: '开发中,请等待...', position: 'top', duration: 500 })
        }
    },
    components: {
        swiper
    }
}
</script>
<style lang="less" scoped>
.mui-grid-view.mui-grid-9 {
	background-color: #fff;
	border: none;
	img {
		width: 50%;
		height: 50%;
	}
	.mui-media-body {
		font-size: 13px;
	}
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
	border: none;
}
</style>