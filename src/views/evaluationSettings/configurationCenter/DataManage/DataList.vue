<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:21:16
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 15:05:20
 * @Description: 数据管理
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
    <template #handler>
      <el-button type="primary" @click.prevent="handleAddCycle">新建数据</el-button>
    </template>
  </kv-Form>
  <kv-table
    :getDataFn="getListPage"
    :propList="tableConfig"
    :showIndexColumn="false"
    @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleEdit(scope.row)" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.rowData)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>
</template>

<script>
  import { ref } from 'vue'
  import kvDialog from '@/components/kvDialog'
  import { tableConfig, searchConfig } from './dataConfig'
  import { getListPage } from '@/api/dataManage'

  export default {
    components: {
      kvDialog
    },
    setup () {
      const tableData = ref([])
      const formItems = searchConfig?.formItems ?? []
      const formOriginData = {}
      for (const item of formItems) {
        formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)
      const onSubmit = () => {

      }
      const handleAddCycle = () => {

      }
      const handleEdit = () => {

      }
      const handleRemove = () => {

      }
      const handleSelectionChange = () => {

      }
      return {
        searchConfig,
        tableConfig,
        tableData,
        getListPage,
        onSubmit,
        handleAddCycle,
        handleEdit,
        handleRemove,
        handleSelectionChange,
        formData
      }
    }

  }

</script>

<style lang="scss" scoped>

</style>
