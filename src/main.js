import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 按需引入css 有误暂未解决

import { axios } from './utils/request'
import { globalRegister } from './components'
import store from './store/index'
import './assets/style/reset.css'
import './assets/style/common.less'
const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
app.use(store)
app.use(globalRegister)
// app.use(ElementPlus)
app.mount('#app')
