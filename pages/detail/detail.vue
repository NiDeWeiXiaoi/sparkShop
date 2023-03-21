<template>
	<view class="details">
		<!--顶部安全区-->
		<u-status-bar></u-status-bar>
		<navigator open-type="navigateBack" class="back">
			<u-icon name="arrow-left" color="#fff"></u-icon>
		</navigator>
		<swiper class="swiper" indicator-dots autoplay duration>
			<swiper-item class="swiper-item" v-for="item in info.pics" :key="item.pics_id">
				<image class="image" :src="item.pics_big" mode="" @tap="handlerShowPreImage(item.pics_big)"></image>
			</swiper-item>
		</swiper>
		<!--商品描述信息-->
		<view class="goods-info">
			<view class="goods-info-title">
				<view class="goods-info-price">¥{{info.goods_price}}</view>
				<view class="icon">
					<u-icon name="share-square" size="20"></u-icon>
					<u-icon name="star" size="20"></u-icon>
				</view>
			</view>
			<view class="goods-info-name">
				{{info.goods_name}}
			</view>
		</view>
		<!--详情-->
		<view class="goods-details">
			图文详情
			<rich-text :nodes="info.goods_introduce"></rich-text>
		</view>
		<view class="bottom">
			<view class="icon-group">
				<u-icon name="kefu-ermai" color="#333" size="40rpx"></u-icon>
				<view>联系客服</view>
				<button open-type="contact">客服</button>
			</view>
			<view class="icon-group">
				<u-icon name="shopping-cart" color="#333" size="40rpx"></u-icon>
				<view>购物车</view>
			</view>
			<view class="btn" @tap="addCart">加入购物车</view>
			<view class="btn">立即购买</view>
		</view>
	</view>
</template>

<script>
	import {getDetails} from "@/api/goods"
	export default {
		data() {
			return {
				goods_id: {},
				info: {}
			}
		},
		onLoad(options) {
			console.log(options)
			this.goods_id = options
			// this.goods_id = {goods_id: '9832'}
			this.getDetailInfo()
		},
		methods: {
			async getDetailInfo() {
				const res = await getDetails(this.goods_id)
				this.info = res.message
				console.log(res)
			},
			
			handlerShowPreImage(current) {
				const urls = this.info.pics.map(v => v.pics_big)
				// 大图预览
				uni.previewImage({
					current,
					urls
				})
			},
			addCart() {
				let newsCartList = [...this.$store.state.cartList]
				// 判断待添加商品是否已经存在
				let index = newsCartList.findIndex(v => v.goods_id === Number(this.goods_id.goods_id))
				
				if(index !== -1) {
					newsCartList[index].goods_count++
				} else {
					let cartData = {
						goods_id: this.info.goods_id,
						goods_small_logo: this.info.goods_small_logo,
						goods_name: this.info.goods_name,
						goods_price: this.info.goods_price,
						goods_count: 1,
						goods_select: true
					}
					newsCartList.push(cartData)
				}
				
				this.$store.commit("setCartList", newsCartList)
				
				uni.showToast({
					title: "加入成功",
					icon: "success",
					mask: true
				})
				
				uni.switchTab({
					url: "/pages/cart/cart"
				})
				
			}
		}
	}
</script>

<style lang="scss">
.details {
	
	.back {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background: rgba(0, 0, 0, .2);
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 99;
		left: 10rpx;
		top: 40rpx;
	}
	
	.swiper {
		width: 750rpx;
		height: 750rpx;

		.image {
			width: 750rpx;
			height: 750rpx;
		}
	}
	
	.goods-info {
		padding: 0 20rpx;
		.goods-info-title {
			display: flex;
			justify-content: space-between;
			
			.goods-info-price {
				color: red;
			}
			
			.icon {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
	
	.bottom {
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		border-top: 1px solid #ddd;
		padding: 10rpx 0;
		background: #fff;
		
		.icon-group {
			flex: 1;
			font-size: 22rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: relative;
				
			button {
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
			}
			
		}
		.btn {
			width: 190rpx;
			height: 60rpx;
			border-radius: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			margin: 0 10rpx;
			font-size: 26rpx;
			background-color: #fcaa23;
			
			&:last-child {
				background-color: #ea4350;
			}
		}
	}
}
</style>
