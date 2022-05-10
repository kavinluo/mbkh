/*
 * @Author: kevin
 * @Date: 2022-05-06 16:02:25
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-09 16:23:17
 * @Description: Do not edit
 */
import { ref } from 'vue'
import { editModelConfig, removeModelConfig, typeModelConfig } from './dialogConfig'
import { searchConfig } from './dataConfig'
import { getRoleList } from '@/api/organization'
import { add, modify, get, top, acceptListPage, releaseListPage, noticeTypeList, noticeTypeAdd, noticeTypeModify } from '@/api/notice'
import { useStore, updateList } from '@/store'
import formConfig from './addFormConfig'
const status = ref({
  0: '未发布 ',
  1: '已发布',
  2: '已读'
})
const rowData = ref({})
const editType = ref('add')
const tableData = ref()
   // 获取类别
  const getTypeList = async () => {
  const { data } = await noticeTypeList({
    pageSize: 50,
    curPage: 1
  })
  console.log('data---', data)
  tableData.value = data.list
}
getTypeList()

export const handels = () => {
  const removModelConfig = ref(removeModelConfig)
  const store = useStore()
  const formData = ref({ title: '' })
  const editDialog = ref(editModelConfig)
  const handleEdit = (row, type) => {
    editDialog.value.dialogVisible = true
    rowData.value = row
    editType.value = type
  }
  const onSubmit = () => {
    store.dispatch('getListPage', { fn: acceptListPage, params: formData.value })
  }
  const cancel = () => {
    editDialog.value.dialogVisible = false
  }
  const callBack = () => {
    cancel()
    updataListFn()
  }
  const addHandle = (type) => {
    editType.value = type
    editDialog.value.dialogVisible = true
  }
  const handlePublish = (row, annouce) => {
    annouce(row.id).then(res => {
      updataListFn()
    })
  }
  const handleRemove = (row) => {
    removModelConfig.value.dialogVisible = true
    removModelConfig.value.params = row.id
    removModelConfig.value.baseURL = '/notice'
  }
  const confirm = () => {
    removModelConfig.value.dialogVisible = false
    updataListFn()
  }
  // 置顶
  const handleTop = (row) => {
    top(row.id).then(res => {
      updataListFn()
    })
  }
  const updataListFn = () => {
    updateList(releaseListPage, { title: formData.value.title })
  }

  return {
    handleEdit,
    searchConfig,
    status,
    onSubmit,
    editDialog,
    addHandle,
    formData,
    handleTop,
    cancel,
    callBack,
    confirm,
    handleRemove,
    removModelConfig,
    handlePublish,
    rowData,
    editType
  }
}

//  添加、编辑公告相关
export const addHandels = (editType, row, emit) => {
  const menuList = ref([])
  const formItems = formConfig?.formItems ?? []
  const formOriginData = {}
  for (const item of formItems) {
    formOriginData[item.field] = ''
  }
  const formData = ref(formOriginData)
  formData.value.top = 1// 设置是否置顶 0 否 1 是
  if (editType === 'edit') {
    console.log('编辑', row)
    // 获得单个公告
    get(row.id).then(res => {
      formData.value = res.data
      formData.value.checkArea = res.data.checkArea?.split(',')
      if (formData.value.checkArea?.length) {
        formData.value.checkArea = formData.value.checkArea.map(x => +x)
      }
    })
  }

  const fn = editType === 'add' ? add : modify
  const onSubmit = (ref) => {
    const params = Object.assign({}, formData.value)
    params.checkArea = params.checkArea.join(',')
    fn(params).then(res => {
      emit('callBack')
    })
  }
  const ruleFormRef = ref()
  const getl = async () => {
    const { data } = await getRoleList()
    console.log('data', data)
    menuList.value = data
  }
  getl()

  return {
    formData,
    menuList,
    onSubmit,
    status,
    tableData,
    formConfig,
    ruleFormRef
  }
}

//  分类管理
export const typeHandle = () => {
  const editType = ref('add')
  const formData = ref({
    typeName: ''
  })
  const typeDialog = ref(typeModelConfig)
  const removModelConfig = ref(removeModelConfig)

  // const typeList
  const showTypeModel = () => {
    typeDialog.value.dialogVisible = true
  }

  // 添加分类
  const addType = () => {}
  const handleRemove = (row) => {
    removModelConfig.value.dialogVisible = true
    removModelConfig.value.params = row.id
    removModelConfig.value.baseURL = '/noticeType'
  }
  const confirm = () => {
    console.log('66678768', 66678768)
    removModelConfig.value.dialogVisible = false
    getTypeList(noticeTypeList)
  }
  const handleAdd = (Type) => {
    if (Type === 'edit') {
      console.log('formData.value', formData.value)
      console.log('editType', Type)
      noticeTypeModify(formData.value).then(res => {
        formData.value.typeName = ''
        editType.value = 'add'
        getTypeList()
      })
    } else {
      noticeTypeAdd(formData.value).then(res => {
        formData.value.typeName = ''
        getTypeList(noticeTypeList)
      })
    }
  }
  const handleEdit = (type, row) => {
    editType.value = type
    formData.value = row
  }
  return {
    removModelConfig,
    typeDialog,
    formData,
    showTypeModel,
    handleRemove,
    addType,
    confirm,
    handleAdd,
    handleEdit,
    editType,
    tableData
  }
}
