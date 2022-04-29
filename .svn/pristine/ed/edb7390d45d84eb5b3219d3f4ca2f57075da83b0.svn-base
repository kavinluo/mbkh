<!--
 * @Author: kevin
 * @Date: 2022-04-12 09:25:35
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-19 17:52:22
 * @Description: 评价结果
-->

<template>
  <div>
    <assessMentList v-if="activeName === 'assessList'" @callback="showUseList" :rowData="rowData" />
    <assessMentIndex v-if="activeName === 'assessIndex'" @callback="showUseList" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import assessMentList from './assessMentList.vue'
import assessMentIndex from './assessMentIndex.vue'
const activeName = ref('assessIndex')
const rowData = reactive({})
const showUseList = (type, row) => {
  activeName.value = type
  rowData.value = row
  console.log(rowData.value)
}
</script>

<style></style>
