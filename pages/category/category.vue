<template>
	<view class="category">
		<my-search></my-search>
		<view class="content">
			<scroll-view scroll-y="true" class="left-list">
				<view class="cate_left_item" :class="activeIndex === index ? 'item item-actived' : 'item'" 
				@tap="changeActive(index)" v-for="item,index in categoryNav" :key="item.cat_id"><text>{{item.cat_name}}</text></view>
			</scroll-view>
			
			<scroll-view scroll-y="true" class="right-list">
				<view class="content-title" v-for="item in rightList" :key="item.cat_id">
					<view class="title">{{item.cat_name}}</view>
					<view class="item-box">
						<view class="item-data" v-for="category in item.children" :key="category.cat_id">
							<image :src="category.cat_icon" mode=""></image>
							<text>{{category.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import MySearch from "@/components/mySearch/mySearch.vue"
	import { getCategory } from "@/api/category.js"
	export default {
		data() {
			return {
				activeIndex: 0,
				categoryList: []
			}
		},
		onLoad() {
			this.getCategoryList()
		},
		methods: {
			async getCategoryList() {
				const res = await getCategory()
				this.categoryList = res.message
				console.log(res)
			},
			changeActive(index) {
				this.activeIndex = index
			}
		},
		computed: {
			categoryNav() {
				return this.categoryList.map(item => {
					return {
						cat_id: item.cat_id,
						cat_name: item.cat_name
					}
				})
			},
			rightList() {
				return this.categoryList.length > 0 ? this.categoryList[this.activeIndex].children : []
			}
		},
		components: {
			MySearch
		}
	}
</script>

<style lang="scss">
	.category {
		.content {
			display: flex;
			
			.left-list {
				width: 182rpx;
				height: calc(100vh - 88rpx);
				background-color: #F3F3F3;
				
				.cate_left_item {
					height: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					text {
						width: 100%
					}
				}
				
				.item {
					text-align: center;
					color: #585858;
				}
				
				
				.item-actived {
					background-color: #fff;
					color: #EA4350;
					&::before {
						content: " ";
						display: block;
						width: 4rpx;
						height: 43rpx;
						background-color: #EA4350;
					}
				}
			}
			
			.right-list {
				flex: 1;
				height: calc(100vh - 88rpx);
				
				
				.content-title {
					
					.title {
						text-align: center;
						margin: 20rpx 10rpx;
						
						&::before,
						&::after {
							content: "/";
							color: #9C9C9C;
							margin: 0 10rpx;
						}
					}
					
					.item-box {
						display: flex;
						flex-wrap: wrap;
						.item-data {
							width: 33.33%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							image {
								width: 120rpx;
								height: 120rpx;
							}
							
							text {
								font-size: 21rpx;
							}
						}
					}
					
				}
			}
		}
	}
</style>
