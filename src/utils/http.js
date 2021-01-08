import axios from 'axios'
import storage from '@/utils/storage'
import Vue from '../main'

var service = axios.create({
  baseURL: 'http://127.0.0.1:8083/',
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 300000 // 请求的超时时间
})


// 请求拦截
service.interceptors.request.use(
  config => {
    if (storage.get('user')) {
      config.headers.Authorization = storage.get('user').token
    }
    return config
  },
  error => Promise.reject(error)
)


// 响应拦截
service.interceptors.response.use(
  (res) => {
    if (res.data) {
      if (res.data.code === 1) {
        return res.data
      } else if (res.data.code === 3) {
        Vue.$alert('请先登录', '友情提示', {
          confirmButtonText: '确定',
          callback: () => {
            Vue.$router.push({
              name: 'Login'
            })
          }
        })
        return Promise.reject(res.data.message)
      } else {
        Vue.$message.error(res.data.message)
        return Promise.reject(res.data.message)
      }
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service