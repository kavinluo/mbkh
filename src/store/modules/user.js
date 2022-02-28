/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-02-28 18:18:06
 * @Description: 用户相关
 */
import router from '@/router'
import { login, getUserInfo, getUserMenu, logout } from '@/api/user.js'
import { setStaticData, delStaticData } from '@/utils/util'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/async-router'
export default ({
  namespaced: true, // 命名空间
  state () {
    return {
      token: '',
      userInfo: {},
      userMenus: {}
    }
  },
  mutations: {
    changeToken (state, token) {
      state.token = token
    },
    changeUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus (state, userMenus) {
      state.userMenus = userMenus
      console.log('注册动态路由')

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    },
    deleteUserInfo (state, logoutRes) {
      state.userMenus = null
      state.token = null
      state.userInfo = null
      delStaticData('userMenus')
      delStaticData('token')
      delStaticData('userInfo')
    }
  },
  actions: {
    async accountLoginAction ({ commit }, payload) {
      const loginRes = await login(payload)
      commit('changeToken', loginRes)
      setStaticData('token', loginRes)
      // 请求菜单
      const getUserMenusRes = await getUserMenu()
      const userMenus = getUserMenusRes.data || []
      commit('changeUserMenus', userMenus)
      setStaticData('userMenus', userMenus)
      router.push('/manage')
    },
    async userInfoAction ({ commit }, payload) {
      // 请求用户信息
      const userInfoRes = await getUserInfo()
      const userInfo = userInfoRes || {}
      commit('changeUserInfo', userInfo)
      setStaticData('userInfo', userInfo)
    },
    // 退出登录
    async loginOut ({ commit }, payload) {
      const logoutRes = await logout()
      if (!logoutRes) {
        commit('deleteUserInfo', logoutRes)
        router.push('/login')
      }
    }
  },
  getters: {

  }
})
