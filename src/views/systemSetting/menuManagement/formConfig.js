/*
 * @Author: kevin
 * @Date: 2022-03-03 12:49:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-04 16:45:22
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
      slotName: 'parentId',
      help: '顶级菜单不选'
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
      field: 'icon',
      type: 'input',
      label: '图标',
      placeholder: '录入@element-plus/icons名称',
      help: '图标地址：https://element-plus.org/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88'
    },
    {
      field: 'deppath',
      type: 'select',
      label: '菜单等级',
      placeholder: '请选择',
      options: [{ label: '1级', value: 1 }, { label: '2级', value: 2 }, { label: '3级', value: 3 }, { label: '4级', value: 4 }],
      help: '例： 系统管理（1级）=> 菜单管理（2级）...'
    },
    {
      field: 'isSee',
      type: 'slot',
      label: '是否可见',
      slotName: 'isSee'
    },
    {
      span: 24,
      field: 'component',
      type: 'input',
      label: '组件地址',
      placeholder: '请输入组件地址 component'
    }
  ]
}
