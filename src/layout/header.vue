<!--
 * @Author: kevin
 * @Date: 2022-02-25 09:42:38
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-01 16:49:05
 * @Description: Do not edit
-->
<template>
  <div class="topbar-left">
    <div class="logo">
      <img src="@/assets/logo.png" height="60"/>
      <h2>目标管理信息评价系统</h2>
    </div>
  </div>
  <div class="topbar-navigation topbar-left">
    <router-link v-for="item in userMenus" :key="item.id" :to="item.path" @click="handleMenu(item)" style="margin-right: 15px">
      <el-button color="#ffffff1a" :icon="item.icon ? Histogram : ''" size="large" type="primary">
        {{ item.title }}
      </el-button>
    </router-link>
  </div>
  <div class="topbar-info topbar-right" ref="headline">
    <div class="welcome-info">
      欢迎您，{{ userInfo.name }}
    </div>
    <span class="use-name" @click="downOut" id="useName">{{ userInfo.name ? userInfo.name.substr(0,1) : '' }}</span>
    <ul class="show-down" v-if="downStatus">
      <li @click="logOut">退出</li>
    </ul>
  </div>
</template>

<script>
  import { Monitor, Histogram, ReadingLamp, EditPen, Setting } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useState } from '@/hooks/index'
  import { useRouter } from 'vue-router'

  export default {
    setup () {
      const stroe = useStore()
      const router = useRouter()
      const downStatus = ref(false)
      const headline = ref(null) // $refs
      stroe.dispatch('user/userInfoAction')

      const userInfo = useState(['userInfo'], 'user')
      const userMenus = useState(['userMenus'], 'user')

      const handleMenu = (item) => {
        router.push(item.path)
        const subMenuList = item.passportMenuList || []
        stroe.dispatch('user/changeSubMenusActions', subMenuList)
      }

      const downOut = () => {
        downStatus.value = !downStatus.value
        console.log('显示下拉', downStatus)
      }
      const logOut = () => {
        stroe.dispatch('user/loginOut')
      }
      // 点击任何区域关闭
      const handleBodyClick = (event) => {
        const sp = headline.value
        if (sp) {
          if (!sp.contains(event.target)) {
            downStatus.value = false
          }
        }
      }
      document.addEventListener('click', handleBodyClick)
      return {
        headline, // $refs
        downOut,
        logOut,
        downStatus,
        Monitor,
        Histogram,
        ReadingLamp,
        EditPen,
        Setting,
        handleMenu,
        ...userInfo,
        ...userMenus
      }
    }
  }
</script>
