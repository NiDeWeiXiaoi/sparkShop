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
			// this.goods_id = options || {goods_id: '9832'}
			this.goods_id = {goods_id: '9832'}
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
		
		// .swiper-item {
		// 	width: 750rpx;
		// 	height: 750prx;
		// }
		
		.image {
			width: 750rpx;
			height: 750rpx;
		}
	}
}
</style>
