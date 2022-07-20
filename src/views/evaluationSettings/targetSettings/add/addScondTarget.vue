<!--
 * @Author: kevin
 * @Date: 2022-04-02 10:27:51
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-15 16:13:43
 * @Description: 新建二级目标
-->
<template>
  <kv-form v-bind="addSubFormConfig" v-model="formData" ref="ruleFormRef">
    <!-- 负责人 -->
    <template #director>
      <el-select
        :disabled="!directorOptions.length || isView"
        style="width: 100%"
        v-model="formData.director"
        multiple
        clearable
        filterable >
        <el-option
          v-for="(option, index) in directorOptions"
          :key="index"
          :value="option.id"
          :label="option.name"></el-option>
      </el-select>
    </template>
    <template #checkArea>
      <el-select
        @change="selectData"
        :disabled="isView"
        style="width: 100%"
        v-model="formData.checkArea"
        multiple
        clearable
        filterable >
        <el-option
          v-for="(option, index) in checkAreaOptions"
          :key="index"
          :value="option?.id"
          :label="option?.name"></el-option>
      </el-select>
    </template>
    <template #evaluate>
      <el-button type="primary" :disabled="isView" size="small" @click="handleAddQuota"><el-icon style="vertical-align: middle"> <plus /> </el-icon></el-button>
    </template>
    <template #footer>
      <div class="useTable">
        <table style="width: 100%;" ref="useTable">
          <tr>
            <th style="white-space: nowrap;">一级指标</th>
            <th style="white-space: nowrap;">二级指标</th>
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
                <el-select v-model="item.cycleId" placeholder="选择周期" :disabled="isView">
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
        </table>
      </div>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" v-if="!isView" @click.prevent="handleAddTarget(ruleFormRef)">确定</el-button>
        <el-button type="warning" v-else @click.prevent="cancel1">关闭</el-button>
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
  <kvDialog v-bind="isRepeatSelect" v-model="isRepeatSelect.dialogVisible" @callBack="repeatConfirm" @cancel="cancel">
    <div>重新选择将覆盖原有数据，是否确定？</div>
  </kvDialog>
</template>

<script setup>
  import { addScondTargetHook } from '../hooks/addScondHook'
  const emit = defineEmits(['callBack'])
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
  const {
    addSubFormConfig,
    tablePropList,
    checkAreaOptions,
    directorOptions,
    selectConfig,
    useTableData,
    showTableData,
    isRepeatSelect,
    handleAddTarget,
    selectData,
    cancel,
    cancel1,
    confirm,
    repeatConfirm,
    handleSelectionChange,
    handleAddQuota,
    ruleFormRef,
    formData,
    useTable,
    isView
  } = addScondTargetHook({ rowData, subRowData, editType, emit })
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
