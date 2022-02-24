export const work = {
  name: 'work',
  path: '/manage/work', // 这里必须写mange
  component: () => import(/*  webpackChunkName:"Work"  */'@/views/work/work.vue')
}
