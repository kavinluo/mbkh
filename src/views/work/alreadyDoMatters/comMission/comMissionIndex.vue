<!--
 * @Author: kevin
 * @Date: 2022-04-29 11:32:12
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-19 17:45:10
 * @Description: 代办事宜
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" style="margin-left:10px" @click.prevent="onSubmit('wati')">搜索</el-button>
    </template>
  </kv-form>
  <kv-table
    :propList="targetList"
    :getDataFn="getwatiList"
    @handleSelectionChange="handleSelectionChange"
    :showFooter="false"
  >
    <template #times="scope">
      {{ formatTimestamp(scope.row.times, 'YYYY-MM-DD') }}
    </template>
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleAddTemplate(scope.row)" underline icon="edit">办理</el-link>&nbsp;&nbsp;&nbsp;
    </template>
  </kv-table>
  <kvDialog v-bind="editDialog" v-model="editDialog.dialogVisible">
    <edit-target :rowData="subRowData" where="work" @callBack="cancel" />
  </kvDialog>
  <kvDialog v-bind="acmDialog" v-model="acmDialog.dialogVisible">
    <handleacm-manage :rowData="subRowDatas" />
  </kvDialog>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { targetList } from './config/dataConfig'
import { getwatiList } from '@/api/todoList'
import { formatTimestamp } from '@/utils/formatDate.js'
import { handeles } from './config/hooks'
import editTarget from '@/views/evaluationProcess/alltheTarget/theoverallgoal/editTarget.vue'
import handleacmManage from '../../bounced/handleAcm.vue'
const $router = useRouter()
const handleSelectionChange = () => {}
const handleAddTemplate = (row) => {
      // 跳转到评价过程
      $router.push({
        path: '/manage/alltheTarget',
        query: {
          id: row.detailId,
          where: 'work'
        }
      })
  }

const {
  cancel,
  searchConfig,
  subRowData,
  editDialog,
  acmDialog,
  subRowDatas,
  onSubmit,
  formData
} = handeles()
</script>

<style scoped>

</style>
