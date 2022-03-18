<!--
 * @Author: kevin
 * @Date: 2022-03-14 09:49:04
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 15:08:35
 * @Description: 配置中心
-->
<template>
  <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
    <el-tab-pane label="模板管理" name="first">
      <template-manage v-if="activeName === 'first'"/>
    </el-tab-pane>
    <el-tab-pane label="周期管理" name="second">
      <cycle-list v-if="activeName === 'second'" />
    </el-tab-pane>
    <el-tab-pane label="数据管理" name="third">
      <data-list v-if="activeName === 'third'" />
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  import { ref } from 'vue'
  import templateManage from './templateManage/templateIndex.vue'
  import cycleList from './cycleManage/cycleList.vue'
  import dataList from './DataManage/DataList.vue'
  export default {
    components: {
      templateManage,
      cycleList,
      dataList
    },
    // emits: ['cancel'],

    setup () {
      const activeName = ref('first')
      const handleClick = () => {}
        return {
          handleClick,
          activeName

        }
    }
  }
</script>
<style lang="less">
  .use-tabs {
    .el-tabs__content {
      overflow: inherit;;
    }
  }
</style>
