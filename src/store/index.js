/*
 * @Author: kevin
 * @Date: 2022-02-21 13:55:23
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-23 17:50:46
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
      HOST: null,
      fileConfig: null,
      changerPageSizeStatus: true, // 监听切换菜单时候重置分页数据状态
      tableData: [], // 表格数据
      total: 0, // 总条数
      defaultActiveValue: null, // 菜单默认选中的值
      breadcrumbs: [] // 面包屑

    }
  },
  mutations: {
    changerEvet (state, envs) {
      state.envs = envs
      const { fileConfig } = envs
      state.fileConfig = fileConfig
      state.HOST = fileConfig.networkStaticUrl
    },
    changerpageSize (state, pageSize) {
      state.pagination.pageSize = pageSize
    },
    changerPageSizeStatus (state, current) {
      state.changerPageSizeStatus = current
    },
    changerCurrentPage (state, current) {
      state.pagination.curPage = current
    },
    defaultActiveValue (state, value) {
      state.defaultActiveValue = value
    },
    setTableData (state, data) {
      state.tableData = data?.list ?? (Array.isArray(data) ? data : [])
      state.total = data?.total ?? 0
    }
  },
  actions: {
    async envsAction ({ commit }, payload) {
      const envsRes = await getEnvs(payload)
      commit('changerEvet', envsRes.data)
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
    },
    changerCurrentValue ({ commit, state }, payload) {
      commit('defaultActiveValue', payload)
    },
    async getListPage ({ commit, state }, { fn, params, baseURL }) {
      const param = Object.assign({}, state.pagination, params)
      const { data = {} } = await fn(param, baseURL)
      commit('setTableData', data)
    },
    changeListPage ({ dispatch }) {
      dispatch('getListPage')
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

/**
 * 更新列表
 * @param {Function} getListFn
 * @param {Object} params
 * @param {String} baseURL
 */

export function updateList (getListFn, params, baseURL) {
 store.dispatch('getListPage', { fn: getListFn, params, baseURL })
}

export default store
