<!--
 * @Author: kevin
 * @Date: 2022-03-03 13:54:49
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-14 11:36:14
 * @Description: 确认弹框
-->

<template>
  <el-dialog
    v-model="dialog"
    :title="title"
    :draggable="draggable"
    :width="dialogWidth"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <span v-if="message && !isImport">{{ message }}</span>
    <slot></slot>
    <template v-if="isImport">
      <el-row>
        <el-col :span="12" align="center">
          <el-upload
            style="display: inline"
            class="upload-demo"
            :action="importAPI"
            :on-success="onSuccess"
            :headers="{token: getCookie('token')}"
          >
            <el-button type="primary">选择文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                {{ uploadMessage }}
              </div>
            </template>
          </el-upload>
        </el-col>
        <el-col :span="12" align="center">
          <el-link type="primary" :href="templateLInk">模板下载</el-link>
        </el-col>
      </el-row>
    </template>
    <template #footer v-if="isShowFooter">
      <span class="dialog-footer">
        <el-button @click="handleClose" v-if="isShowCancelBtn">Cancel</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'
import { getCookie } from '@/utils/util'
import { ElMessage } from 'element-plus'

export default {
  props: {
    dialogVisible: { // 是否显示
      type: Boolean,
      default: false
    },
    isShowCancelBtn: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: '操作'
    },
    dialogWidth: {
      type: String,
      default: '400px'
    },
    isShowFooter: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: true
    },
    modeType: {
      type: String,
      default: ''
    },
    isImport: {
      type: Boolean,
      default: false
    },
    templateLInk: {
      type: String,
      default: '#'
    },
    uploadMessage: {
      type: String,
      default: '支持Excel，文件大小不能超过4M'
    },
    importAPI: {
      type: String,
      default: ''
    }

  },
  emits: ['cancel', 'callBack'],
  setup (props, { emit, slots }) {
    console.log('props.isShowFooter', props.isShowFooter)
    const dialog = ref(props.dialogVisible)
    const confirm = () => {
       emit('callBack', props.modeType)
    }
    const onSuccess = (res) => {
      console.log('res', res)
      if (res.status.code !== '0') {
        ElMessage.error(res.status.msg)
      }
       ElMessage.success('上传成功！')
    }
    const handleClose = (done) => {
      dialog.value = false
      emit('cancel')
    }
    return {
      dialog,
      handleClose,
      confirm,
      getCookie,
      onSuccess
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
