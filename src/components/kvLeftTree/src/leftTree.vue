<!--
 * @Author: kevin
 * @Date: 2022-03-10 17:13:09
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-14 10:56:01
 * @Description: 左侧
-->
<template>
  <div class="my-tree" style="border-right: 3px solid #dce9f4">
    <div style="padding: 0 0 8px;border-bottom:solid #ebeef5 1px;" v-if="showHandle">
      <el-button size="small" type="primary" @click="handleAdd">添加</el-button>
      <el-button size="small" type="warning" :disabled="isSelect" @click="heandleEdit">修改</el-button>
      <el-button size="small" type="danger" :disabled="isSelect" @click="handleRemove">删除</el-button>
    </div>
    <el-tree
      ref="treeRef"
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      node-key="id"
      :default-expand-all="false"
      :check-on-click-node="true"
      :highlight-current="true"
      :expand-on-click-node="false"
      :draggable="true"
      :indent="5"
      icon="circle-plus"
      @node-click="nodeClick"
    />
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    props: {
      treeData: {
        type: Array,
        default: () => ([])
      },
      defaultProps: {
        type: Object,
        default: () => ({
          children: 'children',
          label: 'name'
        })
      },
      isSelect: {
        type: Boolean,
        default: true
      },
      showHandle: {
        type: Boolean,
        default: false
      }
    },
    emits: ['cancel', 'nodeClick', 'add', 'edit', 'remove'],

    setup (props, { emit }) {
      const treeRef = ref({})

      console.log('treeData', props)

      const handleAdd = () => {
        emit('add', treeRef.value.getCurrentNode())
      }
      const heandleEdit = () => {
        emit('edit', treeRef.value.getCurrentNode())
      }
      const handleRemove = () => {
        emit('remove', treeRef.value.getCurrentNode())
      }

      const nodeClick = () => {
        emit('nodeClick', treeRef.value.getCurrentNode()) // 返回当前选中的节点
      }

      return {
        heandleEdit,
        handleAdd,
        handleRemove,
        nodeClick,
        treeRef
      }
    }
  }
</script>
