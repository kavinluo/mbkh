/*
 * @Author: kevin
 * @Date: 2022-05-18 15:26:27
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-20 18:06:55
 * @Description: 二级目标添加
 */
import { ref } from 'vue'
import {
  addSubFormConfig,
  selectModelConfig,
  tablePropList
} from '../config/dataConfig'
import { getSuper } from '@/api/account'
import { getRoleList } from '@/api/organization'
import { add, getList } from '@/api/target'
// import { mergeSameCell } from '@/utils/util'
import { getCycle, getQuotaLis, formatTableData, formatSelectQuotaList } from '../hooks/hooks'
import { depositoryList } from '@/api/cycle'
export const addScondTargetHook = ({ rowData, subRowData, editType, emit }) => {
  // 指标周期
  const cyListOption = ref([])
  const useTable = ref(null)
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

  // 过滤上一级选中的考区
  const checkAreaList = rowData.checkArea.split(',').map(item => +item)
  const getKQ = async () => {
    const { data } = await getRoleList()
    checkAreaOptions.value = data.filter(item => checkAreaList.includes(item.id))
    console.log('checkAreaOptions.value', checkAreaOptions.value)
  }
  getKQ()

  // 目标周期列表
  const formData = ref(getCycle(rowData))
  const useTableData = ref([]) // 获得选择考核内容列表

  // 获得选择考核内容列表
  getQuotaLis().then(res => {
    useTableData.value = formatSelectQuotaList(res, cyListOption.value)
  })
  const handleAddQuota = () => {
    selectConfig.value.dialogVisible = true
  }
  formData.value.cycle1 = rowData.id

  if (editType === 'edit') {
    getList({ id: subRowData.id }).then(res => {
      const { checkArea, director } = res.data
      res.data.checkArea = checkArea.split(',').map(item => +item)
      res.data.director = director.split(',').map(item => +item)
      formData.value = res.data
      selectData(res.data.checkArea)
      const ulist = formatSelectQuotaList(res.data.targetInfoDtoList, cyListOption.value)
      handleSelectionChange(ulist, cyListOption.value, 'edit')
    })
  }
  // 选择
  const handleSelectionChange = (selectData, cyList, Type) => {
    const type = Type || 'add'
    const Option = cyList || cyListOption.value //
    const { tableData } = formatTableData(selectData, Option, type)
    showTableData.value = tableData
  }
  const confirm = (tyy) => {
    selectConfig.value.dialogVisible = false
  }
  const cancel = () => {
    evaluateTargetDtoList.value = []
    selectConfig.value.dialogVisible = false
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
          showTableData.value.forEach(_ => {
            _.options.forEach(option => {
              if (_.cycleId === option.id) { // 给周期选择后的
                _.cycleName = option.title
              }
            })
          })
        const params = {
          checkArea: checkArea.join(','),
          director: director.join(','),
          targetInfoDtoList: showTableData.value
        }
        const obj = Object.assign({}, formData.value, params)
        fn(obj).then(res => {
          const { status } = res
          if (status?.code === '0') {
            emit('callBack')
          }
        })
      }
    })
  }
  // watch(() => showTableData.value, () => {
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
    confirm,
    handleSelectionChange,
    handleAddQuota,
    ruleFormRef,
    showTableData,
    // cyListOption,
    formData,
    useTable
  }
}
