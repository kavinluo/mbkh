/*
 * @Author: kevin
 * @Date: 2022-04-19 16:26:46
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-19 17:37:51
 * @Description: 二级目标
 */
import { targetModelConfig, reportDialogConfig } from './dialogConfig'
import { searchConfig } from './dataConfig'

import { reactive, ref } from 'vue'
import { report } from '@/api/process'
export const levelSecond = (data) => {
  const targetDialog = reactive(targetModelConfig)
  const reportDialog = reactive(reportDialogConfig)
  const subRowData = ref(null)
  const cancel = () => {
    reportDialog.dialogVisible = false
    targetDialog.dialogVisible = false
  }
  const handleEdit = (row) => {
    targetDialog.dialogVisible = true
    subRowData.value = row
  }
  const handleReport = (row) => {
    reportDialog.dialogVisible = true
    reportDialog.params = row.id
    reportDialog.useFn = report
  }
  const onSubmit = () => {}
  return {
    cancel,
    handleEdit,
    handleReport,
    subRowData,
    onSubmit,
    targetDialog,
    reportDialog,
    searchConfig
  }
}
