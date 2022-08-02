<!--
 * @Author: kevin
 * @Date: 2022-05-06 09:54:36
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-19 14:28:01
 * @Description: 工作台首页
-->
<template>
  <el-row>
    <el-col :span="12">
      <div class="mapChart">
        <!-- 地图容器 -->
        <checharts-manage/>
        <!-- 地图数据 -->
        <div class="mapData">
          <mapdata-manage/>
        </div>
      </div>
      <!-- 日程表 -->
      <div>
        <span style="font-size:20px;color:#4b9cfe;margin-left:20px;cursor: pointer;" @click="calenDar"><img src="@/assets/img/computer.png" alt="" class="images">日程表</span>
        <div class="calendar" @click="calenDar">
          <div class="time-bottom">
            <div class="week">
              <span v-for="(item,index) in weeks" :key="index">{{ item }}</span>
            </div >
            <div class="day">
              <span v-for="(item,index) in date" :key="index" class="dayitem">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div>
        <!-- 代办/已办事宜 -->
        <div class="doSth">
          <matterslist-manage/>
        </div>
        <!-- 评价指标 -->
        <div>
          <div class="box-card2">
            <el-row :gutter="10">
              <el-col :span="6" @click="library" class="library" v-if="role.id === 1"><p><img src="@/assets/img/library.png"></p>指标库</el-col >
              <el-col :span="6" @click="setting" class="library" v-if="role.id === 1"><p><img src="@/assets/img/Goalsetting.png"></p>目标设置</el-col>
              <el-col :span="6" @click="evaluation" class="library"><p><img src="@/assets/img/evaluation.png"></p>评价结果</el-col>
              <el-col :span="6" class="library"><p><img src="@/assets/img/Personal.png"></p>个人评优</el-col>
            </el-row>
          </div>
        </div>
        <!-- echarts图表 -->
        <div @click="card">
          <span class="evaluation" style="cursor: pointer;"><img src="@/assets/img/computer.png" alt="" class="images">评价排名</span>
          <rankingecharts-manage/>
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script setup>
import chechartsManage from './bounced/chEcharts.vue'
import rankingechartsManage from './bounced/rankingEcharts.vue'
import mapdataManage from './bounced/mapData.vue'
import matterslistManage from './bounced/mattersList.vue'
import { useState } from '@/hooks/index'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
    const { userInfo } = useState(['userInfo'], 'user')
    const $router = useRouter()
    const weeks = ref(['周日', '周一', '周二', '周三', '周四', '周五', '周六'])
    const date = ref(['01', '02', '03', '04', '05', '06', '07'])
    const role = ref(userInfo.value)
    // 评价排名
    const card = () => {
      $router.push({ path: '/manage/statisticAnalysis' })
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
     // 日程表
    const calenDar = () => {
      $router.push('/manage/calenDar')
    }
</script>

<style scoped>

.box-card2 {
  width: 50em;
  height: 170px;
  text-align: center;
  margin-left: 25px;
}
.doSth {
  display: flex;
}
.mapchart {
  display:flex;
  width:100%
}
.mapData {
  position: absolute;
  left: 37%;
  top: 19em;
  width: 10%;
  height: 14.417em;
  border: 1px solid black;
  margin: 30px 0 0 30px;
  text-align: center;
}
.el-col.el-col-6.is-guttered {
  margin-top: 1.042rem;
}
.evaluation {
  margin-left: 80px;
  color: #65a7fe;
}

.calendar{
	padding:0.75rem 0.75rem 0rem;
	text-align:center;
	margin-bottom:0.75rem;
}
.week,.day {
	text-align:left;
	display:flex;
	justify-content:center;
	align-items:center;
}
.week span {
	flex:1;
	color:#8A8A8A;
	font-size:0.75rem;
  text-align: center;
}
.week {
  height: 50px;
  background-color: #f3f3f3;

}
.day span {
	flex:1;
}
.day{
  height: 50px;

}
.dayitem {
	width:1.2rem;
	height:1.2rem;
	border-radius:50%;
	color:#838385;
	font-size:0.75rem;
	display:inline-block;
	line-height:1.2rem;
}
.library{
  color:#6d6d6d;
  cursor: pointer;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.images{
  width:30px;
  height:25px;
  margin-right:5px;
  position:relative;
  top:5px
}
.mapChart{
  width: 100%;
}
</style>
