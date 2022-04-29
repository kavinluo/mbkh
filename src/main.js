/*
 * @Author: kevin
 * @Date: 2022-02-21 11:54:16
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-24 09:53:33
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
import * as echarts from 'echarts'
import china from '@/utils/chinaChange.json'
echarts.registerMap('china', china)

const app = createApp(App)

app.use(store)

setupStore() // store刷新后丢失问题

app.use(router)

app.use(globalRegisterComponent) // 注册element-plus | 其他

app.mount('#app')

app.config.globalProperties.$axios = axios

app.config.globalProperties.$message = ElMessage // 注册提示

app.config.globalProperties.$echarts = echarts
