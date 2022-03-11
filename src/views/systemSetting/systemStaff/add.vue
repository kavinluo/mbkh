<!--
 * @Author: kevin
 * @Date: 2022-03-10 10:46:03
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-11 15:24:53
 * @Description: 添加机构
-->
<template>
  <kv-form v-bind="select[addType]" v-model="formData">
    <template #parentId>
      <el-cascader
        v-model="formData.parentId"
        :options="menuList"
        clearable
        placeholder="请选择父级菜单"
        :props="userProps" />
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
import { organization, account } from './formConfig'
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
    },
    addType: {
      type: String,
      default: 'account'
    }
  },
  //  组件相关
  emits: ['resetBtnClick', 'queryBtnClick', 'cancel', 'callBack'],

  setup ({ rowData, inputType, addType }, { emit }) {
    const select = ref({
      account,
      organization
    })
    const formItems = select.value[addType]?.formItems ?? []
    const formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    const handleResetClick = () => {
      emit('cancel')
      formData.value = formData
    }

    const ruleFormRef = ref()
    const userProps = ref({
      value: 'id',
      label: 'name',
      checkStrictly: true,
      emitPath: false // 只保留当前选中的id
    })
    if (inputType === 'edit') {
      (async () => {
        const dealit = await get(rowData?.id, addType)
        formData.value = dealit.data
      })()
    }
    const onSubmit = () => {
      if (inputType === 'edit') {
        modify(formData.value, addType).then((res) => {
          const { status } = res
          if (status?.code === '0') {
            emit('callBack', addType)
          }
        })
      } else {
        add(formData.value, addType).then((res) => {
          const { status } = res
          if (status?.code === '0') {
            emit('callBack', addType)
          }
        })
      }
    }
  return {
    formData,
    onSubmit,
    emit,
    userProps,
    ruleFormRef,
    organization,
    account,
    // 组件
    handleResetClick,
    select
  }
  }
}
</script>

<style lang="scss" scoped>

</style>
