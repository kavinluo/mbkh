<!--
 * @Author: kevin
 * @Date: 2022-05-06 15:43:55
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-09 16:31:38
 * @Description: 发布公告
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit">搜索</el-button>
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
      {{ props.row.title }} <el-tag size="small" style="cursor: pointer;" @click="handleTop(props.row)" type="success">置顶</el-tag>
    </template>
    <template #top="props">
      {{ props.row.top === 1 ? '是' : '否' }}
    </template>
    <template #times="props">
      {{ props.row.times ? formatTimestamp(props.row.times, 'YYYY-MM-DD HH:mm') : '-' }}
    </template>
    <template #status="props">
      {{ status[props.row.status] }}
    </template>
    <template #handle="props">
      <el-link type="primary" size="small" @click="handleEdit(props.row, 'edit')" underline icon="edit">编辑</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="danger" size="small" @click="handleRemove(props.row)" underline icon="delete">删除</el-link>&nbsp;&nbsp;&nbsp;
      <el-link type="primary" v-if="[0].includes(props.row.status)" icon="position" @click="handlePublish(props.row, annouce)">发布</el-link>
      <el-link type="primary" v-if="[1,2].includes(props.row.status)" icon="refresh" @click="handlePublish(props.row, revokeAnnouce )">撤销</el-link>
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
//   const updataListStatus = defineProps({
//   rowData: {
//     type: Object,
//     default: () => ({})
//   }
// })

 const {
    searchConfig,
    formData,
    status,
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
