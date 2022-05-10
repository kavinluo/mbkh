<!--
 * @Author: kevin
 * @Date: 2022-04-02 9:08:08
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-29 17:46:07
 * @Description: 全部目标
--->
<template>
  <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
    <el-tab-pane label="整体目标" name="theoverallgoal">
      <theoverallgoal-manage v-if="activeName === 'theoverallgoal'" />
    </el-tab-pane>
    <!-- <el-tab-pane label="个人目标" name="individualgoal">
      <individualgoal-manage v-if="activeName === 'individualgoal'" />
    </el-tab-pane> -->
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store'
import theoverallgoalManage from './theoverallgoal/overallGoalIndex.vue'
// import individualgoalManage from './individualgoal/individualgoal.vue'
const store = useStore()
const activeName = ref('theoverallgoal')
const handleClick = () => {
  // 却换时重置分页信息to do...
  store.commit('changerpageSize', 10)
  store.commit('changerCurrentPage', 1)
  store.commit('changerPageSizeStatus', false)
}

</script>

<style  lang="less">
.use-tabs {
  .el-tabs__content {
    overflow: inherit;
  }
}
</style>
