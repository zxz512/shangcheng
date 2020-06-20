import Vue from 'vue'
import App from './App'
import MyPlugin from '@/utils/request.js'
Vue.use(MyPlugin, {
  baseURL:'https://uinav.com/api/public/v1/'
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
