/*
 * @Author: kevin
 * @Date: 2022-04-29 17:05:24
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-17 13:47:05
 * @Description: Do not edit
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
    label: '最后更新',
    prop: 'updateTime',
    slotName: 'updateTime'
  }, {
    label: '平均分',
    prop: 'repeatedScore'
  }, {
    label: '评价结果',
    prop: 'scoreResult',
    slotName: 'scoreResult'
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
        span: 2,
        align: 'left'
      },
      type: 'colSlot',
      slotName: 'searchBtn',
      itemClassName: 'searchBtn'
    },
    // {
    //   span: {
    //     span: 1,
    //     align: 'right'
    //   },
    //   type: 'colSlot',
    //   slotName: 'backBtn',
    //   itemClassName: 'backBtn'
    // },
    {
      span: {
        span: 18,
        align: 'right'
    },
    type: 'colSlot',
    slotName: 'expBtn',
    itemClassName: 'expBtn'
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
