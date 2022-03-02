<!--
 * @Author: kevin
 * @Date: 2022-03-02 11:06:29
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 11:14:40
 * @Description: Dialog
-->
<template>
  <el-dialog v-model="addModel" :draggable='draggable' :title="title" :width="width">
    <slost/>
  </el-dialog>
</template>

<script>
  import { ref } from 'vue'
  export default {
    props: {
      title: {
        type: String,
        default: '操作'
      },
      draggable: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: '50%'
      }
    },
    setup (props) {
      const modelConfig = ref({
        title: props.title,
        width: '660px',
        draggable: true
      })

      const addModel = ref(false)
      const multipleTableRef = ref({})
      const multipleSelection = ref({})

      const handleSelectionChange = (val) => {
        multipleSelection.value = val
      }
      const add = () => {
        addModel.value = true
      }

      const tableData = []
      return {
        handleSelectionChange,
        multipleTableRef,
        // multipleTableRef,
        tableData,
        modelConfig,
        addModel,
        add

      }
    }
  }
</script>
