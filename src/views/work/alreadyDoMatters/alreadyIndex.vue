<!--
 * @Author: kevin
 * @Date: 2022-04-29 11:28:46
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-19 14:32:42
 * @Description: 代办/已办事宜
-->

<template>
  <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
    <el-tab-pane label="待办事宜" name="comMissionMarage">
      <com-mission-marage v-if="activeName === 'comMissionMarage'" />
    </el-tab-pane>
    <el-tab-pane label="已办事宜" name="haveTodoManage">
      <have-todo-manage v-if="activeName === 'haveTodoManage'" />
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from '@/store'
import comMissionMarage from './comMission/comMissionIndex.vue'
import haveTodoManage from './haveTodo/haveTodoIndex.vue'
const store = useStore()
const activeName = ref('comMissionMarage')
const handleClick = () => {
  // 却换时重置分页信息to do...
  store.commit('changerpageSize', 10)
  store.commit('changerCurrentPage', 1)
  store.commit('changerPageSizeStatus', false)
}
</script>

<style></style>
