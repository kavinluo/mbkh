<!--
 * @Author: kevin
 * @Date: 2022-03-25 11:37:20
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-25 17:36:26
 * @Description: 新增考核内容
-->
<template>
  <div>
    <table class="co-table">
      <tr class="th">
        <td v-for="(item, index) in tableData" :key="index">{{ item.title }}</td>
      </tr>
      <tr>
        <td v-for="(item, index) in tableData" :key="index">
          <template v-if="item.attributeType === 'select'">
            <el-select v-model="item.value" class="m-2" :placeholder="item.tips">
              <el-option
                v-for="option in item.options"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </template>
          <el-input v-else :placeholder="item.tips" :type="item.attributeType" v-model="item.value" />
        </td>
      </tr>
    </table>
    <el-row>
      <el-col align="right" style="margin-top: 20px">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button type="warning" @click="cancel">关闭</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import kvDialog from '@/components/kvDialog'
  import { getAttrListPage } from '@/api/template'
  import { useStore } from '@/store'
import Header from '@/layout/header.vue'

  export default {
    components: {
      kvDialog,
        Header
    },
    props: {
      userTemplate: {
        type: Object,
        default: null
      }
    },
    emits: ['change', 'callBack', 'cancel'],
    setup (props, { emit }) {
      const tableData = ref([])
      const total = ref(0)
      const store = useStore()
      store.commit('changerPageSizeStatus', false)
      const formOriginData = {
        templateId: props.userTemplate?.id,
        curPage: 1,
        pageSize: 30
      }
      const formData = ref(formOriginData)
      const getData = async () => {
        const { data = {} } = await getAttrListPage(formData.value)
        format(data.list)
      }
      getData()
      const format = (list) => {
        tableData.value = list.map(item => {
          return {
              title: item.attributeName,
              value: '',
              required: item.required,
              tips: item.tips,
              defaultValue: item.defaultValue,
              attributeType: item.attributeType,
              options: item.attributeType === 'select' ? item.defaultValue.split(';') : ''
          }
        })
      }
      const handleConfirm = () => {
        emit('callBack', tableData)
      }
      const cancel = (row) => {
        emit('cancel')
      }
      const handleSelectionChange = () => {}

      // 创建属性
      const createAttr = (row) => {

      }

      // 添加模板
      const handleAddTemplate = () => {
        emit('change', 'list')
      }

        return {
          tableData,
          handleConfirm,
          total,
          formData,
          cancel,
          handleSelectionChange,
          handleAddTemplate,
          createAttr,
          getAttrListPage
        }
  }
}
</script>

<style lang="less" scoped>
  .co-table {
    width: 100%;
    border: solid #eee 1px;
    border-collapse: collapse;
    .th {
      border: solid #eee 1px;
        background: #dedede;
        font-weight: bold;
    }
    tr {
      td{
        padding: 5px;
      }
    }
  }
</style>
