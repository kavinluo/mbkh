<template>
  <el-input v-model="input4" class="w-50 m-2" placeholder="搜索目标名称、序列" style="width:300px">
    <template #prefix>
      <el-icon class=" el-input__icon">
        <search />
      </el-icon>
    </template>
  </el-input>
  <kv-table :propList="targetList" :getDataFn="getListPage" @handleSelectionChange="handleSelectionChange">
    <template #handler="scope">
      <el-link type="primary" size="small" @click="handleEdit(scope.row)">展开</el-link>
    </template>
  </kv-table>

</template>

<script setup>
import { targetList } from './config/dataConfig'
const handleEdit = () => {
  console.log(213)
}
</script>

<style>
</style>
