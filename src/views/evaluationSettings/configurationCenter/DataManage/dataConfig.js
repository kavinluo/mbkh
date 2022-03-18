/*
 * @Author: kevin
 * @Date: 2022-03-15 15:09:08
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-17 09:55:07
 * @Description: Do not edit
 */
export const tableConfig = [
  {
    label: '序号',
    prop: 'account'
  }, {
    label: '数据源名称',
    prop: 'name'
  }, {
    label: '备注',
    prop: 'telephone'
  }, {
    label: '分组',
    prop: 'email'
  }, {
    label: '操作',
    slotName: 'handler'
  }
]
export const searchConfig = {
  labelWidth: 'auto',
  showLine: true,
  itemStyle: { marginLeft: '20px' },
  formItems: [
    {
      span: {
        span: 4
      },
      field: 'title',
      type: 'input',
      label: '数据源名称',
      placeholder: '请输入数据源名称',
      align: 'right'
    },
    {
      span: {
        span: 1,
        align: 'right'
      },
      type: 'colSlot',
      slotName: 'searchBtn',
      itemClassName: 'searchBtn'
    },
    {
      span: {
        span: 19,
        align: 'right'
      },
      type: 'colSlot',
      slotName: 'handler',
      dec: '添加'
    }
  ]
}
// 添加属性
export const addCycle = [
  {
    label: '周期名称',
    prop: 'account'
  }, {
    label: '属性',
    prop: 'name'
  }, {
    label: '默认值',
    prop: 'telephone'
  }, {
    label: '属性类型',
    prop: 'email'
  }, {
    label: '是否必填',
    prop: 'email'
  }, {
    label: '操作',
    slotName: 'handler'
  }
]
