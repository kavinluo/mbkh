<!--
 * @Author: kevin
 * @Date: 2022-03-04 11:00:56
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-04 14:18:47
 * @Description: 系统设置
-->
<template>
  <div>
    <!-- 变动超级管理员 (Dynamic Panel) -->
    <el-collapse v-model="activeNames" @change="handleChange">
      <div style="font-size:15px;margin-top:30px">变动超级管理员</div>
      <div style="font-size:14px;color:#999999"> 如果你不想再管理当前系统，你可以选择转让给其他系统管理员，转让之后你将无法再管理当前系统，并且该操作无法撤销。</div>
      <el-collapse-item title="" name="1">
        <div>
          <el-select placeholder="请选择人员" style="width:300px">
            <el-option :value="1">
            </el-option>
          </el-select>
        </div>
        <el-input v-model="input1" class="w-50 m-2" placeholder="输入当前用户密码" style="width:300px;margin-top:15px" />
        <el-button type="primary" @click="ransfer" style="display:block;margin-top:15px">转让系统</el-button>

      </el-collapse-item>

    </el-collapse>
    <el-collapse>
      <div style="font-size:15px;margin-top:30px">多语言</div>
      <div style="font-size:14px;color:#999999"> 设置使用的语言类型</div>
      <el-collapse-item title="" name="1">
        <el-select placeholder="请选择人员">
          <el-option :value="1">
          </el-option>
        </el-select>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input1 = ref('')
const activeNames = ref(['1'])
const handleChange = (val) => {
  console.log(val)
  // console.log('123')
}
const ransfer = () => {
  console.log('123')
}

</script>

<style lang="scss" scoped>
</style>
