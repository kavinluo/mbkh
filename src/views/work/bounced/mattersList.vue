<template>
  <div class="box-card3">
    <p style="color: #65a7fe" @click="todo"><img src="@/assets/img/computer.png" alt="" class="images">代办/已办事宜</p>
    <div v-if="watiList.length < 1"><img src="@/assets/img/temporarily.png" style="padding:5% 0 0 10%"></div>
    <div class="handle" v-for="item in watiList.slice(0,3)" :key="item.number">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button type="primary" style="position:absolute;top:30%;left: 10%" @click="handleAddTemplate(item)">办理</el-button>
        </el-col>
        <el-col :span="15">
          <p style="font-weight:700;font-size:15px;line-height: 25px;margin-top:10px" v-html="item.content"></p>
          <p style="font-size:14px;margin-bottom:10px">提交日期:{{ formatTimestamp(item.times, 'YYYY-MM-DD') }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="box-card4">
    <p style="color: #65a7fe" @click="notice"> <img src="@/assets/img/computer.png" alt="" class="images">公告</p>
    <div v-if="unReadList.length === 0"><img src="@/assets/img/temporarily.png" style="padding:5% 0 0 10%"></div>
    <div class="handle" v-for="item in unReadList.slice(0,3)" :key="item.id" >
      <el-row :gutter="20" >
        <el-col :span="8">
          <el-button type="primary" style="position:absolute;top:30%;left: 10%;" @click="handleView(item)">查看</el-button>
        </el-col>
        <el-col :span="15">
          <p style="font-weight:700;font-size:15px;line-height: 25px;margin-top:10px">{{ item.title }}</p>
          <p style="font-size:14px;margin-bottom:10px">提交日期：{{ formatTimestamp(item.times, 'YYYY-MM-DD') }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
  <kvDialog v-bind="handleDialog" v-model="handleDialog.dialogVisible" >
    <editTarget-manage :rowData="subRowData" @callBack="cancel" where="work" />
  </kvDialog>
  <kvDialog v-bind="viewDialog" v-model="viewDialog.dialogVisible">
    <handleAcm-manage :rowData="subRowData1" />
  </kvDialog>
  <kvDialog v-bind="acmDialog" v-model="acmDialog.dialogVisible">
    <handleAcm-manage :rowData="subRowDatas" />
  </kvDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '@/hooks/index'
import { unReadAcceptList } from '@/api/notice.js'
import { formatTimestamp } from '@/utils/formatDate.js'
import { handeles } from '../config/hooks'
import { getwatiList } from '@/api/todoList.js'
import editTargetManage from '@/views/evaluationProcess/alltheTarget/theoverallgoal/editTarget.vue'
import handleAcmManage from './handleAcm.vue'
    const { userInfo } = useState(['userInfo'], 'user')
    const $router = useRouter()
    const getTargetData = async () => {
    const { data } = await getwatiList({ pageSize: 10, curPage: 1 })
       watiList.value = data || []
   }
    getTargetData()
    const role = ref(userInfo.value)
    const unReadAcceptData = async () => {
      const { data } = await unReadAcceptList({ pageSize: 10, curPage: 1 })
       unReadList.value = data.list || []
     }
    if (role.value.id !== 1) {
      unReadAcceptData()
    }
      // 待办
    const todo = () => {
      $router.push({ path: '/manage/alreadyDoMatters' })
    }
         // 公告
    const notice = () => {
      $router.push({ path: '/manage/notice' })
    }
    const handleAddTemplate = (row) => {
      // 跳转到评价过程
      $router.push({
        path: '/manage/alltheTarget',
        query: {
          id: row.detailId,
          where: 'work'
        }
      })
    }

    const {
     handleView,
     cancel,
     subRowData,
     handleDialog,
     acmDialog,
     subRowDatas,
     viewDialog,
     subRowData1,
     watiList,
     unReadList
    } = handeles()
</script>

<style scoped>
.box-card3 {
  height: 310px;
  margin-left: 3.333rem;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  border-right:#94cff2 1px dashed
}
.box-card4 {
  height: 310px;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-left:10px
}
.handle{
  width: 95%;
  margin-top:20px;
  background-color: #f0f5f9;
  line-height:20px
}
.images{
  width:2em;
  height:25px;
  margin-right:5px;
  position:relative;
  top:5px
}
</style>
