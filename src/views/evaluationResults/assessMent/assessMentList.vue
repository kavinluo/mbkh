<!--
 * @Author: kevin
 * @Date: 2022-04-22 09:33:27
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-22 11:17:25
 * @Description: 二级目标
-->
<template>
  <el-button type="warning" @click.prevent="goToFirst">返回</el-button>
  <!-- <el-button type="primary" @click.prevent="onDerive">导出</el-button> -->
  <el-table :data="thatDataList" style="width: 100%" id="title">
    <el-table-column label="序号" prop="index" width="80" align="center">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180" align="center">
      <template #default="scope">
        <el-link v-if="scope.row.type === 2" type="primary" size="small" icon="view" @click="handleEdit(scope.row, 'view')">查看</el-link>&nbsp;&nbsp;
        <el-link v-else type="primary" size="small" icon="view" @click="handleEdit(scope.row, 'view','DF')">查看</el-link>
      </template>
    </el-table-column>
    <el-table-column label="目标" prop="title" align="center" />
    <el-table-column label="最近更新" prop="updateTime" align="center">
      <template #default="scope">
        {{ formatTimestamp(scope.row.updateTime, 'YYYY-MM-DD') }}
      </template>
    </el-table-column>
    <el-table-column label="自评分" prop="selfScore" align="center" />
    <el-table-column label="评分" prop="repeatedScore" align="center" />
    <el-table-column label="评价结果" prop="scoreResult" align="center">
      <template #default="scope">
        <template v-if="scope.row.type === 2">
          {{ scope.row.scoreResult }}
        </template>
        <template v-else>
          -
        </template>
      </template>
    </el-table-column>
  </el-table>
  <kvDialog v-bind="targetDialog" v-model="targetDialog.dialogVisible">
    <set-df v-if="dfDataType" :rowData="subRowData" @callBack="cancel" />
    <edit-target v-else :rowData="subRowData" @callBack="cancel" />
  </kvDialog>
  <kvDialog v-bind="reportDialog" v-model="reportDialog.dialogVisible" @callBack="cancel"></kvDialog>
</template>
<script setup>

// import * as XLSX from 'xlsx'
// import FileSaver from 'file-saver'
import setDf from '@/views/evaluationProcess/alltheTarget/theoverallgoal/setScore.vue'
// import editTarget from './editTarget.vue'
 import editTarget from '@/views/evaluationProcess/alltheTarget/theoverallgoal/editTarget.vue'
import { levelSecond } from './config/levelSecond'
import { formatTimestamp } from '@/utils/formatDate'
const emit = defineEmits(['callback', 'cancel'])
const props = defineProps({
  rowData: {
    type: Object,
    default: () => ({})
  }
})
const thatDataList = props.rowData.value

const goToFirst = () => {
  emit('callback', 'assessIndex')
}
// const onDerive = () => {
//   const filename = '导出.xlsx'
//   const wb = XLSX.utils.table_to_book(document.getElementById('title'))
//   const wbout = XLSX.write(wb, {
//     bookType: 'xlsx',
//     bookSST: true,
//     type: 'array'
//   })
//   try {
//     FileSaver.saveAs(new Blob([wbout], {
//       type: 'application/octet-stream'
//     }), filename)
//   } catch (e) {
//     console.log(e)
//   }
//   return wbout
// }
 const {
    subRowData,
    targetDialog,
    reportDialog,
    cancel,
    handleEdit,
    dfDataType
    // handleReport,
 } = levelSecond()

</script>

<style>
</style>
