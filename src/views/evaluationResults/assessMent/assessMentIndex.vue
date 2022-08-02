<!--
 * @Author: kevin
 * @Date: 2022-4-22 11:00:00
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-22 11:18:00
 * @Description: 评价结果
-->
<template>
  <kv-form v-bind="searchConfig" v-model="formData">
    <template #searchBtn>
      <el-button style="margin-left: 10px" type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
  </kv-form>
  <kv-table
    v-if="role.userType === 1"
    :propList="targetList"
    :expandRowKeys="expandRowKeys"
    :getDataFn="getListPage"
    @handleSelectionChange="handleSelectionChange">
    <template #updateTime="scope">
      {{ formatTimestamp(scope.row.updateTime, 'YYYY-MM-DD') }}
    </template>
    <template #expand="scope">
      <el-table :data="scope.row.evaluateCheckTargetDtoList" style="width: 100%">
        <el-table-column label="" prop="index" width="80" align="center">
          <template #default="props">
            {{ props.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="" width="180" align="center">
          <template #default="props">
            <el-link type="primary" size="small" icon="view" @click="score(props.row.evaluateCheckTargetDtoList)">查看</el-link>&nbsp;&nbsp;
          </template>
        </el-table-column>
        <el-table-column label="考区" v-if="role.userType === 1" prop="checkAreaName" align="center" />
        <el-table-column label="目标" v-if="role.userType === 2" prop="title" align="center" />
        <el-table-column label="" prop="updateTime" align="center">
          {{ formatTimestamp(scope.row.updateTime, 'YYYY-MM-DD') }}
        </el-table-column>
        <el-table-column label="" prop="repeatedScore" align="center" />
        <el-table-column label="评价结果" prop="scoreResult" align="center">
        </el-table-column>
      </el-table>
    </template>
  </kv-table>
  <kv-table
    v-if="role.userType === 2"
    :propList="targetList"
    :expandRowKeys="expandRowKeys"
    :getDataFn="getListPage"
    @handleSelectionChange="handleSelectionChange">
    <template #updateTime="scope">
      {{ formatTimestamp(scope.row.updateTime, 'YYYY-MM-DD') }}
    </template>
    <template #expand="scope">
      <el-table :data="scope.row.evaluateCheckTargetDtoList" style="width: 100%">
        <el-table-column label="" prop="index" width="80" align="center">
          <template #default="props">
            {{ props.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="" width="180" align="center">
          <template #default="props">
            <el-link v-if="props.row.type === 2" type="primary" size="small" icon="view" @click="handleEdit(props.row, 'view', null, scope.row)">查看</el-link>
            <el-link v-else type="primary" size="small" icon="view" @click="handleEdit(props.row,'view', 'DF', scope.row)">查看</el-link>
          </template>
        </el-table-column>
        <el-table-column label="考区" v-if="role.userType === 1" prop="checkAreaName" align="center" />
        <el-table-column label="目标" v-if="role.userType === 2" prop="title" align="center" />
        <el-table-column label="" prop="updateTime" align="center">
          {{ formatTimestamp(scope.row.updateTime, 'YYYY-MM-DD') }}
        </el-table-column>
        <el-table-column label="" prop="" align="center" />
        <el-table-column label="" prop="scoreResult" align="center">
          <template #default="props">
            <template v-if="props.row.type === 2">
              {{ props.row.scoreResult }}
            </template>
            <template v-else>
              -
            </template>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #handler="scope" v-if="role.userType === 2">
      <el-link type="primary" size="small" icon="promotion" @click="handleReport(scope.row)">上报</el-link>
    </template>
    <!-- <template #results="props">
      <span v-if="props.row.repeatedScore <= 59">限期整改</span>
      <span v-if="props.row.repeatedScore <= 79 && props.row.repeatedScore >= 60">合格</span>
      <span v-if="props.row.repeatedScore >= 100 && props.row.repeatedScore >= 80">优秀</span>
    </template> -->
  </kv-table>
  <kvDialog v-bind="targetDialog" v-model="targetDialog.dialogVisible">
    <set-df v-if="dfDataType" :rowData="subRowData" @callBack="cancel" />
    <edit-target v-else :rowData="subRowData" @callBack="cancel" />
  </kvDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import setDf from '@/views/evaluationProcess/alltheTarget/theoverallgoal/setScore.vue'
// import editTarget from './editTarget.vue'
 import editTarget from '@/views/evaluationProcess/alltheTarget/theoverallgoal/editTarget.vue'
import { targetList } from './config/dataConfig'
import { getListPage } from '@/api/result'
import { useState } from '@/hooks/index'
import { formatTimestamp } from '@/utils/formatDate'
import { levelSecond } from './config/levelSecond'
const emit = defineEmits(['callback'])
const $route = useRoute()
const { userInfo } = useState(['userInfo'], 'user')
const role = ref(userInfo.value)
const handleSelectionChange = () => {

}
// 去二级评分
const score = (row = []) => {
  emit('callback', 'assessList', row)
}
 const {
   targetDialog,
    subRowData,
    formData,
    searchConfig,
    dfDataType,
    onSubmit,
    cancel,
    handleEdit,
    expandRowKeys
 } = levelSecond()

 if ($route.query?.where) {
    expandRowKeys.value = [$route.query.id]
    // handleEdit({ id: $route.query.id }, 'edit', null)
  }
</script>

<style>
</style>
