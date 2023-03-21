<template>
	<view class="cart">
		<view class="cart-item" v-for="item in cartList" :key="item.cat_id">
			<radio :checked="item.goods_select" @tap="changeSelect(item.goods_id)" color="#ea4350"></radio>
			<view class="cart-count">
				<u-number-box v-model="value"></u-number-box>
			</view>
			<navigator class="navigate" open-type="navigate">
				<image class="goods-image" :src="item.goods_small_logo || defaultImage" mode="widthFix"></image>
				<view class="info">
					<view class="name">{{item.goods_name}}</view>
					<view class="price">{{item.goods_price}}</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				value: 0
			}
		},
		computed: {
			...mapState(['cartList'])
		},
		onLoad() {

		},
		methods: {
			changeSelect(id) {
				console.log(id)
				let newsList = [...this.cartList]
				// let index = newsList.findIndex(v => v.goods_id === goods_id)
				// console.log(newsList[index])
				// newsList[index].goods_select = !newsList[index].goods_select
				
				// this.$store.commit("setCartList", newsList)
			}
		}
	}
</script>

<style lang="scss">
.cart {
	.cart-item {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ddd;
		padding: 20rpx 25rpx;
		position: relative;
		
		.cart-count {
			width: 240rpx;
			position: absolute;
			right: 10rpx;
			bottom: 10rpx;
			background-color: pink;
		}
		
		.navigate {
			display: flex;
		}
		
		.goods-image {
			overflow: hidden;
			width: 190rpx;
			height: 190rpx;
		}
		
		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 20rpx;
			font-size: 24rpx;
			
			.name {
				color: #434343;
			}
			
			.price {
				color: #EA4350;
				
				&::before {
					content: "¥";
					display: inline-block;
				}
			}
		}
	}
}
</style>
