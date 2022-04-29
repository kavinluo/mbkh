<template>
  <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
    <el-tab-pane label="默认" name="default">
      <defaultManage v-if="activeName === 'default'" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import defaultManage from './default/default.vue'
</script>

<style>
</style>
