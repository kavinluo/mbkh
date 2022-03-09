<!--
 * @Author: kevin
 * @Date: 2022-03-03 13:54:49
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-04 16:21:31
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
    <span v-if="message">{{ message }}</span>
    <slot></slot>
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
// import { ElMessageBox } from 'element-plus'
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
    }

  },
  emits: ['cancel', 'callBack'],
  setup (props, { emit, slots }) {
    const dialog = ref(props.dialogVisible)
    const confirm = () => {
       emit('callBack')
    }
    const handleClose = (done) => {
      dialog.value = false
      emit('cancel')
    }
    return {
      dialog,
      handleClose,
      confirm
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
