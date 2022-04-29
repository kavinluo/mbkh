<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:21:16
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-23 15:30:27
 * @Description: 数据管理
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
    <template #handler>
      <el-button type="primary" @click.prevent="handleEdit(null)">
        <el-icon style="vertical-align: middle"> <plus /> </el-icon>新建数据
      </el-button>
    </template>
  </kv-Form>
  <kv-table
    :getDataFn="getListPage"
    :propList="tableConfig"
    :showIndexColumn="false"
    @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleEdit(scope.row)" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <kvDialog v-bind="modelConfig" v-model="addModel">
    <add-data v-if="addModel" @callBack="confirm" :rowData="rowData" />
  </kvDialog>
  <kv-dialog v-bind="kvDialogConfig" v-model="kvDialogConfig.dialogVisible" @callBack="confirm"/>

</template>

<script>
  import { ref } from 'vue'
  import addData from './dataAdd.vue'
  import { tableConfig, searchConfig } from './config/dataConfig'
  import { getListPage } from '@/api/dataManage'
  import { updateList } from '@/store'
  export default {
    components: {
      addData
    },
    setup () {
      const addModel = ref(false)
      const rowData = ref(null)
      const modelConfig = ref({
        // title: '新建数据',
        width: '600px',
        draggable: true,
        isShowFooter: false
      })
      const kvDialogConfig = ref({
        modeType: 'remove',
        params: '',
        isShowFooter: true,
        dialogVisible: false,
        message: '您确定要删除吗？',
        baseURL: '/data'
      })
      const formItems = searchConfig?.formItems ?? []
      const formOriginData = {}
      for (const item of formItems) {
        if (item?.field) {
          formOriginData[item.field] = ''
        }
      }
      const formData = ref(formOriginData)
      const onSubmit = () => {
        updateList(getListPage, formData.value)
      }
      const handleEdit = (row) => {
        rowData.value = row
        addModel.value = true
      }
      const handleRemove = (row) => {
        kvDialogConfig.value.dialogVisible = true
        kvDialogConfig.value.params = row.id
      }
      const handleSelectionChange = () => {

      }
      const confirm = () => {
        addModel.value = false
        kvDialogConfig.value.dialogVisible = false
        updateList(getListPage, formData.value)
      }
      return {
        searchConfig,
        tableConfig,
        getListPage,
        onSubmit,
        handleEdit,
        handleRemove,
        handleSelectionChange,
        formData,
        rowData,
        addModel,
        kvDialogConfig,
        modelConfig,
        confirm
      }
    }

  }

</script>

<style lang="scss" scoped>

</style>
