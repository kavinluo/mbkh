/*
 * @Author: kevin
 * @Date: 2022-02-21 12:47:56
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-10 16:22:38
 * @Description: router index
 */

import { createRouter, createWebHistory } from 'vue-router'

import { getCookie } from '@/utils/util'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHistory()
})
const token = getCookie('token')

router.beforeEach((to, from) => {
  console.log('to', to)
  console.log('from', from)
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  }
})
export default router
