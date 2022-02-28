<template>
  <div id="header">
    <div class="topbar-left">
      <div class="logo">
        <img src="@/assets/logo.png" height="60"/>
        <h2>目标管理信息评价系统</h2>
      </div>
    </div>
    <div class="topbar-navigation topbar-left">
      <el-button color="#ffffff1a" size="large" type="primary" :icon="Monitor"> <router-link to="/manage/work">工作台</router-link></el-button>
      <el-button color="#ffffff1a" size="large" type="primary" :icon="Histogram"><router-link to="/manage">评价结果</router-link></el-button>
      <el-button color="#ffffff1a" size="large" type="primary" :icon="Histogram"><router-link to="/manage">评价过程</router-link></el-button>
      <el-button color="#ffffff1a" size="large" type="primary" :icon="Histogram"><router-link to="/manage">评价设置</router-link></el-button>
      <el-button color="#ffffff1a" size="large" type="primary" :icon="Histogram"><router-link to="/manage">系统管理</router-link></el-button>
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
  </div>
</template>

<script>
  import { Monitor, Histogram, ReadingLamp, EditPen, Setting } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useState } from '@/hooks/index'

  export default {
    setup () {
      const stroe = useStore()
      const downStatus = ref(false)
      const headline = ref(null) // $refs
      stroe.dispatch('user/userInfoAction')

      const userInfo = useState(['userInfo'], 'user')

      function downOut () {
        downStatus.value = !downStatus.value
        console.log('显示下拉', downStatus)
      }
      function logOut () {
        stroe.dispatch('user/loginOut')
      }

      // 点击任何区域关闭
      function handleBodyClick (event) {
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
        ...userInfo
      }
    }
  }
</script>

<style lang="less">
  #header {
    padding: 0 10px;
    background-image: linear-gradient(90deg,#3551a4,#2284b6 50%,#db9e68),linear-gradient(#3752a3,#3752a3);
    height: 80px;
    display: flex;
    align-items: center;
    .topbar-left {
      .logo {
        display: flex;
        align-items: center;
        h2 {
          font-size: 22px;
          color: #fff;
          font-weight: 500;
          margin-left: 10px;
          letter-spacing: 2px;
        }
      }
    }
    .topbar-navigation {
      margin-left: 40px;
      a {
        color: #fff;
      }
    }
    .topbar-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      position: relative;
      .use-name {
        margin-left: 15px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
        background: #2284b6;
        cursor: pointer;
      }
      .show-down {
        width: 100px;
        position: absolute;
        right: -6px;
        background: #2284b6;
        top: 32px;
        padding: 5px 0;
        border-radius: 2px;
        li{
          display: block;
          padding: 5px 0;
          text-align: center;
          font-size: 12px;
          color: aliceblue;
          cursor: pointer;
          &:hover {
            background: #52a9d5;
            color: #fff;
          }
        }
      }
    }
  }
</style>
