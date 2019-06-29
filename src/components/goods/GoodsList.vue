<template>
	<div class="goods-list">
		<!-- <router-link class="goods-item" to="/home/goodslist/1"  tag="div">
			<img src="https://i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg" alt="">
			<h1 class="title">小米9 6GB+128GB</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥2199</span>
					<span class="old">￥2599</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩60件</span>
				</p>
			</div>
		</router-link>
		<router-link class="goods-item" to="/home/goodslist/2"  tag="div">
			<img src="https://i1.mifile.cn/a1/pms_1540429613.4617799!220x220.jpg" alt="">
			<h1 class="title">小米MIX 3  6GB+128GB 磁动力滑盖全面屏 / 四曲面陶瓷机身</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥2199</span>
					<span class="old">￥2599</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩60件</span>
				</p>
			</div>
		</router-link>
		<router-link class="goods-item" to="/home/goodslist/3" tag="div">
			<img src="https://i1.mifile.cn/a1/pms_1554694214.08887531!220x220.png" alt="">
			<h1 class="title">小米Play 4GB+64GB</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥2199</span>
					<span class="old">￥2599</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩60件</span>
				</p>
			</div>
		</router-link> -->
		<div class="goods-item" @click="goDetail(10)">
			<img src="https://i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg" alt="">
			<h1 class="title">小米9 6GB+128GB</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥2199</span>
					<span class="old">￥2599</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩60件</span>
				</p>
			</div>
		</div>
		<div class="goods-item" @click="goDetail(2)">
			<img src="https://i1.mifile.cn/a1/pms_1540429613.4617799!220x220.jpg" alt="">
			<h1 class="title">小米MIX 3  6GB+128GB 磁动力滑盖全面屏 / 四曲面陶瓷机身</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥2199</span>
					<span class="old">￥2599</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩60件</span>
				</p>
			</div>
		</div>
		<div class="goods-item" @click="goDetail(3)">
			<img src="https://i1.mifile.cn/a1/pms_1554694214.08887531!220x220.png" alt="">
			<h1 class="title">小米Play 4GB+64GB</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥2199</span>
					<span class="old">￥2599</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩60件</span>
				</p>
			</div>
		</div>
		
	</div>
</template>
<script>


export default {
	data () {
		return {

		}
	},
	methods: {
		goDetail(id) {
			this.$router.push('/home/goodslist/' + id)
		}
	}
}
</script>
<style lang="less" scoped>
.goods-list {
	display: flex;
	flex-wrap: wrap;
	padding: 7px;	
	justify-content: space-between;
	.goods-item {
		width: 49%;
		border: 1px solid #ccc;
		box-shadow: 0 0 8px #ccc;
		margin-bottom: 7px;
		padding: 2px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 293px;
		img {
			width: 100%;
		}
		.title {
			font-size: 14px;
		}

		.info {
			background-color: #eee;
			width: 100%;
			p {
				margin: 0;
				padding: 5px;
			}
			.price {
				.now {
					color: red;
					font-weight: bold;
					font-size: 16px;
				}
				.old {
					text-decoration: line-through;
					font-size: 12px;
					margin-left: 10px;
				}
			}
			.sell {
				display: flex;
				justify-content: space-between;
				font-size: 13px;
			}
		}
	}
}
</style>