// 系统管理员

export const systemStaff = {
  name: 'systemStaff',
  path: '/manage/systemStaff',
  component: () => import('@/views/systemSetting/systemStaff/systemStaffIndex.vue')
}

export const menuManagement = {
  name: 'menuManagement',
  path: '/manage/menuManagement',
  component: () => import('@/views/systemSetting/menuManagement/menuManagementIndex.vue')
}
