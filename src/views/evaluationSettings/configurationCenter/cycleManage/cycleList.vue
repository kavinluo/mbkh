<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:20:12
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 15:03:10
 * @Description: 周期管理
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
    <template #handler>
      <el-button type="primary" @click.prevent="handleAddCycle">
        <el-icon style="vertical-align: middle"> <plus /> </el-icon>新建周期</el-button>
    </template>
  </kv-form>

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

  <kvDialog v-bind="modelConfig" v-model="addModel">
    <addCycle v-if="addModel" @callBack="confirm" />
  </kvDialog>

</template>

<script>
  import { ref } from 'vue'
  import kvDialog from '@/components/kvDialog'
  import { tableConfig, searchConfig } from './dataConfig'
  import addCycle from './cycleAdd.vue'
  import { getListPage } from '@/api/cycle'

  export default {
    components: {
      kvDialog,
      addCycle
    },
    setup () {
      const addModel = ref(false)
      const modelConfig = ref({
        title: '新建周期',
        width: '600px',
        draggable: true,
        isShowFooter: false
      })
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
        addModel.value = true
      }
      const handleEdit = () => {

      }
      const handleRemove = () => {

      }
      const handleSelectionChange = () => {

      }
      const confirm = () => {

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
        formData,
        addModel,
        modelConfig,
        confirm
      }
    }

  }

</script>

<style lang="scss" scoped>

</style>
