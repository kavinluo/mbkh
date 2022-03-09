<!--
 * @Author: kevin
 * @Date: 2022-03-02 10:46:03
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-09 10:02:57
 * @Description: 添加菜单
-->
<template>
  <kv-form v-bind="formConfig" v-model="formData">
    <template #isSee>
      <el-switch
        size="large"
        v-model="formData.isSee"
        inline-prompt
        :active-value="1"
        :inactive-value="0"
        active-text="是"
        inactive-text="否"/>
    </template>
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
import formConfig from './formConfig'
import { addMenu, getMenu, editMenu } from '@/api/menu'
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

  setup ({ rowData, inputType }, { emit }) {
    const formItems = formConfig?.formItems ?? []
    const formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    formData.value.isSee = 1// 设置是否可见的默认值
    const handleResetClick = () => {
      emit('cancel')
      formData.value = formData
    }

    const ruleFormRef = ref()
    const listMenu = ref()
    const userProps = ref({
      value: 'id',
      label: 'title',
      checkStrictly: true,
      emitPath: false // 只保留当前选中的id
    })
    if (inputType === 'edit') {
      (async () => {
        const dealit = await getMenu(rowData?.id)
        formData.value = dealit.data
      })()
      console.log('formData', formData)
    }
    const onSubmit = () => {
      if (inputType === 'edit') {
        editMenu(formData.value).then((res) => {
          const { status } = res
          if (status?.code === '0') {
             emit('callBack')
          }
        })
      } else {
        addMenu(formData.value).then((res) => {
          const { status } = res
          if (status?.code === '0') {
            emit('callBack')
            console.log('ggg')
          }
        })
      }
    }
  return {
    formData,
    onSubmit,
    emit,
    userProps,
    listMenu,
    ruleFormRef,
    formConfig,
    // 组件
    handleResetClick
  }
  }
}
</script>

<style lang="scss" scoped>

</style>
