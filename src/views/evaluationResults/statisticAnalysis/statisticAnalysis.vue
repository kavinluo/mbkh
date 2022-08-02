<!--
 * @Author: kevin
 * @Date: 2022-04-06 10:38:08
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-14 17:55:20
 * @Description: 统计分析
--->
<template>
  <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
    <el-tab-pane label="整体目标" name="theoverallgoal">
      <theoverallgoalManage v-if="activeName === 'theoverallgoal'" />
    </el-tab-pane>
    <el-tab-pane label="考区目标" name="etsTarget">
      <etsTargetManange v-if="activeName === 'etsTarget'" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store'
import theoverallgoalManage from './theoverallgoal/theoverallgoal.vue'
import etsTargetManange from './etsTarget/etsTarget.vue'
const store = useStore()
const activeName = ref('theoverallgoal')
const handleClick = () => {
  // 却换时重置分页信息to do...
  store.commit('changerpageSize', 10)
  store.commit('changerCurrentPage', 1)
  store.commit('changerPageSizeStatus', false)
}
</script>

<style lang="less">
.use-tabs {
  .el-tabs__content {
    overflow: inherit;
  }
}
</style>
