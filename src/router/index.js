/*
 * @Author: kevin
 * @Date: 2022-02-21 12:47:56
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-13 14:04:48
 * @Description: router index
 */

import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '@/utils/util'
import routes from './routes'
const router = createRouter({
  routes,
  history: createWebHistory()
})
router.beforeEach((to, from) => {
  const Token = getCookie('Token')
  if (to.path !== '/login') {
    if (!Token) {
      return '/login'
    }
  }
})
export default router
