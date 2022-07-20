/*
 * @Author: kevin
 * @Date: 2022-05-06 15:52:26
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-09 14:04:36
 * @Description: Do not edit
 */
import { axios } from '@/utils/request'

const baseURL = '/notice'
/**
 * 我接受的公告
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
export function acceptListPage (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/acceptListPage`,
    method: 'get',
    params: parameter
  })
}
/**
 * 发布公告
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
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
 * 修改公告
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function modify (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/modify/${parameter.id}`,
    method: 'put',
    data: parameter,
    successTitle: '修改成功！'

  })
}
/**
 * 我发布的公告
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function releaseListPage (parameter, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/releaseListPage`,
    method: 'get',
    params: parameter

  })
}
/**
 * 发布公告
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function annouce (id, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/annouce/${id}`,
    method: 'put',
    params: '',
    successTitle: '发布成功！'

  })
}
/**
 * 发布公告
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function revokeAnnouce (id, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/revokeAnnouce/${id}`,
    method: 'put',
    params: '',
    successTitle: '撤销成功！'
  })
}
/**
 * 发布公告
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function get (id, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/get/${id}`,
    method: 'get',
    params: ''
  })
}
/**
 * 发布置顶
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function top (id, useUrl = baseURL) {
  return axios({
    url: `${useUrl}/top/${id}`,
    method: 'put',
    successTitle: '置顶成功！'

  })
}
/**
 * 分类列表
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function noticeTypeList (parameter, useUrl = baseURL) {
  return axios({
    url: `/noticeType/listPage`,
    method: 'get',
    params: parameter
  })
}

/**
 * 添加公告分类
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function noticeTypeAdd (params, useUrl = baseURL) {
  return axios({
    url: `/noticeType/add`,
    method: 'post',
    data: params,
    successTitle: '添加成功！'
  })
}
/**
 * 修改公告分类
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
 export function noticeTypeModify (params, useUrl = baseURL) {
  return axios({
    url: `/noticeType/modify/${params.id}`,
    method: 'put',
    data: params,
    successTitle: '修改成功！'
  })
}

/**
 * 已读公告分类
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
export function noticeTypeHaveRead (id, useUrl = baseURL) {
  return axios({
    url: `${baseURL}/receive/haveRead/${id}`,
    method: 'put',
    data: ''
  })
}

/**
 * 未读公告分类
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */

export function unReadAcceptList (parameter, useUrl = baseURL) {
  return axios({
    url: `${baseURL}/unReadAccept`,
    method: 'get',
    params: parameter

  })
}

/**
 * 已读公告分类
 * @param {*} parameter
 * @param {*} useUrl
 * @returns
 */
//  export function noticeModify (params, useUrl = baseURL) {
//   return axios({
//     url: `${baseURL}/modify/${params.id}`,
//     method: 'put',
//     data: params
//   })
// }
