<template>
  <div ref="myMap" class="border"></div>
</template>

<script setup>
import { ref } from 'vue'
import * as echarts from 'echarts'
import china from '@/utils/chinaChange.json'
import { getRanking } from '@/api/statistical.js'
echarts.registerMap('china', china)
 const newChinaData = ref([])
 const getRankData = async () => {
    const { data } = await getRanking()
    data.forEach((item) => {
    item.name = item.checkAreaName.replace('省', '')
    item.name = item.name.replace('市', '')
    item.value = item.score
    delete item.checkAreaName
    delete item.ranking
    delete item.score
    newChinaData.value.push(item)
 })
 }

 getRankData().then(res => {
   chart.value = echarts.init(myMap.value, 'macarons')
    chart.value.setOption(mapOption.value)
 })
// 中国地图
const mapOption = ref({
  backgroundColor: '#FFFFFF',
  geo: {
    map: 'china',
    roam: false,
    zoom: 1.2,
    scaleLimit: { min: 0, max: 50 }, // 缩放级别
    regions: [
      {
        name: '南海诸岛',
        value: 0,
        itemStyle: {
          opacity: 0,
          label: {
            show: false
          }
        }
      }
    ],
    itemStyle: {
      areaColor: '#BEDAEE', // 默认的地图板块颜色
      borderWidth: 1,
      borderColor: '#a597c5'
    }
  },
  title: {
    text: '{a|} 统计分析',
    y: 20,
    x: 15,
    textStyle: {
      color: '#4398fe',
      fontSize: 20,
      rich: {
        a: {
          // 这样设定 backgroundColor 就可以是图片了。
          align: 'left',
          backgroundColor: {
            image: require('@/assets/img/computer.png')
          },
          // 可以只指定图片的高度，从而图片的宽度根据图片的长宽比自动得到。
          height: 23
        }
      }
    }
  },
  tooltip: {
    trigger: 'item'
  },

  // 配置属性
  series: [
    {
      name: '评分',
      type: 'map',
      roam: false,
      geoIndex: 0,
      label: {
        show: true, // 省份名称,
        emphasis: {
          show: false
        }
      },
      data: newChinaData.value// 数据
    }
  ]
})
const chart = ref(null)
const myMap = ref()

</script>

<style scoped>
.border {
  flex: 1;
  width: 100%;
  height: 600px;
}
</style>
