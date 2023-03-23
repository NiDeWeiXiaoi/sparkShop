import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		cartList: uni.getStorageSync('cartList') || []
	},
	getters: {
		isSelectAll(state, getters) {
			return state.cartList.every(v => v.goods_select)
		},
		// 计算选中商品
		selectCartList(state) {
			return state.cartList.filter(v => v.goods_select)
		},
		// 根据选中商品计算价格
		selectCartPrice(state, getters) {
			let total = 0
			getters.selectCartList.forEach(item => {
				total += item.goods_price * item.goods_count
			})
			return total
		},
		// 根据选中商品获取总数
		selectCartCount(state, getters) {
			let total = 0
			getters.selectCartList.forEach(item => {
				total += item.goods_count
			})
			return total
		}
	},
	mutations: {
		setCartList(state, payload) {
			state.cartList = payload
			uni.setStorageSync("cartList", payload)
		}
	}
})

export default store;