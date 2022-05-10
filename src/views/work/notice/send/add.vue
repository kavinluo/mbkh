<!--
 * @Author: kevin
 * @Date: 2022-05-06 15:49:44
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-09 16:40:01
 * @Description: 添加公告
-->
<template>
  <div>
    <kv-form v-bind="formConfig" v-model="formData" ref="ruleFormRef">
      <template #type>
        <el-select
          v-model="formData.type"
          placeholder="请选择分类">
          <el-option v-for="option in tableData" :value="option.id" :key="option.id" :label="option.typeName"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="showTypeModel" style="margin-left: 10px;">分类管理</el-button>
      </template>
      <template #top>
        <el-switch
          size="large"
          v-model="formData.top"
          inline-prompt
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否"/>
      </template>
      <template #checkArea>
        <el-select
          style="width: 100%;"
          v-model="formData.checkArea"
          multiple
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="选择范围"
        >
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </template>

      <template #footer>
        <div class="handle-btns" style="text-align: center">
          <el-button type="primary" @click.prevent="onSubmit(ruleFormRef)">提交</el-button>
          <el-button type="warning" @click="handleResetClick">关闭</el-button>
        </div>
      </template>
    </kv-Form>
  </div>
  <kvDialog v-bind="typeDialog" v-model="typeDialog.dialogVisible">
    <type-manage></type-manage>
  </kvDialog>
</template>

<script setup>
  import { addHandels, typeHandle } from '../config/hook'
  import typeManage from './typeManage'
  const emit = defineEmits(['cancel', 'callBack'])
  const { editType, rowData } = defineProps({
    editType: {
      type: String,
      default: 'add'
    },
    rowData: {
      type: Object,
      default: () => ({})
    }
  })
  const handleResetClick = () => {
    emit('cancel')
    formData.value = formData
  }

  const {
    onSubmit,
    tableData,
    ruleFormRef,
    menuList,
    formData,
    formConfig
  } = addHandels(editType, rowData, emit)

  const {
    typeDialog,
    showTypeModel
  } = typeHandle()
</script>

<style lang="scss" scoped>

</style>
