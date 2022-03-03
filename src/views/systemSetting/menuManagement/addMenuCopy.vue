<!--
 * @Author: kevin
 * @Date: 2022-03-02 10:46:03
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-03 17:58:23
 * @Description: 添加菜单
-->
<template>
  <kev-Form v-bind="formConfig" v-model="formData">
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
      <div class="handle-btns">
        <el-button type="primary" @click.prevent="onSubmit(ruleFormRef)">提交</el-button>
        <el-button type="warning" @click="handleResetClick">关闭</el-button>
      </div>
    </template>
  </kev-Form>

</template>

<script>
import { ref } from 'vue'
import kevForm from '@/components/kvform'
import formConfig from './formConfig'
import { addMenu, getMenu, editMenu } from '@/api/menu'
export default {
  components: {
    kevForm
  },
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
  emits: ['resetBtnClick', 'queryBtnClick', 'cancel'],

  setup ({ rowData, inputType }, { emit }) {
    const formItems = formConfig?.formItems ?? []
    const formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
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
        formData.value = dealit
      })()
    }
    const onSubmit = () => {
      emit('queryBtnClick', formData.value)
      if (inputType === 'edit') {
        editMenu(formData.value).then((res) => {
          const { status } = res
          if (status.code === '0') {
            // emit('cancel')
          }
        })
      } else {
        addMenu(formData.value).then((res) => {
          const { status } = res
          if (status.code === '0') {
            // emit('cancel')
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
