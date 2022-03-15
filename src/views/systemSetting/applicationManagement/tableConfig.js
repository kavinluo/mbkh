/*
 * @Author: kevin
 * @Date: 2022-03-07 10:35:00
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-15 17:45:16
 * @Description: table数据
 */
 export const propList = [
    {
      label: '应用名称',
      prop: 'title'
    }, {
      label: '是否启用',
      prop: 'isOpen',
      slotName: 'isOpen'
    }, {
      label: '操作',
      slotName: 'handler'
    }
  ]

  export const formConfig = {
    labelWidth: 'auto',
    showLine: true,
    itemStyle: { marginLeft: '20px' },
    colLayout: {
      span: 6
    },
    formItems: [
      {
        field: 'title',
        type: 'input',
        label: '应用名称',
        placeholder: '请输入应用名称'
      },
      {
        span: {
          span: 1,
          align: 'right'
        },
        type: 'colSlot',
        slotName: 'searchBtn'
      }
    ]
  }
