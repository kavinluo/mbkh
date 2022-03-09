/*
 * @Author: kevin
 * @Date: 2022-03-08 16:34:06
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-08 16:40:36
 * @Description: 系统操作日志
 * */
import { axios } from '@/utils/request'
/**
 * 获得单个系统操作日志
 */
 export function getLogs (parameter) {
  return axios({
    url: `/systemLogs/get`, // {id}
    method: 'get',
    params: parameter
  })
}

/**
 * 分页查询系统操作日志
 */
 export function getlistPage (parameter) {
  return axios({
    url: `/systemLogs/listPage`, // {id}
    method: 'get',
    params: parameter
  })
}
