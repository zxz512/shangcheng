<template>
	<view class="container" :style="{height:pageHeight,overflow:'hidden'}">
		<!-- 搜索栏 -->
		<search @window-height='handleWindowHeight'/>
		<!-- 轮播图 -->
    <swiper indicator-dots autoplay>
    <swiper-item :key="item.goods_id" v-for="item in swiperData">
    <navigator :url="item.navigator_url">
      <image :src='item.image_src'/>
    </navigator>
    </swiper-item>
</swiper>

   <!-- 导航菜单部分 -->
<view class="navs">
	<navigator url='' :key="k" v-for="(item,k) in navData">
    <image :src='item.image_src'/>
  </navigator>
</view>
   <!-- 楼层部分 -->
   <view class="floors">
	   <view class="floor" v-for="item in floorData">
		   <!-- 标题 -->
		   <view class="title" >
			   <image :src='item.floor_title.image_src'/>
		   </view>
		   <!-- 商品详情 -->
		   <view class="items">
            <navigator url='' :key="i" v-for="(ima,i) in item.product_list">
        <image :src="ima.image_src"></image>
      </navigator>
		   </view>
	   </view>
   </view>
  <!-- 回到顶部按钮 -->
  <view class="goTop icon-top" v-if="juli>200" @click="goTop"></view>
	</view>
</template>

<script>
//  导入搜索栏
import search from '@/components/search.vue'
	export default {
		data() {
			return {
        title: 'Hello',
        pageHeight:'auto',
        swiperData:[],
        navData:[],
        floorData:[],
        // 滚动距离
        juli:0
			}
		},
		components: {
          search
    },
    onPageScroll(e){
    this.juli=e.scrollTop;
    },
		onLoad() {
    this.getSwiperData()
    this.getNavsData()
    this.getFloorData()
		},
		methods: {
    handleWindowHeight(data){
      //  console.log(data);
      // 因为取到的需要有单位才能固定，所以要加上单位
      this.pageHeight=data.height+'px'
       
    },
    // 获取轮播图真实数据
   async getSwiperData(){
     let {message}=await this.$request({
       path:'home/swiperdata'
     })
    //  处理路径
    message = message.map(item => {
					item.navigator_url = item.navigator_url.replace('goods_detail/main?goods_id', 'goods/index?id')
					return item
        })

      // message = message.map(item=>{
      //   item.navigator_url=item.navigator_url.replace('goods_detail/main?goods_id','goods/index?id')
      //   return item
      // })
      this.swiperData=message
          // console.log(swiperData);
   },

    // 获取导航真实数据
    async getNavsData(){
      let {message}=await this.$request({
       path:'home/catitems'
     })
    this.navData=message
        },
    // 楼层真实数据
    async  getFloorData(){
     let {message}=await this.$request({
       path:'home/floordata'
     }) 
     this.floorData=message
     },
    //  点击回到顶部
    goTop(){
     uni.pageScrollTo({scrollTop: 0});
    }

		}
	}
</script>

<style lang='less'>

swiper {
  height: 340rpx;
  image {
  width: 750rpx;
  height: 340rpx;
}
}
.navs{
	display: flex;
	justify-content: space-between;
	height: 190rpx;
	padding: 0 30rpx;
	align-items: center;
	navigator{
		
		height: 140rpx;
		width: 128rpx;
		
	}
}
.floor {
  .title {
    width: 750rpx;
    height: 60rpx;
    padding: 20rpx 0 0 10rpx;
	background-color: #f4f4f4;
	box-sizing: border-box;
  }
  .items {
    padding: 20rpx 16rpx;
    overflow: hidden;
    navigator {
      float: left;
      margin-left: 10rpx;
      &:first-child {
        width: 232rpx;
        height: 386rpx;
        margin-left: 0;
      }
      &:nth-child(2),
      &:nth-child(5) {
        width: 273rpx;
        height: 188rpx;
      }
      &:nth-child(3),
      &:nth-child(4) {
        width: 193rpx;
        height: 188rpx;
      }
      &:nth-last-child(-n + 2) {
        margin-top: 10rpx;
      }
    }
  }

  &:first-child {
    .items {
      navigator {
        width: 232rpx;
        height: 188rpx;
        &:first-child {
          width: 232rpx;
          height: 386rpx;
        }
      }
    }
  }
}
.goTop {
    position: fixed;
    bottom: 30rpx;
    right: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
