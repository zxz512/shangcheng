<template>
  <!-- 封装search搜索栏，以便复用 -->
  <view class="search">
			<view class="input-box">
				<input type="text"/>
			</view>
 <!-- 搜索结果 -->
    <view class="content"></view>
		</view>
</template>

<script>
  export default {
      data() {
          return {
              
          }
      },
}
</script>

<style lang="less" scoped>
.search  {
.input-box{ background-color: #EB4450;
  padding: 20rpx;}
 input {
  background-color: #fff;
   border-radius: 6rpx;
}
}
</style>
