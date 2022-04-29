<!--
 * @Author: kevin
 * @Date: 2022-04-06 11:02:23
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-06 11:02:23
 * @Description:考区目标
-->
<template>
  <el-card class="box-card1">
    <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
      <el-tab-pane label="整体评分对比" name="overallScorecomparison">
        <theoverallgoalManage v-if="activeName === 'overallScorecomparison'" />
      </el-tab-pane>
      <div class="left">
        <p>总&nbsp;考&nbsp;区&nbsp;：<span style="color:#008000;font-weight:400">{{ '123' }}</span></p>
        <p>优&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;秀&nbsp;：<span style="color:#008000;font-weight:400">{{ '123' }}</span></p>
        <p>合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;：<span style="color:#008000;font-weight:400">{{ '123' }}</span></p>
        <p>限期整改：<span style="color:#008000;font-weight:400">{{ '123' }}</span></p>
        <p>最&nbsp;高&nbsp;分&nbsp;：<span style="color:#008000;font-weight:400">{{ '123' }}</span></p>
        <p>最&nbsp;低&nbsp;分&nbsp;：<span style="color:#008000;font-weight:400">{{ '123' }}</span></p>
        <p>平&nbsp;均&nbsp;分&nbsp;：<span style="color:#008000;font-weight:400">{{ '123' }}</span></p>

      </div>
    </el-tabs>
    <div id="myChart12" class="echart"></div>

  </el-card>
  <el-card class="box-card">
    <el-tabs v-model="activeName" class="use-tabs" @tab-click="handleClick">
      <el-tab-pane label="考区评分明细" name="examination">
        <theoverallgoalManage v-if="activeName === 'examination'" />
      </el-tab-pane>
      <kv-table :propList="targetList" :getDataFn="getListPage" @handleSelectionChange="handleSelectionChange" :showFooter="false" :showIndexColumn="false">
      </kv-table>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { targetList } from './config/tableConfig.js'
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => { // 需要获取到element,所以是onMounted的Hook
  const myChart = echarts.init(document.getElementById('myChart12'))
  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  })
  // window.onresize = function () { // 自适应大小
  //   myChart.resize()
  // }
})

</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card1 {
  display: flex;
}
.echart {
  height: 400px;
  width: 1300px;
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
}
.left {
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  width: 200px;
  height: 300px;
  border: 1px solid black;
  margin: 30px 0 0 20px;
  text-align: center;
}
p {
  font-weight: 700;
}
</style>
