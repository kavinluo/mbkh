<!--
 * @Author: kevin
 * @Date: 2022-03-02 10:20:05
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 13:55:34
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

<script>
import { getlistPage } from '@/api/systemLogs'
import { formatTimestamp } from '@/utils/formatDate.js'
import propList from './tableConfig'
export default {
 setup () {
   return {
     propList,
     getlistPage,
     formatTimestamp
   }
 }
}

</script>

<style lang="less" scoped>

</style>
