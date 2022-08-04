<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:15:26
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-02 14:57:52
 * @Description: 模板管理
-->
<template>
  <kv-form v-bind="templateSearch" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" style="margin-left:10px" @click.prevent="onSubmit">搜索</el-button>
    </template>
    <template #handler>
      <el-button type="primary" @click.prevent="handleAddTemplate(null)">
        <el-icon style="vertical-align: middle">
          <plus />
        </el-icon>添加模板
      </el-button>
    </template>
  </kv-Form>
  <kv-table :propList="templateList" :getDataFn="getListPage" @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleAddTemplate(scope.row)" underline icon="edit">修改</el-link>&nbsp;&nbsp;
      <el-link type="primary" size="small" @click="handleSetting(scope.row)" underline icon="setting">设置</el-link>&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="addModel" v-if="addModel" @cancel="cancel">
    <create-template v-if="addModel" @callBack="confirm" :rowData="rowData" />
  </kvDialog>
  <kv-dialog v-bind="kvDialogConfig" v-model="kvDialogConfig.dialogVisible" @callBack="confirm" />
</template>

<script>
import { ref } from 'vue'
import createTemplate from './createTemplate'
import { templateList, templateSearch } from './config/dataConfig'
import { getListPage } from '@/api/template'
import { updateList } from '@/store'
export default {
  components: {
    createTemplate
  },
  emits: ['change'],
  setup (props, { emit }) {
    const addModel = ref(false)
    const rowData = ref(null)
    const modelConfig = ref({
      dialogWidth: '600px'
    })
    const kvDialogConfig = ref({
      modeType: 'remove',
      params: '',
      isShowFooter: true,
      dialogVisible: false,
      baseURL: '/template'
    })
    const formItems = templateSearch?.formItems ?? []
    const formOriginData = {}
    for (const item of formItems) {
      if (item?.field) {
        formOriginData[item.field] = ''
      }
    }
    const formData = ref(formOriginData)
    const cancel = () => { }
    const confirm = () => {
      addModel.value = false
      kvDialogConfig.value.dialogVisible = false
      updateList(getListPage, formData.value)
    }
    const handleRemove = (row) => {
      kvDialogConfig.value.dialogVisible = true
      kvDialogConfig.value.params = row.id
    }

    const onSubmit = () => {
      updateList(getListPage, formData.value)
    }
    const handleSelectionChange = () => { }
    const handleClick = () => { }

    // 添加模板
    const handleAddTemplate = (row) => {
      rowData.value = row
      addModel.value = true
    }
    // 编辑
    const handleSetting = (row) => {
      emit('change', 'attr', row)
    }

    return {
      cancel,
      modelConfig,
      addModel,
      confirm,
      templateList,
      templateSearch,
      formData,
      onSubmit,
      handleSelectionChange,
      handleClick,
      handleAddTemplate,
      handleSetting,
      getListPage,
      handleRemove,
      kvDialogConfig,
      rowData
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
