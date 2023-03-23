<template>
  <view>
    <!-- 模块1：收货地址 -->
    <!-- 事件绑定给分区盒子，两种情况都给触发收货地址 -->
    <view @click="getUserAddress" class="address">
      <!-- 正常情况：显示收货地址 -->
      <view v-if="address.userName" class="address-info">
        <view class="address-detail">{{ addressDetail }}</view>
        <view class="address-user">
          {{ address.userName }} {{ address.telNumber }}
        </view>
      </view>
      <!-- 互斥情况：显示按钮 -->
      <view v-else class="address-btn">添加地址</view>
    </view>
    <!-- 模块2：已选商品列表 -->
    <view class="goods-list">
      <view class="goods-title">已选商品</view>
      <view
        class="cart-item"
        v-for="item in selectCartList"
        :key="item.goods_id"
      >
        <view class="cart-count"> x{{ item.goods_count }} </view>
        <navigator
          class="goods-item"
          :url="`/pages/goods_detail/goods_detail?goods_id=${item.goods_id}`"
          hover-class="none"
        >
          <!-- 商品图片 -->
          <image
            class="goods-image"
            :src="item.goods_small_logo || defaultImage"
            mode="scaleToFill"
          />
          <!-- 商品信息 -->
          <view class="goods-info">
            <view class="goods-name">{{ item.goods_name }}</view>
            <view class="goods-price">{{ item.goods_price }}</view>
          </view>
        </navigator>
      </view>
    </view>
    <!-- 模块3：底部操作栏 -->
    <view class="bottom">
      <!-- 合计 -->
      <view class="total">
        <text class="total-name">合计：</text>
        <text class="total-price">{{ selectCartPrice }}</text>
      </view>
      <!-- 结算 -->
      <view @click="handlerPay" class="account">
        去支付({{ selectCartCount }})
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // 收货地址
      address: {},
    }
  },
  computed: {
    // 省市区地址拼接
    addressDetail() {
		console.log(this.address)
      // 解构出需要拼接的字段
      const { provinceName, cityName, countyName, detailInfo } = this.address
      // 返回拼接后的地址
      return [provinceName, cityName, countyName, detailInfo].join(' ')
    },
    // 映射 getters 到 computed 中
    ...mapGetters([
      'selectCartList',
      'selectCartPrice',
      'selectCartCount',
    ]),
  },
  methods: {
    async getUserAddress() {
      // ✅获取用户收货地址。调起用户编辑收货地址的原生界面
      // 🚨注意：该接口在 H5 端不支持，H5 端需要自己通过表单实现
      const res = await uni.chooseAddress()
	  console.log('address', res)
      // 保存收货地址信息
      this.address = res
    },
  },
}
</script>

<style lang="scss">
page {
  background-color: #f9f9f9;
}
// 模块1：收货地址
.address {
  background-color: #fff;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .address-info {
    width: 100%;
    .address-detail {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }
  .address-btn {
    width: 303rpx;
    height: 90rpx;
    border-radius: 45rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #eb4450;
    color: #eb4450;
  }
}

// 模块2：已选商品列表
.goods-list {
  background-color: #fff;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 10rpx;
  .goods-title {
    line-height: 40rpx;
    font-size: 26rpx;
  }
  .cart-item {
    position: relative;
	
	.goods-item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 10rpx;
		
		.goods-image {
			overflow: hidden;
			width: 190rpx;
			height: 190rpx;
		}
	}
	
    .cart-count {
      position: absolute;
      right: 20rpx;
      bottom: 30rpx;
    }
    // 选中最后一项
    &:last-child {
      .goods-item {
        border: none;
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

</style>
