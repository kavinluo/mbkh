<!--
 * @Author: kevin
 * @Date: 2022-02-24 09:58:32
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 14:12:02
 * @Description: 机构
-->
<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <leftTree
        @nodeClick="nodeClick"
        :treeData="treeData"
        @add="handleAdd('organization')"
        @edit="handleEdit(null, 'organization')"
        @remove="handleRemove(null, 'organization')"
        :isSelect="isSelect"
        :showHandle="true"
      />
    </el-col>
    <el-col :span="19">
      <div class="mb10">
        <el-button @click="handleAdd('account')" type="primary">添加</el-button>
        <el-button @click="handleImport" type="primary">导入</el-button>
        <el-button @click="handleExprot" type="primary">导出</el-button>
      </div>
      <kv-table
        :getDataFn="getAccountListPage"
        :propList="propList"
        :showIndexColumn="true"
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
  <kvDialog v-bind="kvDialogConfig" v-model="kvDialogConfig.dialogVisible" :modeType="modeType" @callBack="confirm" @cancel="cancel"/>
</template>

<script>
  import { ref, computed } from 'vue'
  import add from './add.vue'
  import { downloadHandle } from '@/utils/util'
  import { getListTreePage, remove } from '@/api/organization.js'
  import { getAccountListPage, exportAccount } from '@/api/account'
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
        isShowFooter: true,
        message: '您确定要删除吗？',
        dialogWidth: '400px',
        templateLInk: 'http://192.168.1.202:9090/res/template/%E5%9F%BA%E5%B1%82/%E5%9F%BA%E5%B1%82-%E5%87%86%E8%80%83%E8%AF%81.xlsx'
      })
      const modelConfig = ref({
        title: '编辑机构',
        width: '600px',
        draggable: true
      })
      const modeType = ref('remove')
      const total = ref(0)
      const addType = ref('account') // 机构: organization;添加用户：account
      const store = useStore()
      const inputType = ref('add')
      const treeData = ref([])
      const addModel = ref(false)
      const isSelect = ref(true)
      const rowData = ref({})
      const multipleTableRef = ref({})
      const multipleSelection = ref({})

      //  tree
      const pagination = computed(() => store.state.pagination)
      const getTreeList = async () => {
        const { data = {} } = await getListTreePage(pagination.value)
        treeData.value = data.list
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
      const getAccunt = (organization) => {
        store.dispatch('getListPage', { fn: getAccountListPage, params: { id: organization } })
      }
      getAccunt()

      const callBack = () => {
        addType.value === 'account' ? getAccunt() : getTreeList()
        cancel()
      }

      const handleSelectionChange = (val) => {
        multipleSelection.value = val
      }
      // 导入导出
      const handleImport = () => {
        console.log('666', 666)
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
        isSelect.value = true
        kvDialogConfig.value.dialogVisible = false
      }
      const nodeClick = (row) => {
        getAccunt(row.id)
        rowData.value = row
        isSelect.value = false
      }
      const handleAdd = (type) => {
        isSelect.value = true
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
        isSelect.value = false
      }

      const handleRemove = (row, type) => {
        rowData.value = type === 'account' ? row : rowData.value
        addType.value = type
        modeType.value = 'remove'
        kvDialogConfig.value.dialogVisible = true
        kvDialogConfig.value.isImport = false
        kvDialogConfig.value.message = '你确定要删除吗？'
      }

      return {
        handleSelectionChange,
        multipleTableRef,
        treeData,
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
        isSelect,
        getAccountListPage,

        addType,
        total,
        handleExprot,
        modeType,
        handleImport
      }
    }
  }
</script>
