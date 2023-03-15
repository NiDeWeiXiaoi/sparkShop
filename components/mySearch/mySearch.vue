<template>
	<view class="search">
		<u-search placeholder="搜索" v-model="keyword" :showAction="false"></u-search>
	</view>
</template>

<script>
	export default {
		name:"mySearch",
		data() {
			return {
				keyword: ""
			};
		}
	}
</script>

<style lang="scss">
	.search {
		padding: 10rpx 20rpx;
		background-color: #EB4450;
		border: none;
	}
</style>