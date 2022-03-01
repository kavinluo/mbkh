/*
 * @Author: kevin
 * @Date: 2022-03-01 14:38:06
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-01 19:43:20
 * @Description: Do not edit
 */
const menuList = [
{
  id: 1,
  title: '系统管理',
  identity: 'system_manage',
  parentId: 0,
  component: '/views/systemSetting/index.js',
  path: '/manage/systemStaff',
  name: 'systemSetting',
  icon: 'Histogram',
  sequence: 999,
  remark: null,
  application: 0,
  isDelete: 0,
  passportMenuList: [
      {
          id: 5,
          title: '应用管理',
          identity: 'system_apply',
          parentId: 1,
          depPath: 2,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          passportMenuList: []
      },
      {
          id: 4,
          depPath: 2,
          title: '安全管理',
          identity: 'system_security',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          passportMenuList: []
      },
      {
          id: 2,
          depPath: 2,
          title: '菜单管理',
          identity: 'system_menu',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          passportMenuList: [
              {
                  id: 6,
                  depPath: 3,
                  title: '评价',
                  identity: 'system_result',
                  parentId: 2,
                  sequence: 999,
                  remark: null,
                  application: 0,
                  isDelete: 0,
                  passportMenuList: []
              },
              {
                  id: 3,
                  depPath: 3,
                  title: '工作台',
                  identity: 'work_bench',
                  sequence: 999,
                  parentId: 2,
                  remark: null,
                  application: 0,
                  isDelete: 0,
                  passportMenuList: []
              }
          ]
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
  passportMenuList: [
      {
          id: 5,
          title: '应用管理',
          identity: 'system_apply',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          passportMenuList: []
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
          passportMenuList: []
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
          passportMenuList: [
              {
                  id: 6,
                  title: '评价',
                  identity: 'system_result',
                  parentId: 2,
                  sequence: 999,
                  remark: null,
                  application: 0,
                  isDelete: 0,
                  passportMenuList: []
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
                  passportMenuList: []
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
  passportMenuList: [
      {
          id: 5,
          title: '应用管理',
          identity: 'system_apply',
          parentId: 1,
          sequence: 999,
          remark: null,
          application: 0,
          isDelete: 0,
          passportMenuList: []
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
          passportMenuList: []
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
          passportMenuList: [
              {
                  id: 6,
                  title: '评价',
                  identity: 'system_result',
                  parentId: 2,
                  sequence: 999,
                  remark: null,
                  application: 0,
                  isDelete: 0,
                  passportMenuList: []
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
                  passportMenuList: []
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
  passportMenuList: [
    {
        id: 5,
        title: '应用管理',
        identity: 'system_apply',
        parentId: 1,
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        passportMenuList: []
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
        passportMenuList: []
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
        passportMenuList: [
            {
                id: 6,
                title: '评价',
                identity: 'system_result',
                parentId: 2,
                sequence: 999,
                remark: null,
                application: 0,
                isDelete: 0,
                passportMenuList: []
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
                passportMenuList: []
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
  passportMenuList: [
    {
        id: 5,
        title: '应用管理',
        identity: 'system_apply',
        parentId: 1,
        sequence: 999,
        remark: null,
        application: 0,
        isDelete: 0,
        passportMenuList: []
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
        passportMenuList: []
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
        passportMenuList: [
            {
                id: 6,
                title: '评价',
                identity: 'system_result',
                parentId: 2,
                sequence: 999,
                remark: null,
                application: 0,
                isDelete: 0,
                passportMenuList: []
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
                passportMenuList: []
            }
        ]
    }
]
}
]
export default menuList
