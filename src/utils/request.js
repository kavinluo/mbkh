// import Vue from 'vue'
// import { createApp } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// import 'element-plus/es/components/message/style/css'
// import 'element-plus/es/components/message-box/style/css'
import axios from 'axios'
// import store from '@/store'
const store = {}
// import { message, Modal, notification } from 'ant-design-vue' /// es/notification

// import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 300000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = 'jhfgjhfgjhgjh' // Vue.ls.get(ACCESS_TOKEN)

    if (error.response.status === 403) {
      console.log('服务器403啦，要重新登录！')
      ElMessage.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 500) {
      if (data.message && data.message.length > 0) {
        // ElMessage.error(data.message)
      }
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      // ElMessage.error({
      //   message: 'Unauthorized',
      //   description: 'Authorization verification failed'
      // })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = 'jhgjhgjgjgj' // Vue.ls.get(ACCESS_TOKEN)

  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  if (typeof config['Content-Type'] !== 'undefined') {
    config.headers['Content-Type'] = config['Content-Type']
  }
  return config
}, err)

/**
 * response interceptor
 * 所有请求统一返回
 */
service.interceptors.response.use((response) => {
  if (response.request.responseType === 'blob') {
    return response
  }
  const code = response.data.code
  if (code === 1011006 || code === 1011007 || code === 1011008 || code === 1011009) {
    ElMessageBox.alert(response.data.message, '提示：', {

      confirmButtonText: '确定',
      callback: () => {
        // Vue.ls.remove(ACCESS_TOKEN)
        window.location.reload()
      }
    })
  } else if (code === 1013002 || code === 1016002 || code === 1015002) {
    ElMessage.error(response.data.message)
    return response.data
  } else {
    return response.data
  }
}, err)

// const installer = {
//   vm: {},
//   install (Vue) {
//     Vue.use(VueAxios, service)
//   }
// }

export {
  // installer as VueAxios,
  service as axios
}
