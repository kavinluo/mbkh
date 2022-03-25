<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:55:22
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-24 10:44:11
 * @Description: 添加模板
-->
<template>
  <el-row>
    <el-col style="margin-bottom: 20px">
      <el-button type="warning" @click.prevent="handleAddTemplate">返回</el-button>
      <el-button type="primary" @click.prevent="createAttr(null)">创建属性</el-button>
    </el-col>
  </el-row>
  <div class="blank10"></div>
  <kv-table
    :getDataFn="getAttrListPage"
    :propList="attrList"
    :params="formData"
    @handleSelectionChange="handleSelectionChange">
    <template #required="scope">
      {{ scope.row.required ? '是' : '否' }}
    </template>
    <template #attributeType="scope">
      {{ optionsObj[scope.row.attributeType] }} ({{ scope.row.attributeType }})
    </template>
    <template #handler="scope">
      <el-link type="primary" size="small" @click="createAttr(scope.row)" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row)" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="addModel">
    <createAttrs v-if="addModel" :rowData="rowData" :editData="editData" @callBack="confirm" />
  </kvDialog>
  <kv-dialog v-bind="kvDialogConfig" v-model="kvDialogConfig.dialogVisible" @callBack="confirm"/>
</template>

<script>
  import { ref } from 'vue'

  import kvDialog from '@/components/kvDialog'
  import createAttrs from './createAttr'
  import { attrList, optionsObj } from './config/dataConfig'
  import { getAttrListPage } from '@/api/template'
  import { updateList } from '@/store'

  export default {
    components: {
      kvDialog,
      createAttrs
    },
    props: {
      rowData: {
        type: Object,
        default: () => ({})
      }
    },
    emits: ['change'],
    setup (props, { emit }) {
      const addModel = ref(false)
      const editData = ref(null)
      const modelConfig = ref({
        title: '创建属性字段',
        width: '600px',
        draggable: true,
        isShowFooter: false
      })
      const kvDialogConfig = ref({
        modeType: 'remove',
        params: '',
        isShowFooter: true,
        dialogVisible: false,
        message: '您确定要删除吗？',
        baseURL: '/template/attribute'
      })
      const tableData = ref([])
      const total = ref(0)
      // const formItems = searchConfig?.formItems ?? []
      const formOriginData = {
        templateId: props.rowData.id
      }
      // for (const item of formItems) {
      //   formOriginData[item.field] = ''
      // }
      const formData = ref(formOriginData)
      const cancel = () => {
        addModel.value = false
        kvDialogConfig.value.dialogVisible = false
      }
      const confirm = () => {
        cancel()
        updateList(getAttrListPage, formData.value)
      }
      const handleRemove = (row) => {
        kvDialogConfig.value.dialogVisible = true
        kvDialogConfig.value.params = row.id
      }
      const handleSelectionChange = () => {}

      // 创建属性
      const createAttr = (row) => {
        addModel.value = true
        editData.value = row
      }

      // 添加模板
      const handleAddTemplate = () => {
        emit('change', 'list')
      }

        return {
          cancel,
          tableData,
          modelConfig,
          addModel,
          confirm,
          attrList,
          total,
          // searchConfig,
          formData,
          handleRemove,
          handleSelectionChange,
          handleAddTemplate,
          createAttr,
          editData,
          getAttrListPage,
          optionsObj,
          kvDialogConfig

        }
  }
}
</script>

<style lang="scss" scoped>

</style>
