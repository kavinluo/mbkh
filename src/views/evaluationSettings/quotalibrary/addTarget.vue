<!--
 * @Author: kevin
 * @Date: 2022-03-24 15:52:07
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-25 18:09:15
 * @Description: 添加指标信息
-->

<template>

  <el-form :model="formData" label-width="120px">
    <el-form-item label="名称：">
      <el-input v-model="formData.title" />
    </el-form-item>
    <el-form-item label="选择评分模板：">
      <div> {{ userTemplate?.name }}</div> &nbsp; &nbsp;
      <el-button type="primary" size="small" @click="handleSelectTmpalte">选择评分模板</el-button>
    </el-form-item>
    <el-form-item label="考评内容：" style="margin-bottom: 10px">
      <el-button type="primary" size="small" @click="handleCont">添加</el-button> &nbsp; &nbsp;
    </el-form-item>
    <el-form-item class="myform">
      <div>
        <div style="border-bottom: solid 1px #ddd; display: flex;" v-for="item in evaluateTargetDetailedDtoList" :key="item.title">
          <span style="flex: 1"> {{ item?.showTitle?.value }}</span>
          <span>
            <el-icon style="cursor: pointer;" :size="16" color="#409EFF" @click="handleEdit(item)"><edit /></el-icon>&nbsp;&nbsp;
            <el-icon :size="16" color="#F56C6C" style="cursor: pointer;" @click="handleRemove(item)"><delete /></el-icon>
          </span>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>

  <kvDialog v-bind="selectConfig" v-model="selectConfig.dialogVisible" @cancel="cancel" @callBack="confirm">
    <kv-table
      v-if="selectConfig.dialogVisible"
      :useTableData="useTableData"
      :pageInfo="pageInfo"
      @update:pageInfo="pageInfo = $event"
      :listTotal="listTotal"
      :propList="templatePropList"
      :isUseStoreData="false"
      :isRadio="true"
      :useSize="[5,10, 20, 30]"
      :showIndexColumn="true"
      @handleSelectionChange="handleSelectionChange">
    </kv-table>
  </kvDialog>
  <kvDialog v-bind="contModel" v-model="contModel.dialogVisible">
    <add-content v-if="contModel.dialogVisible" :userTemplate="userTemplate" :rowData="rowData" @cancel="cancel" @callBack="callContent" />
  </kvDialog>

</template>

<script>
import { ref, watch } from 'vue'
import { selectQuota, selectModelConfig, templatePropList, contModelConfig } from './config/config'
import { add, modify } from '@/api/quota'
import { getListPage } from '@/api/template'
import addContent from './addContent.vue'
// import { useStore } from '@/store'

export default {
  components: {
    addContent
  },
  props: {
    targetRowData: {
      type: Object,
      default: () => ({})
    },
    targetData: {
      type: Object,
      default: null
    },
    inuptType: {
      type: String,
      default: 'add'
    }
   },
  //  组件相关resetBtnClickresetBtnClickresetBtnClickresetBtnClick
  emits: ['resetBtnClick', 'queryBtnClick', 'cancel', 'callBack'],

  setup ({ targetData, inuptType, targetRowData }, { emit }) {
    const selectConfig = ref(selectModelConfig)
    const contModel = ref(contModelConfig)
    const userTemplate = ref({})
    const rowData = ref({})
    const evaluateTargetDetailedDtoList = ref([])
    // const stroe = useStore()
    // stroe.commit('changerPageSizeStatus', false)
    const formData = ref({
      title: '',
      targetId: targetData?.id,
      evaluateTargetDetailedDtoList: [],
      countScore: 100
    })
    // const pageSize = { curPage: 1, pageSize: 10 }
    const pageInfo = ref({ curPage: 1, pageSize: 5 })
    const useTableData = ref([])

    const listTotal = ref(0)
    const getTemplateLis = async () => {
      const { data = {} } = await getListPage(pageInfo.value)
      useTableData.value = data?.list ?? []
      console.log('useTableData', data)
      listTotal.value = data.total
    }
    watch(
      () => pageInfo.value,
      (newValue, oldValue) => {
        pageInfo.value = newValue
        getTemplateLis()
      },
      { deep: true }
    )
    const handleResetClick = () => {
      emit('cancel')
      formData.value = formData
    }
      if (inuptType === 'edit') {
        formData.value = targetData
      }

    const ruleFormRef = ref()
    const userProps = ref({
      value: 'id',
      label: 'title',
      checkStrictly: true,
      emitPath: false // 只保留当前选中的id
    })
    const cancel = (status) => {
      selectConfig.value.dialogVisible = status
      userTemplate.value = null
      contModel.value.dialogVisible = false
    }
    const confirm = () => {
       selectConfig.value.dialogVisible = false
    }
    // 输入后返回
    const callContent = (data) => {
      console.log('data', data)
      const content = JSON.stringify(data)
      let showTitle = null
      data.value.forEach(element => {
        if (element.title === '考评内容') {
          showTitle = element
        }
        console.log('element', element)
      })
      const obj = {
        content: content,
        showTitle: showTitle, // 显示使用
        depositoryId: '',
        number: 0,
        score: 0,
        target: '',
        template: userTemplate.value.title,
        templateId: userTemplate.value.id
      }

      evaluateTargetDetailedDtoList.value.push(obj)
      contModel.value.dialogVisible = false
    }

    const handleSelectTmpalte = () => {
      selectConfig.value.dialogVisible = true
      getTemplateLis()
    }
    const handleSelectionChange = (value) => {
      console.log('6666', 6666)
      userTemplate.value = value
    }

    const handleCont = () => {
      contModel.value.dialogVisible = true
    }
    const handleEdit = (row) => {
      rowData.value = row
      contModel.value.dialogVisible = true
    }
    const handleRemove = () => {

    }

    const fn = inuptType === 'add' ? add : modify
    const onSubmit = (formEL) => {
      formEL.$refs.ruleFormRef?.validate((valid) => {
        if (valid) {
          fn(formData.value).then((res) => {
            const { status } = res
            if (status?.code === '0') {
              emit('callBack')
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
      // 组件
      handleResetClick,
      selectQuota,
      selectConfig,
      handleSelectTmpalte,
      getListPage,
      templatePropList,
      handleSelectionChange,
      useTableData,
      pageInfo,
      listTotal,
      cancel,
      confirm,
      userTemplate,
      handleEdit,
      handleRemove,

      contModel,
      handleCont,
      callContent,
      evaluateTargetDetailedDtoList
    }
  }
}
</script>

<style lang="less">
  .myform {
    .el-form-item__content {
      display: block;
    }
  }
</style>
