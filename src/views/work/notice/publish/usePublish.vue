<!--
 * @Author: kevin
 * @Date: 2022-05-06 15:43:55
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-17 17:24:44
 * @Description: 发布公告
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button style="margin-left: 10px" type="primary" @click.prevent="onSubmit('publish')">搜索</el-button>
    </template>
    <!-- <template #expBtn>
      <el-button type="primary" @click="addHandle"><el-icon style="vertical-align: middle"> <plus /> </el-icon>发布公告</el-button>
    </template> -->
  </kv-form>
  <kv-table
    :propList="publishList"
    :getDataFn="releaseListPage"
    @handleSelectionChange="handleSelectionChange">
    <template #title="props">
      <el-link @click="handleEdit(props.row, 'view')">{{ props.row.title }}</el-link>&nbsp;
      <!-- <el-link type="warning" @click="handleTop(props.row)" v-if="props.row.top !== 1">设为置顶</el-link> -->
      <el-tag v-if="props.row.top !== 1" size="small" style="cursor: pointer;" @click="handleTop(props.row)" type="warning">设为置顶</el-tag>
    </template>
    <template #top="props">
      {{ props.row.top === 1 ? '是' : '否' }}
    </template>
    <template #times="props">
      {{ props.row.times ? formatTimestamp(props.row.times, 'YYYY-MM-DD HH:mm') : '-' }}
    </template>
    <template #isPublish="props">
      {{ props.row.isPublish === 0 ? '未发布': '已发布' }}
    </template>
    <template #handle="props">
      <el-link type="primary" size="small" :disabled="props.row.isPublish !== 0" @click="handleEdit(props.row, 'edit')" underline icon="edit">编辑</el-link>&nbsp;&nbsp;
      <el-link type="danger" size="small" :disabled="props.row.isPublish !== 0" @click="handleRemove(props.row)" underline icon="delete">删除</el-link>&nbsp;&nbsp;
      <el-link type="primary" v-if="[0].includes(props.row.isPublish)" icon="position" @click="handlePublish(props.row, annouce)">发布</el-link>
      <el-link type="primary" v-if="[1,2].includes(props.row.isPublish)" icon="refresh" @click="handlePublish(props.row, revokeAnnouce )">撤销</el-link>
    </template>
  </kv-table>

  <!-- <kvDialog v-bind="reportDialog" v-model="reportDialog.dialogVisible" @callBack="cancel" ></kvDialog> -->
  <kvDialog v-bind="removModelConfig" v-model="removModelConfig.dialogVisible" @callBack="confirm" />
</template>
<script setup>
  import { annouce, revokeAnnouce, releaseListPage } from '@/api/notice'
  import { formatTimestamp } from '@/utils/formatDate'
  import { publishList } from '../config/dataConfig'

  import { handels } from '../config/hook'
  const handleSelectionChange = () => {

  }
  const { updataListStatus } = defineProps({
    updataListStatus: {
      type: Number,
      default: new Date().getTime()
    }
  })

 const {
    searchConfig,
    formData,
    removModelConfig,
    confirm,
    handleRemove,
    handlePublish,
    handleEdit,
    handleTop,
    onSubmit
 } = handels(updataListStatus)

</script>

<style>
</style>
