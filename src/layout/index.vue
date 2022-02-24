<template>
  <div>
    <headers/>
    <div class="mian">
      <div class="left-menu">
        <left-menu/>
      </div>
      <div class="right-mian">
        <router-view />
      </div>
    </div>

  </div>
</template>

<script>
import headers from './header.vue'
import leftMenu from './leftMenu.vue'
  export default {
    components: {
      headers,
      leftMenu
    }
  }
</script>

<style lang="less" scoped>
  .mian {
    height: 100%;
    background: #dce9f4;
    padding: 0 10px;
    display: flex;
    // .left-menu {
    //   width: 200px;
    // }
  }
  .right-mian {
    flex: 1;
    background: #fff;
    margin: 15px 15px 0;
    padding: 20px;
  }
</style>
