/*
 * @Author: kevin
 * @Date: 2022-03-21 11:49:51
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-24 11:40:17
 * @Description: 目标相关
 */
export const targetList = [
  {
    label: '序号',
    prop: 'number'
  }, {
    label: '目标名称',
    prop: 'title'
  }, {
    label: '考核考区',
    prop: 'checkArea'
  }, {
    label: '目标层次',
    prop: 'gradation'
  }, {
    label: '负责人',
    prop: 'director'
  }, {
    label: '整体周期',
    prop: 'cycle1'
  }, {
    label: '目标周期',
    prop: 'cycle2'
  }, {
    label: '分数',
    prop: 'score'
  }, {
    label: '状态',
    prop: 'status'
  }, {
    label: '上报',
    prop: 'report'
  }, {
    label: '操作',
    slotName: 'handler'
  }
]
export const targetSearch = {
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
      label: '目标名称',
      placeholder: '请输入目标名称',
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

export const addtarget = {
  labelWidth: '120px',
  colLayout: {
    span: 23
  },
  isVerify: true,
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '目标名称',
      placeholder: '目标名称',
      align: 'right',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入目标名称'
      }
    },
    {
      field: 'director',
      type: 'select',
      label: '负责人',
      placeholder: '选择负责人',
      align: 'right',
      option: [],
      otherOptions: {
        multiple: true,
        filterable: true
      },
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择负责人'
      }
    },
    {
      field: 'checkArea',
      type: 'select',
      label: '考区',
      placeholder: '选择考区',
      align: 'right',
      otherOptions: {
        multiple: true,
        filterable: true
      },
      option: [],
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择考区'
      }
    }
  ]
}
