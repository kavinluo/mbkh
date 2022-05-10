<!--
 * @Author: kevin
 * @Date: 2022-03-31 09:31:12
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-29 17:12:29
 * @Description: 工作台
-->
<template>
  <div>
    <!-- {{ token }} <br>
    counter：{{ counter }}
    <button @click="add">+1</button>
    <button @click="updown">-1</button>
    <br>
    {{ userInfo }}
    {{ useInfo }}<br> -->
    <!-- 模块中中的数据: {{ userInfo }} -->
  </div>
  <el-row>
    <el-col :span="12">
      <div>
        <!-- 地图容器 -->
        <div id="myMap" ref="myMap" class="border"></div>
        <!-- 地图数据 -->
        <div class="mapData">
          <p>
            总&nbsp;考&nbsp;区&nbsp;：<span
              style="color: #008000; font-weight: 400"
            >{{ '123' }}</span
            >
          </p>
          <p>
            优&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;秀&nbsp;：<span
              style="color: #008000; font-weight: 400"
            >{{ '123' }}</span
            >
          </p>
          <p>
            合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;：<span
              style="color: #008000; font-weight: 400"
            >{{ '123' }}</span
            >
          </p>
          <p>
            限期整改：<span style="color: #008000; font-weight: 400">{{
              '123'
            }}</span>
          </p>
          <p>
            最&nbsp;高&nbsp;分&nbsp;：<span
              style="color: #008000; font-weight: 400"
            >{{ '123' }}</span
            >
          </p>
          <p>
            最&nbsp;低&nbsp;分&nbsp;：<span
              style="color: #008000; font-weight: 400"
            >{{ '123' }}</span
            >
          </p>
          <p>
            平&nbsp;均&nbsp;分&nbsp;：<span
              style="color: #008000; font-weight: 400"
            >{{ '123' }}</span
            >
          </p>
        </div>
        <el-card>
          <el-calendar />
        </el-card>
      </div>
    </el-col>
    <el-col :span="12">
      <div>
        <!-- 代办/已办事宜 -->
        <el-card class="doSth">
          <div class="box-card3">
            <p style="color:#65a7fe">代办/已办事宜</p>
            <p>
            </p>
          </div>
          <div class="box-card4">
            <p style="color:#65a7fe">公告</p>
            <span @click="library">指标库</span>
            <span @click="setting">目标设置</span>
            <span>评价结果</span>
            <span>个人评优</span>
          </div>
        </el-card>
        <el-card>
          <div class="box-card2">
            <el-row :gutter="30">
              <el-col :span="6" @click="library">
                <el-icon><kvicon :name="Avatar" /></el-icon> 指标库</el-col
              >
              <el-col :span="6" @click="setting"> 目标设置</el-col>
              <el-col :span="6" @click="evaluation"> 评价结果</el-col>
              <el-col :span="6"> 个人评优</el-col>
            </el-row>
          </div>
        </el-card>
        <!-- echarts图表 -->
        <el-card @click="card">
          <span class="evaluation">评价排名</span>
          <div id="myChart12" class="echart"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { useState, useGetters } from '@/hooks/index'
