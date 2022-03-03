/*
 * @Author: kevin
 * @Date: 2022-02-24 09:48:49
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-03 10:01:27
 * @Description: Do not edit
 */
// 系统管理员

export const systemStaff = {
  name: 'systemStaff',
  path: '/manage/systemStaff',
  component: () => import('@/views/systemSetting/systemStaff/systemStaffIndex.vue')
}

export const menuManagement = {
  name: 'menuManagement',
  path: '/manage/menuManagement',
  component: () => import('@/views/systemSetting/menuManagement/menuManagementList.vue')
}
