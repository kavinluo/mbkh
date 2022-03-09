/*
 * @Author: kevin
 * @Date: 2022-02-21 13:55:23
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-09 17:37:28
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
      envs: {},
      pagination: { // 分页信息
        pageSize: 10,
        curPage: 1
      },
      breadcrumbs: [] // 面包屑

    }
  },
  mutations: {
    changerEvet (state, envs) {
      state.envs = envs
    },
    changerpageSize (state, pageSize) {
      state.pagination.pageSize = pageSize
    },
    changerCurrentPage (state, current) {
      state.pagination.curPage = current
    }
  },
  actions: {
    async envsAction ({ commit }, payload) {
      const envsRes = await getEnvs(payload)
      commit('changerEvet', envsRes)
      setStaticData('envs', envsRes.data)
    },
    async updateRootInfo ({ commit }, payload) {
      commit('changerEvet', payload)
    },

    changerPageSize ({ commit }, payload) {
      commit('changerpageSize', payload)
    },
    changerCurrentPage ({ commit }, payload) {
      commit('changerCurrentPage', payload)
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
