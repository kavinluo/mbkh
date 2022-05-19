/*
 * @Author: kevin
 * @Date: 2022-05-18 15:26:27
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-19 10:57:51
 * @Description: 目标添加
 */
  import { ref } from 'vue'
  import {
    addTargetFormConfig
} from '../config/dataConfig'
  import { getRoleList } from '@/api/organization'
  import { add, getList, modify } from '@/api/target'
  import { getSuper } from '@/api/account'
  export const addFirstTargetHook = (rowData, emit) => {
    const ruleFormRef = ref({})
    const directorOptions = ref([]) // 负责人
    const checkAreaOptions = ref([]) // 选择考区
    const formOriginData = {
      cycle1: '',
      cycle2: '',
      parentId: 0 // 默认固定传0
    };
    (async () => {
      const { data } = await getRoleList()
      checkAreaOptions.value = data
    })()
    for (const item of addTargetFormConfig.formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    if (rowData) {
      getList({ id: rowData.id }).then(res => {
        res.data.checkArea = res.data.checkArea.split(',').map(item => +item)
        res.data.director = res.data.director.split(',').map(item => +item)
        selectData(res.data.checkArea)
        formData.value = res.data
      })
    }
    const fn = rowData ? modify : add
    const handleAddTarget = (formEL) => {
      formEL.$refs.ruleFormRef?.validate((valid) => {
        if (valid) {
          const { checkArea = [], director = [] } = formData.value
          const params = {
            checkArea: checkArea.join(','),
            director: director.join(',')
          }
          const obj = Object.assign({}, formData.value, params)
          fn(obj).then(res => {
            const { status } = res
            if (status?.code === '0') {
              emit('callBack')
            }
          })
        }
      })
    }
    const selectData = (selectData) => {
      if (selectData.length) {
        getSuper(selectData.join(',')).then(res => {
          directorOptions.value = res.data
        })
      } else {
        directorOptions.value = []
      }
      if (!directorOptions.length) {
        directorOptions.value = []
      }
    }

    return {
      selectData,
      checkAreaOptions,
      directorOptions,
      formData,
      ruleFormRef,
      addTargetFormConfig,
      handleAddTarget
    }
  }
