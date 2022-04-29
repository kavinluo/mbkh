/*
 * @Author: kevin
 * @Date: 2022-04-22 14:50:37
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-22 14:50:37
 * @Description: 评价结果
 */
import { axios } from '@/utils/request'
const baseURL = '/result'

/**
 * 分页查询评价结果
 */
 export function getListPage (parameter) {
  return axios({
    url: `${baseURL}/listPage`,
    method: 'get',
    params: parameter

  })
}
