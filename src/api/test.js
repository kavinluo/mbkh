import { axios } from '@/utils/request'

/**
 * 查看基本信息
 */
 export function getEnvs (parameter) {
  return axios({
    url: `/envs`,
    method: 'get',
    params: parameter
  })
}

/**
 * 查看基本信息
 */
 export function Envs (parameter) {
  return axios({
    url: `/envs`,
    method: 'get',
    params: parameter
  })
}
