/*
 * @Author: kevin
 * @Date: 2022-03-15 15:09:08
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-15 17:47:13
 * @Description: Do not edit
 */
export const tableConfig = [
  {
    label: '序号',
    prop: 'account'
  }, {
    label: '状态',
    prop: 'name'
  }, {
    label: '目标',
    prop: 'telephone'
  }, {
    label: '最近更新',
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
      label: '目标名称',
      placeholder: '请输入目标名称',
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
      slotName: 'handler'
    }
  ]
}
