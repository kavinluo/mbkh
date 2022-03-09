/*
 * @Author: kevin
 * @Date: 2022-02-21 11:54:16
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-08 11:48:23
 * @Description: Do not edit
 */
import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import './assets/style/normalize.css'
import './assets/style/base.less'
import 'element-plus/dist/index.css' // 按需引入css 有误暂未解决

import { axios } from './utils/request'
import { globalRegisterComponent } from './components/index'
import store, { setupStore } from './store'
const app = createApp(App)

// store刷新后丢失问题
setupStore()
app.use(router)
app.use(store)
app.use(globalRegisterComponent)
app.mount('#app')

app.config.globalProperties.$axios = axios
