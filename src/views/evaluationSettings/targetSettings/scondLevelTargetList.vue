<!--
 * @Author: kevin
 * @Date: 2022-03-18 15:59:59
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-09 08:59:05
 * @Description: 目标设置
-->
<template>
  <kv-form v-bind="indexSearchConfig" v-model="formData">
    <template #searchBtn>
      <el-button style="margin-left: 10px" type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
    <template #handler>
      <el-button type="primary" :disabled="rowData.isPublish === 1" @click.prevent="handleEdit(null, 'add')"><el-icon style="vertical-align: middle"> <plus /> </el-icon>新建目标</el-button>
      <el-button type="warning" @click.prevent="backIndex(null)"><el-icon style="vertical-align: middle"> <arrow-left /> </el-icon>返回</el-button>
    </template>
  </kv-Form>
  <kv-table
    :getDataFn="getListPage"
    :propList="TableConfig"
    :params="{parentId: rowData?.id}"
    @handleSelectionChange="handleSelectionChange">
    <template #updateTime="scope">
      {{ formatTimestamp(scope.row.updateTime, 'YYYY-MM-DD HH:mm') }}
    </template>
    <template #handler="scope">
      <el-link type="primary" size="small" v-if="rowData.isPublish === 1" @click="handleEdit(scope.row, 'edit')" underline icon="view">查看</el-link>&nbsp;&nbsp;
      <el-link type="primary" size="small" v-else @click="handleEdit(scope.row, 'edit')" underline icon="edit">编辑</el-link>&nbsp;&nbsp;
      <el-link type="danger" size="small" :disabled="rowData.isPublish === 1" @click="handleRemove(scope.row)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>
  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="modelConfig.dialogVisible">
    <add :rowData="rowData" :subRowData="subRowData" @callBack="confirm" :editType="editType" />
  </kvDialog>
  <kvDialog v-bind="removModelConfig" v-model="removModelConfig.dialogVisible" @callBack="confirm" />
</template>

<script setup>
  import { ref } from 'vue'
  import { TableConfig, indexSearchConfig, removeModelConfig } from './config/dataConfig'
  import { getListPage } from '@/api/target'
  import { updateList } from '@/store'
  import { formatTimestamp } from '@/utils/formatDate'
  import add from './add/addScondTarget.vue'
  const props = defineProps({
    rowData: {
      type: Object,
      default: () => ({})
    }
  })
  const emit = defineEmits(['callBack'])
  const editType = ref('add')
  const modelConfig = ref({
      width: '1200px',
      dialogVisible: false
  })
  const removModelConfig = ref(removeModelConfig)
  const subRowData = ref()
  const formItems = indexSearchConfig?.formItems ?? []
  const formOriginData = {
    parentId: props.rowData?.id
  }
  for (const item of formItems) {
    if (item.field) {
      formOriginData[item.field] = ''
    }
  }
  const handleEdit = (row, type) => {
    subRowData.value = row
    editType.value = type
    modelConfig.value.dialogVisible = true
  }
  const confirm = () => {
    modelConfig.value.dialogVisible = false
    removModelConfig.value.dialogVisible = false
    updateList(getListPage, { parentId: props.rowData?.id })
  }
  const handleRemove = (row) => {
    removModelConfig.value.dialogVisible = true
    removModelConfig.value.params = row.id
    removModelConfig.value.modeType = 'remove'
    removModelConfig.value.useFn = null
  }
  const formData = ref(formOriginData)
  const backIndex = () => {
    emit('callBack', null, 'first')
  }
  const onSubmit = () => {
    updateList(getListPage, formData.value)
  }
  const handleSelectionChange = () => { }
</script>

<style lang="less">

</style>
