<!--
 * @Author: kevin
 * @Date: 2022-02-25 09:42:38
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-01 19:42:26
 * @Description: Do not edit
-->
<template>
  <!-- <div class="menu-switch" :style="!isCollapse ?menuSwitchOff : menuSwitchOn" @click="changeMenu"></div> -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="collapse"
    @open="handleOpen"
    @close="handleClose">
    <div v-for="item in subMenus" :key="item.id">
      <!-- 二级菜单 -->
      <template v-if="item.depPath === 4">
        <!-- 二级菜单的可以展开的标题 -->
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <!-- 遍历里面的item -->
          <template v-for="subitem in item.passportMenuList" :key="subitem.id">
            <el-menu-item
              :index="subitem.id + ''"
            >
              <i v-if="subitem.icon" :class="subitem.icon"></i>
              <span>{{ subitem.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <!-- 一级菜单 -->
      <div v-else-if="item.depPath === 2">
        <el-menu-item :index="item.id + ''">
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </div>
    </div>

  </el-menu>
</template>

<script>
import { computed } from 'vue'
// import { Menu as IconMenus } from '@element-plus/icons-vue'
  import { useStore } from '@/store'
    // import { useState } from '@/hooks/index'

 export default {
   props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const store = useStore()
    const subMenus = computed(() => store.state.user.subMenus)
    console.log('left-subMenus', subMenus)

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
      subMenus
      // IconMenus
    }
  }
 }
</script>

<style>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
</style>
