<!--
 * @Author: kevin
 * @Date: 2022-03-17 10:44:31
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-28 09:46:10
 * @Description: 添加属性
-->
<template>
  <kv-form v-bind="createAttrs" v-model="formData" ref="ruleFormRef" @call="handleChange">
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
    <template #defaultValue>
      <el-form-item :label="defaultValueType==='select' ? '下拉选项' : '默认值'" >
        <el-input v-if="defaultValueType ==='select'" v-model="formData.tips" :placeholder=" '输入下拉选项，多个请用;号隔开'" />
        <p style="margin: 0; font-size:12px;color:#ccc;line-height:1.2">{{ defaultValueType === 'select' ? '输入下拉选项，多个请用;号隔开' : '' }}</p>
        <el-input v-model="formData.defaultValue" :placeholder="'默认值'" />
      </el-form-item>
    </template>
    <template #footer>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTemplate(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </kv-Form>
</template>

<script setup>
  import { ref } from 'vue'
  import { createAttrs } from './config/dataConfig'
  import { addAttr, modifyAttr } from '@/api/template'
  const emit = defineEmits(['callBack'])
  const props = defineProps({
      rowData: {
        type: Object,
        default: null
      },
      editData: {
        type: Object,
        default: null
      }
    })

  const ruleFormRef = ref({})
  const defaultValueType = ref('')
  const formOriginData = {
    templateId: props.rowData.id,
    newList: ['77']
  }

  const handleChange = (val) => {
    defaultValueType.value = val
    if (val === 'select') {

    }
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
</script>

<style lang="scss" scoped>

</style>
