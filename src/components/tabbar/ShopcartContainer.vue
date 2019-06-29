<template>
    <div class="shopcart-container">
    	
        <div class="goods-list">
        	<!-- 商品列表区域 -->
            <div class="mui-card" v-for="(item, index) in goodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="item.selected" @change="selectedChnage(item.id, item.selected)"></mt-switch>
                        <img :src="item.src">
                        <div class="info">
                        	<h1>{{ item.title }}</h1>
                        	<p>
                        		<span class="price">￥{{ item.price }}</span>
                        		<numbox :num="item.count" :id="item.id" :max='item.max'></numbox>
                        		<a href="javascript:;" @click.prevent="remove(item.id, index)">删除</a>
                        	</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                   <div class="left">
                   		<p>总计(不含运费)</p>
                   		<p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAngAmount.count }}</span> 件，总价 <span class="red">￥{{ $store.getters.getGoodsCountAngAmount.amount }}</span> 元</p>
                   </div>
                   <mt-button type="danger" @click="test">结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import numbox from '../subcomponents/shopcart_numbox.vue'
import { Toast } from 'mint-ui'
export default {
	data () {
		return {
			goodsList: []
		}
	},
	created () {
		this.getGoodsList()
	},
	methods: {
		getGoodsList () {
			this.goodsList = this.$store.state.car
		},
		remove (id, index) {/* 点击从购物车移除商品 */
			this.goodsList.splice(index, 1)
			this.$store.commit('removeFormCar', id)
		},
		selectedChnage (id, val) { /* 设置商品选中状态*/
			this.$store.commit('updateGoodsSelected',{
				id: id,
				val: val
			})
		},
		test () {
			Toast({ message: '开发中,请等待...', position: 'top', duration: 1000 })
		}
	},
	components: {
		numbox
	}
}
</script>
<style lang="less" scoped>
.shopcart-container {
	background-color: #eee;
	overflow: hidden;
	.goods-list {
		.mui-card-content-inner {
			display: flex;
			align-items: center;
		}
		img {
			width: 60px;
			height: 60px;
		}
		h1 {
			font-size: 13px;
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.price {
				color: red;
				font-weight: bold; 
			}
		}
	}
	.jiesuan {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			.red {
				font-weight: bold;
				color: red;
				font-size: 16px;
			}
		}
	}
}
</style>