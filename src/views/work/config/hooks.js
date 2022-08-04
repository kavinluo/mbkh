/*
 * @Author: kevin
 * @Date: 2022-04-12 13:40:01
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-19 17:36:21
 * @Description: Do not edit
 */
import { ref } from 'vue'
import { fileDialogConfig, reasonDialogConfig, editModelConfig, acmModelConfig, viewModelConfig } from './dialogConfig'
import { targetScoreAdd, getFileList, getAccount } from '@/api/process'
import { noticeTypeHaveRead, get, unReadAcceptList } from '@/api/notice'
import { getRoleList } from '@/api/organization'
import { searchConfig } from '../alreadyDoMatters/comMission/config/dataConfig'
import { getwatiList } from '@/api/todoList'
import formConfig from './viewFormConfig'
import { updateList } from '@/store'
import { useState } from '@/hooks/index'
const watiList = ref([])
const unReadList = ref([])
export const handeles = () => {
  const subRowData = ref(null)
  const subRowDatas = ref({})
  const subRowData1 = ref({})
  const handleDialog = ref(editModelConfig)
  const acmDialog = ref(acmModelConfig)
  const viewDialog = ref(viewModelConfig)
  const { userInfo } = useState(['userInfo'], 'user')
  const role = ref(userInfo.value)

  const handleView = (row) => {
    viewDialog.value.dialogVisible = true
    subRowData1.value = row
    const noticeList = async () => {
      await noticeTypeHaveRead(row.id)
    }
    noticeList()
  }
  const handleResetClick = () => {
    acmDialog.value.dialogVisible = false
    viewDialog.value.dialogVisible = false
    const unReadAcceptData = async () => {
      const { data } = await unReadAcceptList({ pageSize: 10, curPage: 1 })
       unReadList.value = data.list
     }
    if (role.value.userType !== 1) {
     unReadAcceptData()
    }
  }
  const cancel = () => {
    handleDialog.value.dialogVisible = false
    updataListFn()
  }

  const updataListFn = () => {
    updateList(getwatiList)
  }
  return {
    // handleAddTemplate,
    cancel,
    searchConfig,
    subRowData,
    handleDialog,
    acmDialog,
    handleResetClick,
    subRowDatas,
    updataListFn,
    handleView,
    viewDialog,
    subRowData1,
    watiList,
    unReadList
  }
}

export const handleFile = (cancelTargetModle) => {
  const fileDialog = ref(fileDialogConfig)
  const reasonDialog = ref(reasonDialogConfig)
  const materialType = ref(1)
  const showTableData = ref([])
  const useIndex = ref(0)
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
  }
  const fn = targetScoreAdd
  const submitHandle = () => {
    fn(showTableData.value).then((res) => {
      console.log('res', res)
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

  return {
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
    reasonDialog
  }
}
// 格式化数据 提交使用

//

/**
 *
 * @param {Array} list // 数据
 * @param {Array} cyListOption // 选项
 * @param {*} type // 类型
 * @returns Array
 */
 export const formatTableData = (data = {}, cyListOption, type) => {
  const usrlist = data.targetInfoDtoList

  const objList = {}
  usrlist.forEach(item => {
    item.detailedDto.sort((a, b) => a.number - b.number).forEach(x => {
      item.targetId = data.id // 目标id 提交需要
      item.depositoryId = item.quotaId2 // 指标库id
      if (x.templateName === '考评方式') { // 此处如果文字有变动将会出现错误
        item.materialType = x.content === '资料上传' ? 1 : x.content === '人员资料' ? 2 : x.content === '实地考察' ? 3 : 0 // 评分方式 1上传资料 2用户名称 3文本 0无）
      }
    })
    item.rowSpan = ''
  })
  return {
    tableData: usrlist,
    usrlist,
    objList
  }
}
export const addHandels = (row) => {
  const menuList = ref([])
  const formItems = formConfig?.formItems ?? []
  const formOriginData = {}
  for (const item of formItems) {
    formOriginData[item.field] = ''
  }
  const formData = ref(formOriginData)
      // 获得单个公告
    // if (row.id === undefined) {
    //   getdetail({ detailId: row.detailId, type: row.type }).then(res => {
    //     formData.value = res.data.noticeDataDto
    //     formData.value.checkArea = res.data.noticeDataDto.checkArea?.split(',')
    //     if (formData.value.checkArea?.length) {
    //       formData.value.checkArea = formData.value.checkArea.map(x => +x)
    //     }
    //     noticeTypeHaveRead(res.data.noticeDataDto.id)
    //   })
    // }
       // 获得单个公告
        get(row.id).then(res => {
          formData.value = res.data
          formData.value.checkArea = res.data.checkArea?.split(',')
          if (formData.value.checkArea?.length) {
            formData.value.checkArea = formData.value.checkArea.map(x => +x)
          }
        })
  const ruleFormRef = ref()
  const getl = async () => {
    const { data } = await getRoleList()
    console.log('data', data)
    menuList.value = data
  }
  getl()
  return {
    formData,
    menuList,
    status,
    formConfig,
    ruleFormRef
  }
}
