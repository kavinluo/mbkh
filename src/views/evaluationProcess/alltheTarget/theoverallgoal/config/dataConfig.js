/*
 * @Author: kevin
 * @Date: 2022-03-21 11:49:51
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-16 17:25:10
 * @Description: 整体目标
 */
export const targetList = [
  {
    type: 'expand',
    label: '操作',
    slotName: 'expand',
    width: '180'
  }, {
    label: '目标',
    prop: 'title'
  }, {
    label: '状态',
    prop: 'status',
    slotName: 'status'
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
        span: 1,
        align: 'right'
      },
      type: 'colSlot',
      slotName: 'backBtn',
      itemClassName: 'backBtn'
    }
  ]
}

export const tablePropList = [
   {
    label: '姓名',
    prop: 'name'
  }, {
    label: '机构',
    prop: 'org'
  },
  {
    label: '电话',
    prop: 'telephone'
  }
]
