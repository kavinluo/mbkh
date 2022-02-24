
// import Vue from 'vue'
// import Vuex from 'vuex'

// import app from './modules/app'
import user from './modules/user'

// default router permission control
// import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
// import getters from './getters'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//     // app,
//     // user,
//     permission
//   },
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   },
//   getters
// })
import { createStore } from 'vuex'

const store = createStore({
  modules: {
    // app,
    user
    // permission
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

  },
  getters: {
    useInfo (state) {
      return `请叫我 ${state.name}`
    }
  }
})

export default store
