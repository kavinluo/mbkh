<!--
 * @Author: kevin
 * @Date: 2022-04-12 09:25:35
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-19 17:52:22
 * @Description: 历史评价
-->

<template>
  <div>
    <historicalEvaluIndex v-if="activeName === 'historicalEvalIndex'" @callback="showUseList" />
    <historicalEvaluList v-if="activeName === 'historicalEvalList'" @callback="showUseList" :rowData="rowData" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import historicalEvaluIndex from './historicalEvaluationIndex.vue'
import historicalEvaluList from './historicalEvaluationList.vue'
const activeName = ref('historicalEvalIndex')
const rowData = reactive({})
const showUseList = (type, row) => {
  activeName.value = type
  rowData.value = row
  console.log(12123123)
}
</script>

<style></style>
