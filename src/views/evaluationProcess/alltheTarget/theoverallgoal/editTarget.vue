<!--
 * @Author: kevin
 * @Date: 2022-04-08 16:11:57
 * @LastEditors: kevin
 * @LastEditTime: 2022-08-02 14:25:29
 * @Description: 目标编辑
-->
<template>
  <el-row :gutter="20">
    <el-col :span="10"><h4 style="margin: 0;"> {{ showData.title }}</h4></el-col>
    <el-col :span="9">负责人：{{ formatName(showData) }}</el-col>
    <el-col :span="5" algin="right" v-if="role.userType === 1">复评总分：{{ showData.repeatedScore }}</el-col>
    <el-col :span="5" algin="right" v-if="role.userType === 2">自评总分：{{ showData.selfScore }}<span v-if="rowData.modelType==='view'"><br/>复评总分：{{ showData.repeatedScore }}</span></el-col>

    <br><br>
    <el-col :span="15">考区：{{ showData.checkAreaName }} &nbsp;&nbsp;  &nbsp;&nbsp; 更新时间：{{ formatTimestamp(showData.updateTime, 'YYYY-MM-DD HH:mm:ss') }}</el-col>
    <el-col :span="9"><div class="grid-content bg-purple" /></el-col>
  </el-row>
  <div class="useTable" style="margin-top: 20px;">
    <table style="width: 100%;" ref="useTable" id="useTable">
      <tr>
        <th style="white-space: nowrap;">一级指标</th>
        <th style="white-space: nowrap;">二级指标</th>
        <template v-for="(item, index) in showTableData" :key="index">
          <template v-if="index === 0">
            <th v-for="s in item.detailedDto" :key="s.id">
              {{ s.templateName }}
            </th>
          </template>
        </template>
        <th style="white-space: nowrap;">指标周期</th>
        <th style="white-space: nowrap;">分值</th>
        <th style="white-space: nowrap;">扣分原因</th>
        <th style="width: 90px;">自评分</th>
        <th style="white-space: nowrap;">复评分</th>
      </tr>
      <template v-for="(item, index) in showTableData" :key="index">
        <tr>
          <td style="text-align: center;">{{ item.quotaName1 }}</td>
          <td style="text-align: center;">{{ item.quotaName2 }}</td>
          <template v-for="(s, i) in item.detailedDto" :key="i">
            <td v-if="s.templateName === '考评方式'">
              <el-button v-if="item.materialType!==0" :disabled="item.isExpired === 1" @click="handelS(index, item.materialType, item.material)" type="primary" size="small">
                <span v-if="item.materialType === 1">资料上传</span>
                <span v-if="item.materialType === 2">人员资料</span>
                <span v-if="item.materialType === 3">实地考察</span>
              </el-button>
              <div v-else>无</div>
            </td>
            <td v-else> {{ s.content }} </td>
          </template>
          <th>{{ item.cycleName }}</th>
          <td>{{ item.score }}</td>
          <td>
            <el-button v-if="rowData.modelType==='view'" @click="handleReason(index)" type="primary" size="small">查看</el-button>
            <el-button :disabled="item.isExpired === 1" v-else @click="handleReason(index)" type="primary" size="small">填写</el-button>
          </td>
          <!-- 自评 -->
          <!-- isExpired 是否在指标周期时间范围内 1 否 -->
          <td align="center" style="width:90px">
            <div v-if="role.userType === 1 || rowData.modelType==='view'">{{ item.selfScore }}</div>
            <el-input :disabled="item.isExpired === 1" v-else v-model="item.selfScore" type="number" @change="count('ZP', item)" style="width: 70px;" />
          </td>
          <!-- 复评 -->
          <td align="center">
            <div v-if="role.userType !== 1||rowData.modelType==='view'">{{ item.repeatedScore }}</div>
            <el-input :disabled="item.isExpired === 1" v-else type="number" v-model="item.repeatedScore" @change="count('FP', item)" style="width:70px;" />
          </td>
        </tr>
      </template>
    </table>
    <div style="text-align: right; margin-top: 20px;">
      <!-- 非查看可以提交 -->
      <el-button @click="submitHandle" v-if="rowData.modelType==='edit'" type="primary">确定</el-button>
      <el-button @click="cancelTargetModle" type="warning">关闭</el-button>
    </div>
    <kvDialog v-bind="reasonDialog" v-model="reasonDialog.dialogVisible" @callBack="cancelModle">
      <el-form :inline="false" label-width="140px">
        <el-form-item label="考区扣分原因：">
          <div v-if="role.userType === 1 || rowData.modelType==='view'">{{ showTableData[useIndex].reason || '-' }}</div>
          <el-input v-else type="textarea" placeholder="填写扣分原因" style="width: 90%" v-model="showTableData[useIndex].reason"></el-input>
        </el-form-item>
        <el-form-item label="管理员扣分原因：">
          <div v-if="role.userType !== 1 || rowData.modelType==='view'">{{ showTableData[useIndex].adminReason || '-' }}</div>
          <el-input type="textarea" v-else placeholder="填写扣分原因" style="width: 90%" v-model="showTableData[useIndex].adminReason"></el-input>
        </el-form-item>
      </el-form>

    </kvDialog>
    <kvDialog v-bind="fileDialog" v-model="fileDialog.dialogVisible" @callBack="cancelModle">
      <div v-if="materialType === 1">
        <el-upload
          v-if="rowData.modelType !=='view'"
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
        <div v-else>
          <template v-if="showFileList[useIndex].length">
            <p v-for="(link,x) in showFileList[useIndex]" :key="x" style="line-height: ;1.4">
              <el-link :download="link.name" :href="host + link.url" target="_blank"> {{ link.name }}</el-link>
            </p>
          </template>
          <p v-else> {{ showFileList[useIndex]?.length ? showFileList[useIndex] : '无' }}</p>
        </div>
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
        <div v-if="rowData.modelType==='view'">{{ showTableData[useIndex].material || '-' }}</div>
        <el-input v-else type="textarea" v-model="showTableData[useIndex].material" placeholder="输入考察内容"></el-input>
      </div>
    </kvDialog>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useStore } from '@/store'
  import { formatTimestamp } from '@/utils/formatDate'
  import { handleFile } from './config/hook'
  import { useState } from '@/hooks/index'
  import { tablePropList } from './config/dataConfig'
  // role.userType：1 国家层次，2 基地
  const emit = defineEmits(['callBack'])
  const { where, rowData } = defineProps({
      rowData: {
        type: Object,
        default: () => (null)
      },
      // work 工作台 proc 评价过程
      where: {
        type: String,
        default: null
      }
  })
  const store = useStore()
  const host = computed(() => store.state.HOST)
  const { userInfo } = useState(['userInfo'], 'user')
  const role = ref(userInfo.value)
  const {
    handelS,
    handleExceed,
    onSuccess,
    cancelModle,
    submitHandle,
    onRemove,
    handleSelectionChange,
    count,
    handleReason,
    cancelTargetModle,
    fileDialog,
    reasonDialog,
    showFileList,
    useIndex,
    showTableData,
    materialType,
    accountList,
    useSelectAccount,
    showData,
    useTable
  } = handleFile({ emit, where, rowData, role })

  const formatName = (showData) => {
    const name = showData.directorName?.replaceAll(/,null|null,/g, '')
    if (name === 'null') {
      return '-'
    } else return name
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
