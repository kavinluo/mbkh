<!--
 * @Author: kevin
 * @Date: 2022-02-24 10:05:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-04 13:29:25
 * @Description: 菜单列表
-->
<template>
  <el-button type="primary" @click="add">添加</el-button>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    row-key="id"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column type="index" label="排序" width="120">
      <template #default="scope">{{ scope.row.sequence }}</template>
    </el-table-column>
    <el-table-column property="title" label="菜单名称" show-overflow-tooltip />
    <el-table-column property="name" label="路由name" show-overflow-tooltip />
    <el-table-column property="path" label="路由地址" show-overflow-tooltip />
    <el-table-column property="icon" label="icon" show-overflow-tooltip />
    <el-table-column property="path" label="是否可见" show-overflow-tooltip>
      <template #default="scope"> {{ scope.row.isSee ? '是' : '否' }}</template>
    </el-table-column>
    <el-table-column property="name" label="操作">
      <template #default="scope">
        <el-button type="warning" size="small" @click="heandleEdit(scope.row)">编辑</el-button>
        <el-button type="warning" size="small" @click="handleRemove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div style="margin-top: 20px">
    <!-- <el-dialog v-model="addModel" v-bind="modelConfig">
      <add v-if="addModel" :inputType="inputType" :menuList="tableData" :rowData="rowData" @cancel="cancel" @callBack="callBack" />
    </el-dialog> -->
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

  export default {
    components: {
      add,
      kvDialog
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
        callBack

      }
    }
  }
</script>
