/*
 * @Author: kevin
 * @Date: 2022-03-07 10:35:00
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-08 17:29:47
 * @Description: table数据
 */
 export default [
    {
      label: '菜单名称',
      prop: 'title'
    },
    {
      label: '排序',
      prop: 'sequence'
    },
    {
      label: '路由name',
      prop: 'name'
    }, {
      label: '路由地址',
      prop: 'path'
    }, {
      label: 'icon',
      prop: 'icon'
    }, {
      label: '是否可见',
      prop: 'isSee',
      slotName: 'isSee'
    }, {
      label: '操作',
      slotName: 'handler'
    }
  ]
