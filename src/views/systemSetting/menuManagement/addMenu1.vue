<!--
 * @Author: kevin
 * @Date: 2022-03-02 10:46:03
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-03 17:20:55
 * @Description: 添加菜单
-->
<template>
  <el-form :model="formData" label-width="130px" ref="ruleFormRef">
    <el-row>
      <el-col :span="12" :pull="1">
        <el-form-item label="菜单名称">
          <el-input v-model="formData.title" placeholder="菜单名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :pull="1">
        <el-form-item label="菜单编号">
          <el-input v-model="formData.name" autocomplete="off" placeholder="组件的 name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :pull="1">
        <el-form-item label="组件地址">
          <el-input v-model="formData.component" autocomplete="off" placeholder="路由地址 component"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :pull="1">
        <el-form-item label="路由地址">
          <el-input v-model="formData.path" autocomplete="off" placeholder="路由地址 path"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :pull="1">
        <el-form-item label="排序">
          <el-input v-model.number="formData.sequence" placeholder="排序"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :pull="1">
        <el-form-item label="父级菜单">
          <el-cascader
            v-model="formData.parentId"
            :options="menuList"
            clearable
            placeholder="请选择父级菜单"
            :props="userProps" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :pull="1">
        <el-form-item label="图标">
          <el-input v-model="formData.icon" autocomplete="off" placeholder="图标"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :pull="1">
        <el-form-item label="备注">
          <el-input v-model="formData.remark" autocomplete="off" placeholder="备注"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :pull="1">
        <el-form-item label="是否可见">
          <el-switch
            size="large"
            v-model="formData.isSee"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="是"
            inactive-text="否"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :pull="1" align="center">
        <el-button type="primary" @click.prevent="onSubmit(ruleFormRef)">提交</el-button>
        <el-button type="warning" @click="emit('cancel')">关闭</el-button>
      </el-col>
    </el-row>
  </el-form>

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
  setup ({ rowData, inputType }, { emit }) {
    const ruleFormRef = ref()
    const listMenu = ref()
    const userProps = ref({
      value: 'id',
      label: 'title',
      checkStrictly: true,
      emitPath: false // 只保留当前选中的id
    })
    const formData = ref({
      name: '',
      component: '',
      isSee: 1, // 是否可见
      path: '',
      remark: '',
      sequence: '',
      title: '',
      icon: '',
      parentId: null
    })
    if (inputType === 'edit') {
      (async () => {
        const dealit = await getMenu(rowData.id)
        formData.value = dealit
      })()
    }
    const onSubmit = () => {
      if (inputType === 'edit') {
        editMenu(formData.value).then((res) => {
          const { status } = res
          if (status.code === '0') {
            emit('callBack')
          }
        })
      } else {
        addMenu(formData.value).then((res) => {
          const { status } = res
          if (status.code === '0') {
            emit('callBack')
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
    formConfig
  }
  }
}
</script>

<style lang="scss" scoped>

</style>
