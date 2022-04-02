/*
 * @Author: kevin
 * @Date: 2022-04-02 17:14:34
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-02 17:43:12
 * @Description: Do not edit
 */
import {
  addSubFormConfig,
  useOptionList
} from '../config/dataConfig'
import { getList as getCycleList } from '@/api/cycle'
import { selectQuotaList } from '@/api/quota'
export const getCycle = (rowData) => {
  const formOriginData = {
    parentId: rowData.id // 默认固定传0
  }
    // 过滤上一级选中的考区
  const checkAreaList = rowData.checkArea.split(',').map(item => +item)
  const subCheckAreaList = useOptionList.filter(item => checkAreaList.includes(item.id))
  getCycleList().then(res => {
    for (const item of addSubFormConfig.formItems) {
      const { field } = item
      formOriginData[field] = ''
      if (field === 'checkArea') {
        item.options = subCheckAreaList
      }
      if (field === 'cycle1') { // 整体周期就是上一级
        item.options = [rowData]
      }
      if (field === 'cycle2') {
        item.options = res?.data || []
      }
    }
  })

  return formOriginData
}

export const getQuotaLis = async () => {
  const { data = [] } = await selectQuotaList()
  return data
}
