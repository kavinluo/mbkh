<!--
 * @Author: kevin
 * @Date: 2022-04-02 10:27:51
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-29 11:06:23
 * @Description: 新建二级目标
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
      <div class="useTable">
        <table style="width: 100%;">
          <tr>
            <th style="white-space: nowrap;">一级指标</th>
            <th style="white-space: nowrap;">二级指标</th>
            <!-- <template v-for="(item, key, index) in showTableData" :key="index">
              <template v-for="(sub, x) in item" :key="x">
                <template v-if="x === 0">
                  <th v-for="s in sub.detailedDto" :key="s.id" style="white-space: nowrap;">
                    {{ s.templateName }}
                  </th>
                </template>
              </template>
            </template> -->
            <template v-for="(item, index) in showTableData" :key="index">
              <template v-if="index === 0">
                <th v-for="s in item.detailedDto" :key="s.id" style="white-space: nowrap;">
                  {{ s.templateName }}
                </th>
              </template>
            </template>
            <th style="white-space: nowrap;">指标周期</th>
            <th style="white-space: nowrap;">分值</th>
            <th style="white-space: nowrap;">扣分原因</th>
            <th style="white-space: nowrap;">自评分</th>
            <th style="white-space: nowrap;">复评分</th>
          </tr>
          <template v-for="(item, index) in showTableData" :key="index">
            <tr>
              <td>{{ item.quotaName1 }}</td>
              <td>{{ item.quotaName2 }}</td>
              <template v-for="(s, i) in item.detailedDto" :key="i">
                <td> {{ s.content }} </td>
              </template>
              <td>
                <el-select v-model="item.cycleId" placeholder="选择周期">
                  <el-option
                    v-for="option in item.options"
                    :key="option.id"
                    :label="option.title"
                    :value="option.id"
                  />
                </el-select>
              </td>
              <td>{{ item.score }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </template>
          <!-- <template v-for="(item, key, index) in showTableData" :key="index">
            <tr v-for="(sub, x) in item" :key="x">
              <td>{{ sub.quotaName1 }}</td>
              <td>{{ sub.quotaName2 }}</td>
              <template v-for="(s, i) in sub.detailedDto" :key="i">
                <td> {{ s.content }} </td>
              </template>
              <td>
                <el-select v-model="sub.cycleId" placeholder="选择周期">
                  <el-option
                    v-for="option in sub.options"
                    :key="option.id"
                    :label="option.title"
                    :value="option.id"
                  />
                </el-select>
              </td>
              <td>{{ sub.score }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </template> -->
        </table>
      </div>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click.prevent="handleAddTarget(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </kv-Form>
  <!-- '选择考核内容' -->
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
  import { ref } from 'vue'
  import {
    addSubFormConfig,
    cascaderProps,
    selectModelConfig,
    tablePropList
  } from '../config/dataConfig'
  import { add, getList } from '@/api/target'
  import { getCycle, getQuotaLis, formatTableData, formatSelectQuotaList } from '../hooks/hooks'
  import { depositoryList } from '@/api/cycle'
  const cyListOption = ref([])
  const { rowData, subRowData, editType } = defineProps({
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
  // 指标周期
  const fy = async () => {
    const { data } = await depositoryList()
    cyListOption.value = data
  }
  fy()
  const emit = defineEmits(['callBack'])
  const selectConfig = ref(selectModelConfig)
  const ruleFormRef = ref({})
  const showTableData = ref([])
  const evaluateTargetDtoList = ref([])

  // 目标周期列表
  const formData = ref(getCycle(rowData))
  const useTableData = ref([]) // 获得选择考核内容列表

  // 获得选择考核内容列表
  getQuotaLis().then(res => {
    useTableData.value = formatSelectQuotaList(res, cyListOption.value)
  })
  const handleAddQuota = () => {
    selectConfig.value.dialogVisible = true
  }
  formData.value.cycle1 = rowData.id

  const handelChanger = (row) => {}
  if (editType === 'edit') {
    getList({ id: subRowData.id }).then(res => {
      const { checkArea, director } = res.data
      res.data.checkArea = checkArea.split(',').map(item => +item)
      res.data.director = director.split(',').map(item => +item)
      formData.value = res.data
      const ulist = formatSelectQuotaList(res.data.targetInfoDtoList, cyListOption.value)
      handleSelectionChange(ulist, cyListOption.value, 'edit')
    })
  }
  // 选择
  const handleSelectionChange = (selectData, cyList, Type) => {
    const type = Type || 'add'
    const Option = cyList || cyListOption.value //
    const { objList, tableData } = formatTableData(selectData, Option, type)
    console.log('objList', objList)
    // showTableData.value = objList
     showTableData.value = tableData
  }
  const confirm = (tyy) => {
    selectConfig.value.dialogVisible = false
  }
  const cancel = () => {
    evaluateTargetDtoList.value = []
    selectConfig.value.dialogVisible = false
  }

  const fn = add // props.editType === 'edit' ? modify : add // 修改和添加使用同一个接口
  const handleAddTarget = (ruleFormRef) => {
    ruleFormRef.$refs.ruleFormRef?.validate((valid) => {
      if (valid) {
        const { checkArea = [], director = [] } = formData.value
        // let list = []
        // Object.keys(showTableData.value).forEach(item => {
          showTableData.value.forEach(_ => {
            _.options.forEach(option => {
              if (_.cycleId === option.id) { // 给周期选择后的
                _.cycleName = option.title
              }
            })
          })
          // list = list.concat(showTableData.value[item])
        // })
        const params = {
          checkArea: checkArea.join(','),
          director: director.join(','),
          targetInfoDtoList: showTableData.value
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

<style lang="less" scoped>
 .useTable {
   table {
     width: 100%;
     border-collapse: collapse;
   }
   td, th{
     padding: 8px 6px;
     border: 1px solid #dcdfe6;
     line-height: 1.4;
   }
 }
</style>
