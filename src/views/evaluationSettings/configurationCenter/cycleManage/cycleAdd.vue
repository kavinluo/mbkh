<!--
 * @Author: kevin
 * @Date: 2022-03-17 09:18:56
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-17 11:55:26
 * @Description: 新建周期
-->
<template>
  <kv-form v-bind="addCycleConfig" v-model="formData">
    <template #footer>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTemplate">确定</el-button>
      </div>
    </template>
  </kv-Form>
</template>

<script>
import { ref } from 'vue'
import { addCycleConfig } from './dataConfig'
  export default {
    components: {
      // createAttrs
    },
    setup () {
      const formData = ref({})
      const handleAddTemplate = () => {}
      return {
        addCycleConfig,
        formData,
        handleAddTemplate
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
