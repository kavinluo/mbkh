/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-10 16:40:11
 * @Description: 用户相关
 */
import router from '@/router'
import { login, getUserInfo, getUserMenu, logout } from '@/api/user.js'
import { setStaticData, delStaticData, getStaticData, setCookie, getCookie } from '@/utils/util'
import { mapMenusToRoutes } from '@/router/async-router'
// import menuList from './menuData'
export default ({
  namespaced: true, // 命名空间
  state () {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      subMenus: [], // 储存子菜单
      hasSubMenus: false // 是否有子菜单
    }
  },
  mutations: {
    changeToken (state, token) {
      state.token = token
    },
    changeUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    async changeUserMenus (state, userMenus) {
      const _routes = mapMenusToRoutes(userMenus)
      // 将routes => router.manage.children
      _routes.forEach((route) => {
        router.addRoute('manage', route)
      })
      state.userMenus = _routes
      // 刷新页面时先从本地获取
      const hasSubMenus = getStaticData('hasSubMenus')
      const subMenus = getStaticData('subMenus')
      state.subMenus = subMenus || _routes[0].children
      state.hasSubMenus = hasSubMenus || (state.subMenus.length > 1)
      router.push('/manage')
    },
    changeSubMenus (state, subMenus) {
      state.subMenus = subMenus
      state.hasSubMenus = subMenus.length > 1
      // 切换时候存储菜单状态
      setStaticData('subMenus', subMenus)
      setStaticData('hasSubMenus', subMenus.length > 1)
    },
    // 删除存储
    deleteUserInfo (state, logoutRes) {
      state.userMenus = null
      state.token = null
      state.userInfo = null
      delStaticData('userMenus')
      // delStaticData('token')
      delStaticData('userInfo')
      localStorage.clear()
    }
  },
  actions: {
    // 获得token
    async loginActions ({ commit, dispatch }, payload) {
      const loginRes = await login(payload)
      if (loginRes && typeof loginRes === 'string') { // 这里如果登录用户密码第二次会返回验证码信息，我们不需要
        commit('changeToken', loginRes)
        setCookie('token', loginRes, 1)
        dispatch('userInfoAction')
      }
    },
     // 请求用户信息
    async userInfoAction ({ commit, dispatch }, payload) {
      const userInfoRes = await getUserInfo()

      const userInfo = userInfoRes || {}
      setStaticData('userInfo', userInfo)
      commit('changeUserInfo', userInfo)
      dispatch('getUserMenusActions')
    },
     // 请求菜单
     async getUserMenusActions ({ commit, dispatch }, payload) {
      const getUserMenusRes = await getUserMenu()
      const userMenus = getUserMenusRes?.data ?? []
      setStaticData('userMenus', userMenus)
      commit('changeUserMenus', userMenus)
    },

    // 设置子菜单菜单
    changeSubMenusActions ({ commit }, payload) {
      setStaticData('subMenus', payload)
      commit('changeSubMenus', payload)
    },

    // 退出登录
    async loginOut ({ commit }, payload) {
      const logoutRes = await logout()
      if (!logoutRes) {
        commit('deleteUserInfo', logoutRes)
        router.push('/login')
      }
    },

    // 刷新后获取本地数据
    updatStore ({ commit, dispatch }) {
      const token = getCookie('token')
      if (token) {
        commit('changeToken', token)
        // 此处如果需要更新根目录的 store
        // dispatch('updateRootInfo', null, { root: true })
      }
      const userInfo = getStaticData('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = getStaticData('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
      const envs = getStaticData('envs')
      if (envs) {
        dispatch('updateRootInfo', envs, { root: true })
      }
    }
  },
  getters: {
    getsubMenu (state) {
      return state.subMenus
    }
  }
})
