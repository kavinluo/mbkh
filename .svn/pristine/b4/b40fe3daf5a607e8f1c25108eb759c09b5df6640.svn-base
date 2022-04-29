/*
 * @Author: kevin
 * @Date: 2022-04-08 13:30:00
 * @LastEditors: kevin
 * @LastEditTime: 2022-04-21 16:16:32
 * @Description: 评价过程
 */
import { axios } from '@/utils/request'

const baseURL = '/process'

 /**
  *  详细
  */
  export function getTarget (parameter) {
    return axios({
      url: `${baseURL}/getTarget/${parameter}`,
      method: 'get'
    })
  }

  /**
   * 获得列表
   */
  export function getListPage (parameter) {
    return axios({
      url: `${baseURL}/listPage`, //
      method: 'get',
      params: parameter
    })
  }

  // 查询人员
  export function getAccount (parameter) {
    return axios({
      url: `/account/getAccount`, //
      method: 'get',
      params: parameter
    })
  }

    /**
   * 获得列表
   */
     export function getFileList (parameter) {
      return axios({
        url: `/file/getList/${parameter}`, //
        method: 'get',
        params: ''
      })
    }
  /**
   * 获得列表/process/report/{id}上报目标
   */
   export function report (id) {
    return axios({
      url: `${baseURL}/report/${id}`, //
      method: 'put',
      // params: parameter,
      successTitle: '上报成功！'
    })
  }
  /**
   * /targetScore/add保存分数
   */
   export function targetScoreAdd (parameter) {
    return axios({
      url: `/targetScore/add`, //
      method: 'post',
      data: parameter,
      successTitle: '提交成功！',
      errorTitle: '提交失败！'
    })
  }
