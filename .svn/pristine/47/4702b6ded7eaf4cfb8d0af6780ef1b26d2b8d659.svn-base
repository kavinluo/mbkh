/*
 * @Author: kevin
 * @Date: 2022-04-02 17:14:34
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-29 11:08:20
 * @Description: Do not edit
 */
import {
  addSubFormConfig,
  getList
} from '../config/dataConfig'
import { getList as getCycleList } from '@/api/cycle'
import { selectQuotaList } from '@/api/quota'
export const getCycle = (rowData) => {
  const formOriginData = {
    parentId: rowData.id // 默认固定传0
  }
    // 过滤上一级选中的考区
  const checkAreaList = rowData.checkArea.split(',').map(item => +item)
  getCycleList().then(res => {
    for (const item of addSubFormConfig.formItems) {
      const { field } = item
      formOriginData[field] = ''
      switch (field) {
        case 'checkArea':
          getList().then((res) => {
            item.options = res.filter(item => checkAreaList.includes(item.id))
          })
        break
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

// 根据顺序格式化考评内容
// const format = (list) => {
//   const obj = {}
//   list.sort((a, b) => a.number - b.number).forEach(item => {
//     obj[item.sort] = obj[item.sort] || []
//     obj[item.sort].push(item)
//   })
//   return obj
// }
/**
 *
 * @param {Array} list // 数据
 * @param {Array} cyListOption // 选项
 * @param {*} type // 类型
 * @returns Array
 */
export const formatTableData = (list = [], cyListOption, type) => {
  let usrlist = []
  const objList = {}
  list.forEach(item => {
    const key = item.quotaId1
    objList[item.quotaId1] = item[key]
    usrlist = usrlist.concat(item[key])
    console.log('objList[item.quotaId1].length', objList[item.quotaId1].length)
    usrlist.forEach(i => {
      i.rowSpan = objList[item.quotaId1].length
      i.detailedDto = i.detailedDto.sort((a, b) => a.number - b.number)
    })
    // const maxSort = []
    // console.log('item', item)
    // const level1 = {
    //   title: item.title, // 一级指标
    //   content: item.title,
    //   sort: -3,
    //   number: -3,
    //   countScore: item.countScore,
    //   id: item.id,
    //   rowSpan: 0
    // }
    // item.evaluateTargetDtoList = item?.evaluateQuotaDtoList || item.evaluateTargetDtoList // 改名为了提交使用
    // item.depositoryId = item.depositoryId || item.id
    // if (item.evaluateTargetDtoList.length) {
    //   item.evaluateTargetDtoList.forEach(subItem => { // 二级指标
    //   const level2Cspan = []
    //   subItem.depositoryId = subItem.depositoryId || subItem.id
    //   subItem.evaluateTargetDetailedDtoList = subItem?.evaluateQuotaDetailedDtoList || subItem.evaluateTargetDetailedDtoList // 改名为了提交使用
    //     const level2 = {
    //       title: subItem.title, // 二级指标
    //       content: subItem.title,
    //       sort: -2,
    //       number: -2,
    //       countScore: subItem.countScore,
    //       id: subItem.id,
    //       parentId: subItem.parentId,
    //       rowSpan: 0
    //     }
    //     if (subItem.evaluateTargetDetailedDtoList) {
    //       subItem.List = format(subItem.evaluateTargetDetailedDtoList, cyListOption)
    //       console.log('subItem.List', subItem.List)
    //     }
    //     // debugger
    //     const obj = subItem.List
    //     for (const key in obj) {
    //       const _ = obj[key]
    //       console.log('_', _)
    //       if (type === 'add') {
    //         _.push({ // 前端手动添加周期
    //           content: '',
    //           number: 3,
    //           cycleId: null,
    //           depositoryId: _[2].depositoryId,
    //           id: 0,
    //           score: _[2].score,
    //           sort: _[2].sort,
    //           target: '指标周期',
    //           targetId: _[2].targetId,
    //           template: '指标周期',
    //           templateId: '',
    //           templateType: 'select',
    //           options: cyListOption
    //         })
    //       } else {
    //         _.forEach(x => {
    //           if (x.template === '指标周期') { // 编辑时给指标周期添加下拉选项
    //             x.options = cyListOption
    //           }
    //         })
    //       }
    //       maxSort.push(key)
    //       level2Cspan.push(key)
    //       subItem.List[key].push(level1)
    //       subItem.List[key].push(level2)
    //       subItem.List[key] = subItem.List[key].sort((a, b) => a.number - b.number)
    //       usrlist.push(subItem.List[key])
    //     }
    //     level2.rowSpan = level2Cspan.length
    //   })
    // }
    // level1.rowSpan = maxSort.length
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
  console.log('obj', obj)
  Object.values(obj).forEach(item => {
    Arr.push(item)
  })
  console.log('Arr', Arr)
  return Arr
}
