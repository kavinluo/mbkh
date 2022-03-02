/*
 * @Author: kevin
 * @Date: 2022-03-01 14:38:06
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 10:31:27
 * @Description: Do not edit
 */
const menuList = [
{
  id: 1,
  title: '系统管理',
  identity: 'system_manage',
  parentId: 0,
  depPath: 1,
  component: '/views/systemSetting/index.js',
  path: '/manage/systemStaff',
  name: 'systemSetting',
  icon: 'Histogram',
  sequence: 999,
  remark: null,
  application: 0,
  isDelete: 0,
  children: [
      {
        id: 5,
        title: '系统管理员',
        identity: 'system_apply',
        parentId: 1,
        depPath: 2,
        component: '/views/systemSetting/index.js',
        path: '/manage/systemStaff',
        name: 'systemSetting',
        icon: 'Histogram',
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: [
            {
                id: 19,
                title: '机构人员资料',
                identity: 'system_apply',
                parentId: 1,
                depPath: 3,
                component: '/views/systemSetting/systemStaff/systemStaffIndex.vue',
                path: '/manage/systemStaff',
                name: 'systemSetting',
                icon: 'Histogram',
                sequence: 999,
                remark: null,
                application: 0,
                isDelete: 0,
                children: []
            }
        ]
      },
      {
        id: 6,
        title: '机构人员资料',
        identity: 'system_apply',
        parentId: 1,
        depPath: 2,
        component: '/views/systemSetting/systemStaff/systemStaffIndex',
        path: '/manage/systemStaff',
        name: 'systemStaff',
        icon: 'Histogram',
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
      },
      {
        id: 7,
        title: '系统设置',
        identity: 'system_apply',
        parentId: 1,
        depPath: 2,
        component: '/views/systemSetting/index.js',
        path: '/manage/systemSjhgjhgtaff',
        name: 'systemSetting',
        icon: 'Histogram',
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
      },
      {
        id: 8,
        title: '系统日志',
        identity: 'system_apply',
        parentId: 1,
        depPath: 2,
        component: '/views/systemSetting/systemLogs/systemLog',
        path: '/manage/systemLogs',
        name: 'systemLogs',
        icon: 'Histogram',
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
      },
      {
        id: 9,
        title: '菜单管理',
        identity: 'system_apply',
        parentId: 1,
        depPath: 2,
        component: '/views/systemSetting/menuManagement/menuManagementIndex',
        path: '/manage/menuManagement',
        name: 'systemSetting',
        icon: 'Histogram',
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
      },
      {
        id: 10,
        title: '安全管理',
        identity: 'system_apply',
        parentId: 1,
        depPath: 2,
        component: '/views/systemSetting/index.js',
        path: '/manage/systemSjhgjhgtaff',
        name: 'systemSetting',
        icon: 'Histogram',
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
      },
      {
        id: 11,
        title: '运用管理',
        identity: 'system_apply',
        parentId: 1,
        depPath: 2,
        component: '/views/systemSetting/index.js',
        path: '/manage/systemSjhgjhgtaff',
        name: 'systemSetting',
        icon: 'Histogram',
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
      },
      {
        id: 12,
        title: '账号设置',
        identity: 'system_apply',
        parentId: 1,
        depPath: 2,
        component: '/views/systemSetting/index.js',
        path: '/manage/systemSjhgjhgtaff',
        name: 'systemSetting',
        icon: 'Histogram',
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
      }
  ]
},
{
  id: 2,
  title: '评价设置',
  identity: 'system_manage',
  parentId: 0,
  sequence: 999,
  remark: null,
  path: '',
  application: 0,
  isDelete: 0,
  children: [
      {
          id: 5,
          title: '应用管理',
          identity: 'system_apply',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          children: []
      },
      {
          id: 4,
          title: '安全管理',
          identity: 'system_security',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          children: []
      },
      {
          id: 2,
          title: '菜单管理',
          identity: 'system_menu',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          children: [
              {
                  id: 6,
                  title: '评价',
                  identity: 'system_result',
                  parentId: 2,
                  sequence: 999,
                  remark: null,
                  application: 0,
                  isDelete: 0,
                  children: []
              },
              {
                  id: 3,
                  title: '工作台',
                  identity: 'work_bench',
                  sequence: 999,
                  parentId: 2,
                  remark: null,
                  application: 0,
                  isDelete: 0,
                  children: []
              }
          ]
      }
  ]
},
{
  id: 3,
  title: '评价过程',
  identity: 'system_manage',
  parentId: 0,
  sequence: 999,
  path: '/manage/systemSetting',
  remark: null,
  application: 0,
  isDelete: 0,
  children: [
      {
          id: 5,
          title: '应用管理',
          identity: 'system_apply',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          children: []
      },
      {
          id: 4,
          title: '安全管理',
          identity: 'system_security',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          children: []
      },
      {
          id: 2,
          title: '菜单管理',
          identity: 'system_menu',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          children: [
              {
                  id: 6,
                  title: '评价',
                  identity: 'system_result',
                  parentId: 2,
                  sequence: 999,
                  remark: null,
                  application: 0,
                  isDelete: 0,
                  children: []
              },
              {
                  id: 3,
                  title: '工作台',
                  identity: 'work_bench',
                  sequence: 999,
                  parentId: 2,
                  remark: null,
                  application: 0,
                  isDelete: 0,
                  children: []
              }
          ]
      }
  ]
},
{
  id: 4,
  title: '评价结果',
  identity: 'system_manage',
  parentId: 0,
  sequence: 999,
  remark: null,
  path: '/manage/systemSetting',
  application: 0,
  isDelete: 0,
  children: [
    {
        id: 5,
        title: '应用管理',
        identity: 'system_apply',
        parentId: 1,
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
    },
    {
        id: 4,
        title: '安全管理',
        identity: 'system_security',
        parentId: 1,
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
    },
    {
        id: 2,
        title: '菜单管理',
        identity: 'system_menu',
        parentId: 1,
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: [
            {
                id: 6,
                title: '评价',
                identity: 'system_result',
                parentId: 2,
                sequence: 999,
                remark: null,
                application: 0,
                isDelete: 0,
                children: []
            },
            {
                id: 3,
                title: '工作台',
                identity: 'work_bench',
                sequence: 999,
                parentId: 2,
                remark: null,
                application: 0,
                isDelete: 0,
                children: []
            }
        ]
    }
]
},
{
  id: 5,
  title: '工作台',
  identity: 'system_manage',
  parentId: 0,
  component: '/views/work/work.vue',
  path: '/manage/work',
  name: 'work',
  icon: '',
  sequence: 999,
  remark: null,
  application: 0,
  isDelete: 0,
  children: [
    {
        id: 5,
        title: '应用管理',
        identity: 'system_apply',
        parentId: 1,
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
    },
    {
        id: 4,
        title: '安全管理',
        identity: 'system_security',
        parentId: 1,
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: []
    },
    {
        id: 2,
        title: '菜单管理',
        identity: 'system_menu',
        parentId: 1,
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        children: [
            {
                id: 6,
                title: '评价',
                identity: 'system_result',
                parentId: 2,
                sequence: 999,
                remark: null,
                application: 0,
                isDelete: 0,
                children: []
            },
            {
                id: 3,
                title: '工作台',
                identity: 'work_bench',
                sequence: 999,
                parentId: 2,
                remark: null,
                application: 0,
                isDelete: 0,
                children: []
            }
        ]
    }
]
}
]
export default menuList
