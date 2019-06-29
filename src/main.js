/*入口文件*/
import Vue from 'vue'
/*导入路由*/
import VueRouter from 'vue-router'
/*安装路由*/
Vue.use(VueRouter)
/*导入路由模块*/
import router from './router.js'

/**/
import Vuex from 'vuex'
Vue.use(Vuex)

const cart = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
  state: {
    car: cart //购物车商品数据
  },
  mutations: {
    addToCar (state, goodsinfo) {/*点击购物车把商品添加到 car*/
      let flag = false /*假设在购物车没有找到对用的商品*/
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      if (!flag) {
        state.car.push(goodsinfo)
      }

      /*本地持久存储*/
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    updateGoodsInfo(state, goodsinfo) { /* 修改购物车中商品数量值 */
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      /*本地持久存储*/
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar (state, id) { /* 根据id移除购物车商品 */
      state.car.some((item, index) => {
        if (item.id == id) {
          state.car.splice(index, 1)
          return true
        }
      })
       /*本地持久存储*/
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected (state, {id, val}) { /*设置商品选中状态*/
      state.car.some(item => {
        if (item.id == id) {
          item.selected = val
          return true
        }
      })
      /*本地持久存储*/
      localStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters: {
    getAllCount (state) { /*获取购物车所有数量*/
      let count = 0;
      state.car.forEach(item => {
        count += item.count
      })
      return count
    },
    getGoodsCount: (state) => (id) => {
      let count = 0
      state.car.some(item => {
        if (item.id === id) return count = item.count
      })
      return count
    },
    getGoodsSelected (state) {   
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAngAmount (state) {
      let o = {
        count: 0, /* 勾选数量 */
        amount: 0 /* 勾选总价格 */
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
    
  }
})

/*按需导入 mint-ui */
// import { Header, Swipe, SwipeItem, Button, Lazyload  } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

/*全部导入 mint-ui*/
import MintUI from 'mint-ui'
Vue.use(MintUI)


/*导入 vue-resource*/
import VueResource from 'vue-resource'
/*安装 vue-resource*/
Vue.use(VueResource)
/*设置请求根路径*/
Vue.http.options.root = 'http://tianxiezi.com'
/*设置 post 表单数据格式 application/x-www-form-urlencoded*/
Vue.http.options.emulateJSON = true


/*缩略图插件 vue-preview*/
import VuePreview from 'vue-preview'
/*默认安装*/
// Vue.use(VuePreview)
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: true,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})

/*导入时间格式组件 moment*/
import moment from 'moment'

/*定义全局过滤器*/
Vue.filter('dateFormat', function (dateStr, patter) {
	return moment(dateStr).format(patter)
})


/*导入 mui 代码片段*/
import './lib/mui/css/mui.min.css'
/* mui 扩展图标 */
import './lib/mui/css/icons-extra.css'

/*导入 app 根组件*/
import app from './App.vue'

const vm = new Vue({
	el: '#app',
	render: cEl => cEl(app),
	router,
  store
}) 
