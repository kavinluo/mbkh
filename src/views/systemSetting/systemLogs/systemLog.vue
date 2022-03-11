<!--
 * @Author: kevin
 * @Date: 2022-03-02 10:20:05
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-10 09:15:00
 * @Description: 系统日志
-->
<template>
  <kv-table
    :tableData="tableData"
    :propList="propList"
    :pageInfo="pagination"
    :listTotal="listTotal"
    :showIndexColumn="true">
    <template #times="scope">
      {{ formatTimestamp(scope.row.times, 'YYYY-MM-DD HH:mm:ss') }}
    </template>
  </kv-table>
</template>

<script>
import { getlistPage } from '@/api/systemLogs'
import { ref, watch, computed } from 'vue'
import { useStore } from '@/store'
import { formatTimestamp } from '@/utils/formatDate.js'
import propList from './tableConfig'
export default {
 setup () {
   const tableData = ref({})
   const listTotal = ref(0)
   const store = useStore()

   const pagination = computed(() => store.state.pagination)
   watch(pagination.value, () => getList())
   const getList = async () => {
     const { data = {} } = await getlistPage(pagination.value)
     tableData.value = data?.list
     listTotal.value = data.total
   }
   getList()

   return {
     tableData,
     propList,
     pagination,
     listTotal,
     formatTimestamp
   }
 }
}

</script>

<style lang="less" scoped>

</style>
