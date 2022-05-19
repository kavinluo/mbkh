/*
 * @Author: kevin
 * @Date: 2022-05-10 16:38:52
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 18:11:14
 * @Description: Do not edit
 */
import { axios } from '@/utils/request'
const baseUrl = '/await'

/**
 * 查询待办
 */
 export function getwatiList () {
  return axios({
    url: `${baseUrl}/waitList`,
    method: 'get'

  })
}
/**
 * 查询待办
 */
 export function getdetail (parameter) {
  return axios({
    url: `${baseUrl}/detail`,
    method: 'get',
    params: parameter
  })
}

export function getalready () {
  return axios({
    url: `${baseUrl}/alreadyList`,
    method: 'get'
  })
}
