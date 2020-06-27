<template>
<!-- <map longitude="113.324520" latitude="23.099994" scale="11"></map> -->
    <!-- <button bindtap='handleShow'>显示当前位置</button> -->
  <button type="primary" @click="map">点击打开地图</button>
  <!-- <view></view> -->
  
</template>

<script>
  export default {
    //   onLoad(){
    // this.map()
    //   },
    
      methods:{
          map(){
              uni.chooseLocation({
                  success: function(res) {
        // 定位的详细数据：包括地址名称和经纬度信息
                
      }
              })
    // uni.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     wx.openLocation({
    //       latitude,
    //       longitude,
    //       scale: 18
    //     })
    //   }
    // })
          }
      }
}
</script>

<style lang="less" scoped>
</style>
