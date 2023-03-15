<template>
	<view class="home">
		<my-search></my-search>
		<view class="swiper">
			<swiper class="banner" autoplay :indicator-dots="true" :indicator-color="rgba(255,255,255,255)">
				<swiper-item v-for="item in banners" :key="item.goods_id">
					<image :src="item.image_src" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="nav">
			
		</view>
	</view>
</template>

<script>
	import MySearch from "@/components/mySearch/mySearch.vue"
	import {getBannerList} from "@/api/home.js"
	export default {
		data() {
			return {
				banners: []
			}
		},
		onLoad() {
			this.getSwiper()
		},
		methods: {
			async getSwiper() {
				const res = await getBannerList()
				this.banners = res.message
			}
		},
		components: {
			MySearch
		}
	}
</script>

<style lang="scss">
	.swiper {
		.banner {
			width: 750rpx;
			height: 340rpx;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
