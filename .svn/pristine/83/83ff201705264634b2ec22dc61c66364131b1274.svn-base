/*
 * @Author: kevin
 * @Date: 2022-02-28 11:42:52
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 18:11:14
 * @Description: Do not edit
 */
import { axios } from '@/utils/request'
/**
 * 获取配置信息
 */
 export function getEnvs (parameter) {
  return axios({
    url: `/envs`,
    method: 'get',
    params: parameter
  })
}
/**
 * 登录
 */
 export function login (parameter) {
  return axios({
    url: `/login`,
    method: 'post',
    params: parameter
  })
}

/**
 * 退出登录
 */
 export function logout (parameter) {
  return axios({
    url: `/logout`,
    method: 'delete',
    params: parameter
  })
}

/**
 * 生成动态验证码
 */
 export function getVerificationCode (parameter) {
  return axios({
    url: `/dynamicVerificationCode`,
    method: 'post',
    params: parameter
  })
}

/**
 * 修改当前用户密码
 */
 export function changePassword (parameter) {
  return axios({
    url: `/changePassword`,
    method: 'post',
    params: parameter,
    successTitle: '修改成功！'
  })
}

/**
 * 当前用户信息
 */
 export function getUserInfo (parameter) {
  return axios({
    url: `/getUserInfo`,
    method: 'get',
    params: parameter
  })
}

/**
 * 当前用户菜单
 */
 export function getUserMenu (parameter) {
  return axios({
    url: `/getUserMenu`,
    method: 'get',
    params: parameter
  })
}
