/*
 * @Author: kevin
 * @Date: 2022-04-19 16:26:46
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-22 11:54:08
 * @Description: 二级目标
 */
import { targetModelConfig, reportDialogConfig } from './dialogConfig'
import { searchConfig } from './dataConfig'
import { reactive, ref } from 'vue'
import { report, getListPage } from '@/api/process'

import { updateList } from '@/store'
export const levelSecond = (data) => {
  const dfDataType = ref(null)
  const expandRowKeys = ref([])
  const targetDialog = reactive(targetModelConfig)
  const reportDialog = reactive(reportDialogConfig)
  const subRowData = ref(null)
  const formItems = searchConfig?.formItems ?? []
  const cancel = () => {
    reportDialog.dialogVisible = false
    targetDialog.dialogVisible = false
    updateList(getListPage, formData.value)
  }
  const handleEdit = (row, type, df, scope) => {
    if (scope) {
      expandRowKeys.value = [scope.id] // 记录当前被点击行的父节点 id
    }
    targetDialog.dialogVisible = true
    row.modelType = type
    subRowData.value = row
    dfDataType.value = df
  }
  const formOriginData = {}
  for (const item of formItems) {
    if (item.field) {
      formOriginData[item.field] = ''
    }
  }
  const formData = ref(formOriginData)
  const handleReport = (row, scope) => {
    if (scope) {
      expandRowKeys.value = [scope.id] // 记录当前被点击行的父节点 id
    }
    reportDialog.dialogVisible = true
    reportDialog.params = row.id
    reportDialog.useFn = report
  }

  const onSubmit = () => {
    updateList(getListPage, formData.value)
  }
  return {
    cancel,
    handleEdit,
    handleReport,
    subRowData,
    formData,
    onSubmit,
    targetDialog,
    reportDialog,
    searchConfig,
    dfDataType,
    expandRowKeys
    }
}

export const setSummaryFn = () => {
  return {

  }
}
