<!--
 * @Author: kevin
 * @Date: 2022-04-12 09:25:35
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-19 17:52:22
 * @Description: 整体目标
-->
<template>
  <div>
    <level-first-over v-if="activeName === 'levelFirst'" @callback="showUseList" />
    <level-second-over v-if="activeName === 'levelSecond'" @callback="showUseList" :rowData="rowData" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import levelFirstOver from './levelFirstOverList.vue'
import levelSecondOver from './levelSecondOverList.vue'
const activeName = ref('levelFirst')
const rowData = reactive({})
const showUseList = (type, row) => {
  activeName.value = type
  rowData.value = row
}
</script>

<style lang="less" scoped>

</style>
