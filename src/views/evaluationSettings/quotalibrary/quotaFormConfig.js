/*
 * @Author: kevin
 * @Date: 2022-03-03 12:49:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-14 11:26:05
 * @Description: 表单字段
 */
// 机构
export const quota = {
  labelWidth: '120px',
  itemStyle: { padding: '0 40px 0 0' },
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '报表名称',
      placeholder: '请输入报表名称'
    }, {
      field: 'remarks',
      type: 'input',
      label: '备注',
      placeholder: '备注'
    }, {
      field: 'typeId',
      type: 'slot',
      label: '分组',
      placeholder: '请选择分组',
      slotName: 'typeId'
    }
  ]
}

// 系统用户
export const account = {
  labelWidth: '120px',
  itemStyle: { padding: '0 40px 0 0' },
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'account',
      type: 'input',
      label: '登陆账号',
      placeholder: '请输入登陆账号'
    }, {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名'
    }, {
      field: 'email',
      type: 'input',
      label: '电子邮箱',
      placeholder: '请输入电子邮箱'
    }, {
      field: 'telephone',
      type: 'input',
      label: '手机号',
      placeholder: '请输入手机号'
    }, {
      field: 'number',
      type: 'input',
      label: '人员编号',
      placeholder: '请输入人员编号'
    }, {
      field: 'password',
      type: 'password',
      label: '登陆密码',
      placeholder: '请输入登陆密码'
    }
  ]
}
