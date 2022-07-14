/*
 * @Author: kevin
 * @Date: 2022-03-15 15:09:08
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-30 11:14:02
 * @Description: Do not edit
 */

 const options = [{
  value: 'input',
  label: '文本输入'
}, {
  value: 'textarea',
  label: '多行输入'
}, {
  value: 'file',
  label: '文件上传'
}, {
  value: 'select',
  label: '下拉选项'
}, {
  value: 'date',
  label: '日期'
}, {
  value: 'number',
  label: '数字'
}]

const optionsObj = {
  input: '文本输入',
  textarea: '多行输入',
  file: '文件上传',
  select: '下拉选项',
  date: '日期',
  number: '数字'
}

export const templateList = [
 {
    label: '模板名称',
    prop: 'name'
  }, {
    label: '备注',
    prop: 'remarks'
  }, {
    label: '操作',
    slotName: 'handler'
  }
]
export const templateSearch = {
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
      label: '模板名称',
      placeholder: '请输入模板名称',
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
      slotName: 'handler',
      dec: '添加'
    }
  ]
}
// 属性列表
export const attrList = [
  {
    label: '属性名称',
    prop: 'attributeName'
  }, {
    label: '属性类型',
    prop: 'attributeType',
    slotName: 'attributeType'
  }, {
    label: '显示顺序',
    prop: 'sort'
  }, {
    label: '默认值',
    prop: 'defaultValue'
  }, {
    label: '是否必填',
    prop: 'required',
    slotName: 'required'
  }, {
    label: '操作',
    slotName: 'handler'
  }
]

// createAttrs
export const createAttrs = {
  labelWidth: '120px',
  isVerify: true,
  colLayout: {
    span: 23
  },
  formItems: [
    {
      field: 'attributeName',
      type: 'input',
      label: '字段名称',
      placeholder: '字段名称',
      align: 'right',
      prop: 'attributeName',
      rules: {
        required: true,
        trigger: 'blur',
        message: '模板名称'
      }
    },
    {
      field: 'attributeType',
      prop: 'attributeType',
      type: 'select',
      label: '字段类型',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择字段类型'
      },
      placeholder: '请选择',
      align: 'right',
      options: options
    },
    {
      type: 'colSlot',
      label: '默认值',
      slotName: 'defaultValue',
      placeholder: '默认值',
      align: 'right',
      help: 'ghh'
    }, {
      field: 'sort',
      type: 'number',
      label: '显示顺序',
      placeholder: '横向显示顺序',
      align: 'right',
      prop: 'sort',
      rules: {
        required: true,
        trigger: 'blur',
        message: '显示顺序'
      }
    },
    {
      field: 'required',
      type: 'slot',
      slotName: 'required',
      label: '是否必填'
    }
    // {
    //   field: 'tips',
    //   prop: 'tips',
    //   type: 'input',
    //   label: '提示',
    //   placeholder: '提示',
    //   align: 'right'
    // }
  ]
}

export const createTemplate = {
  labelWidth: '120px',
  colLayout: {
    span: 22
  },
  isVerify: true,
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '模板名称',
      placeholder: '模板名称',
      align: 'right',
      rules: {
        required: true,
        trigger: 'blur',
        message: '模板名称'
      }
    },
    {
      field: 'remarks',
      type: 'textarea',
      label: '备注',
      placeholder: '备注',
      align: 'right'
    }
  ]
}

export { optionsObj }
