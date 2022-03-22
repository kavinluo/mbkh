/*
 * @Author: kevin
 * @Date: 2022-03-21 11:49:51
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-21 13:52:51
 * @Description: 机构相关
 */
export const institutionSearch = {
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
      label: '机构名称',
      placeholder: '请输入机构名称',
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
export const institutionList = [
 {
    label: '机构名称',
    prop: 'name'
  }, {
    label: '操作',
    slotName: 'handler'
  }
]

export const addInstitution = {
  labelWidth: '100px',
  colLayout: {
    span: 22
  },
  isVerify: true,
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '机构名称',
      placeholder: '机构名称',
      align: 'right',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入机构名称'
      }
    }
  ]
}
