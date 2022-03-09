/*
 * @Author: kevin
 * @Date: 2022-02-21 12:47:56
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-07 10:08:22
 * @Description: router index
 */

import { createRouter, createWebHistory } from 'vue-router'

import { getStaticData } from '@/utils/util'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})
const token = getStaticData('token')
router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  }
})
export default router
