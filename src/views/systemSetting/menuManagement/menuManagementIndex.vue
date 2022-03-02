<!--
 * @Author: kevin
 * @Date: 2022-02-24 10:05:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 15:40:23
 * @Description: Do not edit
-->
<template>
  <el-button type="primary" @click="add">添加</el-button>
  <el-button type="danger">删除</el-button>
  <el-button type="primary">添加</el-button>
  <!-- <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="name" label="Name" width="120" />
    <el-table-column property="address" label="Address" show-overflow-tooltip />
  </el-table> -->
  <div style="margin-top: 20px">
    <el-dialog v-model="addModel" :draggable="modelConfig.draggable" :title="modelConfig.title" :width="modelConfig.width">
      <add v-if="addModel" @cancel="cancel" />
    </el-dialog>

  </div>
</template>

<script>
  import { ref } from 'vue'
  import add from './addMenu.vue'
  export default {
    components: {
      add
    },
    setup () {
      const modelConfig = ref({
        title: '添加菜单',
        width: '900px',
        draggable: true
      })

      const addModel = ref(false)
      const multipleTableRef = ref({})
      const multipleSelection = ref({})
      // const toggleSelection = (rows) => {
      //   if (rows) {
      //     rows.forEach((row) => {
      //       // TODO: improvement typing when refactor table
      //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //       // @ts-expect-error
      //       multipleTableRef.value!.toggleRowSelection(row, undefined)
      //     })
      //   } else {
      //     multipleTableRef.value!.clearSelection()
      //   }
      // }
      const handleSelectionChange = (val) => {
        multipleSelection.value = val
      }
      const add = () => {
        addModel.value = true
      }
     const cancel = () => {
       addModel.value = false
      }

      const tableData = []
      return {
        handleSelectionChange,
        multipleTableRef,
        // multipleTableRef,
        tableData,
        modelConfig,
        addModel,
        add,
        cancel

      }
    }
  }
</script>
