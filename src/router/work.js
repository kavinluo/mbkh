/*
 * @Author: kevin
 * @Date: 2022-02-24 09:32:24
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-01 15:11:53
 * @Description: Do not edit
 */
export const work = {
  name: 'work',
  path: '/manage/work', // 这里必须写mange
  component: () => import(/*  webpackChunkName:"Work"  */'@/views/work')
}
