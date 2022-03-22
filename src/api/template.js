/*
 * @Author: kevin
 * @Date: 2022-03-17 14:15:09
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-22 16:13:14
 * @Description: 模板相关
 */
import { axios } from '@/utils/request'

const baseURL = '/template'

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
/**
 * 添加属性/template/attribute/add
添加模板属性
 */
const addAttrBaseURL = '/template/attribute'

export function addAttr (parameter, useUrl = addAttrBaseURL) {
  return axios({
    url: `${useUrl}/add`, //
    method: 'post',
    data: parameter,
    successTitle: '添加成功！',
    errorTitle: '添加失败！'
  })
}

export function getAttrListPage (parameter, useUrl = addAttrBaseURL) {
  return axios({
    url: `${useUrl}/listPage`, //
    method: 'get',
    params: parameter
  })
}
//  修改模板信息
export function modifyAttr (parameter, useUrl = addAttrBaseURL) {
  return axios({
    url: `${useUrl}/modify/${ parameter.id }`, //
    method: 'put',
    data: parameter,
    successTitle: '修改成功！',
    errorTitle: '修改失败！'
  })
}
