/*
 * @Author: kevin
 * @Date: 2022-02-21 13:55:23
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-01 17:49:42
 * @Description: Do not edit
 */

import { createStore, useStore as useVuexStore } from 'vuex'
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
      setStaticData('envs', envsRes.data)
    },
    async updateRootInfo ({ commit }, payload) {
      console.log('payload', payload)
      commit('changerEvet', payload)
    }
  },
  getters: {
    useInfo (state) {
      return `请叫我 ${state.name}`
    }
  }
})

export function setupStore () {
  store.dispatch('user/updatStore')
}
export function useStore () {
  return useVuexStore()
}

export default store
