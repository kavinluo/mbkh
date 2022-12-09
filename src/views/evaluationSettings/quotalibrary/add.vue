<!--
 * @Author: kevin
 * @Date: 2022-03-14 10:13:59
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-08 15:56:09
 * @Description: 添加指标库
-->

<template>
  <kv-form v-bind="selectQuota" v-model="formData" ref="ruleFormRef">
    <template #parentId>
      <el-cascader
        :disabled="quotaData.level === 0 && inuptType === 'edit'"
        style="width: 100%"
        v-model="formData.parentId"
        :options="menuList"
        clearable
        placeholder="请选择父级菜单"
        :props="userProps" />
    </template>
    <template #footer>
      <div class="handle-btns" style="text-align: center">
        <button class="el-button el-button--primary" v-no-anti-shake @click="onSubmit(ruleFormRef)">提交</button>
        <!-- <el-button type="warning" @click="handleResetClick">关闭</el-button> -->
      </div>
    </template>
  </kv-Form>

</template>

<script setup>
  import { ref } from 'vue'
  import { selectQuota } from './config/config'
  import { add, modify } from '@/api/quota'

  const props = defineProps({
    menuList: {
      type: Array,
      default: () => []
    },
    quotaData: {
      type: Object,
      default: null
    },
    inuptType: {
      type: String,
      default: 'add'
    }
  })
  const emit = defineEmits(['resetBtnClick', 'queryBtnClick', 'cancel', 'callBack'])
 console.log('inuptType', props.inuptType)
  const formItems = selectQuota?.formItems ?? []
  const formOriginData = {
    parentId: 0 // 默认添加是0
  }
  for (const item of formItems) {
    formOriginData[item.field] = ''
    if (item.field === 'parentId') {
      formOriginData.parentId = 0
    }
  }
  const formData = ref(formOriginData)
    if (props.inuptType === 'edit') {
      formData.value = props.quotaData
    }

  const ruleFormRef = ref()
  const userProps = ref({
    value: 'id',
    label: 'title',
    checkStrictly: true,
    emitPath: false // 只保留当前选中的id
  })
  const fn = props.inuptType === 'add' ? add : modify
  const onSubmit = (formEL) => {
    formEL.$refs.ruleFormRef?.validate((valid) => {
      if (valid) {
        if (formData.value.parentId === 0) {
          formData.value.level = 0
        } else {
          formData.value.level = 1
        }
        fn(formData.value).then((res) => {
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
