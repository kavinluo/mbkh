/*
 * @Author: kevin
 * @Date: 2022-03-21 11:49:51
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-20 14:07:07
 * @Description: 目标相关
 */
// import { getAccountList } from '@/api/account'
// import { getRoleList } from '@/api/organization'

// export const getList = async () => {
//   const { data = [] } = await getRoleList()
//   return data
// }

// export const cascaderProps = {
//   value: 'id',
//   label: 'name',
//   lazy: true,
//   multiple: true,
//   checkStrictly: true,
//   teleported: false,
//   emitPath: true,
//   lazyLoad (node, resolve) {
//     const option = []
//     const { data, level } = node
//     if (level === 0) {
//       getList().then(res => {
//         res.map((item) => {
//           const obj = {
//             ...item,
//             multiple: false,
//             leaf: 0,
//             disabled: true,
//             checkStrictly: true
//           }
//           option.push(obj)
//         })
//         resolve(option)
//       })
//     }
//     if (level === 1) {
//       getAccountList({ organization: data.id }).then((res) => {
//        // 节点数组
//        if (res.data.length) {
//          res.data.map((item) => {
//           const obj = {
//             ...item,
//             multiple: true,
//             leaf: 1
//           }
//           option.push(obj)
//         })
//         resolve(option)
//        } else {

//        }
//       })
//     }
//   }
// }

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

export const addTargetFormConfig = {
  labelWidth: '120px',
  colLayout: {
    span: 23
  },
  isVerify: true,
  formItems: [
    {
      field: 'title',
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
      field: 'gradation',
      type: 'select',
      label: '目标层次',
      placeholder: '请选择',
      align: 'right',
      options: [{ label: '国家层次', value: 101 }, { label: '考区层次', value: 102 }],
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择目标层次'
      }
    }, {
      field: 'checkArea',
      type: 'slot',
      slotName: 'checkArea',
      label: '考区',
      placeholder: '选择考区',
      align: 'right',
      otherOptions: {
        multiple: true,
        filterable: true
      },
      options: [],
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择考区'
      }
    }, {
      field: 'director',
      type: 'slot',
      slotName: 'director',
      label: '负责人',
      placeholder: '选择负责人',
      align: 'right',
      options: [],
      otherOptions: {
        multiple: true,
        filterable: true
      },
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择负责人'
      }
    }
  ]
}
export const addSubFormConfig = {
  labelWidth: '120px',
  colLayout: {
    span: 12
  },
  isVerify: true,
  formItems: [
    {
      field: 'title',
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
      field: 'cycle1',
      type: 'select',
      label: '整体周期',
      placeholder: '整体周期',
      optionValue: 'id',
      optionLabel: 'title',
      align: 'right',
      disabled: true,
      options: []
    },
    {
      field: 'cycle2',
      type: 'select',
      label: '目标周期',
      placeholder: '目标周期',
      align: 'right',
      optionValue: 'id',
      optionLabel: 'title',
      options: [],
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择目标周期'
      }
    },
    {
      field: 'checkArea',
      // type: 'select',
      type: 'slot',
      slotName: 'checkArea',
      label: '考区',
      placeholder: '选择考区',
      align: 'right',
      otherOptions: {
        multiple: true,
        filterable: true
      },
      // optionValue: 'id',
      // optionLabel: 'name',
      options: [],
      rules: {
        required: true,
        trigger: 'blur',
        message: '请选择考区'
      }
    },
    {
      field: 'director',
      type: 'slot',
      slotName: 'director',
      label: '负责人',
      placeholder: '选择负责人',
      align: 'right',
      options: [],
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
      field: 'cycleId',
      type: 'slot',
      slotName: 'evaluate',
      label: '选择考核内容',
      align: 'right',
      rules: {
        required: false,
        trigger: 'blur',
        message: ''
      }
    }
  ]
}
export const indexSearchConfig = {
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
      placeholder: '请输入目标名称'
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

export const indexTableConfig = [
  {
    label: '目标名称',
    prop: 'title'
  },
  {
     label: '状态',
     prop: 'isPublish',
     slotName: 'isPublish'
   }, {
    label: '最近更新',
    prop: 'updateTime',
    slotName: 'updateTime'
  }, {
     label: '操作',
     slotName: 'handler'
   }
 ]

export const removeModelConfig = {
  dialogVisible: false,
  baseURL: '/check/target',
  isShowFooter: true,
  modeType: 'remove',
  params: ''
}
export const addModelConfig = {
  width: '600px',
  dialogVisible: false
}
export const selectModelConfig = {
  dialogVisible: false,
  dialogWidth: '800px',
  isShowFooter: true,
  isShowCancelBtn: true
}

export const tablePropList = [
  {
    label: '一级指标',
    prop: 'quotaName1'
  }, {
    label: '总分',
    prop: 'countScore'
  }
]
