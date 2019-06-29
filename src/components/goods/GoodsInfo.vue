<template>
    <div class="goodsinfo-container">
    	<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter"
    	>
    		<div class="ball" id="ball" v-show="ballFlag" ref="ball"></div>
    	</transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerLists="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">小米MIX{{ this.id }} 8G + 128G 性能怪兽</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                    	市场价：<del>￥2399</del>&nbsp;&nbsp;销售价：<span class="now-price">￥{{ 2199 - parseInt(this.id + '00') }}</span>
                    </p>
                    <p>
                    	购买数量：
              			<numbox @getcount="getSelectedCount" :max="num"></numbox>	
                    </p>
                    <p>
                    	<mt-button type="primary" size="small" @click="test">&nbsp;&nbsp;立即购买&nbsp;&nbsp;</mt-button>
                    	<mt-button type="danger" size="small" @click="addToShopcart">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：SD00000{{ this.id }}</p>
                    <p>库存情况：{{ 60 - this.id }}件</p>
                    <p>上架时间：2019-06-{{ 23 - parseInt(this.id) }} 12:00:03</p>

                </div>
            </div>
            <div class="mui-card-footer">
            	<mt-button type="primary" size="large" @click="goDesc(id)" plain>图文介绍</mt-button>
            	<mt-button type="danger" size="large" @click="goComment(id)" plain>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>

/*轮播图组件*/
import swiper from '../subcomponents/swiper.vue'
/*box-number*/
import numbox from '../subcomponents/goodsinfo_numbox.vue'
import { Toast } from 'mint-ui'
export default {
	data () {
		return {
			id: this.$route.params.id,
			lunbotu: [],
			ballFlag: false,
			selectedCount: 1,
			num: null
		}
	},
	created () {
		this.getLunbotu()
		this.getNum()
	},
	methods: {
		getLunbotu () {
			// 获取轮播图
			this.$http.get('api/getthumbs.php?id=' + this.id).then(result => {
				if (result.body.status === 0) {
					result.body.message[0].src.forEach(item => {
						item.img = item.src
					})
					this.lunbotu = result.body.message[0].src
				}
			})
		},
		goDesc (id) {
			// 获取详情页面
			this.$router.push({ name: 'goodsdesc', params: {id } })
		},
		goComment (id) {
			// 获取评论
			this.$router.push({ name: 'goodscomment', params: {	id } })
		},
		addToShopcart () {
			// console.log(document.getElementById('numbox').value)
			// console.log(this.selectedCount)
			// console.log(this.num)
			if (this.selectedCount === 0) return
			if (this.num <= 0) return
			if (this.selectedCount > this.num) {
				this.selectedCount = 1
			}
			let img = ''
			let tit = ''
			if (this.id == 10) {
				img = 'https://i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg'
				tit = '小米9 6GB+128GB'
			}else if (this.id == 2) {
				img = 'https://i1.mifile.cn/a1/pms_1540429613.4617799!220x220.jpg'
				tit = '小米MIX 3  6GB+128GB 磁动力滑盖全面屏 / 四曲面陶瓷机身'
			}else{
				img = 'https://i1.mifile.cn/a1/pms_1554694214.08887531!220x220.png'
				tit = '小米Play 4GB+64GB'
			}

			//添加到购物车
			this.ballFlag = !this.ballFlag
			let p = (2199 - parseInt(this.id + '00'))
			let max = 60 - this.id
			let goodsinfo ={ 
				id: this.id, 
				count: this.selectedCount, 
				price: p,
				selected: false,
				src: img,
				title: tit,
				max: max
			}
			this.$store.commit('addToCar', goodsinfo)
			this.num -= goodsinfo.count
		},
		beforeEnter (el) {
			// el.style.opacity = 1
			el.style.transform = 'translate(0,0)'
		},
		enter (el, done) {
			el.offsetWidth;
			/*小球位置*/
			let ballPosition = this.$refs.ball.getBoundingClientRect()
			let badgePosition = document.getElementById('badge').getBoundingClientRect()
			let xDist = badgePosition.left - ballPosition.left
			let yDist = badgePosition.top - ballPosition.top

			el.style.transform = `translate(${xDist}px,${yDist}px)`
			// el.style.opacity = 0
			el.style.transition = 'all 0.8s cubic-bezier(.4,-0.3,1,.68)'
			done()
		},
		afterEnter (el) {
			this.ballFlag = !this.ballFlag
		},
		getSelectedCount (count) {
			this.selectedCount = count
		},
		getNum () {
			let that = this
			this.num = 60 - this.id - this.$store.getters.getGoodsCount(that.id)
			// setTimeout( () => {
			// 	this.num = 60 - this.id - this.$store.getters.getGoodsCount(that.id)
			// },1000)
		},
		test () {
			Toast({ message: '开发中,请等待...', position: 'top', duration: 1000 })
		}
	},
	mounted () {
		// let timeID =  setTimeout(function () {
		// 	/*设置小球起始位置*/
		// 	let numboxPos = document.getElementById('numbox').getBoundingClientRect()
		// 	let x = numboxPos.left + 12
		// 	let y = numboxPos.top + 7
		// 	document.getElementById('ball').style.left = x + 'px'
		// 	document.getElementById('ball').style.top = y + 'px'
		// 	clearTimeout(timeID)
		// },500)
	},
	components: {
		swiper,
		numbox
	}
}
</script>
<style lang="less" scoped>
.goodsinfo-container {
	background-color: #eee;
	overflow: hidden;

	.now-price {
		color: red;
		font-size: 16px;
		font-weight: bold;
	}
	.mui-card-footer {
		display: block;
		button {
			margin: 15px 0;
		}
	}
	.ball {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: red;
		position: absolute;
		z-index: 100;
		top: 390px;
		left: 150px;
	}
}
</style>