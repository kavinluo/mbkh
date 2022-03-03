/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-03 17:39:46
 * @Description: 用户相关
 */
import router from '@/router'
import { login, getUserInfo, getUserMenu, logout } from '@/api/user.js'
import { setStaticData, delStaticData, getStaticData } from '@/utils/util'
// import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/async-router'
import menuList from './menuData'
export default ({
  namespaced: true, // 命名空间
  state () {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      subMenus: [] // 储存子菜单
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
      menuList.forEach((item) => {
        // router.addRoute('manage', item)
        // if (item.children.length) {
        //   item.redirect = item.children[0].path
        // }
      })
      state.userMenus = menuList
      console.log('注册动态路由', menuList)
      // userMenus = menuList
      console.log('userMenus', userMenus)
      // userMenus => routes
      // const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      // routes.forEach((route) => {
      //   router.addRoute('main', route)
      // })
      router.push('/manage')
      // 获取用户按钮的权限
      // const permissions = mapMenusToPermissions(userMenus)
      // state.permissions = permissions
    },
    changeSubMenus (state, subMenus) {
      console.log('subMenus', subMenus)
      state.subMenus = subMenus
    },
    // 删除存储
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
    // 获得token
    async loginActions ({ commit, dispatch }, payload) {
      const loginRes = await login(payload)
      if (loginRes) {
        commit('changeToken', loginRes)
        setStaticData('token', loginRes)
        dispatch('userInfoAction')
      }
    },
     // 请求用户信息
    async userInfoAction ({ commit, dispatch }, payload) {
      const userInfoRes = await getUserInfo()
      const userInfo = userInfoRes || {}
      commit('changeUserInfo', userInfo)
      setStaticData('userInfo', userInfo)
      dispatch('getUserMenusActions')
    },
     // 请求菜单
     async getUserMenusActions ({ commit }, payload) {
      const getUserMenusRes = await getUserMenu()
      const userMenus = getUserMenusRes?.data ?? []
      commit('changeUserMenus', userMenus)
      setStaticData('userMenus', userMenus)
      router.push('/manage')
    },

    // 设置子菜单菜单
    changeSubMenusActions ({ commit }, payload) {
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
      const token = getStaticData('token')
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
