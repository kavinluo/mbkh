<!--
 * @Author: kevin
 * @Date: 2022-03-10 17:13:09
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-01 15:39:39
 * @Description: 左侧
-->
<template>
  <div class="my-tree" style="border-right: 3px solid #dce9f4">
    <div style="padding: 0 0 8px;border-bottom:solid #ebeef5 1px;" v-if="showHandle">
      <el-button size="small" type="primary" @click="handleAdd">添加</el-button>
      <el-button size="small" type="warning" :disabled="isSelect" @click="heandleEdit">修改</el-button>
      <el-button size="small" type="danger" :disabled="isSelect" @click="handleRemove">删除</el-button>
    </div>
    <div style="margin: 10px 10px 10px 0" v-if="isShowSearch">
      <el-input v-model="filterText" placeholder="搜索" />
    </div>
    <el-
      ref="treeRef"
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      node-key="id"
      :default-expand-all="false"
      :current-node-key="useCurrentNodeKey"
      :check-on-click-node="checkOnClickNode"
      :highlight-current="true"
      :expand-on-click-node="expandOnClickNode"
      :draggable="true"
      :indent="5"
      @node-click="nodeClick"
      :filter-node-method="filterNode"
    />
  </div>
</template>

<script>
  import { ref, watch } from 'vue'
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
      checkOnClickNode: {
        type: Boolean,
        default: true
      },
      isSelect: {
        type: Boolean,
        default: true
      },
      isShowSearch: {
        type: Boolean,
        default: false
      },
      expandOnClickNode: {
        type: Boolean,
        default: true
      },
      showHandle: {
        type: Boolean,
        default: false
      },
      currentNodeKey: {
        type: [Boolean, String],
        default: false
      }
    },
    emits: ['cancel', 'nodeClick', 'add', 'edit', 'remove'],

    setup (props, { emit }) {
      const treeRef = ref({})
      const filterText = ref('')
      const useCurrentNodeKey = ref()
      const filterNode = (value, treeData) => {
        if (!value) return true
        return treeData.title.includes(value)
      }

      watch(() => props.currentNodeKey,
      (newVal, oldVal) => {
        useCurrentNodeKey.value = newVal
      })
      watch(filterText, (val) => {
        treeRef.value?.filter(val)
      })
      const handleAdd = () => {
        emit('add', treeRef.value.getCurrentNode(), 'add')
      }
      const heandleEdit = () => {
        emit('edit', treeRef.value.getCurrentNode(), 'edit')
      }
      const handleRemove = () => {
        emit('remove', treeRef.value.getCurrentNode(), 'remove')
      }

      const nodeClick = () => {
        console.log(' treeRef.value', treeRef.value.getCurrentNode())
        emit('nodeClick', treeRef.value.getCurrentNode()) // 返回当前选中的节点
      }

      return {
        heandleEdit,
        handleAdd,
        handleRemove,
        nodeClick,
        treeRef,
        useCurrentNodeKey,
        filterNode,
        filterText
      }
    }
  }
</script>
