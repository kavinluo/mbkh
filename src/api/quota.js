/*
 * @Author: kevin
 * @Date: 2022-03-14 11:12:47
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-15 11:19:08
 * @Description: 指标库
 */
import { axios } from '@/utils/request'

const baseURL = '/quota'

 /**
  *  添加
  */
  export function add (parameter, useUrl = baseURL) {
    return axios({
      url: `${useUrl}/add`,
      method: 'post',
      data: parameter,
      successTitle: '添加成功！',
      errorTitle: '添加失败！'
    })
  }

  /**
   * 获得单个
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
   export function getRoleList (parameter, useUrl = baseURL) {
    return axios({
      url: `${useUrl}/list`, //
      method: 'get'
      // params: parameter
    })
  }

  /**
   * 分页查询
   */
   export function getQuotaListPage (parameter, useUrl = baseURL) {
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

  /**
   * 删除
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
