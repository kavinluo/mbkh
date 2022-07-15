<!--
 * @Author: kevin
 * @Date: 2022-05-06 15:40:40
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-05 09:44:20
 * @Description: 我发送的
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit('send')">搜索</el-button>
    </template>
  </kv-form>
  <kv-table
    :propList="sendList"
    :getDataFn="acceptListPage"
    @handleSelectionChange="handleSelectionChange">
    <template #title="props">
      <el-link @click="handleEdit(props.row, 'view')" type="primary">{{ props.row.title }}</el-link>
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
  </kv-table>
</template>
<script setup>
import { formatTimestamp } from '@/utils/formatDate'
import { sendList } from '../config/dataConfig'
import { acceptListPage } from '@/api/notice'
import { handels } from '../config/hook'

const handleSelectionChange = () => {

}

 const {
    // subRowData,
    searchConfig,
    // reportDialog,
    formData,
    status,
    onSubmit,
    handleEdit
 } = handels()

</script>

<style>
</style>
