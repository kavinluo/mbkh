/*
 * @Author: kevin
 * @Date: 2022-04-12 13:40:01
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-20 17:21:33
 * @Description: Do not edit
 */
import { ref, getCurrentInstance, nextTick, watch } from 'vue'
import { fileDialogConfig, reasonDialogConfig } from './dialogConfig'
import { targetScoreAdd, getFileList, getAccount, getTarget } from '@/api/process'
import { getdetail } from '@/api/todoList'
import { mergeSameCell } from '@/utils/util'
export const handleFile = ({ emit, where, rowData }) => {
  const { proxy } = getCurrentInstance()
  const fileDialog = ref(fileDialogConfig)
  const reasonDialog = ref(reasonDialogConfig)
  const materialType = ref(1)
  const showTableData = ref([])
  const useIndex = ref(0)
  const showData = ref({})
  const useTable = ref(null)
  const showFileList = ref({
    0: []
  })
  const useSelectAccount = ref([]) // 选择后的人员 回显
  const fileList = ref({})
  const accountList = ref([])
  // <!--type 1 资料上传，2 人员资料 3 实地考察 -->
  const handelS = (index, type, material) => {
    useIndex.value = index
    materialType.value = type
    showFileList.value[index] = showFileList.value[index] || [] // 显示时的文件内容
    fileList.value[index] = fileList.value[useIndex.value] || [] // 提交时的文件id
    fileDialog.value.dialogVisible = true
    if (type === 1) {
      getFile(index, material)
    }
    if (type === 2) {
      const getAccountData = async () => {
        const { data } = await getAccount()
        accountList.value = data
        const materialList = material?.split(',') || []
        useSelectAccount.value = data.filter((item) => materialList.includes(item.id + ''))
      }
      getAccountData()
    }
    fileDialog.value.dialogWidth = type === 2 ? '650px' : '400px'
  }

  // 查看时获取附件
  const getFile = async (index, material) => {
    const { data } = await getFileList(material)
    const list = []
    data.forEach(item => {
      list.push({
        name: item.name,
        url: item.path,
        id: item.id
      })
      fileList.value[index].push(item.id)
    })
    showFileList.value[index] = list
  }
  const handlePreview = (files) => {
    console.log(' handlePreview', files)
  }
  const handleRemove = (files, uploadFiles) => {
    console.log(' handleRemove', files, uploadFiles)
  }
  const onRemove = (files) => {
     showFileList.value[useIndex.value] = showFileList.value[useIndex.value].filter(item => item.id !== files.id)
     fileList.value[useIndex.value] = fileList.value[useIndex.value].filter(item => item !== files.id)
     showTableData.value[useIndex.value].material = Array.from(new Set(fileList.value[useIndex.value]))?.join(',')
  }
  const handleExceed = (files, uploadFiles) => {
  }
  const onSuccess = (files, uploadFiles) => {
   fileList.value[useIndex.value].push(files.data)
   showTableData.value[useIndex.value].material = Array.from(new Set(fileList.value[useIndex.value]))?.join(',')
  }
  const cancelModle = () => {
    fileDialog.value.dialogVisible = false
    reasonDialog.value.dialogVisible = false
  }
  const cancelTargetModle = () => {
    emit('callBack')
  }
  // const fn = targetScoreAdd
  const submitHandle = () => {
    targetScoreAdd(showTableData.value).then((res) => {
      cancelTargetModle()
    })
  }

  // 选择人员
  const handleSelectionChange = (data) => {
    const selectID = data.map(item => item.id)
    showTableData.value[useIndex.value].material = selectID.join(',')
  }
  // 填写扣分原因
  const handleReason = (index) => {
    reasonDialog.value.dialogVisible = true
    useIndex.value = index
  }
  // 获取详细
  const getTargetData = async () => {
    if (where === 'work') {
       const { data } = await getdetail({ detailId: rowData.detailId, type: rowData.type })
        showData.value = data?.evaluateCheckTargetDto ?? {}
    } else {
       const { data } = await getTarget(rowData.id)
        showData.value = data
    }
     const { tableData } = formatTableData(showData.value, rowData)
     showTableData.value = tableData
  }
  getTargetData()
  const count = (type, row) => {
    if (type === 'ZP') {
      if (row.score < row.selfScore) {
        proxy.$message.warning('自评分不大于分值！')
        row.selfScore = 0
        return
      }
      showData.value.selfScore = showTableData.value.reduce((per, next) => {
        return per + Number(next.selfScore)
      }, 0)
    } else {
      if (row.score < row.repeatedScore) {
        proxy.$message.warning('复评分不大于分值！')
        row.repeatedScore = 0
        return
      }
      showData.value.repeatedScore = showTableData.value.reduce((per, next) => {
        return per + Number(next.repeatedScore)
      }, 0)
    }
  }
  watch(() => showTableData.value, () => {
    nextTick(() => {
      mergeSameCell(useTable.value, 1, 0, [0, 1])
    })
  })
  return {
    count,
    handelS,
    fileDialog,
    handlePreview,
    handleRemove,
    onRemove,
    handleExceed,
    onSuccess,
    fileList,
    showFileList,
    cancelModle,
    useIndex,
    showTableData,
    submitHandle,
    materialType,
    accountList,
    handleSelectionChange,
    useSelectAccount,
    handleReason,
    reasonDialog,
    cancelTargetModle,
    showData,
    useTable
  }
}
/**
 *
 * @param {Array} list // 数据
 * @returns Array
 */
 export const formatTableData = (data = {}, rowData) => {
  const usrlist = data.targetInfoDtoList

  usrlist.forEach(item => {
    console.log('item', item)
    item.detailedDto.sort((a, b) => a.number - b.number).forEach(x => {
      item.targetId = data.id // 目标id 提交需要
      item.area = rowData.checkArea // 地区id
      item.depositoryId = item.quotaId2 // 指标库id
      if (x.templateName === '考评方式') { // 此处如果文字有变动将会出现错误
        item.materialType = x.content === '资料上传' ? 1 : x.content === '人员资料' ? 2 : x.content === '实地考察' ? 3 : 0 // 评分方式 1上传资料 2用户名称 3文本 0无）
      }
    })
  })
  return {
    tableData: usrlist
  }
}
