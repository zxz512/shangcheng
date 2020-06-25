<template>
  <!-- 封装search搜索栏，以便复用 -->
  <!-- 因为点击后搜索栏变成灰的，所以说要设置一个属性 -->
  <view class="search" :class="{focused:isfocused}">
			<view class="input-box">
        <!-- 需要获取输入信息 -->
				<input @confirm='fasong' @input="sousuo" v-model="keyword" :placeholder='placeholder'  type="text" @focus="getxinxi" />
        <text class="cancle" @click="quxiao">取消</text>
			</view>
 <!-- 搜索结果 -->
    <view class="content">
      <div class="title">
    搜索历史
    <span class="clear" @click='qingchu'></span>
  </div>
  <div class="history">
    <navigator :url="'/pages/list/index?kw=' + item" :key='index' v-for='(item, index) in history'>
          {{item}}
        </navigator>
  </div>
  <!-- 结果 -->
  <scroll-view scroll-y class="result" v-if='neirong.length>0'>
    <navigator :url="'/pages/goods/index?id='+item.goods_id" :key='item.goods_id' v-for='item in neirong'>{{item.goods_name}}</navigator>
  </scroll-view>
    </view>
		</view>
</template>

<script>
  export default {
      data() {
          return {
              isfocused:false,
              placeholder:'',
              keyword:'',
              neirong:[],
              history:uni.getStorageSync('history') || []
          }
      },
      methods: {
      // 清除搜索历史
      qingchu(){
      // 清除后台缓存数据
      uni.removeStorageSync('history')
      this.history=[]
      },
      // 按下回车发送搜索内容
      fasong(e){
      const q=e.detail.value
      this.history.unshift(q)
      // 控制数组去重
      let arr=[...new Set(this.history)]
      this.history=arr
      // 把数据进行缓存
      uni.setStorageSync('history',arr)
      // 回车进行跳转
      uni.navigateTo({
       url: '/pages/list/index?kw=' + q
       })
      
      },
        // 获取搜索的结果
       sousuo(){
         clearTimeout(this.timer)
        // 设置防抖，避免输入一个字符记录一次
        this.timer=setTimeout(async() => {
           const {message}=await this.$request({
          path:'goods/qsearch?query='+this.keyword

        })
         this.neirong=message
        }, 1000);
        },

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
      this.keyword=''
      this.neirong=[]
        }
      },
}
</script>

<style lang="less" scoped>
.search  {
.content{
  // 设置遮罩层
  padding: 30rpx;
  position: absolute;
  top: 90rpx;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 9;
  display: none;
   .title {
    font-size: 27rpx;
    line-height: 1;
    color: #333;
  }
  .clear {
    display: block;
    width: 27rpx;
    height: 27rpx;
    float: right;
    background-image: url(http://static.botue.com/ugo/images/clear.png);
    background-size: cover;
  }
   .history {
    padding-top: 30rpx;
    navigator {
      display: inline-block;
      line-height: 1;
      padding: 15rpx 20rpx 12rpx;
      background-color: #ddd;
      font-size: 24rpx;
      margin-right: 20rpx;
      margin-bottom: 15rpx;
      color: #333;
    }
  }
   .result {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    navigator {
      line-height: 1;
      padding: 20rpx 30rpx;
      font-size: 24rpx;
      color: #666;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
    }
  }

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
