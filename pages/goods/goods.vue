<template>
	<view class="goods">
		<my-search></my-search>
		 <u-tabs :list="list" :scrollable="false" :lineColor="{color: '#EA4350'}"></u-tabs>
		 <view class="goods-list">
			 <view class="goods-item" v-for="item in goodsList" :key="item.cat_id">
				<navigator class="navigate" open-type="navigate" :url="`/pages/detail/detail?goods_id=${item.goods_id}`">
					<image class="goods-image" :src="item.goods_big_logo || defaultImage" mode="widthFix"></image>
					<view class="info">
						<view class="name">{{item.goods_name}}</view>
						<view class="price">{{item.goods_price}}</view>
					</view>
				</navigator>
			 </view>
			 <view class="bottom" v-if="isShowBottom">
				我是有底线的~
			 </view>
		 </view>
	</view>
</template>

<script>
	import MySearch from "@/components/mySearch/mySearch.vue"
	import {getGoods} from "@/api/goods.js"
	export default {
		data() {
			return {
				queryParams: {},
				list: [
					{name : "综合"},
					{name : "销量"},
					{name : "价格"},
				],
				goodsList: [],
				defaultImage: 'https://www.ssfiction.com/wp-content/uploads/2020/08/20200805_5f2b1669e9a24.jpg',
				total: 0
			}
		},
		computed: {
			isShowBottom() {
				return this.goodsList.length >= this.total
			}
		},
		onLoad(options) {
			this.queryParams = {
				cid: options.cid,
				query: options.query,
				pagenum: 1,
				pagesize: 10
			}
			this.getGoodsList()
		},
		// 上拉加载
		onReachBottom() {
			if(this.goodsList.length >= this.total) return;
			this.queryParams.pagenum++
			this.getGoodsList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.goodsList = []
			this.total = 0
			this.queryParams.pagenum = 1
			this.getGoodsList()
			uni.stopPullDownRefresh()
		},
		methods: {
			async getGoodsList() {
				const res = await getGoods(this.queryParams)
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			}
		},
		components: {
			MySearch
		}
	}
</script>

<style lang="scss">
.goods-list {
	.goods-item {
		display: flex;
		padding: 25rpx;
		
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
	.bottom  {
		color: #999;
		display: flex;
		justify-content: center;
		font-size: 25rpx;
	}
}
</style>
