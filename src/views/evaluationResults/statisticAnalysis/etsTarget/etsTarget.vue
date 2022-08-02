<!--
 * @Author: kevin
 * @Date: 2022-04-06 11:02:23
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-06 11:02:23
 * @Description:考区目标
-->
<template>
  <div class="box-card1">
    <el-tabs class="use-tabs" >
      <el-tab-pane label="整体评分对比" >
      </el-tab-pane>
      <div class="left">
        <p style="margin-top:45px">总&nbsp;考&nbsp;区&nbsp;：<span style="color:#008000;font-weight:400;margin-top:30px">{{ showDatas.sumTestArea }}</span></p>
        <p>优&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;秀&nbsp;：<span style="color:#008000;font-weight:400">{{ showDatas.fine }}</span></p>
        <p>合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;：<span style="color:#008000;font-weight:400">{{ showDatas.eligible }}</span></p>
        <p>限期整改：<span style="color:#008000;font-weight:400">{{ showDatas.change }}</span></p>
        <p>最&nbsp;高&nbsp;分&nbsp;：<span style="color:#008000;font-weight:400">{{ showDatas.highScore }}</span></p>
        <p>最&nbsp;低&nbsp;分&nbsp;：<span style="color:#008000;font-weight:400">{{ showDatas.lowScore }}</span></p>
        <p>平&nbsp;均&nbsp;分&nbsp;：<span style="color:#008000;font-weight:400">{{ showDatas.average }}</span></p>
      </div>
    </el-tabs>
    <div ref="chartColumnar" class="echart"></div>
  </div>
  <div class="box-card">
    <el-tabs class="use-tabs">
      <el-tab-pane label="考区评分明细" >
      </el-tab-pane>
      <el-scrollbar>
        <el-table :data="showData" height="245" style="width: 100%">
          <el-table-column prop="areaName" label="考区" align="center" />
          <el-table-column prop="score" label="考区目标指标评分" align="center"/>
          <el-table-column prop="errorRate" label="差错率" align="center"/>
        </el-table>
      </el-scrollbar>
    </el-tabs>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { getArea } from '@/api/statistical.js'

const showData = ref(null)
const showDatas = ref({})
const echartData = ref([])
const echartDatas = ref([])
const chartColumnar = ref()
onMounted(() => { // 需要获取到element,所以是onMounted的Hook
  const getData = async () => {
    const { data } = await getArea()
      showDatas.value = data
      showData.value = data.infoDtoList
      data.infoDtoList.forEach(item => {
          echartData.value.push(item.areaName)
          echartDatas.value.push(item.score)
    })
    const chartsData = {
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
          data: echartData.value,
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
          name: '考取得分',
          type: 'bar',
          barWidth: 50,
          data: echartDatas.value
        }
      ]
    }
    return chartsData
  }
  getData().then((res) => {
    const myChart = echarts.init(chartColumnar.value)
    myChart.setOption(res)
    window.onresize = function () { // 自适应大小
      myChart.resize()
    }
  })
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
