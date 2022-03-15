<!--
 * @Author: kevin
 * @Date: 2022-03-14 09:39:40
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-15 14:36:07
 * @Description: 目标设置
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
  </kv-Form>
  <kv-table
    :tableData="tableData"
    :propList="tableConfig"
    :showIndexColumn="false"
    :listTotal="total"
    @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleEdit(scope.row, 'account')" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row, 'account')" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="addModel" v-if="addModel" @callBack="confirm" @cancel="cancel">
    <!-- <add v-if="addModel" :addType="addType" :inputType="inputType" :rowData="rowData" @cancel="cancel" @callBack="callBack" /> -->
  </kvDialog>
</template>

<script>
  import { ref } from 'vue'

  import kvDialog from '@/components/kvDialog'
  import { tableConfig, searchConfig } from './tableConfig'
  export default {
    components: {
      kvDialog
    },
    emits: ['cancel'],

    setup () {
      const addModel = ref(false)
      const modelConfig = ref({})
      const tableData = ref([])
      const total = ref(0)
      const formItems = searchConfig?.formItems ?? []
      const formOriginData = {}
      for (const item of formItems) {
        formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)
      const cancel = () => { }
      const confirm = () => {}
      const onSubmit = () => {}
      const handleSelectionChange = () => {}

        return {
          cancel,
          tableData,
          modelConfig,
          addModel,
          confirm,
          tableConfig,
          total,
          searchConfig,
          formData,
          onSubmit,
          handleSelectionChange

        }
    }
  }
</script>
