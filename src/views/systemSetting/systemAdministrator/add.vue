<!--
 * @Author: kevin
 * @Date: 2022-03-10 10:46:03
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-29 15:16:06
 * @Description: 添加
-->
<template>
  <kv-form v-bind="account" ref="ruleFormRef" v-model="formData">
    <template #enable>
      <el-switch
        size="large"
        v-model="formData.enable"
        inline-prompt
        :active-value="0"
        :inactive-value="1"
        active-text="是"
        inactive-text="否"/>
    </template>
    <template #footer>
      <div class="handle-btns" style="text-align: center">
        <el-button type="primary" @click.prevent="onSubmit(ruleFormRef)">提交</el-button>
        <el-button type="warning" @click="handleResetClick">关闭</el-button>
      </div>
    </template>
  </kv-Form>

</template>

<script>
import { ref } from 'vue'
import { account } from './formConfig'
import { add, get, modify } from '@/api/organization'
export default {
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    rowData: {
      type: Object,
      default: null
    },
    inputType: {
      type: String,
      default: 'add'
    }
  },
  //  组件相关
  emits: ['resetBtnClick', 'queryBtnClick', 'cancel', 'callBack'],

  setup ({ rowData, inputType, addType }, { emit }) {
    if (inputType === 'edit') {
      // 编辑账号的时候不需要密码
      account.formItems = account.formItems.filter(item => item.field !== 'password')
    } else {
     const find = account.formItems.find(item => item.field === 'password')
     if (!find) {
       account.formItems.push({
        field: 'password',
        type: 'password',
        label: '登陆密码',
        placeholder: '请输入登陆密码',
        rules: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      })
     }
    }
    const formItems = account?.formItems ?? []
    const formOriginData = {
      userType: 1
    }
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    const handleResetClick = () => {
      emit('cancel')
      formData.value = formData
    }

    const ruleFormRef = ref({})
    const userProps = ref({
      value: 'id',
      label: 'name',
      checkStrictly: true,
      emitPath: false // 只保留当前选中的i/d
    })
    if (inputType === 'edit') {
      (async () => {
        const dealit = await get(rowData?.id, 'account')
        formData.value = dealit.data
      })()
    }
    const fn = inputType === 'edit' ? modify : add
    const onSubmit = (formEl) => {
      formEl.$refs.ruleFormRef?.validate((valid) => {
        if (valid) {
          fn(formData.value, '/account').then((res) => {
            const { status } = res
            if (status?.code === '0') {
              emit('callBack', addType)
            }
          })
        }
      })
   }
  return {
    formData,
    onSubmit,
    emit,
    userProps,
    ruleFormRef,
    account,
    // 组件
    handleResetClick
  }
  }
}
</script>

<style lang="scss" scoped>

</style>
