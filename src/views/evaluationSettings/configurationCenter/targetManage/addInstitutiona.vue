<!--
 * @Author: kevin
 * @Date: 2022-03-17 14:03:23
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-21 11:49:35
 * @Description: 新增机构
-->
<template>
  <kv-form v-bind="addTemplate" v-model="formData" ref="ruleFormRef">
    <template #footer>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTemplate(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </kv-Form>
</template>

<script>
import { ref } from 'vue'
import { addTemplate } from './config/dataConfig'
import { add } from '@/api/template'
  export default {
    components: {
      // createAttrs
    },
    setup (props, { emit }) {
      const ruleFormRef = ref({})
      const formOriginData = {}
      for (const item of addTemplate.formItems) {
        formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)

      const handleAddTemplate = (formEL) => {
       formEL.$refs.ruleFormRef?.validate((valid) => {
         if (valid) {
          add(formData.value).then(res => {
            const { status } = res
            if (status?.code === '0') {
              emit('callBack')
            }
          })
         }
       })
      }
      return {
        addTemplate,
        formData,
        handleAddTemplate,
        ruleFormRef
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
