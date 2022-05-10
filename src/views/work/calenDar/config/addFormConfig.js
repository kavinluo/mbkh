/*
 * @Author: kevin
 * @Date: 2022-03-03 12:49:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-06 17:54:53
 * @Description: 表单字段
 */
export default {
  labelWidth: '120px',
  itemStyle: { padding: '0 40px 0 0' },
  colLayout: {
    // span: 12
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '日历名称',
      placeholder: '请输入日历名称'
    },
    {
      field: 'type',
      type: 'select',
      label: '日历',
      placeholder: '请选择',
      options: [{ label: '会议安排', value: 1 }, { label: '会议安排', value: 2 }, { label: '会议安排', value: 3 }]
    },
    {
      field: 'top',
      type: 'slot',
      label: '起止时间',
      slotName: 'top'
    },
    {
      field: 'icon',
      type: 'slot',
      label: '日历成员',
      slotName: 'icon'
    }
  ]
}
