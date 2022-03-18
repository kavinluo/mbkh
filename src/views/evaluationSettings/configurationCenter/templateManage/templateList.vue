<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:15:26
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 16:13:33
 * @Description: 模板管理
-->
<template>
  <kv-form v-bind="templateSearch" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
    <template #handler>
      <el-button type="primary" @click.prevent="handleAddTemplate"><el-icon style="vertical-align: middle"> <plus /> </el-icon>添加模板</el-button>
    </template>
  </kv-Form>
  <kv-table
    :propList="templateList"
    :showIndexColumn="false"
    :getDataFn="getListPage"
    @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleEdit(scope.row, 'account')" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row, 'account')" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="addModel" v-if="addModel" @cancel="cancel">
    <create-template v-if="addModel" @callBack="confirm" />
  </kvDialog>
</template>

<script>
  import { ref } from 'vue'
  import kvDialog from '@/components/kvDialog'
  import createTemplate from './createTemplate'
  import { templateList, templateSearch } from './config/dataConfig'
  import { getListPage } from '@/api/template'
  // import { useStore } from '@/store'
  export default {
    components: {
      kvDialog,
      createTemplate
    },
    emits: ['change'],
    setup (props, { emit }) {
      const addModel = ref(false)
      const modelConfig = ref({})
      const formItems = templateSearch?.formItems ?? []
      const formOriginData = {}
      for (const item of formItems) {
        formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)
      const cancel = () => { }
      const confirm = () => {
        addModel.value = false
      }

      const onSubmit = () => {}
      const handleSelectionChange = () => {}
      const handleClick = () => {}

      // 添加模板
      const handleAddTemplate = () => {
        addModel.value = true
      }
      // 编辑
      const handleEditTemplate = () => {
        emit('change', 'add')
      }

        return {
          cancel,
          // tableData,
          modelConfig,
          addModel,
          confirm,
          templateList,
          // total,
          templateSearch,
          formData,
          onSubmit,
          handleSelectionChange,
          handleClick,
          handleAddTemplate,
          handleEditTemplate,
          getListPage
        }
  }
}

</script>

<style lang="scss" scoped>

</style>
