/*
 * @Author: kevin
 * @Date: 2022-04-08 13:30:00
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-13 09:42:20
 * @Description: 评价过程
 */
import { axios } from '@/utils/request'

const baseURL = '/process'

 /**
  *  详细
  */
  export function getTarget (parameter) {
    return axios({
      url: `${baseURL}/getTarget`,
      method: 'get',
      params: parameter
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
      url: `/targetScore/report/${id}`, //
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
  /**
   * 分页查询自评统计
   */
   export function selfListPage (parameter) {
    return axios({
      url: `/self/listPage`, //
      method: 'get',
      params: parameter
    })
  }
  /**
   * 添加自评统计
  */
  export function selfAdd (parameter) {
    return axios({
      url: `/self/add`, //
      method: 'post',
      data: parameter,
      successTitle: '提交成功！',
      errorTitle: '提交失败！'
    })
  }
   /**
   * 批量添加
  */
  export function addBatch (parameter) {
    return axios({
      url: `/self/addBatch`, //
      method: 'post',
      data: parameter,
      successTitle: '提交成功！',
      errorTitle: '提交失败！'
    })
  }
  /** addBatch
   * 添加自评统计
  */
   export function selfModify (parameter) {
    return axios({
      url: `/self/modify/${parameter.id}`, //
      method: 'post',
      data: parameter,
      successTitle: '修改成功！',
      errorTitle: '修改失败！'
    })
  }
  /** addBatch
   * 删除自评统计
  */
   export function remove (id) {
    return axios({
      url: `/self/remove/${id}`, //
      method: 'delete',
      // data: parameter,
      successTitle: '删除成功！',
      errorTitle: '删除失败！'
    })
  }
