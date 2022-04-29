<!--
 * @Author: kevin
 * @Date: 2022-4-2 11:00:00
 * @LastEditors: kevin
 * @LastEditTime: 2022-4-2 11:00:00
 * @Description: 个人目标
-->

<template>
  <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
    <el-tab-pane label="发起审批" name="examination">
      <examinationManage v-if="activeName === 'examination'" />
    </el-tab-pane>
    <el-tab-pane label="我申请的" name="applyfor">
      <applyforManage v-if="activeName === 'applyfor'" />
    </el-tab-pane>
    <el-tab-pane label="我审批的" name="approval">
      <approvalManage v-if="activeName === 'approval'" />
    </el-tab-pane>
    <el-tab-pane label="通知我的" name="letmeknowthe">
      <letmeknowtheManage v-if="activeName === 'letmeknowthe'" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import examinationManage from './examination/examination.vue'
import applyforManage from './applyfor/applyfor.vue'
import approvalManage from './approval/approval.vue'
import letmeknowtheManage from './letmeknowthe/letmeknowthe.vue'
import { ref } from 'vue'
import { useStore } from '@/store'
const store = useStore()
const activeName = ref('examination')
const handleClick = () => {
  // 却换时重置分页信息to do...
  store.commit('changerpageSize', 10)
  store.commit('changerCurrentPage', 1)
  store.commit('changerPageSizeStatus', false)
}
</script>

<style>
</style>
