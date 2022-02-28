
import { createStore } from 'vuex'
import user from './modules/user'
import { getEnvs } from '@/api/user.js'
import { setStaticData } from '@/utils/util'

const store = createStore({
  namespaced: true, // 命名空间
  modules: {
    user
  },
  state () {
    return {
      envs: {}
    }
  },
  mutations: {
    changerEvet (state, envs) {
      state.envs = envs
    }
  },
  actions: {
    async envsAction ({ commit }, payload) {
      const envsRes = await getEnvs(payload)
      commit('changerEvet', envsRes)
      setStaticData('envs', envsRes)
    }
  },
  getters: {
    useInfo (state) {
      return `请叫我 ${state.name}`
    }
  }
})

export default store
