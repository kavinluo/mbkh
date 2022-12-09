/*
 * @Author: kevin
 * @Date: 2022-03-18 15:01:31
 * @LastEditors: kevin
 * @LastEditTime: 2022-07-06 14:11:50
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
    successTitle: parameter.id ? '修改成功!' : '添加成功!'
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
 *
 * 布考核目标
 *
 */
 export function publish (id, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/publish/${id}`, //
    method: 'put',
    successTitle: '发布成功！'
  })
}
/**
 *
 * 撤销发布
 *
 */
 export function revokePublish (id, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/revokePublish/${id}`, //
    method: 'put',
    successTitle: '撤销成功！'
  })
}
/**
 * 查询
 */
 export function getList (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/getList`, //
    method: 'get',
    params: parameter
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
