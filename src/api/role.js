/*
 * @Author: kevin
 * @Date: 2022-03-10 09:39:52
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-10 09:57:02
 * @Description: 角色相关
 */
import { axios } from '@/utils/request'
/**
 * 添加角色
 */
 export function add (parameter) {
  return axios({
    url: `/role/add`,
    method: 'post',
    data: parameter,
    successTitle: '添加成功！',
    errorTitle: '添加失败！'
  })
}

/**
 * 获得单个角色表
 */
export function get (id) {
  return axios({
    url: `/role/get/${id}`, //
    method: 'get'
    // params: parameter
  })
}
/**
 * 调整角色菜单权限
 * @param {parameter} Object { menuIds: '菜单ID集合', roleId: '角色ID' }
 * @returns
 */

export function changeMenus (parameter) {
  return axios({
    url: `/role/changeMenus`, //
    method: 'get',
    params: parameter
  })
}

/**
 * 查询角色表
 */
 export function getRoleList (parameter) {
  return axios({
    url: `/role/list`, //
    method: 'get'
    // params: parameter
  })
}

/**
 * 分页查询角色表
 */
 export function getListPage (parameter) {
  return axios({
    url: `/role/listPage`, //
    method: 'get',
    params: parameter
  })
}

/**
 * 分页查询角色表
 */
 export function modify (parameter) {
  return axios({
    url: `/role/modify/${ parameter.id }`, //
    method: 'put',
    data: parameter.data
  })
}

/**
 * 删除角色表
 */
 export function remove (ids) {
  return axios({
    url: `/role/remove/${ ids }`, //
    method: 'delete',
    data: ''
  })
}
