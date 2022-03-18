<!--
 * @Author: kevin
 * @Date: 2022-03-17 10:44:31
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 10:13:21
 * @Description: 添加属性
-->
<template>
  <kv-form v-bind="createAttrs" v-model="formData">
    <template #footer>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTemplate">确定</el-button>
      </div>
    </template>
  </kv-Form>
</template>

<script>
import { ref } from 'vue'
import { createAttrs } from './config/dataConfig'
  export default {
    components: {
      // createAttrs
    },
    setup () {
      const formData = ref({})
      const handleAddTemplate = () => {}
      return {
        createAttrs,
        formData,
        handleAddTemplate
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
