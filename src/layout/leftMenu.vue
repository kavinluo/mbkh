<!--
 * @Author: kevin
 * @Date: 2022-02-25 09:42:38
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-04 18:01:55
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
      <el-sub-menu :index="item.id +''" v-if="item.children">
        <template #title>
          <el-icon v-if="item.meta.icon"><kvIcon :name="item.meta.icon"/></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 遍历里面的item -->
        <template v-for="subitem in item.children" :key="subitem.id">
          <el-sub-menu v-for="sItem in subitem.children" :key="sItem.id" :index="`${sItem.id}`">
            <template #title>
              <el-icon v-if="sItem.meta.icon"><kvIcon :name="sItem.meta.icon"/></el-icon>
              <span>{{ sItem.meta.title }}</span>
            </template>
            <el-sub-menu v-for="xsItem in sItem.children" :key="xsItem.id" :index="`${xsItem.id}`">
              <template #title>
                <el-icon v-if="xsItem.meta.icon"><kvIcon :name="xsItem.meta.icon"/></el-icon>
                <span>{{ xsItem.meta.title }}</span>
              </template>
            </el-sub-menu>
            <el-menu-item :index="`${xsItem.id}`" @click="handleMenuItemClick(xsItem)">
              <el-icon v-if="xsItem.meta.icon"><kvIcon :name="xsItem.meta.icon"/></el-icon>
              <span>{{ xsItem.meta.title }}</span>
            </el-menu-item>

          </el-sub-menu>
          <el-menu-item :index="`${subitem.id}`" @click="handleMenuItemClick(subitem)">
            <el-icon v-if="subitem.meta.icon"><kvIcon :name="subitem.meta.icon"/></el-icon>
            <span>{{ subitem.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="item.id + ''" @click="handleMenuItemClick(item)">
        <el-icon v-if="item.meta.icon"><kvIcon :name="item.meta.icon"/></el-icon>
        <span>{{ item.meta.title }}</span>
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
