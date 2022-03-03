/*
 * @Author: kevin
 * @Date: 2022-03-03 12:49:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-03 18:34:15
 * @Description: 表单字段
 */

export default {
  labelWidth: '120px',
  itemStyle: { padding: '0 40px 0 0' },
  colLayout: {
    span: 12
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      field: 'name',
      type: 'input',
      label: '菜单编号',
      placeholder: '请输入菜单编号'
    },
    {
      field: 'component',
      type: 'input',
      label: '组件地址',
      placeholder: '请输入组件地址 component'
    },
    {
      field: 'path',
      type: 'input',
      label: '路由地址',
      placeholder: '请输入路由地址 path'
    },
    {
      field: 'parentId',
      type: 'slot',
      label: '父级菜单',
      placeholder: '请选择',
      slotName: 'parentId'
    },
    {
      field: 'icon',
      type: 'input',
      label: '图标',
      placeholder: '图标'
    },
    {
      field: 'sequence',
      type: 'number',
      label: '排序',
      placeholder: '排序'
    },
    {
      field: 'remark',
      type: 'input',
      label: '备注',
      placeholder: '备注'
    },
    {
      field: 'isSee',
      type: 'slot',
      label: '是否可见',
      slotName: 'isSee'
    }
  ]
}
