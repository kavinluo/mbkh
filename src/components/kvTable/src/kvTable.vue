<!--
 * @Author: kevin
 * @Date: 2022-03-07 10:20:25
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-09 17:40:03
 * @Description: table 封装
-->
<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    v-bind="tableOtherOption"
    row-key="id"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" v-if="showSelectColumn" />
    <el-table-column type="index" label="序号" width="100" v-if="showIndexColumn">
      <template #default="scope">
        {{ (pageInfo.curPage - 1) * pageInfo.pageSize + scope.$index + 1 }}
      </template>
    </el-table-column>
    <template v-for="item in propList" :key="item.prop">
      <el-table-column v-bind="item" align="center" show-overflow-tooltip>
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
        :current-page="pageInfo.curPage"
        :page-size="pageInfo.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
      >
      </el-pagination>
    </slot>
  </div>
</template>
 <script>
 import store from '@/store'
 export default {
  name: 'KvTable',
  props: {
     tableData: {
       type: Array,
       default: () => ([]),
       required: true
     },
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
     pageInfo: {
      type: Object,
      default: () => ({ curPage: 1, pageSize: 10 })
    },
    listTotal: {
      type: Number,
      default: 0
    },
    tableOtherOption: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleSelectionChange', 'update:pageInfo'],
  setup (props, { emit }) {
     const handleSelectionChange = () => {

     }
     const handleSizeChange = (pageSize) => {
       console.log('pageSize', pageSize)
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
       handleCurrentChange
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
</style>
