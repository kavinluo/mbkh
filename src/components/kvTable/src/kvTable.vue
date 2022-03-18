<!--
 * @Author: kevin
 * @Date: 2022-03-07 10:20:25
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-18 15:24:29
 * @Description: table 封装
-->
<template>
  <el-table
    class="kv-table"
    ref="multipleTableRef"
    :data="tableData"
    v-bind="tableOtherOption"
    row-key="id"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" v-if="showSelectColumn" />
    <el-table-column type="index" label="序号" align="center" width="80" v-if="showIndexColumn">
      <template #default="scope">
        {{ (pagination.curPage - 1) * pagination.pageSize + scope.$index + 1 }}
      </template>
    </el-table-column>
    <template v-for="item in propList" :key="item.prop">
      <el-table-column v-bind="item" align="center">
        <template #default="scope">
          <slot :name="item.slotName" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="table-footer" v-if="showFooter">
    <slot name="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.curPage"
        :page-size="pagination.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </slot>
  </div>
</template>
 <script>
//  import store from '@/store'
 import { useStore } from '@/store'
 import { computed, watch } from 'vue'
 export default {
  name: 'KvTable',
  props: {
    //  tableData: {
    //    type: Array,
    //    default: () => ([]),
    //    required: true
    //  },
     propList: {
       type: Array,
       required: true
     },
     showIndexColumn: { // /是否显示 序号列
       type: Boolean,
       default: true
     },
     showSelectColumn: { // 是否显示选择列
       type: Boolean,
       default: false
     },
     showFooter: { // 是否显示页脚分页
       type: Boolean,
       default: true
     },
    //  pageInfo: {
    //   type: Object,
    //   default: () => ({ curPage: 1, pageSize: 10 })
    // },
    // listTotal: {
    //   type: Number,
    //   default: 0
    // },
    tableOtherOption: {
      type: Object,
      default: () => ({})
    },
    getDataFn: { // 请求列表数据的方法
      type: Function,
      default: () => {}
    },
    formData: { // 默认需要的参数
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleSelectionChange'],
  setup (props) {
    const store = useStore()
    const tableData = computed(() => store.state.tableData)
    const total = computed(() => store.state.total)
    const pagination = computed(() => store.state.pagination)
    watch(pagination.value, () => {
      // 阻止点击菜单重置时再次请求
      if (pagination.value.curPage !== 1 || pagination.value.pageSize !== 10) {
        getList()
      }
    })
    const getList = async () => {
      store.dispatch('getListPage', { fn: props.getDataFn, params: props.formData })
    }
    getList()

    const handleSelectionChange = () => {

    }
     const handleSizeChange = (pageSize) => {
       store.dispatch('changerPageSize', pageSize)
      // emit('update:pageInfo', { ...props.pageInfo, pageSize })
     }
     const handleCurrentChange = (curPage) => {
       console.log('currentPage', curPage)
       store.dispatch('changerCurrentPage', curPage)
      // emit('update:pageInfo', { ...props.pageInfo, curPage })
     }
     return {
       handleSelectionChange,
       handleSizeChange,
       handleCurrentChange,
       tableData,
       total,
       pagination
     }
  }
 }
 </script>
<style lang="less">
  .table-footer {
    text-align: right;
    margin-top: 15px;
    display: flex;
    .el-pagination {
      margin-left: auto
    }
  }
  .kv-table {
    border-top: solid #ebeef5 1px;
  }
</style>
