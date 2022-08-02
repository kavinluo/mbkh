<template>
  <el-calendar ref="calendar">
    <template #header="{ date }">
      <div style="position:absolute; left:40%; top: 10px;">
        <span @click="selectDate('prev-month')"> ＜＜ </span>
        <span>{{ date }}</span>
        <span @click="selectDate('next-month')"> ＞＞ </span>
      </div>
      <!-- <div style="position:absolute; right:20px; top: 4px;">
        <el-button
          type="primary"
          round
          @click="addSchedule"
        ><el-icon style="vertical-align: middle"> <plus /> </el-icon
        >新建日程</el-button
        >
        <el-button>月</el-button>
        <el-button>周</el-button>
        <el-button>日</el-button>
      </div> -->
      <kvDialog v-bind="editDialog" v-model="editDialog.dialogVisible">
        <add @cancel="cancel" />
      </kvDialog>
    </template>
  </el-calendar>
</template>

<script setup>
import { ref } from 'vue'
import { handels } from './config/hook'
import add from './schedule/add.vue'
const calendar = ref()
const selectDate = (val) => {
  calendar.value.selectDate(val)
}

 const {
   editDialog,
  // addSchedule,
  cancel
 } = handels()
</script>

<style scoped lang="less">
:v-deep(.el-calendar__header) {
  display: inline-block;
}
.el-button + .el-button {
  margin: -6px 0 0 0;
}
:v-deep(button.el-button.el-button--primary.is-round) {
    margin-right: 10px;
}
</style>
