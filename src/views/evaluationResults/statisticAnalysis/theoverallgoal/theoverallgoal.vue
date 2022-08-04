<!--
 * @Author: kevin
 * @Date: 2022-04-06 10:34:48
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-06 10:34:48
 * @Description:整体目标
-->
<template>
  <div class="box-card">
    <el-tabs class="use-tabs">
      <el-tab-pane label="整体统计分析" :lazy="true">
      </el-tab-pane>
      <div class="bottom-list">
        <div style="display: flex; justify-content: center">
          <div class="t-b-1">考区总平均分</div>
        </div>
        <div style="background: #fff; display: flex; justify-content: center">
          <div class="t-b-2">{{ showData.meanValue }}</div>
        </div>
      </div>
    </el-tabs>
  </div>
  <div class="box-card1">
    <el-tabs class="use-tabs">
      <el-tab-pane label="整体统计分析" :lazy="true">
      </el-tab-pane>
      <el-table :data="showDatas" style="width: 100%">
        <el-table-column prop="coreInterval" label="分数" width="200" align="center" />
        <el-table-column prop="targetSum" label="机构数" width="200" align="center"/>
        <el-table-column prop="proportion" label="占比" align="center" width="200"/>
      </el-table>
    </el-tabs>
    <div ref="chartDomR" class="right"></div>
  </div>
  <div class="box-card" v-if="userInfo.userType === 1">
    <el-tabs class="use-tabs">
      <el-tab-pane
        label="未提交评分（未结束）的目标"
        name="unsubmittedScore"
        :lazy="true"
      >
      </el-tab-pane>
      <div class="bottom-list">
        <div style="background: #f9f9f9; display: flex; justify-content: center">
          <div class="t-b-1">目标总数</div>
          <div class="t-b-1">国家层级 </div>
          <div class="t-b-1">考区层级 </div>
        </div>
        <div style="background: #fff; display: flex; justify-content: center">
          <div class="t-b-2">{{ showData.unSubmitted }}</div>
          <div class="t-b-2">{{ showData.nation }}</div>
          <div class="t-b-2">{{ showData.testArea }}</div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { getquery } from '@/api/statistical.js'
import { useState } from '@/hooks/index'
const { userInfo } = useState(['userInfo'], 'user')
console.log(userInfo.value.userType)
const showData = ref({})
const showDatas = ref([])
const echartsDatas = ref([])
const chartDomR = ref()
onMounted(() => {
  const getData = async () => {
    const { data } = await getquery()
    showData.value = data
    showDatas.value = data.proportion
    echartsDatas.value = showDatas.value.map(item => {
      return { value: item.targetSum, name: item.coreInterval }
    })
    // 需要获取到element,所以是onMounted的Hook
    const myChart = echarts.init(chartDomR.value)
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10
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
          data: echartsDatas.value
        }
      ]
    })
    window.onresize = function () {
      // 自适应大小
      myChart.resize()
    }
  }
  getData()
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
.bottom-list .t-b-1 {
  background: #f9f9f9;
  border: 1px solid #f0f0f0;
  width: 50%;
  height: 50px;
  font-size: 14px;
  text-align: center;
  line-height: 50px;
}
.bottom-list .t-b-2 {
  border: 1px solid #f0f0f0;
  width: 50%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>
