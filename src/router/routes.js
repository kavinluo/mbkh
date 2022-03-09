/*
 * @Author: kevin
 * @Date: 2022-03-04 14:29:18
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-07 12:36:34
 * @Description: Do not edit
 */
import Index from '@/layout/index.vue'

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
    component: Index
    // children: []
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

export default routes
