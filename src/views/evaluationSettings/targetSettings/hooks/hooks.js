/*
 * @Author: kevin
 * @Date: 2022-04-02 17:14:34
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-19 10:57:07
 * @Description: Do not edit
 */
import {
  addSubFormConfig
} from '../config/dataConfig'
import { getList as getCycleList } from '@/api/cycle'
import { selectQuotaList } from '@/api/quota'
export const getCycle = (rowData) => {
  const formOriginData = {
    parentId: rowData.id // 默认固定传0
  }
    // 过滤上一级选中的考区
  // const checkAreaList = rowData.checkArea.split(',').map(item => +item)
  getCycleList().then(res => {
    for (const item of addSubFormConfig.formItems) {
      const { field } = item
      formOriginData[field] = ''
      switch (field) {
        // case 'checkArea':
        //   getList().then((res) => {
        //     item.options = res.filter(item => checkAreaList.includes(item.id))
        //   })
        // break
        case 'cycle1':
          item.options = [rowData] // 整体周期就是上一级
          break
        case 'cycle2':
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

/**
 *
 * @param {Array} list // 数据
 * @param {Array} cyListOption // 选项
 * @param {*} type // 类型
 * @returns Array
 */
export const formatTableData = (list = []) => {
  let usrlist = []
  const objList = {}
  list.forEach(item => {
    const key = item.quotaId1
    objList[item.quotaId1] = item[key]
    usrlist = usrlist.concat(item[key])
    usrlist.forEach(i => {
      i.detailedDto = i.detailedDto.sort((a, b) => a.number - b.number)
    })
  })
  return {
    tableData: usrlist,
    list,
    objList
  }
}

export const formatSelectQuotaList = (list = [], cyListOption = []) => {
  const obj = {} // 归类
  const Arr = []
  list.forEach(item => {
    item.options = cyListOption
    const countKey = item.quotaId1
    Object.keys(item).forEach((el, index) => {
      !obj[item.quotaId1] && (obj[item.quotaId1] = {})
      !obj[countKey][countKey] && (obj[countKey][countKey] = [])
      !obj[countKey].countScore && (obj[countKey].countScore = 0)
      obj[item.quotaId1][el] = item[el]
    })
    Object.keys(obj).forEach(sub => {
      if (+sub === item.quotaId1) {
        obj[countKey][countKey].push(item)
        obj[countKey].countScore += item.score
      }
    })
  })
  Object.values(obj).forEach(item => {
    Arr.push(item)
  })
  return Arr
}
