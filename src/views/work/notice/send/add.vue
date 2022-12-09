<!--
 * @Author: kevin
 * @Date: 2022-05-06 15:49:44
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-08 15:52:28
 * @Description: 添加公告
-->
<template>
  <div style="position: ;reactive; z-index: 10;">
    <kv-form v-bind="formConfig" v-model="formData" ref="ruleFormRef" v-if="editType !=='view'">
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
      <template #content>
        <tinymce-editor v-model="formData.content" :setting="editorConfig.setting" />
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
          <button class="el-button el-button--primary" v-no-anti-shake @click="onSubmit(ruleFormRef)">提交</button>
          <el-button type="warning" @click="handleResetClick">关闭</el-button>
        </div>
      </template>
    </kv-Form>
    <div v-else>
      <el-form
        label-width="100px"
        style="max-width: 460px"
      >
        <el-form-item label="公告标题：">
          {{ formData.title }}
        </el-form-item>
        <el-form-item label="分类：">
          {{ formData.typeName }}
        </el-form-item>
        <el-form-item label="内容：">
          <div class="content-warp" v-html=" formData.content"></div>
        </el-form-item>
        <el-form-item label="公告范围：">
          <div v-html=" formData.checkAreaName"></div>
        </el-form-item>
        <el-form-item label="是否置顶：">
          {{ formData.top === 1 ? '是' : '否' }}
        </el-form-item>
      </el-form>
    </div>

  </div>
  <kvDialog v-bind="typeDialog" v-model="typeDialog.dialogVisible">
    <type-manage></type-manage>
  </kvDialog>
</template>

<script setup>
  import { reactive, computed } from 'vue'
  import { useStore } from '@/store'
  import { addHandels, typeHandle } from '../config/hook'
  import typeManage from './typeManage'
  import tinymceEditor from '@/components/tinymceEditor/index'
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
  const store = useStore()
  const HOST = computed(() => store.state.HOST)
  console.log('HOST', HOST)
  // 富文本编辑器配置
  const editorConfig = reactive({
    setting: {
      width: '100%',
      height: 200, // editor 高度
      custom_images_upload: true,
      images_upload_url: '/api/file/uploadNotice',
      custom_images_upload_callback: res => {
         return HOST.value + res.data
      },
      custom_images_upload_param: { }
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
