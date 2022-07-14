
//  @Author: kevin
//  @Date: 2022-04-2211:49:51
//  @LastEditors: kevin
//  @LastEditTime: 2022-04-22 10:02:40
//  @Description: 通知

export const targetList = [
  {
    type: 'colSlot',
    label: '操作',
    slotName: 'handler',
    width: '180'
  }, {
    label: '内容',
    prop: 'content'
  }, {
    label: '发布时间',
    prop: 'times',
    slotName: 'times'
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
      field: 'content',
      type: 'input',
      label: '标题',
      placeholder: '请输入标题',
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
