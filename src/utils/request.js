// 封装通用接口调用模块
// 官方封装组件的方法
export default {
    install: (Vue, options) => {
        Vue.prototype.$request = async ({ path,param,method='get',header}) => {
            // 进行加载前请求提示优化操作
            uni.showLoading({
                title: '正在加载数据...'
              })
            const [error, res] = await uni.request({
                // 请求方式
                method:method,
                url: options.baseURL + path,
                data: param,
                header:header
            })
            // 取消加载提示
            uni.hideLoading()
            return res.data
        }
            
        
    }
}