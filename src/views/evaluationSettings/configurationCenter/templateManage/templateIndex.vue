<!--
 * @Author: kevin
 * @Date: 2022-03-15 15:56:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-22 14:28:56
 * @Description: 模板首页
-->
<template>
  <template-list v-if="showModel === 'list'" @change="changeList" />
  <attr-list v-if="showModel === 'attr'" @change="changeList" :rowData="rowData" />
</template>

<script>
import templateList from './templateList.vue'
import attrList from './attrList.vue'
import { ref } from 'vue'
export default {
  components: {
    templateList,
    attrList
  },
  setup () {
    const showModel = ref('list')
    const rowData = ref(null)
    const changeList = (name, row) => {
      console.log('row', row)
      showModel.value = name
      rowData.value = row
    }
     return {
       showModel,
       changeList,
       rowData
     }
  }
}
</script>

<style lang="scss" scoped>

</style>