import { useStore } from 'vuex'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
export default defineComponent({
  setup () {
    const store = useStore()
    const getters = useGetters(['useInfo'])
    const storeStateFns = useState(['counter', 'name'])
    const modulesInfo = useState(['userInfo'], 'user')
    const $router = useRouter()
    const token = computed(() => store.state.Token)
    const updown = function () {
      store.commit('updown')
    }
    const add = function () {
      store.commit('add')
    }
    const { proxy } = getCurrentInstance()
    const chart = ref(null)
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
              normal: {
                opacity: 0,
                label: {
                  show: false
                }
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
        text: '统计分析',
        y: 20,
        textStyle: {
          color: '#4398fe'
        }
      },
      tooltip: {
        trigger: 'item'
      },

      // 配置属性
      series: [
        {
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: false,
          geoIndex: 0,
          label: {
            normal: {
              show: false // 省份名称,
            },
            emphasis: {
              show: false
            }
          },
          data: [
            { name: '北京', value: Math.round(Math.random() * 500) },
            { name: '天津', value: Math.round(Math.random() * 500) },
            { name: '上海', value: Math.round(Math.random() * 500) },
            { name: '重庆', value: Math.round(Math.random() * 500) },
            { name: '河北', value: Math.round(Math.random() * 500) },
            { name: '河南', value: Math.round(Math.random() * 500) },
            { name: '云南', value: Math.round(Math.random() * 500) },
            { name: '辽宁', value: Math.round(Math.random() * 500) },
            { name: '黑龙江', value: Math.round(Math.random() * 500) },
            { name: '湖南', value: Math.round(Math.random() * 500) },
            { name: '安徽', value: Math.round(Math.random() * 500) },
            { name: '山东', value: Math.round(Math.random() * 500) },
            { name: '新疆', value: Math.round(Math.random() * 500) },
            { name: '江苏', value: Math.round(Math.random() * 500) },
            { name: '浙江', value: Math.round(Math.random() * 500) },
            { name: '江西', value: Math.round(Math.random() * 500) },
            { name: '湖北', value: Math.round(Math.random() * 500) },
            { name: '广西', value: Math.round(Math.random() * 500) },
            { name: '甘肃', value: Math.round(Math.random() * 500) },
            { name: '山西', value: Math.round(Math.random() * 500) },
            { name: '内蒙古', value: Math.round(Math.random() * 500) },
            { name: '陕西', value: Math.round(Math.random() * 500) },
            { name: '吉林', value: Math.round(Math.random() * 500) },
            { name: '福建', value: Math.round(Math.random() * 500) },
            { name: '贵州', value: Math.round(Math.random() * 500) },
            { name: '广东', value: Math.round(Math.random() * 500) },
            { name: '青海', value: Math.round(Math.random() * 500) },
            { name: '西藏', value: Math.round(Math.random() * 500) },
            { name: '四川', value: Math.round(Math.random() * 500) },
            { name: '宁夏', value: Math.round(Math.random() * 500) },
            { name: '海南', value: Math.round(Math.random() * 500) },
            { name: '台湾', value: Math.round(Math.random() * 500) },
            { name: '香港', value: Math.round(Math.random() * 500) },
            { name: '澳门', value: Math.round(Math.random() * 500) }
          ] // 数据
        }
      ]
    })
    // 评价排名
    const card = () => {
      $router.push({ path: '/manage/evaluationResults' })
    }
    // 指标库
    const library = () => {
      $router.push({ path: '/manage/quotalibrary' })
    }
    // 目标设置
    const setting = () => {
      $router.push({ path: '/manage/targetSettings' })
    }
    // 评价结果
    const evaluation = () => {
      $router.push({ path: '/manage/assessMent' })
    }
    onMounted(() => {
      console.log(proxy, chart.value, mapOption.value)
      chart.value = proxy.$echarts.init(
        document.getElementById('myMap'),
        'macarons'
      )
      chart.value.setOption(mapOption.value)
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
            data: [
              '北京',
              '上海',
              '石家庄',
              '河北',
              '沈阳',
              '长春',
              '河南',
              '新疆',
              '内蒙古',
              '山东'
            ],
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
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400]
          }
        ]
      })
      // window.onresize = function () { // 自适应大小
      //   myChart.resize()
      // }
    })

    return {
      evaluation,
      setting,
      library,
      card,
      add,
      updown,
      token,
      ...modulesInfo,
      // ...storeState,
      ...getters,
      ...storeStateFns
    }
  }
})
</script>

<style scoped>
.box {
  display: flex;
}
.left {
  width: 1000px;
  height: 500px;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}
.right {
  width: 700px;
}
#myChart12 {
  width: 900px;
  height: 305px;
}
.box-card2 {
  width: 900px;
  height: 184px;
  text-align: center;
}
.doSth {
  display: flex;
}
.box-card3 {
  width: 350px;
  height: 320px;
  margin-left:30px;
  background-color: #cccc;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}
.box-card4 {
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}
#myMap {
  width: 900px;
  height: 600px;
}
.mapData {
  position: absolute;
  left: 43rem;
  top: 19rem;
  width: 200px;
  height: 250px;
  border: 1px solid black;
  margin: 30px 0 0 20px;
  text-align: center;
}
.el-col.el-col-6.is-guttered {
    margin-top: 120px;
}
.evaluation{
  margin-left:50px;
  color:#65a7fe
}
</style>
