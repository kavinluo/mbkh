<template>
  <el-input v-model="input4" class="w-50 m-2" placeholder="搜索目标名称、序列" style="width:300px">
    <template #prefix>
      <el-icon class=" el-input__icon">
        <search />
      </el-icon>
    </template>
  </el-input>
  <el-link type="primary">全部</el-link>
  <el-link type="primary">待审批</el-link>
  <el-link type="primary">已审批</el-link>

  <kv-table :propList="targetList" :getDataFn="getListPage" @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-button size="small" type="warning" @click="approval(scope.row)">待审批</el-button>
      <el-button size="small" type="success" @click="examined(scope.row)">已审批</el-button>
    </template>
  </kv-table>
</template>

<script setup>
import { targetList } from './config/dataConfig'

</script>

<style>
</style>
