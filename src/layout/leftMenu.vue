<!--
 * @Author: kevin
 * @Date: 2022-02-25 09:42:38
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 10:30:13
 * @Description: Do not edit
-->
<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="collapse"
    @open="handleOpen"
    @close="handleClose">
    <template v-for="item in subMenus" :key="item.id">
      <!-- 二级菜单 -->
      <template v-if="item.children && item.children.length">
        <!-- 二级菜单的可以展开的标题 -->
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <!-- 遍历里面的item -->
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
              <i v-if="subitem.icon" :class="subitem.icon"></i>
              <span>{{ subitem.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <!-- 一级菜单 -->
      <el-menu-item :index="item.id + ''" v-else-if="item.depPath === 2" @click="handleMenuItemClick(item)">
        <el-icon><location /></el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>

  </el-menu>
</template>

<script>
import { computed } from 'vue'
// import { Menu as IconMenus } from '@element-plus/icons-vue'
  import { useStore } from '@/store'
  import { useRouter, useRoute } from 'vue-router'

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
        // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    console.log('currentPath', currentPath)

    const subMenus = computed(() => store.state.user.subMenus)
    console.log('left-subMenus', subMenus)

    const handleMenuItemClick = (item) => {
      console.log('--------', item)
      router.push({
        path: item.path ?? '/not-found'
      })
    }

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
      subMenus,
      handleMenuItemClick
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
