<!--
 * @Author: kevin
 * @Date: 2022-03-17 14:03:23
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-23 11:08:46
 * @Description: 新增目标
-->
<template>
  <kv-form v-bind="addtarget" v-model="formData" ref="ruleFormRef">
    <template #footer>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTarget(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </kv-Form>
</template>

<script>
import { ref } from 'vue'
import { addtarget } from './config/dataConfig'
import { add } from '@/api/target'
  export default {
    components: {
      // createAttrs
    },
    setup (props, { emit }) {
      const ruleFormRef = ref({})
      const formOriginData = {
        parentId: 0 // 默认固定传0
      }
      for (const item of addtarget.formItems) {
        formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)

      // const fn =

      const handleAddTarget = (formEL) => {
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
        addtarget,
        formData,
        handleAddTarget,
        ruleFormRef
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
