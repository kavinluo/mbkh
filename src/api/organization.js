/*
 * @Author: kevin
 * @Date: 2022-03-10 10:14:05
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-11 14:40:26
 * @Description: 机构管理
 */
import { axios } from '@/utils/request'

const baseURL = '/organization'

/**
 *  添加机构
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
 * 获得单个机构
 */
export function get (id, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/get/${id}`, //
    method: 'get'
    // params: parameter
  })
}

/**
 * 查询机构
 */
 export function getRoleList (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/list`, //
    method: 'get'
    // params: parameter
  })
}

/**
 * 分页查询机构
 */
 export function getListPage (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/listPage`, //
    method: 'get',
    params: parameter
  })
}

/**
 * 修改机构
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

/**
 * 删除机构
 */
 export function remove (ids, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/remove/${ ids }`, //
    method: 'delete',
    data: '',
    successTitle: '删除成功！',
    errorTitle: '删除失败！'
  })
}
