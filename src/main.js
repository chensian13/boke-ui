import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/global.css'
import http from '@/utils/http'
import storage from '@/utils/storage'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.config.productionTip = false

Vue.prototype.$storage = storage

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(http)
Vue.use(storage)
Vue.use(VueQuillEditor)

const vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
export default vue