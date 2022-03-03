/*
 * @Author: kevin
 * @Date: 2022-03-02 11:17:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-03 15:08:49
 * @Description: 菜单相关
 */
import { axios } from '@/utils/request'
/**
 * 添加菜单
 */
 export function addMenu (parameter) {
  return axios({
    url: `/menu/add`,
    method: 'post',
    data: parameter,
    successTitle: '提交成功！'
  })
}
/**
 * 获得单个菜单
 */
 export function getMenu (parameter) {
  return axios({
    url: `/menu/get/${parameter}`,
    method: 'get'
  })
}

/**
 * 获得菜单列表
 */
 export function getMenuList (parameter) {
  return axios({
    url: `/menu/list`,
    method: 'get',
    params: parameter
  })
}

/**
 * 修改菜单
 */
 export function editMenu (parameter) {
  return axios({
    url: `/menu/modify/${parameter.id}`, // {id}
    method: 'put',
    data: parameter,
    successTitle: '修改成功！'
  })
}
/**
 * 删除菜单
 */
 export function removeMenu (ids) {
  return axios({
    url: `/menu/remove/${ids}`, // {ids}
    method: 'delete',
    successTitle: '删除成功！',
    errorTitle: '删除失败！'
  })
}
