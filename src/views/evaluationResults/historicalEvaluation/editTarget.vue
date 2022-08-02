<!--
 * @Author: kevin
 * @Date: 2022-04-08 16:11:57
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-22 15:03:53
 * @Description: 目标编辑
-->
<template>
  <el-row :gutter="20">
    <el-col :span="10"><h4 style="margin: 0;"> {{ showData.title }}</h4></el-col>
    <el-col :span="9">负责人：{{ formatName(showData) }}</el-col>
    <el-col :span="5" algin="right">总评分：{{ showData.scoreResult }}</el-col>
    <br><br>
    <el-col :span="15">考区：{{ showData.checkAreaName }} &nbsp;&nbsp;  &nbsp;&nbsp; 更新时间：{{ formatTimestamp(showData.updateTime, 'YYYY-MM-DD HH:mm:ss') }}</el-col>
    <el-col :span="9"><div class="grid-content bg-purple" /></el-col>
  </el-row>
  <div class="useTable" style="margin-top: 20px;">
    <table style="width: 100%;">
      <tr>
        <th style="white-space: nowrap;">一级指标</th>
        <th style="white-space: nowrap;">二级指标</th>
        <th style="white-space: nowrap;">考评内容</th>
        <th style="white-space: nowrap;">考评细则</th>
        <th style="white-space: nowrap;">考评方式</th>
        <th style="white-space: nowrap;">分值</th>
        <th style="white-space: nowrap;">扣分原因</th>
        <th style="white-space: nowrap;">自评分</th>
        <!-- <th style="white-space: nowrap;">复评分</th> -->
      </tr>
      <tr v-for="(item, index) in showTableData" :key="index">
        <td> {{ item.firstLevel }}</td>
        <td> {{ item.secondLevel }}</td>
        <td> {{ item.content }}</td>
        <td> {{ item.evaluationRules }}</td>
        <td>
          <!--1 资料上传，2 人员资料 3 实地考察 -->
          <div v-if="item.materialType === 1 || item.materialType === 2 || item.materialType === 3">
            <el-button @click="handelS(index, item.materialType, item.material)" type="primary" size="small">
              <span v-if="item.materialType === 1">资料上传</span>
              <span v-if="item.materialType === 2">人员资料</span>
              <span v-if="item.materialType === 3">实地考察</span>
            </el-button>
          </div>
          <div v-else>
            无
          </div>
        </td>
        <td>
          {{ item.score }} </td>
        <td><el-input v-model="item.reason" style="width: 80px;" /> </td>
        <td> <el-input v-model="item.selfScore" style="width: 80px;" /></td>
      </tr>
    </table>
    <div style="text-align: right; margin-top: 20px;">
      <el-button @click="submitHandle" type="primary">确定</el-button>
      <el-button @click="cancelTargetModle" type="warning">关闭</el-button>
    </div>
    <kvDialog v-bind="fileDialog" v-model="fileDialog.dialogVisible" @callBack="cancelModle">
      <div v-if="materialType === 1">
        <el-upload
          aria-setsize="small"
          class="upload-demo"
          action="/api/file/upload"
          multiple
          :limit="10"
          :on-exceed="handleExceed"
          :on-success="onSuccess"
          :on-remove="onRemove"
          :file-list="showFileList[useIndex]"
        >
          <el-button type="primary" size="small">上传文件</el-button>
          <template #tip>
            <div class="el-upload__tip">最大支持5M
            </div>
          </template>
        </el-upload>
        <table>
        </table>
      </div>
      <div v-show="materialType === 2">
        <kv-table
          :useTableData="accountList"
          :propList="tablePropList"
          :isUseStoreData="false"
          :showIndexColumn="true"
          :tableOtherOption="{
            size: 'small'
          }"
          :useSelectData="useSelectAccount "
          :showSelectColumn="true"
          :showFooter="false"
          @handleSelectionChange="handleSelectionChange">
        </kv-table>
      </div>
      <div v-if="materialType === 3">
        <el-input type="textarea" v-model="showTableData[useIndex].material" placeholder="输入考察内容"></el-input>
      </div>
    </kvDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatTimestamp } from '@/utils/formatDate'
import { getTarget } from '@/api/process'
import { handleFile, formatDataList } from './config/hook'
import { tablePropList } from './config/dataConfig'
const emit = defineEmits(['callBack', 'cancel'])
 const props = defineProps({
    rowData: {
      type: Object,
      default: () => (null)
    }
 })
   const cancelTargetModle = () => {
    emit('callBack')
  }
  const {
    handelS,
    handleExceed,
    onSuccess,
    cancelModle,
    submitHandle,
    onRemove,
    fileDialog,
    showFileList,
    useIndex,
    showTableData,
    materialType,
    accountList,
    handleSelectionChange,
    useSelectAccount
  } = handleFile(cancelTargetModle)

  const showData = ref({})
  const getTargetData = async () => {
    const { data } = await getTarget(props.rowData.id)
    showData.value = data
    showTableData.value = formatDataList(data)
  }
  getTargetData()

  const formatName = (showData) => {
    const name = showData.directorName?.replaceAll(/,null|null,/g, '')
    if (name === 'null') {
      return '-'
    } else return name
  }

  // 获取人员列表

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
