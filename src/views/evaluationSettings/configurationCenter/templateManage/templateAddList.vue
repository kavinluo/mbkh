<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:55:22
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 10:13:05
 * @Description: 添加模板
-->
<template>
  <el-row>
    <el-col style="margin-bottom: 20px">
      <el-button type="warning" @click.prevent="handleAddTemplate">返回</el-button>
      <el-button type="primary" @click.prevent="onSubmit">添加属性</el-button>
      <el-button type="primary" @click.prevent="createAttr">创建属性</el-button>
    </el-col>
  </el-row>
  <div class="blank10"></div>
  <kv-table
    :tableData="tableData"
    :propList="attrList"
    :showIndexColumn="false"
    :listTotal="total"
    @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleEdit(scope.row, 'account')" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(scope.row, 'account')" underline icon="delete">删除</el-link>
    </template>
  </kv-table>

  <!-- 模态框 -->
  <kvDialog v-bind="modelConfig" v-model="addModel" @callBack="confirm">
    <createAttrs v-if="addModel" />
  </kvDialog>
</template>

<script>
  import { ref } from 'vue'

  import kvDialog from '@/components/kvDialog'
  import createAttrs from './createAttr'
  import { attrList, searchConfig } from './config/dataConfig'
  export default {
    components: {
      kvDialog,
      createAttrs
    },
    emits: ['change'],
    setup (props, { emit }) {
      const addModel = ref(false)
      const modelConfig = ref({
        title: '创建属性字段',
        width: '600px',
        draggable: true,
        // showLine: false,
        isShowFooter: false
      })
      const tableData = ref([])
      const total = ref(0)
      const formItems = searchConfig?.formItems ?? []
      const formOriginData = {}
      for (const item of formItems) {
        formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)
      const cancel = () => { }
      const confirm = () => {}
      const onSubmit = () => {}
      const handleSelectionChange = () => {}
      const handleClick = () => {}

      // 创建属性
      const createAttr = () => {
        addModel.value = true
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
          searchConfig,
          formData,
          onSubmit,
          handleSelectionChange,
          handleClick,
          handleAddTemplate,
          createAttr

        }
  }
}
</script>

<style lang="scss" scoped>

</style>
