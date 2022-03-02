/*
 * @Author: kevin
 * @Date: 2022-02-21 13:45:02
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 18:01:51
 * @Description: Do not edit
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar custom style
import { getStaticData } from '@/utils/util'
import router from '@/router'
import { useStore } from '@/store'
 const store = useStore()
// import { message, Modal, notification } from 'ant-design-vue' /// es/notification

// import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 300000, // 请求超时时间,
  isLoading: true, // 是否显示loading状态
  successTitle: null, // 成功后需要提示的内容
  errorTitle: null // 发生错误的提示
})

const err = (e) => {
  const error = e.response
  if (error) {
    const data = error.data
    const token = null // Vue.ls.get(ACCESS_TOKEN)
    const code = error.status
    NProgress.done()
    switch (code) {
      case 403:
      ElMessage.error(data.message + '！')
      break
      case 500:
      ElMessage.error('服务器异常' + '！')
      break
    }
    if (error.status === 401 && !(data.result && data.result.isLogin)) {
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
    if (config.isLoading) {
      NProgress.start()
    }
  const token = getStaticData('token') // Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    // config.headers.Authorization = token // 'Bearer ' + token
    config.headers.token = token // 'Bearer ' + token
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
  // const code = response.data?.status?.code
  if (errorCode(response)) {
    if (response.request.responseType === 'blob') {
      return response
    }
    return response.data
  }
}, err)

function errorCode (response) {
  console.log('response', response)
  const { data, config } = response
  const code = (typeof data.status !== 'undefined') && (typeof data.status.code !== 'undefined') && data.status.code
  const msg = (typeof data.status !== 'undefined') && (typeof data.status.msg !== 'undefined') && data.status.msg
  let flag = true
  if (code === '4') {
    router.push('/login')
    ElMessage.error(msg)
    flag = false
  }
  if (code && code !== '0') {
    ElMessage.error(config.errorTitle || msg)
    flag = false
  }
  if (config.successTitle) { // 如果需要成功后提示
    ElMessage.success(config.successTitle)
  }
  return flag
}

export {
  // installer as VueAxios,
  service as axios
}
