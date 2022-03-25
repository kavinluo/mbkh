/*
 * @Author: kevin
 * @Date: 2022-03-15 15:09:08
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-23 15:26:57
 * @Description: Do not edit
 */
export const tableConfig = [
 {
    label: '数据源名称',
    prop: 'dataName'
  }, {
    label: '评分',
    prop: 'score'
  }, {
    label: '备注',
    prop: 'remarks'
  }, {
    label: '操作',
    slotName: 'handler'
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
      field: 'dataName',
      type: 'input',
      label: '数据源名称',
      placeholder: '请输入数据源名称',
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
      slotName: 'handler',
      dec: '添加'
    }
  ]
}

export const addData = {
  labelWidth: '100px',
  colLayout: {
    span: 22
  },
  isVerify: true,
  formItems: [
    {
      field: 'dataName',
      type: 'input',
      label: '数据名称',
      placeholder: '数据名称',
      align: 'right',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入数据名称'
      }
    }, {
      field: 'score',
      type: 'input',
      label: '评分',
      placeholder: '评分',
      align: 'right',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入评分'
      }
    }, {
      field: 'remarks',
      type: 'textarea',
      label: '备注',
      placeholder: '备注',
      align: 'right'
    }
  ]
}
