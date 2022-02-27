
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar custom style

const store = {}
// import { message, Modal, notification } from 'ant-design-vue' /// es/notification

// import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 300000, // 请求超时时间,
  isLoading: true
})

const err = (error) => {
  // error.isLoading?.close()
  if (error.response) {
    const data = error.response.data
    const token = null // Vue.ls.get(ACCESS_TOKEN)
    const code = error.response.status
    switch (code) {
      case '403':
      ElMessage.error(data.message + '！')
      break
      case '500':
      ElMessage.error(data.message + '！')
      break
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
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
  console.log('config', config)
  // config.isLoading = !config.isLoading ? config.isLoading : ElLoading.service({
  //     lock: true,
  //     text: '加载中...',
  //     background: 'rgba(0, 0, 0, 0.5)'
  //   })
    if (config.isLoading) {
      NProgress.start()
    }
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
  NProgress.done()
  // response.config.isLoading = response.config.isLoading ? response.config.isLoading.close() : false
  if (response.request.responseType === 'blob') {
    return response
  }
  const code = response.data.code
  if (code === 1011006 || code === 1011007 || code === 1011008 || code === 1011009) {
    ElMessageBox.alert(response.data.message, '提示：', {
      confirmButtonText: '确定',
      callback: () => {
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

export {
  // installer as VueAxios,
  service as axios
}
