<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search">
			<view class="input-box">
				<input type="text"/>
			</view>
		</view>
		
	    <!-- 搜索的结果 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
.search .input-box {
  background-color: #EB4450;
  padding: 20rpx;
}
.search .input-box input {
  background-color: #fff;
}

</style>
