<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:56:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-15 18:09:04
 * @Description: 模板首页
-->
<template>
  <template-list v-if="showModel === 'list'" @change="changeList" />
  <template-add-list v-if="showModel === 'add'" @change="changeList" />
</template>

<script>
import templateList from './templateList.vue'
import templateAddList from './templateAddList.vue'
import { ref } from 'vue'
export default {
  components: {
    templateList,
    templateAddList
  },
  setup () {
    const showModel = ref('list')
    const changeList = (name) => {
      showModel.value = name
    }
     return {
       showModel,
       changeList
     }
  }
}
</script>

<style lang="scss" scoped>

</style>
