<!--
 * @Author: kevin
 * @Date: 2022-03-21 11:46:11
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-23 15:01:42
 * @Description: 目标管理
-->
<template>
  <kv-form v-bind="targetSearch" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
    <template #handler>
      <el-button type="primary" @click.prevent="handleEdit(null)"><el-icon style="vertical-align: middle"> <plus /> </el-icon>添加目标</el-button>
    </template>
  </kv-Form>
  <kv-table
    :propList="targetList"
    :getDataFn="getListPage"
    @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleEdit(scope.row)" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="addModel" v-if="addModel" @cancel="cancel">
    <add-target v-if="addModel" @callBack="confirm" />
  </kvDialog>
  <kv-dialog v-bind="kvDialogConfig" v-model="kvDialogConfig.dialogVisible" @callBack="confirm"/>

</template>

<script>
  import { ref } from 'vue'
  import addTarget from './addTarget.vue'
  import { targetList, targetSearch } from './config/dataConfig'
  import { getListPage } from '@/api/target'
  import { updateList } from '@/store'
  export default {
    components: {
      addTarget
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
        message: '您确定要删除吗？',
        baseURL: '/cycle'
      })
      const formItems = targetSearch?.formItems ?? []
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

      const handleSelectionChange = () => {}
      const handleClick = () => {}

      const handleEdit = (row) => {
        rowData.value = row
        addModel.value = true
      }

        return {
          cancel,
          modelConfig,
          addModel,
          confirm,
          targetList,
          targetSearch,
          formData,
          rowData,
          kvDialogConfig,
          onSubmit,
          handleSelectionChange,
          handleClick,
          handleEdit,
          handleRemove,
          getListPage
        }
  }
}

</script>

<style lang="scss" scoped>

</style>
