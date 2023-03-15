<template>
	<view class="home">
		<my-search></my-search>
		<view class="swiper">
			<swiper class="banner" autoplay :indicator-dots="true">
				<swiper-item v-for="item in banners" :key="item.goods_id">
					<image :src="item.image_src" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="nav">
			<view class="nav-item" v-for="item,index in navs" :key="index">
				<navigator :open-type="item.open_type ? item.open_type : 'navigate'" :url="item.navigator_url">
					<image :src="item.image_src" mode="widthFix"></image>
				</navigator>
			</view>
		</view>
		
		<view class="floor" v-for="item,index in floors" :key="item.name">
			<view class="floor-title">
				<image :src="item.floor_title.image_src"></image>
			</view>
			<view class="floor-content">
				<navigator :open-type="child.open_type" :url="child.navigator_url" v-for="child in item.product_list" :key="child.name">
					<image :src="child.image_src" :style="{width: `${child.image_width}rpx`}" mode="widthFix"></image>
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
	import MySearch from "@/components/mySearch/mySearch.vue"
	import {getBannerList, getNav, getFloor} from "@/api/home.js"
	export default {
		data() {
			return {
				banners: [],
				navs: [],
				floors: []
			}
		},
		onLoad() {
			this.getSwiper()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiper() {
				const res = await getBannerList()
				this.banners = res.message
			},
			async getNavList() {
				const res = await getNav()
				this.navs = res.message
			},
			async getFloorList() {
				const res = await getFloor()
				this.floors = res.message
				console.log(res)
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
				
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.nav {
		display: flex;
		justify-content: space-around;
		padding: 20rpx 43rpx;
		.nav-item {
			width: 128rpx;
			height: 140rpx;
			
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}
	
	.floor {
		.floor-title {
			image {
				width: 100vw;
				height: 59rpx;
			}
		}
		.floor-content {
			image {
				float: left;
				margin-left: 15rpx;
				margin-bottom: 18rpx;
				min-height: 188rpx;
			}
		}
	}
	
</style>
