
// import Vue from 'vue'
// import Vuex from 'vuex'

// import app from './modules/app'
// import user from './modules/user'

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
  state () {
    return {
      token: 'token:8888',
      counter: 'counter：888',
      name: 'name：kevin'
    }
  }
})

export default store
