<!--
 * @Author: kevin
 * @Date: 2022-05-11 11:06:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-11 17:57:33
 * @Description: Do not edit
-->
<template>
  <el-row :gutter="20">
    <el-col :span="10"><h4 style="margin: 0;"> {{ showData.title }}</h4></el-col>
    <el-col :span="9">负责人：{{ showData.directorName?.replaceAll('/,null|null,/g', '') }}</el-col>
    <!-- <el-col :span="5" algin="right" v-if="role.userType === 1">总评分：{{ showData.repeatedScore }}</el-col>
    <el-col :span="5" algin="right" v-if="role.userType === 2">总评分：{{ showData.selfScore }}</el-col> -->
    <br><br>
    <el-col :span="15">考区：{{ showData.checkAreaName }} &nbsp;&nbsp;  &nbsp;&nbsp; 更新时间：{{ formatTimestamp(showData.updateTime, 'YYYY-MM-DD HH:mm:ss') }}</el-col>
    <el-col :span="9"><div class="grid-content bg-purple" /></el-col>
  </el-row>
  <el-row>
    <el-col class="ulist">
      <h1 style="display:flex"><span style="flex: 1">考区整体评分</span></h1>
      <el-table border align="center" :data="evaluateSelf">
        <!-- <el-table-column prop="areaSelf" label="考区平均得分" align="center"></el-table-column> -->
        <el-table-column prop="siteAverage" label="考点平均得分" align="center"></el-table-column>
        <el-table-column prop="baseAverage" label="考试基地平均得分" align="center"></el-table-column>
        <el-table-column prop="totalScore" label="总分" align="center"></el-table-column>
        <el-table-column prop="repeatedScore" label="复评分" align="center">
          <template #default="scope">
            <span v-if="rowData.modelType === 'view'">{{ scope.row.repeatedScore }}</span>
            <el-input type="number" v-else :disabled="role.userType !==1" v-model="scope.row.repeatedScore"></el-input>
          </template>
        </el-table-column>

      </el-table>

    </el-col>
  </el-row>
  <el-row v-for="(item, key ) in selfListData" :key="key">
    <!-- 1 暂时不显示 -->
    <el-col v-if="+key !== 1" class="ulist">
      <h1 v-if="key == 1" style="display:flex"><span style="flex: 1">考区自评评分统计表</span><el-button type="primary" v-if="!item.length && role.userType !== 1" size="small" icon="CirclePlusFilled" @click="pushFn(key)" circle /></h1>
      <h1 v-if="key == 2" style="display:flex"><span style="flex: 1">考点自评评分统计表</span><el-button type="primary" v-if="!item.length && role.userType !== 1" size="small" icon="CirclePlusFilled" @click="pushFn(key)" circle /></h1>
      <h1 v-if="key == 3" style="display:flex"><span style="flex: 1">考试基地自评评分统计表</span><el-button type="primary" v-if="!item.length && role.userType !== 1" size="small" icon="CirclePlusFilled" @click="pushFn(key)" circle /></h1>
      <el-table :data="item" border align="center">
        <el-table-column prop="areaName" label="考点名称\考评项目" align="center">
          <template #default="scope">
            <span v-if="rowData.modelType === 'view'">{{ scope.row.areaName }}</span>
            <el-input v-else :disabled="role.userType === 1" v-model="scope.row.areaName"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="prepare" label="考前准备" align="center">
          <template #default="scope">
            <span v-if="rowData.modelType === 'view'">{{ scope.row.prepare }}</span>
            <el-input v-else type="number" :disabled="role.userType === 1" v-model="scope.row.prepare" @change="count(key, scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="implement" label="考试实施" align="center">
          <template #default="scope">
            <span v-if="rowData.modelType === 'view'">{{ scope.row.implement }}</span>
            <el-input v-else type="number" :disabled="role.userType === 1" v-model="scope.row.implement" @change="count(key, scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ending" label="考后收尾" align="center">
          <template #default="scope">
            <span v-if="rowData.modelType === 'view'">{{ scope.row.ending }}</span>
            <el-input v-else type="number" :disabled="role.userType === 1" v-model="scope.row.ending" @change="count(key, scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="secrecy" label="安全保密" align="center">
          <template #default="scope">
            <span v-if="rowData.modelType === 'view'">{{ scope.row.secrecy }}</span>
            <el-input v-else type="number" :disabled="role.userType === 1" v-model="scope.row.secrecy" @change="count(key, scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="discipline" label="考风考纪" align="center">
          <template #default="scope">
            <span v-if="rowData.modelType === 'view'">{{ scope.row.discipline }}</span>
            <el-input v-else type="number" :disabled="role.userType === 1" v-model="scope.row.discipline" @change="count(key, scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="analyse" label="数据分析" align="center">
          <template #default="scope">
            <span v-if="rowData.modelType === 'view'">{{ scope.row.analyse }}</span>
            <el-input v-else type="number" :disabled="role.userType === 1" v-model="scope.row.analyse" @change="count(key, scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="总分" align="center" />
        <el-table-column prop="score" label="操作" align="center" v-if="rowData.modelType !== 'view' && role.userType !== 1">
          <template #default="scope">
            <el-button type="primary" v-if="scope.$index === selfListData[key].length -1" size="small" icon="CirclePlusFilled" @click="pushFn(key)" circle />
            <el-button type="danger" v-if="selfListData[key].length > 0" size="small" @click="deleteFn(key,scope.$index,scope.row)" icon="Delete" circle />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <div style="text-align: right; margin-top: 20px;">
    <!-- 非查看可以提交 -->
    <el-button @click="submitHandle" type="primary" v-if="rowData.modelType !== 'view'">确定</el-button>
    <el-button @click="cancelTargetModle" type="warning">关闭</el-button>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { formatTimestamp } from '@/utils/formatDate'
  import { getTarget } from '@/api/process'
  import { setScoreFn } from './config/setScore'
  // role.userType：1 国家层次，2 基地
  const emit = defineEmits(['callBack', 'cancel'])
  const { rowData } = defineProps({
      rowData: {
        type: Object,
        default: () => (null)
      }
  })

  const cancelTargetModle = () => {
      emit('callBack')
  }
  const {
     selfListData,
     evaluateSelf,
     role,
     pushFn,
     deleteFn,
     count,
     submitHandle
  } = setScoreFn(cancelTargetModle, rowData)
  const showData = ref({})
  const getTargetData = async () => {
    const { data } = await getTarget({ id: rowData.id })
    showData.value = data || {}
  }
  getTargetData()

</script>

<style lang="less" scoped>
 .ulist {
   margin: 20px 0;
   h1 {
     font-size: 18px;
     margin:0 0 10px;
   }
 }
</style>
