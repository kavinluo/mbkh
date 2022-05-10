/*
 * @Author: kevin
 * @Date: 2022-05-06 16:02:25
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-09 10:14:45
 * @Description: Do not edit
 */
import { ref } from 'vue'
import { editModelConfig } from './dialogConfig'
import formConfig from './addFormConfig'

export const handels = () => {
  const editDialog = ref(editModelConfig)

  const addSchedule = () => {
    editDialog.value.dialogVisible = true
  }
  const cancel = () => {
    editDialog.value.dialogVisible = false
  }
  return {
    editDialog,
    addSchedule,
    cancel
  }
}
export const addHandels = (editType, row, emit) => {
  const formItems = formConfig?.formItems ?? []
  const formOriginData = {}
  const formData = ref(formOriginData)
  for (const item of formItems) {
    formOriginData[item.field] = ''
  }
  return {
    formItems,
    formData,
    formConfig

  }
}
