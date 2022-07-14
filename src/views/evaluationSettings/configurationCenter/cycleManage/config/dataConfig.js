/*
 * @Author: kevin
 * @Date: 2022-03-15 15:09:08
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-23 18:30:45
 * @Description: Do not edit
 */

// table 数据
export const tableConfig = [
   {
    label: '周期名称',
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
// 搜索数据
export const searchConfig = {
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
      label: '周期名称',
      placeholder: '请输入周期名称',
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
// 添加
export const addCycleConfig = {
  labelWidth: '120px',
  isVerify: true,
  // itemStyle: { marginLeft: '20px' },
  colLayout: {
    span: 20
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '周期名称',
      placeholder: '请输入周期名称',
      align: 'right',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入周期名称'
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
