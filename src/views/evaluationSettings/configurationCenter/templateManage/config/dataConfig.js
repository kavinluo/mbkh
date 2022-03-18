/*
 * @Author: kevin
 * @Date: 2022-03-15 15:09:08
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 10:26:22
 * @Description: Do not edit
 */
export const templateList = [
  {
    label: '序号',
    prop: 'account'
  }, {
    label: '状态',
    prop: 'name'
  }, {
    label: '模板',
    prop: 'name'
  }, {
    label: '最近更新',
    prop: 'email'
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
      field: 'title',
      type: 'input',
      label: '模板名称',
      placeholder: '请输入模板名称',
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
// 属性列表
export const attrList = [
  {
    label: '序号',
    prop: 'account'
  }, {
    label: '属性',
    prop: 'name'
  }, {
    label: '默认值',
    prop: 'telephone'
  }, {
    label: '属性类型',
    prop: 'email'
  }, {
    label: '是否必填',
    prop: 'email'
  }, {
    label: '操作',
    slotName: 'handler'
  }
]

// createAttrs
export const createAttrs = {
  labelWidth: '120px',
  colLayout: {
    span: 23
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '字段名称',
      placeholder: '字段名称',
      align: 'right'
    },
    {
      field: 'title',
      type: 'input',
      label: '字段提示',
      placeholder: '字段提示',
      align: 'right'
    },
    {
      field: 'title',
      type: 'select',
      label: '字段类型',
      placeholder: '请选择',
      align: 'right',
      options: []
    }
  ]
}

export const addTemplate = {
  labelWidth: '120px',
  colLayout: {
    span: 23
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
        message: '请输入模板名称'
      }
    }
  ]
}
