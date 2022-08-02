<!--
 * @Author: kevin
 * @Date: 2022-02-24 09:58:32
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-23 17:34:23
 * @Description: 机构
-->
<template>
  <el-row :gutter="20">
    <el-col :span="4" v-if="usInfo.userType !== 2">
      <leftTree
        ref="treeRef"
        @nodeClick="nodeClick"
        current-node-key="28"
        :currentNodeKey="currentNodeKey"
        :treeData="treeData"
        @add="handleAdd('organization')"
        @edit="handleEdit(null, 'organization')"
        @remove="handleRemove(null, 'organization')"
        :isSelect="isSelect"
        :showHandle="true"
      />
    </el-col>
    <el-col :span="usInfo.userType === 2? 24 :20">
      <div class="mb10">
        <el-button :disabled="isSelect" @click="handleAdd('account')" type="primary">添加</el-button>
        <el-button :disabled="isSelect" @click="handleImport" type="primary">导入</el-button>
        <el-button :disabled="isSelect" @click="handleExprot" type="primary">导出</el-button>
      </div>
      <kv-table
        :getDataFn="getAccountListPage"
        :params="{
          userType: 2,
          organization: usInfo.userType === 2 ? usInfo.organization : '' }"
        :propList="propList"
        :showIndexColumn="true"
        @handleSelectionChange="handleSelectionChange">
        <template #enable="scope">
          {{ !scope.row.enable ? '是' : '否' }}
        </template>
        <template #supervisor="scope">
          {{ scope.row.isSupervisor ? '是' : '否' }}
        </template>
        <template #handler="scope">
          <el-link type="primary" size="small" @click="handleEdit(scope.row, 'account')" underline icon="edit">编辑</el-link>&nbsp;
          <el-link type="warning" size="small" @click="handleSetting(scope.row, 'account')" underline icon="setting">设为负责人</el-link>&nbsp;
          <el-link type="danger" size="small" @click="handleRemove(scope.row, 'account')" underline icon="delete">删除</el-link>
        </template>
      </kv-table>
    </el-col>
  </el-row>

  <!-- 模态框 -->
  <kvDialog v-bind="addModelC" v-model="addModelC.dialogVisible" @callBack="confirm" @cancel="cancel">
    <add :accountRowData="accountRowData" v-if="addModelC.dialogVisible" :addType="addType" :inputType="inputType" :rowData="rowData" @cancel="cancel" @callBack="callBack" />
  </kvDialog>
  <kvDialog v-bind="removeImportDialog" v-if="removeImportDialog.dialogVisible" v-model="removeImportDialog.dialogVisible" @callBack="confirm" @cancel="cancel"/>
</template>

<script setup>
  import { ref, computed, getCurrentInstance } from 'vue'
  import add from './add.vue'
  import { downloadHandle } from '@/utils/util'
  import { getListTreePage } from '@/api/organization.js'
  import { getAccountListPage, exportAccount, setModifySuper } from '@/api/account'
  import { useStore, updateList } from '@/store'
  import propList from './tableConfig'
  import leftTree from '@/components/kvLeftTree'
  import { useState } from '@/hooks/index'
  import { removeImportDialogConfig, modelConfig } from './dialogConfig'
  defineEmits(['cancel'])
  const removeImportDialog = ref(removeImportDialogConfig)
  const addModelC = ref(modelConfig)
  const addType = ref('account') // 机构: organization;添加用户：account
  const store = useStore()
  const inputType = ref('add')
  const treeData = ref([])
  const isSelect = ref(true)
  const usInfo = ref()
  const rowData = ref(null)
  const multipleSelection = ref({})
  const currentNodeKey = ref('')
  const accountRowData = ref({})
  const treeRef = ref()
  const { proxy } = getCurrentInstance()
  const { userInfo } = useState(['userInfo'], 'user')
  usInfo.value = userInfo.value
  removeImportDialog.value.templateLInk = `${store.state.HOST}/${store.state.fileConfig.template}/人员导入模板.xlsx`
  // tree
  const pagination = computed(() => store.state.pagination)
  const getTreeList = async () => {
    const { data = {} } = await getListTreePage(pagination.value)
    treeData.value = data.list
    if (usInfo.value.userType === 2) {
      rowData.value = { id: usInfo.value.organization }
      isSelect.value = false
    } else {
      const id = treeData.value.length ? treeData.value[0]?.id ?? '' : ''
      getAccunt(id)
      isSelect.value = false
    }
  }
  getTreeList()
  // 导出人员列表
  const confirm = (modeType) => {
    if (removeImportDialog.value.modeType === 'exprot') {
      exportAccount(rowData.value.id).then((res) => {
        downloadHandle(res, '人员列表')
      })
    }
    callBack()
  }
  // table
  const getAccunt = (id) => {
    updateList(
      getAccountListPage,
      {
        // 默认考区登录显示相对应的账号
        organization: usInfo.value.userType === 2 ? usInfo.value.organization : id,
        userType: 2
      })
      if (usInfo.value.userType === 2) {
        rowData.value = { id: usInfo.value.organization }
        isSelect.value = false
      } else { // 如果左侧没有被选中默认选中第一个
        rowData.value = rowData.value || treeData.value[0]
        isSelect.value = false
      }
  }
  // getAccunt()

  const callBack = () => {
    addType.value === 'account' ? getAccunt(rowData.value?.id) : getTreeList()
    cancel()
  }

  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }
  // 导入导出
  const handleImport = () => {
    removeImportDialog.value.modeType = 'import'
    removeImportDialog.value.dialogVisible = true
    removeImportDialog.value.isImport = true
    removeImportDialog.value.importAPI = '/api/account/import'
  }
  const handleExprot = () => {
    removeImportDialog.value.dialogVisible = true
    removeImportDialog.value.isImport = false
    removeImportDialog.value.modeType = 'exprot'
  }
  const cancel = () => {
    addModelC.value.dialogVisible = false
    console.log('first', rowData.value)
    // rowData.value = null
    // isSelect.value = true
    removeImportDialog.value.dialogVisible = false
    // 如果考区登录保留 rowData 数据
    if (usInfo.value.userType === 2) {
        rowData.value = { id: usInfo.value.organization }
        isSelect.value = false
    }
  }
  const nodeClick = (row) => {
    getAccunt(row.id)
    rowData.value = row
    removeImportDialog.value.baseURL = '/account'
    isSelect.value = false
  }
  const handleAdd = (type) => {
    // isSelect.value = true
    addModelC.value.dialogVisible = true
    inputType.value = 'add'
    addModelC.value.title = '添加'
    addType.value = type
  }
  // 编辑
  const handleEdit = (row, type) => {
    accountRowData.value = row
    addModelC.value.dialogVisible = true
    inputType.value = 'edit'
    addModelC.value.title = '编辑'
    addType.value = type
    // isSelect.value = false
  }

  const handleRemove = (row, type) => {
    removeImportDialog.value.params = type === 'account' ? row.id : rowData.value.id
    addType.value = type
    removeImportDialog.value.modeType = 'remove'
    removeImportDialog.value.baseURL = '/' + type
    removeImportDialog.value.dialogVisible = true
    removeImportDialog.value.isImport = false
  }
  // 设置负责人
  const handleSetting = (row, type) => {
    const setModif = async () => {
      return setModifySuper(row.id)
    }
    setModif().then((res) => {
      console.log(res)
      if (res.status.code === '0') {
        getAccunt(rowData.value?.id)
      } else {
        proxy.$message.error(res.status.msg)
      }
    })
  }
</script>
