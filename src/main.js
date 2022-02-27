import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import './assets/style/normalize.css'
import './assets/style/base.less'
import 'element-plus/dist/index.css' // 按需引入css 有误暂未解决

import { axios } from './utils/request'
import { globalRegister } from './components'
import store from './store/index'

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
app.use(store)
app.use(globalRegister)
app.mount('#app')
