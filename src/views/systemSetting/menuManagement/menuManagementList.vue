<!--
 * @Author: kevin
 * @Date: 2022-02-24 10:05:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-02 14:58:14
 * @Description: 菜单列表
-->
<template>
  <div class="mb10">
    <el-button type="primary" @click="addHandle">添加</el-button>
  </div>
  <kv-table
    :getDataFn="getMenuList"
    :propList="propList"
    :showIndexColumn="false"
    :showFooter="false"
    @handleSelectionChange="handleSelectionChange">
    <template #isSee="scope">
      {{ scope.row.isSee ? '是' : '否' }}
    </template>
    <template #handler="scope">
      <el-link type="primary" size="small" @click="heandleEdit(scope.row)" underline icon="edit">编辑</el-link>&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <div style="margin-top: 20px">
    <kvDialog v-bind="modelConfig" v-model="addModel" v-if="addModel" @callBack="confirm" @cancel="cancel">
      <add v-if="addModel" :inputType="inputType" :menuList="tableData" :rowData="rowData" @cancel="cancel" @callBack="callBack" />
    </kvDialog>

    <kvDialog v-bind="kvDialogConfig" v-model="kvDialogConfig.dialogVisible" @callBack="confirm" @cancel="cancel"/>

  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import add from './addMenu.vue'
  import { getMenuList } from '@/api/menu'
  import propList from './tableConfig'
  import { useStore } from '@/store'
  const kvDialogConfig = ref({
    dialogVisible: false,
    dialogWidth: '400px',
    isShowFooter: true,
    modeType: 'remove',
    baseURL: '/menu',
    params: ''
  })
  const modelConfig = ref({
    title: '添加菜单',
    width: '900px',
    draggable: true,
    isShowFooter: false
  })
  const store = useStore()
  const inputType = ref('add')
  const tableData = computed(() => store.state.tableData)
  const addModel = ref(false)
  const rowData = ref({})
  const multipleSelection = ref({})
  // 编辑
  const heandleEdit = (row) => {
    rowData.value = row
    addModel.value = true
    inputType.value = 'edit'
  }
  const handleRemove = (row) => {
    kvDialogConfig.value.dialogVisible = true
    kvDialogConfig.value.params = row.id
  }
  const confirm = () => {
    callBack()
  }
  const callBack = () => {
    // getList()
    kvDialogConfig.value.dialogVisible = false
    // updateList(getMenuList)
    getMenuList({
      pageSize: 20,
      curPage: 1
    }).then((res) => {
      store.commit('setTableData', res.data)
      store.dispatch('user/getUserMenusActions', false)
    })
    cancel()
  }
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }
  const addHandle = () => {
    addModel.value = true
    inputType.value = 'add'
  }
  const cancel = () => {
    addModel.value = false
    rowData.value = null
    kvDialogConfig.value.dialogVisible = false
  }

</script>
