<template>
  <div id="myChart12" class="echart"> </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getRanking } from '@/api/statistical.js'

import * as echarts from 'echarts'

 onMounted(() => {
      const echartData = ref([])
      const echateNum = ref([])
      const getRankData = async () => {
      const { data } = await getRanking()
      console.log(data, 'getRanking')
      data.forEach(item => {
        echartData.value.push(item.checkAreaName)
        echateNum.value.push(item.score)
      })
      console.log(echartData)

      // 需要获取到element,所以是onMounted的Hook
      const myChart = echarts.init(document.getElementById('myChart12'))
      // 绘制图表
      myChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: echartData._rawValue,

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
            name: '考区分数',
            type: 'bar',
            barWidth: '60%',
            data: echateNum._rawValue
          }
        ]
      })
         }
    getRankData()
    })
</script>

<style scoped>
#myChart12 {
  width: 100%;
  height: 275px;
}
</style>
