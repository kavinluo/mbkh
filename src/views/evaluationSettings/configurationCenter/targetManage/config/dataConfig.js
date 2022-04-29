/*
 * @Author: kevin
 * @Date: 2022-03-21 11:49:51
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-21 17:36:19
 * @Description: 指标周期相关
 */
export const targetList = [
  {
    label: '指标周期名称',
    prop: 'title'
  }, {
    label: '开始时间',
    prop: 'startTime',
    slotName: 'startTime'
  }, {
    label: '结束时间',
    prop: 'endTime',
    slotName: 'endTime'
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
      label: '指标周期名称',
      placeholder: '请输入指标周期',
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
      field: 'title',
      type: 'input',
      label: '指标周期名称',
      placeholder: '指标周期名称',
      align: 'right',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入指标周期名称'
      }
    },
    {
      field: 'usetime',
      type: 'datepicker',
      dateType: 'datetimerange',
      label: '选择时间',
      align: 'right',
      rules: {
        required: true,
        trigger: 'blur',
        message: '选择时间'
      }
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
