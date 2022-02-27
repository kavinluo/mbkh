import { createStore } from 'vuex'
const login = createStore({
  namespaced: true, // 命名空间
  state () {
    return {
      token: '',
      userInfo: 'use',
      name: 'jhfjhg'
    }
  },
  mutations: {

  },
  actions: {
    accountLoginAction ({ commit }, payload) {
      console.log('login', payload)
    }
  },
  getters: {

  }
})

export default login
