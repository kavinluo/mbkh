<!--
 * @Author: kevin
 * @Date: 2022-03-02 10:20:05
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-20 17:26:50
 * @Description: 系统日志
-->
<template>
  <kv-table
    :getDataFn="getlistPage"
    :propList="propList"
    :showIndexColumn="true">
    <template #times="scope">
      {{ formatTimestamp(scope.row.times, 'YYYY-MM-DD HH:mm:ss') }}
    </template>
  </kv-table>
</template>

<script setup>
import { getlistPage } from '@/api/systemLogs'
import { formatTimestamp } from '@/utils/formatDate.js'
import propList from './tableConfig'
</script>

<style lang="less" scoped>

</style>
