<!--
 * @Author: kevin
 * @Date: 2022-02-21 11:54:16
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-15 11:40:23
 * @Description: App
-->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'

export default {
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup () {
    return {
      locale: zhCn
    }
  }
}

</script>
