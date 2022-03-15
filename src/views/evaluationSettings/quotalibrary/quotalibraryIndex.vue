<!--
 * @Author: kevin
 * @Date: 2022-03-14 09:33:45
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-15 11:19:10
 * @Description: 指标库
-->
<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <leftTree
        v-bind="treeConfig"
        @nodeClick="nodeClick"
        @add="handleAdd('quota')"
        @edit="handleEdit(null, 'quota')"
        @remove="handleRemove(null, 'quota')"
      />
    </el-col>
    <el-col :span="19">
      <div class="mb10">
        <el-button @click="handleAdd('quota')" type="primary">新建</el-button>
      </div>
      <kv-table
        :tableData="tableData"
        :propList="propList"
        :showIndexColumn="true"
        :listTotal="total"
        @handleSelectionChange="handleSelectionChange">
        <template #enable="scope">
          {{ !scope.row.enable ? '是' : '否' }}
        </template>
        <template #handler="scope">
          <el-link type="primary" size="small" @click="handleEdit(scope.row, 'account')" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
          <el-link type="danger" size="small" @click="handleRemove(scope.row, 'account')" underline icon="delete">删除</el-link>
        </template>
      </kv-table>
    </el-col>
  </el-row>

  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="addModel" v-if="addModel" @callBack="confirm" @cancel="cancel">
    <add v-if="addModel" :addType="addType" :inputType="inputType" :rowData="rowData" @cancel="cancel" @callBack="callBack" />
  </kvDialog>
  <kvDialog v-bind="kvDialogConfig" :modeType="modeType" v-if="kvDialogConfig.dialogVisible" @callBack="confirm" @cancel="cancel"/>
</template>

<script>
  import { ref, computed, watch } from 'vue'
  import add from './add.vue'
  import { downloadHandle } from '@/utils/util'
  import { getListPage, remove } from '@/api/organization.js'
  import { getQuotaListPage, exportAccount } from '@/api/quota'
  import kvDialog from '@/components/kvDialog'
  import { useStore } from '@/store'
  import propList from './tableConfig'
  import leftTree from '@/components/kvLeftTree'

  export default {
    components: {
      add,
      kvDialog,
      leftTree
    },
    emits: ['cancel'],

    setup () {
      const kvDialogConfig = ref({
        dialogVisible: false,
        message: '您确定要删除吗？',
        dialogWidth: '400px',
        templateLInk: 'http://192.168.1.202:9090/res/template/%E5%9F%BA%E5%B1%82/%E5%9F%BA%E5%B1%82-%E5%87%86%E8%80%83%E8%AF%81.xlsx'
      })
      const modelConfig = ref({
        title: '编辑指标库',
        width: '600px',
        draggable: true,
        isShowFooter: false
      })

      const modeType = ref('remove')
      const total = ref(0)
      const addType = ref('account') // 机构: organization;添加用户：account
      const store = useStore()
      const inputType = ref('add')
      const tableData = ref([])
      const addModel = ref(false)
      const rowData = ref({})
      const multipleTableRef = ref({})
      const multipleSelection = ref({})
      const treeConfig = ref({
        treeData: [],
        isSelect: true,
        showHandle: true
      })

      //  tree
      const pagination = computed(() => store.state.pagination)
      const getTreeList = async () => {
        const { data = {} } = await getListPage(pagination.value)
        treeConfig.value.treeData = data.list
      }
      getTreeList()
      // 机构删除
      const confirm = (modeType) => {
        console.log('modeType', modeType)
        if (modeType === 'remove') {
          remove(rowData.value.id, addType.value)
        }
        if (modeType === 'exprot') {
          exportAccount().then((res) => {
            downloadHandle(res, '人员列表')
          })
        }
        callBack()
      }

      // table
      watch(pagination.value, () => getAccuntList())
      const getAccuntList = async (organization) => {
        const { data = {} } = await getQuotaListPage({ ...pagination.value, organization })
        tableData.value = data.list
        total.value = data.total
      }
      getAccuntList()

      const callBack = () => {
        addType.value === 'account' ? getAccuntList() : getTreeList()
        cancel()
      }

      const handleSelectionChange = (val) => {
        multipleSelection.value = val
      }
      // 导入导出
      const handleImport = () => {
        modeType.value = 'import'
        kvDialogConfig.value.dialogVisible = true
        kvDialogConfig.value.isImport = true
        kvDialogConfig.value.importAPI = '/api/account/import'
      }
      const handleExprot = () => {
         kvDialogConfig.value.dialogVisible = true
         kvDialogConfig.value.isImport = false
         modeType.value = 'exprot'
         kvDialogConfig.value.message = '你确定要导出吗？'
      }
     const cancel = () => {
        console.log('关闭回调')
        addModel.value = false
        rowData.value = null
        treeConfig.value.isSelect = true
        kvDialogConfig.value.dialogVisible = false
      }
      const nodeClick = (row) => {
        getAccuntList(row.id)
        rowData.value = row
        treeConfig.value.isSelect = false
      }
      const handleAdd = (type) => {
        treeConfig.value.isSelect = true
        addModel.value = true
        inputType.value = 'add'
        addType.value = type
      }
      // 编辑
      const handleEdit = (row, type) => {
        rowData.value = type === 'account' ? row : rowData.value
        addModel.value = true
        inputType.value = 'edit'
        addType.value = type
        treeConfig.value.isSelect = false
      }

      const handleRemove = (row, type) => {
        rowData.value = row
        addType.value = type
        modeType.value = 'remove'
        kvDialogConfig.value.dialogVisible = true
        kvDialogConfig.value.isImport = false
      }

      return {
        handleSelectionChange,
        multipleTableRef,
        modelConfig,
        addModel,
        rowData,
        inputType,
        cancel,
        kvDialogConfig,
        confirm,
        callBack,
        propList,
        nodeClick,
        handleAdd,
        handleEdit,
        handleRemove,

        addType,
        tableData,
        total,
        handleExprot,
        modeType,
        handleImport,
        treeConfig
      }
    }
  }
</script>
