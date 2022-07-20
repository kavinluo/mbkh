/*
 * @Author: kevin
 * @Date: 2022-02-21 12:47:56
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-13 14:04:48
 * @Description: router index
 */

import { createRouter, createWebHistory } from 'vue-router'
import { getCookie, getStaticData } from '@/utils/util'
import routes from './routes'
const router = createRouter({
  routes,
  history: createWebHistory()
})
router.beforeEach((to, from) => {
  const userMenus = getStaticData('userMenus') // 本地储存是否被删除
  const userInfo = getStaticData('userInfo')
  const Token = getCookie('Token')
  if (to.path !== '/login') {
    if (!Token || !userMenus || !userInfo) {
      return '/login'
    }
  }
})
export default router
