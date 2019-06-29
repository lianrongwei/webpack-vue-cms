/*路由分离*/

/*导入路由*/
import VueRouter from 'vue-router'

/*路由组件*/
import HomeContainer from './components/tabbar/HomeContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/photoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'


/*创建路由对象*/
let router  = new VueRouter({
	routes: [
		{ path: '', redirect: '/home' },
		{ path: '/home', component: HomeContainer },
		{ path: '/search', component: SearchContainer },
		{ path: '/shopcart', component: ShopcartContainer },
		{ path: '/member', component: MemberContainer },
		{ path: '/home/newslist', component: NewsList },
		{ path: '/home/newsList/:id', component: NewsInfo },
		{ path: '/home/photolist', component: PhotoList },
		{ path: '/home/photoinfo/:id', component: PhotoInfo },
		{ path: '/home/goodslist', component: GoodsList },
		{ path: '/home/goodslist/:id', component: GoodsInfo },
		{ path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
		{ path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' }
	],
	linkActiveClass: 'mui-active'
})

//暴露路由对象
export default router
