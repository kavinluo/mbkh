import { createStore } from 'vuex'
const user = createStore({
  state: {
    token: '',
    name: 'use',
    welcome: '',
    buttons: [], // 按钮权限
    adminType: '', //
    roles: [],
    info: {}
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
})

export default user
