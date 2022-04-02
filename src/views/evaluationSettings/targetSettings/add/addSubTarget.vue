<!--
 * @Author: kevin
 * @Date: 2022-04-02 10:27:51
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-02 17:45:23
 * @Description: Do not edit
-->
<template>
  <kv-form v-bind="addSubFormConfig" v-model="formData" ref="ruleFormRef">
    <template #director>
      <el-cascader
        style="width: 100%"
        clearable
        filterable
        :show-all-levels="false"
        :props="cascaderProps"
        v-model="formData.director"
        @change="handelChanger"	/>
    </template>
    <template #evaluate>
      <el-button type="primary" size="small" @click="handleAddQuota"><el-icon style="vertical-align: middle"> <plus /> </el-icon></el-button>
    </template>
    <template #footer>
      <div style="margin-left: 50px; margin-top: -10px;">
        <ul> <li v-for="item in evaluateTargetDtoList" style="line-height: 1.6;" :key="item.id">{{ item.title }}</li></ul>
      </div>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTarget(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </kv-Form>

  <kvDialog v-bind="selectConfig" v-model="selectConfig.dialogVisible" @callBack="confirm" @cancel="cancel">
    <kv-table
      :useTableData="useTableData"
      :propList="tablePropList"
      :isUseStoreData="false"
      :showIndexColumn="true"
      :showSelectColumn="true"
      :showFooter="false"
      @handleSelectionChange="handleSelectionChange">
    </kv-table>
  </kvDialog>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import {
    addSubFormConfig,
    cascaderProps,
    selectModelConfig,
    tablePropList
  } from '../config/dataConfig'
  import { add, getList, modify } from '@/api/target'
  // import { getList as getCycleList } from '@/api/cycle'
  // import { selectQuotaList } from '@/api/quota'
  import { getCycle, getQuotaLis } from '../hooks/hooks'
  const props = defineProps({
    rowData: {
      type: Object,
      default: () => (null)
    },
    subRowData: {
      type: Object,
      default: () => (null)
    },
    editType: {
      type: String,
      default: 'add'
    }
  })
  const emit = defineEmits(['callBack'])
  const selectConfig = ref(selectModelConfig)
  const ruleFormRef = ref({})
  const evaluateTargetDtoList = ref([])

  // 目标周期列表
  const formData = ref(getCycle(props.rowData))
  const useTableData = ref([])

  getQuotaLis().then(res => {
    useTableData.value = res
  })
  const handleAddQuota = () => {
    selectConfig.value.dialogVisible = true
  }
  console.log('formData', formData)
  formData.value.cycle1 = props.rowData.id
  const handelChanger = (row) => {
    console.log('row', row)
  }
  if (props.editType === 'edit') {
    getList({ id: props.subRowData.id }).then(res => {
      const { checkArea, director } = res.data
      res.data.checkArea = checkArea.split(',').map(item => +item)
      res.data.director = director.split(',').map(item => +item)
      formData.value = res.data
    })
    formData.value.cycle1 = props.rowData.id
  }
  const handleSelectionChange = (value) => {
    evaluateTargetDtoList.value = value
  }

  const confirm = (tyy) => {
    selectConfig.value.dialogVisible = false
  }
  const cancel = () => {
    evaluateTargetDtoList.value = []
    selectConfig.value.dialogVisible = false
  }

  const fn = props.editType === 'edit' ? modify : add

  const handleAddTarget = (formEL) => {
    formEL.$refs.ruleFormRef?.validate((valid) => {
      if (valid) {
        const { checkArea = [], director = [] } = formData.value
        const params = {
          checkArea: checkArea.join(','),
          director: director.join(','),
          evaluateTargetDtoList: evaluateTargetDtoList.value
        }
        const obj = Object.assign({}, formData.value, params)
        fn(obj).then(res => {
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
