<!--
 * @Author: kevin
 * @Date: 2022-03-14 09:33:45
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-25 17:02:36
 * @Description: 指标库
-->
<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <leftTree
        v-bind="treeConfig"
        @nodeClick="nodeClick"
        @add="handleEdit"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </el-col>
    <el-col :span="19">
      <div class="mb10">
        <el-button @click="handleAddTarget('add')" type="primary">新建</el-button>
      </div>
      <kv-table
        :getDataFn="targetListPage"
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
  <kvDialog v-bind="modelConfig" v-model="modelConfig.dialogVisible" @cancel="cancel">
    <add v-if="modelConfig.dialogVisible" :inuptType="inuptType" :menuList="treeConfig.treeData" :targetData="targetData" @callBack="confirm" />
  </kvDialog>

  <kvDialog v-bind="targetDialogConfig" v-model="targetDialogConfig.dialogVisible">
    <add-target v-if="targetDialogConfig.dialogVisible" :inuptType="inuptType" :targetData="targetData" :targetRowData="targetRowData" @callBack="confirm" />
  </kvDialog>

  <kvDialog v-bind="kvDialogConfig" v-model="kvDialogConfig.dialogVisible" v-if="kvDialogConfig.dialogVisible" @callBack="confirm"/>
</template>

<script>
  import { ref, computed, watch, getCurrentInstance } from 'vue'
  import add from './add.vue'
  import addTarget from './addTarget.vue'
  import { getQuotaListPage, targetListPage } from '@/api/quota'
  import { useStore, updateList } from '@/store'
  import { propList, quotaliDialogConfig, targetModelConfig, treeConfigData, modelConfigData } from './config/config'
  import leftTree from '@/components/kvLeftTree'

  export default {
    components: {
      add,
      leftTree,
      addTarget
    },
    emits: ['cancel'],
    setup () {
      const { proxy } = getCurrentInstance()
      const kvDialogConfig = ref(quotaliDialogConfig)
      const targetDialogConfig = ref(targetModelConfig)
      const treeConfig = ref(treeConfigData)
      const modelConfig = ref(modelConfigData)
      const inuptType = ref('add')
      const store = useStore()
      const targetData = ref(null)
      const targetRowData = ref(null)
      const multipleSelection = ref({})

      const pagination = computed(() => store.state.pagination)
      const getTreeList = async () => {
        const { data = {} } = await getQuotaListPage(pagination.value)
        treeConfig.value.treeData = data.list
      }
      getTreeList()
      const confirm = (modeType) => {
        kvDialogConfig.value.dialogVisible = false
        modelConfig.value.dialogVisible = false
        getTreeList()
        callBack()
      }

      watch(pagination.value, () => getAccuntList())
      const getAccuntList = async (organization) => {
        // const { data = {} } = await getQuotaListPage({ ...pagination.value, organization })
      }

      const handleAddTarget = () => {
        if (!targetData.value) {
          proxy.$message.warning('请选择指标库！')
          return
        }
        targetDialogConfig.value.dialogVisible = true
      }

      const callBack = () => {
        cancel()
      }

      const handleSelectionChange = (val) => {
        multipleSelection.value = val
      }

     const cancel = () => {
        targetData.value = null
        treeConfig.value.isSelect = true
        kvDialogConfig.value.dialogVisible = false
      }
      const nodeClick = (row) => {
        updateList(targetListPage)
        targetData.value = row
        kvDialogConfig.value.params = row.id
        treeConfig.value.isSelect = false
      }
      // 编辑
      const handleEdit = (row, type) => {
        inuptType.value = type
        modelConfig.value.dialogVisible = true
      }

      const handleRemove = (row, type) => {
        targetData.value = row
        kvDialogConfig.value.dialogVisible = true
        kvDialogConfig.value.modeType = type
      }

      return {
        handleAddTarget,
        targetRowData,
        handleSelectionChange,
        modelConfig,
        targetData,
        cancel,
        kvDialogConfig,
        confirm,
        callBack,
        propList,
        nodeClick,
        handleEdit,
        handleRemove,
        getQuotaListPage,
        targetListPage,
        treeConfig,
        inuptType,
        targetDialogConfig
      }
    }
  }
</script>
