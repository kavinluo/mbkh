/*
 * @Author: kevin
 * @Date: 2022-02-21 11:54:16
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-08 16:52:24
 * @Description: Do not edit
 */

import { createApp } from 'vue'

import './assets/style/index.less'
import 'element-plus/dist/index.css' // 按需引入css 有误暂未解决
import { ElMessage } from 'element-plus'

import App from './App.vue'
import router from './router/index.js'
import { axios } from './utils/request'
import { globalRegisterComponent } from './components/index'
import store, { setupStore } from './store'
// btn防抖
import noAntiShake from './utils/directive'
const app = createApp(App)

app.use(store)

setupStore() // store刷新后丢失问题

app.use(router)

app.use(globalRegisterComponent) // 注册element-plus | 其他
app.use(noAntiShake)

app.mount('#app')

app.config.globalProperties.$axios = axios

app.config.globalProperties.$message = ElMessage // 注册提示
