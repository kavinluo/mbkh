/*
 * @Author: kevin
 * @Date: 2022-03-07 10:35:00
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-15 17:43:40
 * @Description: table数据
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
    // colLayout: {
    //   span: 4
    // },
    formItems: [
      {
        field: 'title',
        type: 'input',
        label: '目标名称',
        placeholder: '请输入目标名称'
      },
      {
        field: 'title',
        type: 'input',
        label: '目标名称',
        placeholder: '请输入目标名称'
      }, {
        field: 'title',
        type: 'input',
        label: '目标名称',
        placeholder: '请输入目标名称'
      }, {
        field: 'title',
        type: 'input',
        label: '目标名称',
        placeholder: '请输入目标名称'
      }, {
        field: 'title',
        type: 'input',
        label: '目标名称',
        placeholder: '请输入目标名称'
      }, {
        field: 'title',
        type: 'input',
        label: '目标名称',
        placeholder: '请输入目标名称'
      },
      {
        span: {
          span: 1,
          align: 'right'
        },
        type: 'colSlot',
        slotName: 'searchBtn',
        itemClassName: 'searchBtn'
      }
    ]
  }
