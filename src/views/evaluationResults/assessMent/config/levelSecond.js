/*
 * @Author: kevin
 * @Date: 2022-04-19 16:26:46
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-13 16:38:14
 * @Description: 二级目标
 */
import { targetModelConfig, reportDialogConfig } from './dialogConfig'
import { searchConfig } from './dataConfig'
import { updateList } from '@/store'
import { getListPage } from '@/api/result'
import { reactive, ref } from 'vue'
import { report } from '@/api/process'
export const levelSecond = (data) => {
  const dfDataType = ref(null)
  const expandRowKeys = ref([])
  const targetDialog = reactive(targetModelConfig)
  const reportDialog = reactive(reportDialogConfig)
  const formItems = searchConfig?.formItems ?? []
  const subRowData = ref(null)
  const formOriginData = {}
  for (const item of formItems) {
    if (item.field) {
      formOriginData[item.field] = ''
    }
  }
  const formData = ref(formOriginData)
  const cancel = () => {
    reportDialog.dialogVisible = false
    targetDialog.dialogVisible = false
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
  const handleReport = (row) => {
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
    onSubmit,
    targetDialog,
    reportDialog,
    searchConfig,
    formData,
    dfDataType,
    expandRowKeys
  }
}
