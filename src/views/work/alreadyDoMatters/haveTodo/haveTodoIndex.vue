<!--
 * @Author: kevin
 * @Date: 2022-05-13 11:32:12
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-15 17:18:04
 * @Description: 已办事宜
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData" >
    <template #searchBtn>
      <el-button type="primary" style="margin-left:10px" @click.prevent="onSubmit('have')">搜索</el-button>
    </template>
  </kv-form>
  <kv-table
    :propList="targetList"
    :getDataFn="getalready"
    @handleSelectionChange="handleSelectionChange"
    :showFooter="false"
  >
    <template #times="scope">
      {{ formatTimestamp(scope.row.times, 'YYYY-MM-DD') }}
    </template>
    <template #content="scope">
      <div v-html="scope.row.content"></div>
    </template>
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleAddTemplate(scope.row)" underline icon="view">查看</el-link>&nbsp;&nbsp;&nbsp;
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
import { getalready } from '@/api/todoList'
import { formatTimestamp } from '@/utils/formatDate.js'
import { handels } from './config/hooks'
import { handeles } from '../comMission/config/hooks'
import editTarget from '@/views/evaluationProcess/alltheTarget/theoverallgoal/editTarget.vue'
import handleacmManage from '../../bounced/handleAcm.vue'
const $router = useRouter()
const handleSelectionChange = () => {}
const {
  cancel,
  // handleAddTemplate,
  searchConfig,
  subRowData,
  editDialog,
  acmDialog,
  subRowDatas
} = handels()
const { onSubmit, formData } = handeles()
const handleAddTemplate = (row) => {
      // 跳转到评价过程
      $router.push({
        path: '/manage/assessMent',
        query: {
          id: row.detailId,
          where: 'work'
        }
      })
    }
</script>

<style scoped>

</style>
