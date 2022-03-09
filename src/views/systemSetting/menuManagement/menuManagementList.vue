<!--
 * @Author: kevin
 * @Date: 2022-02-24 10:05:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-08 14:08:23
 * @Description: 菜单列表
-->
<template>
  <el-button type="primary" @click="add">添加</el-button>
  <kv-table
    :tableData="tableData"
    :propList="propList"
    :showIndexColumn="false"
    :showFooter="false"
    @handleSelectionChange="handleSelectionChange">
    <template #isSee="scope">
      {{ scope.row.isSee ? '是' : '否' }}
    </template>
    <template #handler="scope">
      <el-link type="primary" size="small" @click="heandleEdit(scope.row)" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <div style="margin-top: 20px">
    <kvDialog v-bind="modelConfig" v-model="addModel" v-if="addModel" @callBack="confirm" @cancel="cancel">
      <add v-if="addModel" :inputType="inputType" :menuList="tableData" :rowData="rowData" @cancel="cancel" @callBack="callBack" />
    </kvDialog>

    <kvDialog v-bind="kvDialogConfig" v-if="kvDialogConfig.dialogVisible" @callBack="confirm" @cancel="cancel"/>

  </div>
</template>

<script>
  import { ref } from 'vue'
  import add from './addMenu.vue'
  import { getMenuList, removeMenu } from '@/api/menu'
  import kvDialog from '@/components/kvDialog'
  // import kvTable from '@/components/kvTable'
  import propList from './tableConfig'
  export default {
    components: {
      add,
      kvDialog
      // kvTable
    },
    emits: ['cancel'],

    setup () {
      const kvDialogConfig = ref({
        dialogVisible: false,
        message: '您确定要删除吗？',
        dialogWidth: '400px'
      })
      const modelConfig = ref({
        title: '添加菜单',
        width: '900px',
        draggable: true,
        isShowFooter: false
      })
      const inputType = ref('add')
      const tableData = ref([])
      const addModel = ref(false)
      const rowData = ref({})
      const multipleTableRef = ref({})
      const multipleSelection = ref({})

      const getList = async () => {
        const { data } = await getMenuList()
        tableData.value = data
      }
      getList()

      // 编辑
      const heandleEdit = (row) => {
        rowData.value = row
        addModel.value = true
        inputType.value = 'edit'
      }
      const handleRemove = (row) => {
        rowData.value = row
        kvDialogConfig.value.dialogVisible = true
      }
      const confirm = () => {
        removeMenu(rowData.value.id)
        callBack()
      }
      const callBack = () => {
        getList()
        cancel()
      }

      const handleSelectionChange = (val) => {
        multipleSelection.value = val
      }
      const add = () => {
        addModel.value = true
        inputType.value = 'add'
      }
     const cancel = () => {
       addModel.value = false
       rowData.value = null
       kvDialogConfig.value.dialogVisible = false
      }

      return {
        handleSelectionChange,
        multipleTableRef,
        tableData,
        modelConfig,
        addModel,
        rowData,
        inputType,
        add,
        heandleEdit,
        cancel,
        kvDialogConfig,
        handleRemove,
        confirm,
        callBack,
        propList

      }
    }
  }
</script>
