/*
 * @Author: kevin
 * @Date: 2022-03-18 15:01:31
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-28 15:11:48
 * @Description: 目标管理
 */
import { axios } from '@/utils/request'

const baseURL = '/check/target'
// const target = '/target'

/**
 *  添加
 */
 export function add (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/add`,
    method: 'post',
    data: parameter,
    successTitle: '添加成功！'
  })
}

/**
 * 获得
 */
export function get (id, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/get/${id}`, //
    method: 'get'
    // params: parameter
  })
}

/**
 * 查询
 */
 export function getList (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/list`, //
    method: 'get'
    // params: parameter
  })
}

/**
 * 分页查询
 */
 export function getListPage (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/listPage`, //
    method: 'get',
    params: parameter
  })
}

/**
 * 修改
 */
 export function modify (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/modify/${ parameter.id }`, //
    method: 'put',
    data: parameter,
    successTitle: '修改成功！',
    errorTitle: '修改失败！'
  })
}
