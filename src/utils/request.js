/*
 * @Author: kevin
 * @Date: 2022-02-21 13:45:02
 * @LastEditors: kevin
 * @LastEditTime: 2022-02-28 18:13:14
 * @Description: Do not edit
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar custom style
import { getStaticData } from '@/utils/util'

// import { useStore } from 'vuex'
 const store = {} // useStore()
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
  console.log('error', error)
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
  console.log('response', response)
  NProgress.done()
  // const code = response.data?.status?.code
  console.log('errorCode(response)', errorCode(response))
  if (errorCode(response)) {
    if (response.request.responseType === 'blob') {
      return response
    }
    return response.data
  }
}, err)

function errorCode (response) {
  const { data } = response
  console.log('data', data)
  const code = (typeof data.status !== 'undefined') && (typeof data.status.code !== 'undefined') && data.status.code
  console.log('code', code)
  const msg = (typeof data.status !== 'undefined') && (typeof data.status.msg !== 'undefined') && data.status.msg
  let flag = true
  if (code && code !== '0') {
    ElMessage.error(msg + '！')
    flag = false
  }
  return flag
}

export {
  // installer as VueAxios,
  service as axios
}
