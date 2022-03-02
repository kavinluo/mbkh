/*
 * @Author: kevin
 * @Date: 2022-03-02 11:17:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 17:55:17
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
    url: `/menu/get`,
    method: 'get',
    params: parameter
  })
}

/**
 * 获得菜单列表
 */
 export function getListMenu (parameter) {
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
    url: `/menu/modify/`, // {id}
    method: 'put',
    params: parameter
  })
}
/**
 * 删除菜单
 */
 export function removeMenu (parameter) {
  return axios({
    url: `/menu/remove/`, // {ids}
    method: 'delete',
    params: parameter
  })
}
