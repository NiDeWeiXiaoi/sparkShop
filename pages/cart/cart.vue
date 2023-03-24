<template>
	<view class="cart">
		<view class="cart-item" v-for="item in cartList" :key="item.cat_id">
			<radio :checked="item.goods_select" @tap="changeSelect(`${item.goods_id}`)" color="#ea4350"></radio>
			<view class="cart-count">
				<u-number-box :value="item.goods_count" :name="item.goods_id" @change="changeCount"></u-number-box>
			</view>
			<navigator class="navigate" open-type="navigate">
				<image class="goods-image" :src="item.goods_small_logo || defaultImage" mode="widthFix"></image>
				<view class="info">
					<view class="name">{{item.goods_name}}</view>
					<view class="price">{{item.goods_price}}</view>
				</view>
			</navigator>
		</view>
		
		<view class="bottom">
			<view class="select">
				<radio :checked="isSelectAll" color="#ea4350" @tap="handlerSelectAll"></radio>
				<text class="select-text">全选</text>
			</view>
			<view class="total">
				<text class="total-name">合计：</text>
				<text class="total-price">{{selectCartPrice}}</text>
			</view>
			<view class="account" @tap="gotoPay">去结算({{selectCartCount}})</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from "vuex"
	export default {
		data() {
			return {
				defaultImgae: "https://www.ssfiction.com/wp-content/uploads/2020/08/20200805_5f2b1669e9a24.jpg"
			}
		},
		computed: {
			...mapState(['cartList']),
			...mapGetters(['selectCartPrice', 'selectCartCount']),
			isSelectAll() {
				return this.$store.getters.isSelectAll
			}
		},
		onLoad() {

		},
		methods: {
			changeSelect(goodsId) {
				let newsList = [...this.cartList]
				let index = newsList.findIndex(v => v.goods_id === Number(goodsId))
				newsList[index].goods_select = !newsList[index].goods_select
				
				this.$store.commit("setCartList", newsList)
			},
			
			changeCount(val) {
				let newsList = [...this.cartList]
				let index = newsList.findIndex(v => v.goods_id === Number(val.name))
				console.log(index)
				newsList[index].goods_count = val.value
				
				this.$store.commit("setCartList", newsList)
			},
			
			handlerSelectAll() {
				let tempSelect = !this.isSelectAll
				let newsList = [...this.cartList]
				
				newsList.forEach(item => item.goods_select = tempSelect)
				
				this.$store.commit("setCartList", newsList)
			},
			
			gotoPay() {
				if(this.selectCartCount === 0) {
					uni.showToast({
						title: "请选择商品",
						icon: "none"
					})
					return;
				}
				
				uni.navigateTo({
					url: "/pages/pay/pay"
				})
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

	.bottom {
		height: 100rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		border-top: 1px solid #ddd;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		
		.select {
			.select-text {
				font-size: 22rpx;
				margin: 0 20rpx;
				color: #999;
			}
		}
		
		.total {
			flex: 1;
				
			.total-name {
				font-size: 24rpx;
			}
			
			.total-price {
				color: #EA4350;
			}
		}
		
		.account {
			background-color: #EA4350;
			color: #fff;
			font-size: 22rpx;
			width: 150rpx;
			height: 52rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 26rpx;
		}
	}
}
</style>
