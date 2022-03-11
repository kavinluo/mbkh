<!--
 * @Author: kevin
 * @Date: 2022-03-04 10:55:07
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-11 16:32:57
 * @Description: systemAdministratorIndex.vue
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
  import { ref, computed, watch } from 'vue'
  import add from './addRole.vue'
  import { getListPage, remove } from '@/api/role'
  import kvDialog from '@/components/kvDialog'
  import { useStore } from '@/store'
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
      const store = useStore()
      const inputType = ref('add')
      const tableData = ref([])
      const addModel = ref(false)
      const rowData = ref({})
      const multipleTableRef = ref({})
      const multipleSelection = ref({})
      const pagination = computed(() => store.state.pagination)
      watch(pagination.value, () => getList())
      const getList = async () => {
        const { data = {} } = await getListPage(pagination.value)
        tableData.value = data.list
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
        remove(rowData.value.id)
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
