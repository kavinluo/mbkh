import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { axios } from './utils/request'
import store from './store/index'
import './assets/style/reset.css'
import './assets/style/common.less'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
