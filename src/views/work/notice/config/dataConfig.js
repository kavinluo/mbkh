/*
 * @Author: kevin
 * @Date: 2022-05-06 15:49:26
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-16 16:57:07
 * @Description: Do not edit
 */
export const publishList = [
 {
    label: '标题',
    prop: 'title',
    slotName: 'title'
  }, {
    label: '公告范围',
    prop: 'checkAreaName',
    minWidth: 120
  }, {
    label: '发布时间',
    prop: 'times',
    slotName: 'times'
  }, {
    label: '置顶',
    prop: 'top',
    slotName: 'top',
    width: 100
  }, {
    label: '状态',
    prop: 'isPublish',
    slotName: 'isPublish',
    width: 100
  },
  {
    label: '操作',
    slotName: 'handle',
    fixed: 'right',
    width: 200
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
     label: '发布时间',
     prop: 'times',
     slotName: 'times'
   }, {
     label: '置顶',
     prop: 'top',
     slotName: 'top'
   }, {
     label: '状态',
     prop: 'isPublish',
     slotName: 'isPublish'
   }
 ]
 export const typeTableList = [{
    label: '分类标题',
    prop: 'typeName'
  },
  {
    label: '操作',
    slotName: 'handle'
  }]
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
        span: 2,
        align: 'left'
      },
      type: 'colSlot',
      slotName: 'searchBtn',
      itemClassName: 'searchBtn'
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
