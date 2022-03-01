<!--
 * @Author: kevin
 * @Date: 2022-02-25 09:42:38
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-01 11:19:26
 * @Description: Do not edit
-->
<template>
  <el-container>
    <el-header id="header" height="80px">
      <headers/>
    </el-header>
    <el-container class="mian">
      <el-aside width="200px" :style="!isFold ? menuSwitchOff : menuSwitchOn">
        <div class="menu-switch" @click="handleFoldClick">
          <el-icon style="vertical-align: middle;">
            <Fold v-if="isFold" />
            <Expand v-else />
          </el-icon>
        </div>
        <leftMenu :collapse="isFold" />
      </el-aside>
      <el-main class="right-mian">
        <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import headers from './header.vue'
import leftMenu from './leftMenu.vue'
import { ref } from 'vue'
  export default {
    setup (props, { emit }) {
      const isFold = ref(false)
      const handleFoldClick = () => {
        isFold.value = !isFold.value
      }
        const menuSwitchOff = {
          width: '200px',
          transition: 'all .3s ease-out'
        }
        const menuSwitchOn = {
          width: '65px',
          transition: 'all .5s ease-out'
        }
      return {
        handleFoldClick,
        menuSwitchOff,
        menuSwitchOn,
        isFold
      }
    },
    components: {
      headers,
      leftMenu
    }
  }
</script>

<style lang="less">
  .mian {
    height: 100%;
    padding: 0 10px;
    display: flex;
  }
  .right-mian {
    flex: 1;
    background: #fff;
  }
  .menu-switch {
    height: 20px;
    text-align: center;
    cursor: pointer;
  }
  #header {
    padding: 0 10px;
    background-image: linear-gradient(90deg,#3551a4,#2284b6 50%,#db9e68),linear-gradient(#3752a3,#3752a3);
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
