<!--
 * @Author: kevin
 * @Date: 2022-03-14 09:49:04
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-21 17:00:48
 * @Description: 配置中心
-->
<template>
  <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
    <el-tab-pane label="机构管理" name="institutional">
      <institutional-manage v-if="activeName === 'institutional'"/>
    </el-tab-pane>
    <el-tab-pane label="模板管理" name="template">
      <template-manage v-if="activeName === 'template'"/>
    </el-tab-pane>
    <el-tab-pane label="周期管理" name="cycle">
      <cycle-list v-if="activeName === 'cycle'" />
    </el-tab-pane>
    <el-tab-pane label="指标周期管理" name="target">
      <target-manage v-if="activeName === 'target'"/>
    </el-tab-pane>
    <el-tab-pane label="数据管理" name="data">
      <data-list v-if="activeName === 'data'" />
    </el-tab-pane>
  </el-tabs>

</template>

<script setup>
  import { ref } from 'vue'
  import { useStore } from '@/store'
  import institutionalManage from './institutionalManage/InstitutionalIndex.vue'
  import templateManage from './templateManage/templateIndex.vue'
  import targetManage from './targetManage/targetIndex.vue'
  import cycleList from './cycleManage/cycleList.vue'
  import dataList from './DataManage/dataList.vue'

  const store = useStore()
  const activeName = ref('institutional')
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
      overflow: inherit;;
    }
  }
</style>
