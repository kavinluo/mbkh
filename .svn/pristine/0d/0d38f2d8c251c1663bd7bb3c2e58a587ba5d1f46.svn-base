<!--
 * @Author: kevin
 * @Date: 2022-04-06 10:34:48
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-06 10:34:48
 * @Description:整体目标
-->
<template>
  <el-card class="box-card">
    <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
      <el-tab-pane label="整体统计分析" name="statisticalAnalysis">
        <theoverallgoalManage v-if="activeName === 'statisticalAnalysis'" />
      </el-tab-pane>
      <kv-table :propList="targetList" :getDataFn="getListPage" @handleSelectionChange="handleSelectionChange" :showFooter="false" :showIndexColumn="false">
      </kv-table>
    </el-tabs>
  </el-card>
  <el-card class="box-card1">
    <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
      <el-tab-pane label="整体统计分析" name="statisticalAnalysis">
        <theoverallgoalManage v-if="activeName === 'statisticalAnalysis'" />
      </el-tab-pane>
      <kv-table :propList="tableList" :getDataFn="getListPage" @handleSelectionChange="handleSelectionChange" :showFooter="false" :showIndexColumn="false">
      </kv-table>
    </el-tabs>
    <div id="myChart123" class="right"></div>
  </el-card>
  <el-card class="box-card">
    <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
      <el-tab-pane label="未提交评分（未结束）的指标" name="unsubmittedScore">
        <theoverallgoalManage v-if="activeName === 'unsubmittedScore'" />
      </el-tab-pane>
      <kv-table :propList="tableList1" :getDataFn="getListPage" @handleSelectionChange="handleSelectionChange" :showFooter="false" :showIndexColumn="false">
      </kv-table>
    </el-tabs>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { targetList, tableList, tableList1 } from './config/tableConfig.js'
onMounted(() => { // 需要获取到element,所以是onMounted的Hook
  const myChart = echarts.init(document.getElementById('myChart123'))
  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      data: ['0-749', '749-899', '900-1000']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: '0-749' },
          { value: 310, name: '749-899' },
          { value: 234, name: '900-1000' }
        ]
      }
    ]
  })
  window.onresize = function () { // 自适应大小
    myChart.resize()
  }
})

</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card1 {
  width: 1300px;
  display: flex;
}
.right {
  flex: 1;
  width: 350px;
  height: 350px;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  margin: 20px 0 0 100px;
}
.el-table__empty-block {
  height: 100%;
  width: 600px;
}
</style>
