/*
 * @Author: kevin
 * @Date: 2022-05-11 14:54:13
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-18 15:05:43
 * @Description: 汇总表评分
 */
import { ref, getCurrentInstance } from 'vue'
import { selfListPage, addBatch, remove } from '@/api/process'
import { useState } from '@/hooks/index'
/**
 * @param {*} cancelTargetModle 需要关闭的模态框
 * @param {*} targetData 当前目标数据
 * @returns
 */
export const setScoreFn = (cancelTargetModle, targetData) => {
  const { proxy } = getCurrentInstance()
  const { userInfo } = useState(['userInfo'], 'user')
  const role = ref(userInfo.value)
  const selfListData = ref({})
  const evaluateSelf = ref([]);
   (async () => {
    const { data } = await selfListPage({
      pageSize: 1000,
      curPage: 1,
      targetId: targetData.id
    })
    const { evaluateSelfDto, evaluateSelfSumDto } = data
    selfListData.value = formatObj(evaluateSelfDto.list, targetData, role.value)
    evaluateSelf.value = evaluateSelfSumDto ? [evaluateSelfSumDto] : []
  })()
  // 增加行
  const pushFn = (key) => {
    selfListData.value[key].push({
      areaName: '', // 考点名称\考评项目
      analyse: 0, // 数据分析
      areaType: key,
      discipline: 0, // 考风考纪
      ending: 0, // 考后收尾
      implement: 0, // 考试实施
      prepare: 0, // 考前准备
      secrecy: 0, // 安全保密
      score: 0, // 总分
      // repeatedScore: evaluateSelfSumDto.value[0]?.repeatedScore,
      targetId: targetData.id
    })
  }
  // 删出行
  const deleteFn = (key, index, row) => {
    // 如果存在id需要发送请求删除
    if (selfListData.value[key][index]?.id) {
      remove(row.id)
    }
    selfListData.value[key].splice(index, 1)
    count(key)
  }
  const verifyCount = (row) => {
    const quantityScale = 2
    const re = new RegExp('^(0|[1-9][0-9]*)(\\.[0-9]{0,' + quantityScale + '})?$')
    if (row.repeatedScore < 0) {
      proxy.$message.warning('复评分不能小于0！')
      row.repeatedScore = ''
    }
    if (row.repeatedScore !== '' && !re.test(row.repeatedScore)) {
      proxy.$message.warning('输入不正确！')
      row.repeatedScore = ''
      console.log(88888)
    }
  }
  // 计算总分
  const count = (key, index) => {
    const quantityScale = 2
    const re = new RegExp('^(0|[1-9][0-9]*)(\\.[0-9]{0,' + quantityScale + '})?$')
    let status = true
    for (const td of selfListData.value[key]) {
      const keys = {
        prepare: '0',
        implement: '0',
        ending: '0',
        secrecy: '0',
        discipline: '0',
        analyse: '0'
      }
      for (const keyword in td) {
        if (keyword in keys) {
          keys[keyword] = td[keyword]
        }
      }
      for (const keyword in keys) {
        const f = keys[keyword] + ''.toString()
        if (f !== '' && !re.test(f)) {
          td[keyword] = ''
          proxy.$message.warning('输入不正确！')
          status = false
        }
      }
    }
    if (status) {
      selfListData.value[key].forEach(item => {
        item.score = toDecimal2NoZero(+item.analyse + (+item.discipline) + (+item.ending) + (+item.implement) + (+item.prepare) + (+item.secrecy))
      })
    }
  }

  // 保留2位小数，如：2，还会保留2 不会补0
  const toDecimal2NoZero = (x) => {
    var f = Math.round(x * 100) / 100
    var s = f.toString()
    return s
  }
  //  提交
  const submitHandle = () => {
    const paramList = []
    Object.keys(selfListData.value).forEach(key => {
      selfListData.value[key].forEach(item => {
        for (const key in item) {
          if (key !== 'id') {
            item[key] = item[key] || 0 // 没有值需要提交 0
          }
        }
        item.repeatedScore = evaluateSelf.value[0]?.repeatedScore
        paramList.push(item)
      })
    })
    if (!paramList.length) {
      proxy.$message.warning('提交数据不能为空！')
      return
    }
    addBatch(paramList).then((res) => {
      cancelTargetModle()
    })
  }
  return {
    selfListData,
    role,
    pushFn,
    deleteFn,
    count,
    submitHandle,
    evaluateSelf,
    verifyCount
  }
}

/**
 *
 * @param {Array} list 返回的数据
 * @param {Object} targetData 目标数据
 * @param {Object} role 当前角色
 * @returns Array
 */
const formatObj = (list = [], targetData, role) => {
  const objList = {
    // 1: [],
    2: [], // 考点自评评分统计表
    3: [] // 考试基地自评评分统计表
  }
  list.forEach(item => {
    Object.keys(objList).forEach(key => {
      if (+key === item.areaType) {
        item.areaType = key
        item.targetId = targetData.id
        item.areaId = targetData.checkArea
        objList[item.areaType].push(item)
      }
    })
  })
  // 如果是管理 并且是空数据不需要显示
  if (role.userType !== 1) {
    Object.keys(objList).forEach(key => {
      if (!objList[key].length) {
        objList[key].push({
          id: '',
          areaId: targetData.checkArea,
          targetId: targetData.id,
          analyse: '', // 数据分析
          areaName: '', // 考点名称\考评项目
          areaType: key,
          isDelete: '',
          discipline: '', // 考风考纪
          ending: '', // 考后收尾
          implement: '', // 考试实施
          prepare: '', // 考前准备
          secrecy: '', // 安全保密
          score: '' // 总分
        })
      }
    })
    if (!list.length) {
      Object.keys(objList).forEach(key => {
        if (!objList[key].length) {
          objList[key].push({
            id: '',
            areaId: targetData.checkArea,
            targetId: targetData.id,
            analyse: '', // 数据分析
            areaName: '', // 考点名称\考评项目
            areaType: key,
            isDelete: '',
            discipline: '', // 考风考纪
            ending: '', // 考后收尾
            implement: '', // 考试实施
            prepare: '', // 考前准备
            secrecy: '', // 安全保密
            score: '' // 总分
          })
        }
      })
    }
}
  return objList
}
