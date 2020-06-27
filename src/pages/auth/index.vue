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
    async getInfo(e){
        //   console.log(e);
    const{
        encryptedData,
        iv,
       rawData,
       signature
    }=e.detail
    // 获取code
    //   uni.login({
    //       success:(res)=>{
    //           const{code}=res
    //       }
    //   })    
    const [error,res]=await uni.login()
    // console.log(res);
    const {message}=await this.$request({
        method:'POST',
        path:'users/wxlogin',
        param:{
            encryptedData,
             iv,
           rawData,
          signature,
          code:res.code
        }
   
    })
    // 获取token，进行缓存
    uni.setStorageSync('mytoken',message.token)
    // 跳回到上一个页面
    uni.navigateBack({
        delta:1
    })
    
    
          }
      }
}
</script>

<style lang="less" scoped>
</style>
