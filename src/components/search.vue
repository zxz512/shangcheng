<template>
  <!-- 封装search搜索栏，以便复用 -->
  <!-- 因为点击后搜索栏变成灰的，所以说要设置一个属性 -->
  <view class="search" :class="{focused:isfocused}">
			<view class="input-box">
				<input :placeholder='placeholder'  type="text" @focus="getxinxi" />
        <text class="cancle" @click="quxiao">取消</text>
			</view>
 <!-- 搜索结果 -->
    <view class="content"></view>
		</view>
</template>

<script>
  export default {
      data() {
          return {
              isfocused:false,
              placeholder:''
          }
      },
      methods: {
        getxinxi(){
          // 获取遮罩层的高度
          const wh=uni.getSystemInfoSync().windowHeight
          // console.log(wh);
          this.$emit('window-height',{height:wh})
          
      // 当点击后样式变色生效
      this.isfocused=true
       this.placeholder = '请输入想要的商品'
        },
        quxiao(){
      this.isfocused=false
      this.placeholder=''
      // 取消的时候不固定高度
      this.$emit('window-height',{height:'auto'})
        }
      },
}
</script>

<style lang="less" scoped>
.search  {
.content{
  // 设置遮罩层
  position: absolute;
  top: 90rpx;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: pink;
  z-index: 9;
  display: none;

}
.input-box{ background-color: #EB4450;
  padding: 20rpx 16rpx;
  display: flex;
  position: relative;
  input {
  background-color: #fff;
   border-radius: 20rpx;
   flex: 1;
   padding-left: 55rpx;
   font-size: 30rpx;
   height: 50rpx;
}
// 当不获取时隐藏取消按钮，获取时显示
.cancle{
  display: none;
}
// 设置搜索框出现的小图标，用伪类来设置
&::before{
      content: '';
      display: none;
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      top: 50%;
      transform: translate(15rpx, -50%);
      background-image: url('http://static.botue.com/ugo/images/icon_search%402x.png');
      background-size: 32rpx;
}
&::after{
      content: '搜索';
      position: absolute;
      left: 50%;
      top: 50%;
      padding-left: 40rpx;
      transform: translate(-50%, -50%);
      font-size: 24rpx;
      color: #ccc;
      background-image: url('http://static.botue.com/ugo/images/icon_search%402x.png');
      background-size: 32rpx;
      background-repeat: no-repeat;
}
  }
 
&.focused{
  .content{
    display: block;
  }
  .input-box {
      background-color: #eee;

      &::after{
        display: none;
      }
      &::before{
        display: block;
      }
      
    }
    .cancle{
    display: block;
    width: 100rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 30rpx;
}
}
}
</style>
