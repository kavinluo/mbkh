/*
 * @Author: kevin
 * @Date: 2022-02-21 11:54:16
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-04 14:34:48
 * @Description: Do not edit
 */
import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import './assets/style/normalize.css'
import './assets/style/base.less'
import 'element-plus/dist/index.css' // 按需引入css 有误暂未解决

import { axios } from './utils/request'
import { globalRegisterComponent } from './components/element-ui'
import store, { setupStore } from './store'
const app = createApp(App)
app.config.globalProperties.$axios = axios

// store刷新后丢失问题
setupStore()
app.use(store)
app.use(router)
app.use(globalRegisterComponent)
app.mount('#app')
