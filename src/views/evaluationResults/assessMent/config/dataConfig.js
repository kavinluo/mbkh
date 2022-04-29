
//  @Author: kevin
//  @Date: 2022-04-2211:49:51
//  @LastEditors: kevin
//  @LastEditTime: 2022-04-22 10:02:40
//  @Description: 评价结果

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
    prop: ''
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
      field: 'name',
      type: 'input',
      label: '机构名称',
      placeholder: '请输入机构名称',
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
    },
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
