/*
 * @Author: kevin
 * @Date: 2022-02-21 12:47:56
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-01 14:23:42
 * @Description: Do not edit
 */
// import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/layout/index.vue'
import { work } from './work'
import { systemStaff, menuManagement } from './systemSetting'
import { getStaticData } from '@/utils/util'

const Login = {
  name: 'login',
  path: '/login',
  component: () => import(/* webpackChunkName: "login" */'@/views/login/login.vue')
}

const routes = [
  {
    path: '/manage',
    name: 'manage',
    meta: {},
    component: Index,
    children: [
      work,
      systemStaff,
      menuManagement
    ]
  },
  {
    path: '/',
    redirect: '/manage'
  },
  {
    path: '/:pathMatch(.*)',
    // path: '/:pathMatch(.*)*', // 后面加*，pathMatch拿到的是数组['jjj','ggg']
		name: 'notFound',
		component: () => import(/* webpackChunkName: "notFound-chunk" */'@/views/other/NotFound.vue')
	},
  Login
]

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

// export default router

// import { constantRouterMap, superiorSkillRouter, professorFromRouter, professionalSkillRouter, baseApplyRouter } from '@/config/router.config'

//  const Router = createRouter({})
// hack router push callback
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location, onResolve, onReject) {
//   // console.log('Router prototype push:', location, onResolve, onReject)
//   if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
//   return originalPush.call(this, location).catch(err => err)
// }
// console.log('process.env.BASE_URL', process.env.BASE_URL)
// Vue.use(Router)

// const routerArr = [...constantRouterMap, ...superiorSkillRouter, ...professorFromRouter, ...professionalSkillRouter, ...baseApplyRouter]

// export default new Router({
//   mode: 'history',
//   base: '/system/', // process.env.BASE_URL,
//   scrollBehavior: () => ({ y: 0 }),
//   routes: routerArr
// })
