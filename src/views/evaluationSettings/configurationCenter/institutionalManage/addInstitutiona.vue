<!--
 * @Author: kevin
 * @Date: 2022-03-17 14:03:23
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-23 14:46:09
 * @Description: 新增机构
-->
<template>
  <kv-form v-bind="addInstitution" v-model="formData" ref="ruleFormRef">
    <template #footer>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTemplate(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </kv-Form>
</template>

<script>
import { ref } from 'vue'
import { addInstitution } from './config/dataConfig'
import { add, modify, get } from '@/api/organization'
  export default {
    components: {
      // createAttrs
    },
    props: {
      rowData: {
        type: Object,
        default: () => ({})
      }
    },
    setup (props, { emit }) {
      const ruleFormRef = ref({})
      const formOriginData = {}
      for (const item of addInstitution.formItems) {
        formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)
      if (props.rowData) {
        (async () => {
          const dealit = await get(props.rowData?.id)
          formData.value = dealit.data
        })()
      }

     const fn = !props.rowData ? add : modify

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
        addInstitution,
        formData,
        handleAddTemplate,
        ruleFormRef
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
