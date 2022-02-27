
import login from './modules/login'

import { createStore } from 'vuex'
console.log('login', login)
const store = createStore({
  modules: {
    login
  },
  state () {
    return {
      token: 'token:8888',
      counter: 0,
      name: 'kevin',
      names: 'hhh'
    }
  },
  mutations: {
    add (state) {
      state.counter++
    },
    updown (state) {
      state.counter--
    }
  },
  actions: {
    accoun ({ commit }, payload) {
      console.log('first', payload)
    }
  },
  getters: {
    useInfo (state) {
      return `请叫我 ${state.name}`
    }
  }
})

export default store
