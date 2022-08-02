/*
 * @Author: kevin
 * @Date: 2022-03-07 10:35:00
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-11 11:20:25
 * @Description: table数据
 */
 export default [
    {
      label: '登录账号',
      prop: 'account',
      width: 120
    }, {
      label: '姓名',
      prop: 'name',
      width: 120
    }, {
      label: '手机号',
      prop: 'telephone',
      width: 130
    }, {
      label: '是否负责人',
      prop: 'isSupervisor',
      slotName: 'supervisor',
      width: 120
    }, {
      label: '启用状态',
      prop: 'enable',
      slotName: 'enable',
      minWidth: 100
    }, {
      label: '所属机构',
      prop: 'organizationName'
    }, {
      label: '人员编号',
      prop: 'number'
    },
    {
      label: '电子邮箱',
      prop: 'email',
      minWidth: 200
    }, {
      label: '操作',
      slotName: 'handler',
      fixed: 'right',
      width: 240
    }
  ]
