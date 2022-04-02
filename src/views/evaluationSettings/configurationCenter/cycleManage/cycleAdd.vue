<!--
 * @Author: kevin
 * @Date: 2022-03-17 09:18:56
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-31 17:46:02
 * @Description: 新建周期
-->
<template>
  <kv-form v-bind="addCycleConfig" v-model="formData" ref="ruleFormRef">
    <!-- <template #datetimerange>
      <el-date-picker
        v-model="formData.datetimerange"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </template> -->
    <template #footer>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTemplate(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </kv-Form>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { addCycleConfig } from './config/dataConfig'
import { add, modify } from '@/api/cycle'
  export default {
    props: {
      rowData: {
        type: Object,
        default: null
      }
    },
    setup (props, { emit }) {
      const { proxy } = getCurrentInstance()
      console.log('proxy', proxy)
      // proxy.$message.error('请选择时间！')
      const formData = ref({
        parentId: 0
      })
      const ruleFormRef = ref({})
      if (props.rowData) {
        formData.value = props.rowData
        formData.value.usetime = [formData.value.startTime, formData.value.endTime]
      }
      const fn = !props.rowData ? add : modify
      const handleAddTemplate = (formEL) => {
      formEL.$refs.ruleFormRef?.validate((valid) => {
        if (valid) {
          formData.value.startTime = new Date(formData.value.usetime[0]).getTime()
          formData.value.endTime = new Date(formData.value.usetime[1]).getTime()
          delete formData.value.usetime
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
        addCycleConfig,
        formData,
        ruleFormRef,
        handleAddTemplate
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
