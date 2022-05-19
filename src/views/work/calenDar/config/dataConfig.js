/*
 * @Author: kevin
 * @Date: 2022-05-06 15:49:26
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-09 10:36:10
 * @Description: Do not edit
 */
export const publishList = [
 {
    label: '标题',
    prop: 'title',
    slotName: 'title'
  }, {
    label: '公告范围',
    prop: 'checkAreaName'
  }, {
    label: '接受人',
    prop: 'receiver'
  }, {
    label: '发布时间',
    prop: 'times',
    slotName: 'times'
  }, {
    label: '置顶',
    prop: 'top',
    slotName: 'top'
  }, {
    label: '状态',
    prop: 'status',
    slotName: 'status'
  },
  {
    label: '操作',
    slotName: 'handle'
  }
]
export const sendList = [
  {
     label: '标题',
     prop: 'title',
     slotName: 'title'
   }, {
     label: '公告范围',
     prop: 'checkAreaName'
   }, {
     label: '接受人',
     prop: 'receiver'
   }, {
     label: '发布时间',
     prop: 'times',
     slotName: 'times'
   }, {
     label: '置顶',
     prop: 'top',
     slotName: 'top'
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
      label: '标题',
      placeholder: '请输入标题',
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
    slotName: 'expBtn',
    itemClassName: 'expBtn'
    }
  ]
}
