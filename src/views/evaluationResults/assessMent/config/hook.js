/*
 * @Author: kevin
 * @Date: 2022-04-12 13:40:01
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-05 16:36:28
 * @Description: Do not edit
 */
import { ref } from 'vue'
import { fileDialogConfig, reasonDialogConfig } from './dialogConfig'
import { targetScoreAdd, getFileList, getAccount } from '@/api/process'

// const format = (list) => {
//   const obj = {}
//     list.forEach(item => {
//       obj[item.sort] = obj[item.sort] || []
//       obj[item.sort].push(item)
//     })
//     return obj
// }
// export const formatTableData = (list) => {
//   const usrlist = []
//   list.forEach(item => {
//     const maxSort = []
//     const level1 = {
//       title: item.title, // 一级指标
//       content: item.title,
//       sort: -2,
//       number: -2,
//       countScore: item.countScore,
//       id: item.id,
//       rowSpan: 0
//     }
//     item.evaluateTargetDtoList = item?.evaluateQuotaDtoList || item.evaluateTargetDtoList // 改名为了提交使用
//     item.depositoryId = item.id
//     if (item.evaluateTargetDtoList.length) {
//       item.evaluateTargetDtoList.forEach(subItem => { // 二级指标
//       const level2Cspan = []
//       subItem.depositoryId = subItem.id
//       subItem.evaluateTargetDetailedDtoList = subItem?.evaluateQuotaDetailedDtoList || subItem.evaluateTargetDetailedDtoList // 改名为了提交使用
//         const level2 = {
//           title: subItem.title, // 二级指标
//           content: subItem.title,
//           sort: -1,
//           number: -1,
//           countScore: subItem.countScore,
//           id: subItem.id,
//           parentId: subItem.parentId,
//           rowSpan: 0
//         }
//         if (subItem.evaluateTargetDetailedDtoList) {
//           subItem.List = format(subItem.evaluateTargetDetailedDtoList)
//         }
//         for (const key in subItem.List) {
//           maxSort.push(key)
//           level2Cspan.push(key)
//           subItem.List[key].push(level1)
//           subItem.List[key].push(level2)
//           subItem.List[key] = subItem.List[key].sort((a, b) => a.number - b.number)
//           usrlist.push(subItem.List[key])
//         }
//         level2.rowSpan = level2Cspan.length
//       })
//     }
//     level1.rowSpan = maxSort.length
//   })
//   console.log('usrlist', usrlist)
//   console.log('list', list)
//   return { tableData: usrlist, list }
// }

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
export const formatDataList = (data) => {
  const list = data.arrayList
  const keyVal = {
    一级指标: 'firstLevel',
    二级指标: 'secondLevel',
    分值: 'score',
    原因: 'reason',
    复评分: 'repeatedScore',
    考评内容: 'content',
    考评方式: 'material',
    考评细则: 'evaluationRules',
    自评分: 'selfScore'
  }
 const userList = []
  const rowSpan = {}
 list.forEach((item, index) => {
   const obj = {}
   item.forEach((subItem, index) => {
      rowSpan[rowSpan[subItem.template]] = []
    })
    obj[keyVal[item[0].template]] = item[0].content
    obj[keyVal[item[1].template]] = item[1].content
    obj[keyVal[item[2].template]] = item[2].content
    obj[keyVal[item[3].template]] = item[3].content
    obj[keyVal[item[4].template]] = item[4].material
    obj[keyVal[item[5].template]] = item[5].score
    obj[keyVal[item[6].template]] = item[6].reason
    obj[keyVal[item[7].template]] = item[7].selfScore
    obj[keyVal[item[8].template]] = item[8].repeatedScore

    const fileType = item[4].content
    obj.checkContentId = item[4].id // 评分id  固定的
    obj.sort = item[3].sort // 顺序 只要后面考评内容的
    obj.area = data.checkArea // 考区
    obj.materialType = fileType === '资料上传' ? 1 : fileType === '人员资料' ? 2 : fileType === '实地考察' ? 3 : 0 // 评分方式 1上传资料 2用户名称 3文本 0无）
    obj.depositoryId = item[1].id // 指标库id 只要二级指标id
    obj.targetId = data.id // 目标id
   userList.push(obj)
 })
  return userList
}
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
