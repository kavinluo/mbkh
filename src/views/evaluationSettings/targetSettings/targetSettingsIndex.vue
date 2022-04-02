<!--
 * @Author: kevin
 * @Date: 2022-03-14 09:39:40
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-02 09:18:13
 * @Description: 目标设置
-->
<template>

  <target-list v-if="active === 'list'" @callBack="callBack" />
  <target-settings v-if="active === 'setting'" @callBack="callBack" :rowData="rowData" />
</template>

<script>
  import { ref } from 'vue'

  import targetList from './targetSettingsList.vue'
  import targetSettings from './targetSettings.vue'

  export default {
    components: {
      targetList,
      targetSettings

    },
    emits: ['cancel'],

    setup () {
      const rowData = ref({})
      const active = ref('list')
      const callBack = (row, type) => {
        console.log('row, type', row, type)
        active.value = type
        rowData.value = row
      }

      return {
        active,
        callBack,
        rowData
      }
    }
  }
</script>
