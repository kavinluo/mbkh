<!--
 * @Author: kevin
 * @Date: 2022-03-17 10:44:31
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-22 16:10:39
 * @Description: 添加属性
-->
<template>
  <kv-form v-bind="createAttrs" v-model="formData" ref="ruleFormRef">
    <template #required>
      <el-switch
        size="large"
        v-model="formData.required"
        inline-prompt
        :active-value="1"
        :inactive-value="0"
        active-text="是"
        inactive-text="否"/>
    </template>
    <template #footer>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTemplate(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </kv-Form>
</template>

<script>
import { ref } from 'vue'
import { createAttrs } from './config/dataConfig'
import { addAttr, modifyAttr } from '@/api/template'
  export default {
    props: {
      rowData: {
        type: Object,
        default: null
      },
      editData: {
        type: Object,
        default: null
      }
    },
    setup (props, { emit }) {
      const ruleFormRef = ref({})
      const formOriginData = {
        templateId: props.rowData.id
      }
      for (const item of createAttrs.formItems) {
        formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)
      if (props.editData) {
        formData.value = props.editData
      }
      const fn = !props.editData ? addAttr : modifyAttr
      const handleAddTemplate = (formEL) => {
        formEL.$refs.ruleFormRef?.validate((valid) => {
         if (valid) {
           fn(formData.value).then(res => {
            const { status } = res
              if (status?.code === '0') {
                emit('callBack')
              }
            })
          }
        })
      }
      return {
        createAttrs,
        formData,
        handleAddTemplate,
        ruleFormRef
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
