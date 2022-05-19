/*
 * @Author: kevin
 * @Date: 2022-03-03 12:49:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-09 10:52:15
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
      field: 'text',
      type: 'slot',
      label: '公告标题',
      slotName: 'text'
    },
    {
      field: 'type',
      type: 'slot',
      label: '分类',
      slotName: 'type'
      // options: [{ label: '1级', value: 1 }, { label: '2级', value: 2 }, { label: '3级', value: 3 }]
    },
    {
      field: 'content',
      type: 'slot',
      label: '内容',
      placeholder: '请输入内容',
      slotName: 'content'

    },
    {
      field: 'checkArea',
      type: 'slot',
      label: '公告范围',
      slotName: 'checkArea'
    }
  ]
}
