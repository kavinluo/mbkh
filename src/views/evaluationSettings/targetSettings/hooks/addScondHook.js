/*
 * @Author: kevin
 * @Date: 2022-05-18 15:26:27
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-02 13:58:54
 * @Description: 二级目标添加
 */
import { ref, nextTick, getCurrentInstance } from 'vue'
import {
  addSubFormConfig,
  selectModelConfig,
  tablePropList,
  repeatTipModelConfig
} from '../config/dataConfig'
import { getSuper } from '@/api/account'
import { getRoleList } from '@/api/organization'
import { add, getList } from '@/api/target'
import { mergeSameCell } from '@/utils/util'
import { getCycle, getQuotaLis, formatTableData, formatSelectQuotaList } from '../hooks/hooks'
import { depositoryList } from '@/api/cycle'
export const addScondTargetHook = ({ rowData, subRowData, editType, emit }) => {
  const { proxy } = getCurrentInstance()
  // 如果已经发布只能查看
  const isView = ref(false)
  isView.value = rowData.isPublish === 1
  addSubFormConfig.formItems.forEach(item => {
    if (item.field === 'title' || item.field === 'cycle2') {
      item.disabled = rowData.isPublish === 1
    }
  })
  // 是否重新选择
  const isRepeatSelect = ref(repeatTipModelConfig)
  // 指标周期
  const cyListOption = ref([])
  const useTable = ref(null)
  const selectTableData = ref([])
  // 考区选择
  const checkAreaOptions = ref([])
  //  负责人
  const directorOptions = ref([])
  // 指标周期
  const fy = async () => {
    const { data } = await depositoryList()
    cyListOption.value = data
  }
  fy()
  const selectConfig = ref(selectModelConfig)
  const ruleFormRef = ref({})
  const showTableData = ref([])
  const evaluateTargetDtoList = ref([])
  const useTableData = ref([]) // 获得选择考核内容列表
  const formData = ref({})

  // 过滤上一级选中的考区
  const checkAreaList = rowData.checkArea.split(',').map(item => +item)
  const getKQ = async () => {
    const { data } = await getRoleList()
    checkAreaOptions.value = data.filter(item => checkAreaList.includes(item.id))
  }
  getKQ()
  // 目标周期列表
  getCycle(rowData).then(res => {
    formData.value = res
  })
  // 获得选择考核内容列表
  getQuotaLis().then(res => {
    useTableData.value = formatSelectQuotaList(res, cyListOption.value)
  })
  // 选择考核内容
  const handleAddQuota = () => {
    if (showTableData.value.length) {
      isRepeatSelect.value.dialogVisible = true
    } else {
      repeatConfirm()
    }
  }
  // 是否确定重新选择
  const repeatConfirm = () => {
    showTableData.value = []
    selectConfig.value.dialogVisible = true
    isRepeatSelect.value.dialogVisible = false
  }

  // formData.value.cycle1 = ''

  if (editType === 'edit') {
    getList({ id: subRowData.id }).then(res => {
      const { checkArea, director } = res.data
      res.data.checkArea = checkArea.split(',').map(item => +item)
      res.data.director = director.split(',').map(item => +item)
      formData.value = res.data
      selectData(res.data.checkArea)
      const ulist = formatSelectQuotaList(res.data.targetInfoDtoList, cyListOption.value)
      selectTableData.value = ulist
      confirmTableDat()
    })
  }
  // 选择
  const handleSelectionChange = (selectData, cyList, Type) => {
     selectTableData.value = selectData
  }
  const confirm = () => {
    selectConfig.value.dialogVisible = false
    confirmTableDat()
  }
 const confirmTableDat = () => {
  const { tableData } = formatTableData(selectTableData.value)
    showTableData.value = tableData
    nextTick(() => {
      mergeSameCell(useTable.value, 1, 0, [0, 1])
    })
 }
  const cancel1 = () => {
    emit('callBack')
  }
  const cancel = () => {
    evaluateTargetDtoList.value = []
    selectConfig.value.dialogVisible = false
    isRepeatSelect.value.dialogVisible = false
  }
  const selectData = (val) => {
    if (val.length) {
      getSuper(val.join(',')).then(res => {
        directorOptions.value = res.data
      })
    } else {
      directorOptions.value = []
    }
    if (!directorOptions.length) {
        directorOptions.value = []
    }
  }
  const fn = add // props.editType === 'edit' ? modify : add // 修改和添加使用同一个接口
  const handleAddTarget = (ruleFormRef) => {
    ruleFormRef.$refs.ruleFormRef?.validate((valid) => {
      if (valid) {
        const { checkArea = [], director = [] } = formData.value
        for (let index = 0; index < showTableData.value.length; index++) {
          const _ = showTableData.value[index]
          if (!_.cycleId) {
            proxy.$message.error(`第${index + 1}行指标周期不能为空！`)
            return
          }
          _.options.forEach(option => {
            if (_.cycleId === option.id) { // 给周期选择后的
              _.cycleName = option.title
            }
          })
        }
        const params = {
          checkArea: checkArea.join(','),
          director: director.join(','),
          targetInfoDtoList: showTableData.value
        }
        const obj = Object.assign({}, formData.value, params)
        if (!showTableData.value.length) {
          proxy.$message.error(`请选择考核内容！`)
          return
        }
        fn(obj).then(res => {
          const { status } = res
          if (status?.code === '0') {
            emit('callBack')
          }
        })
      }
    })
  }
  // watch(() => showTableData.value, (val) => {
  //   nextTick(() => {
  //     mergeSameCell(useTable.value, 1, 0, [0, 1])
  //   })
  // })
  return {
    addSubFormConfig,
    tablePropList,
    checkAreaOptions,
    directorOptions,
    selectConfig,
    useTableData,
    handleAddTarget,
    selectData,
    cancel,
    cancel1,
    confirm,
    handleSelectionChange,
    handleAddQuota,
    ruleFormRef,
    showTableData,
    isRepeatSelect,
    repeatConfirm,
    // cyListOption,
    formData,
    useTable,
    isView
  }
}
