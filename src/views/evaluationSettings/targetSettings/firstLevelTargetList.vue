<!--
 * @Author: kevin
 * @Date: 2022-03-14 09:39:40
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-02 16:58:24
 * @Description: 一级级目标列表
-->
<template>
  <kv-form v-bind="indexSearchConfig" v-model="formData">
    <template #searchBtn>
      <el-button style="margin-left:10px" type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
    <template #handler>
      <el-button type="primary" @click.prevent="handleEdit(null)"><el-icon style="vertical-align: middle"> <plus /> </el-icon>新建目标</el-button>
    </template>
  </kv-Form>
  <kv-table
    :getDataFn="getListPage"
    :params="{ parentId: 0 }"
    :propList="indexTableConfig"
    @handleSelectionChange="handleSelectionChange">
    <template #isPublish="scope">
      {{ scope.row.isPublish ? '已发布' : '未发布' }}
    </template>
    <template #updateTime="scope">
      {{ formatTimestamp(scope.row.updateTime, 'YYYY-MM-DD HH:mm') }}
    </template>
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handlePublish(scope.row, scope.row.isPublish === 1 ? 'revokePublish' : 'publish')" underline :icon="scope.row.isPublish === 1 ? 'refresh' : 'position'">{{ scope.row.isPublish === 1 ? `撤销发布` : `发布` }}</el-link>&nbsp;&nbsp;
      <el-link type="primary" size="small" @click="handleSetting(scope.row)" underline icon="setting">配置</el-link>&nbsp;&nbsp;
      <el-link type="primary" :disabled="scope.row.isPublish === 1" size="small" @click="handleEdit(scope.row)" underline icon="edit">编辑</el-link>&nbsp;&nbsp;
      <el-link type="danger" :disabled="scope.row.isPublish === 1" size="small" @click="handleRemove(scope.row)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="modelConfig.dialogVisible">
    <add :rowData="rowData" @callBack="confirm" />
  </kvDialog>
  <kvDialog v-bind="removModelConfig" v-if="removModelConfig.dialogVisible" v-model="removModelConfig.dialogVisible" @callBack="confirm" />
</template>

<script setup>
  import { ref } from 'vue'
  import { indexTableConfig, indexSearchConfig, removeModelConfig, addModelConfig } from './config/dataConfig'
  import { getListPage, publish, revokePublish } from '@/api/target'
  import add from './add/addFirstTarget.vue'
  import { updateList } from '@/store'
  import { formatTimestamp } from '@/utils/formatDate'
  const emit = defineEmits(['callBack'])
  const modelConfig = ref(addModelConfig)
  const removModelConfig = ref(removeModelConfig)
  const rowData = ref(null)
  // const { proxy } = getCurrentInstance()
  const formItems = indexSearchConfig?.formItems ?? []
  const formOriginData = {
      parentId: 0
  }
  for (const item of formItems) {
    if (item.field) {
      formOriginData[item.field] = ''
    }
  }
  const formData = ref(formOriginData)
  const confirm = (type) => {
    modelConfig.value.dialogVisible = false
    removModelConfig.value.dialogVisible = false
    // setTimeout(() => {
      updateList(getListPage, formData.value)
    // }, 2000)
  }
  const onSubmit = () => {
    updateList(getListPage, formData.value)
  }
  const handleSelectionChange = () => {}
  const handleEdit = (row) => {
    rowData.value = row
    modelConfig.value.dialogVisible = true
  }
  const handleRemove = (row) => {
    removModelConfig.value.dialogVisible = true
    removModelConfig.value.params = row.id
    removModelConfig.value.modeType = 'remove'
  }
  const handleSetting = (row) => {
    rowData.value = row
    emit('callBack', row, 'scond')
  }

  const handlePublish = (row, type) => {
    // 上报或者部分上报后的不让在撤销
    // if (type !== 'publish' && row.status !== 0) {
    //   proxy.$message.warning('已有考区上报不能撤销！')
    //   return
    // }
    const fn = type === 'publish' ? publish : revokePublish
    removModelConfig.value.dialogVisible = true
    removModelConfig.value.params = row.id
    removModelConfig.value.modeType = type
    removModelConfig.value.useFn = fn
  }
</script>
