/*
 * @Author: kevin
 * @Date: 2022-03-03 12:49:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-25 14:12:19
 * @Description: 表单字段
 */
// 创建指标
export const selectQuota = {
  labelWidth: '120px',
  isVerify: true,
  itemStyle: { padding: '0 40px 0 0' },
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '指标名称',
      placeholder: '请输入指标名称',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入指标名称'
      }
    },
    {
      field: 'parentId',
      type: 'slot',
      label: '父节点',
      placeholder: '父节点',
      slotName: 'parentId'
    }
  ]
}

// 系统用户
export const propList = [
  {
    label: '名称',
    prop: 'title'
  }, {
    label: '总分值',
    prop: 'countScore'
  }, {
    label: '创建人',
    prop: 'createUser'
  }, {
    label: '更新时间',
    prop: 'updateTime'
  }, {
    label: '操作',
    slotName: 'handler'
  }
]
export const templatePropList = [
  {
    label: '模板名称',
    prop: 'name'
  }, {
    label: '备注',
    prop: 'remarks'
  }
]

export const quotaliDialogConfig = {
  dialogVisible: false,
  baseURL: '/quota',
  modeType: 'remove',
  params: '',
  message: '您确定要删除吗？',
  dialogWidth: '400px'
}

export const targetModelConfig = {
  dialogVisible: false,
  isShowFooter: false,
  params: '',
  dialogWidth: '800px'
}

export const treeConfigData = {
  treeData: [],
  isSelect: true,
  showHandle: true,
  defaultProps: {
    children: 'evaluateQuotaDetailedDtoList',
    label: 'title'
  }
}
export const modelConfigData = {
    title: '编辑指标库',
    width: '600px',
    draggable: true,
    isShowFooter: false,
    dialogVisible: false
}

export const selectModelConfig = {
  dialogVisible: false,
  dialogWidth: '800px',
  isShowFooter: true,
  isShowCancelBtn: true
}
export const contModelConfig = {
  title: '添加考评',
  width: '800px',
  draggable: true,
  dialogVisible: false
}
