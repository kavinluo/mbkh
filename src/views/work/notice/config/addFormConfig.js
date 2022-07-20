/*
 * @Author: kevin
 * @Date: 2022-03-03 12:49:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-16 10:13:23
 * @Description: 表单字段
 */
export default {
  labelWidth: '120px',
  itemStyle: { padding: '0 40px 0 0' },
  colLayout: {
    // span: 12
  },
  // 表单是否需要验证
  isVerify: true,
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '公告标题',
      placeholder: '请输入标题',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入标题'
      }
    },
    {
      field: 'type',
      type: 'slot',
      label: '分类',
      slotName: 'type',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择分类'
      }
    },
    {
      field: 'content',
      type: 'slot', // 、、'textarea',
      label: '内容',
      slotName: 'content',
      placeholder: '请输入内容',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入内容'
      }
    },
    {
      field: 'checkArea',
      type: 'slot',
      label: '公告范围',
      slotName: 'checkArea',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择公告范围'
      }
    }, {
      field: 'top',
      type: 'slot',
      label: '是否置顶',
      slotName: 'top'
    }
  ]
}
