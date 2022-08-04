<!--
 * @Author: kevin
 * @Date: 2022-03-04 10:55:07
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-02 14:58:21
 * @Description: systemAdministratorIndex.vue
-->
<template>
  <el-button type="primary" @click="handleAdd">添加</el-button>
  <br>
  <br>
  <kv-table
    :getDataFn="getAccountListPage"
    :params="{ userType: 1 }"
    :propList="tablecConfig"
    :showIndexColumn="false"
    :showFooter="false"
    @handleSelectionChange="handleSelectionChange">
    <template #enable="scope">
      {{ !scope.row.enable ? '是' : '否' }}
    </template>
    <template #handler="scope">
      <el-link type="primary" size="small" @click="heandleEdit(scope.row, 'account')" underline icon="edit">编辑</el-link>&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row, 'account')" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <div style="margin-top: 20px">
    <kvDialog v-bind="modelConfig" v-model="addModel" v-if="addModel" @callBack="confirm" @cancel="cancel">
      <add v-if="addModel" :inputType="inputType" :rowData="rowData" @cancel="cancel" @callBack="callBack" />
    </kvDialog>

    <kvDialog v-bind="kvDialogConfig" v-model="kvDialogConfig.dialogVisible" v-if="kvDialogConfig.dialogVisible" @callBack="confirm" @cancel="cancel"/>

  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import add from './add.vue'
  import { tablecConfig } from './formConfig'
  import { getAccountListPage } from '@/api/account'
  import { updateList } from '@/store'

  const kvDialogConfig = ref({
    dialogVisible: false,
    dialogWidth: '400px',
    modeType: 'remove',
    baseURL: '/account',
    params: ''
  })
  const modelConfig = ref({
    title: '添加账号',
    width: '600px',
    draggable: true,
    isShowFooter: false
  })
  const inputType = ref('add')
  const addModel = ref(false)
  const rowData = ref({})
  const multipleSelection = ref({})

  // 编辑
  const heandleEdit = (row, type) => {
    rowData.value = row
    addModel.value = true
    inputType.value = 'edit'
    modelConfig.value.title = '编辑账号'
  }
  const handleRemove = (row) => {
    kvDialogConfig.value.params = row.id
    kvDialogConfig.value.dialogVisible = true
  }
  const confirm = () => {
    callBack()
  }
  const callBack = () => {
    cancel()
    updateList(getAccountListPage, { userType: 1 })
  }

  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }
  const handleAdd = () => {
    addModel.value = true
    inputType.value = 'add'
    modelConfig.value.title = '添加账号'
  }
const cancel = () => {
  addModel.value = false
  rowData.value = null
  kvDialogConfig.value.dialogVisible = false
}
</script>
