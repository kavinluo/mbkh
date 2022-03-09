/*
 * @Author: kevin
 * @Date: 2022-03-08 16:19:37
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-08 16:32:08
 * @Description: 创建用户相关
 */
import { axios } from '@/utils/request'
/**
 * 系统管理-添加系统账户表
 */
 export function add (parameter) {
  return axios({
    url: `/account/add`,
    method: 'post',
    data: parameter,
    successTitle: '提交成功！'
  })
}
