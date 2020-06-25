<template>
<view>
    <button @getuserinfo='getInfo' type="primary" open-type="getUserInfo" >点击获取个人信息</button>
</view>
</template>

<script>
  export default {
      data() {
          return {
              
          }
      },
      methods:{
    getInfo(e){
        //   console.log(e);
    const{
        encryptedData,
        iv,
       rawData,
       signature
    }=e.detail
    // 获取code
      uni.login({
          success:(res)=>{
              const{code}=res
          }
      })    
          }
      }
}
</script>

<style lang="less" scoped>
</style>
