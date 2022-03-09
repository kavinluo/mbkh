<!--
 * @Author: kevin
 * @Date: 2022-03-07 16:21:25
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-09 17:48:18
 * @Description: Do not edit
-->
<template>
  <kv-form v-bind="formConfig" v-model="formData">
    <template #searchBtn>
      <el-button type="primary" @click.prevent="onSubmit">搜索</el-button>
    </template>
  </kv-Form>
  <kv-table
    :tableData="tableData"
    :propList="propList"
    v-model:pageInfo="pagination"
    :listTotal="listTotal"
    :showIndexColumn="false">
    <template #isOpen="scope">
      {{ scope.row.isOpen ? '否' : '是' }}
    </template>
    <template #handler="scope">
      <el-switch
        @click="changeIsOpen(scope.row)"
        v-model="scope.row.isOpen"
        class="ml-2"
        :active-value="0"
        :inactive-value="1"
        :width="60"
        inline-prompt
        size="large"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="开启"
        inactive-text="关闭"
      />
    </template>
  </kv-table>
</template>

<script>
import { getListPageApplication, changeOpen } from '@/api/applicationManagemwnt'
import { propList, formConfig } from './tableConfig'
import { ref, watch, computed } from 'vue'
import { useStore } from '@/store'
export default {
 setup () {
    const tableData = ref([])
    const listTotal = ref(0)
    const formData = ref({ title: '' })
    const store = useStore()

    const onSubmit = () => {
      getList(formData.value)
    }

   // 双向绑定pageInfo
   const pagination = computed(() => store.state.pagination)
   watch(pagination.value, () => getList())

   const getList = async (param) => {
     const { data } = await getListPageApplication({ ...pagination.value, ...param })
     tableData.value = data?.list
     listTotal.value = data.total
   }
   getList()

   const changeIsOpen = (row) => {
     console.log('row', row)
     changeOpen({ isOpen: row.isOpen, ids: row.id })
   }

   return {
     tableData,
     propList,
     pagination,
     listTotal,
     changeIsOpen,
     onSubmit,
     formConfig,
     formData
   }
 }
}

</script>

<style lang="less" scoped>

</style>
