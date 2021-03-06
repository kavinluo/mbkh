/*
 * @Author: kevin
 * @Date: 2022-03-08 10:24:46
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-10 09:43:14
 * @Description: 应用管理
 */
import { axios } from '@/utils/request'
/**
 * 启用/禁用应用
 * ids:
 * isOpen {启用：0/禁用：1}
 */
 export function changeOpen (parameter) {
  return axios({
    url: `/application/changeOpen`,
    method: 'get',
    params: parameter,
    successTitle: '操作成功！'
  })
}

/**
 * 获得单个应用
 */
 export function getApplication (parameter) { // id
  return axios({
    url: `/application/get`,
    method: 'get',
    params: parameter
  })
}

/**
 * 查询应用
 */
 export function getListApplication (parameter) { // id
  return axios({
    url: `/application/list`,
    method: 'get',
    params: parameter
  })
}

/**
 * 分页查询应用
 */
 export function getListPageApplication (parameter) { // id
  return axios({
    url: `/application/listPage`,
    method: 'get',
    params: parameter,
    hasPage: true
  })
}
/**
 * 分页查询应用
 */
 export function modifyPageApplication (parameter) { // id
  return axios({
    url: `/application/modify`, // {id}
    method: 'put',
    params: parameter,
    successTitle: '修改成功！',
    errorTitle: '修改失败！'
  })
}
