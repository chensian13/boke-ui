import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/global.css'
import http from '@/utils/http'
import storage from '@/utils/storage'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(http)
Vue.use(storage)

const vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
export default vue