/*
 * @Author: kevin
 * @Date: 2022-05-17 11:42:52
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-17 18:11:14
 * @Description: Do not edit
 */
import { axios } from '@/utils/request'
/**
 * 获得整体目标统计
 */
 export function getquery () {
  return axios({
    url: `/statistic/query`, // {id}
    method: 'get'
  })
}

/**
 * 获得考区目标统计
 */
 export function getArea () {
  return axios({
    url: `/statistic/queryArea`,
    method: 'get'
  })
}

/**
 * 获得考区目标统计
 */
 export function getRanking () {
  return axios({
    url: `/statistic/ranking`,
    method: 'get'
  })
}
