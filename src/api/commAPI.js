/*
 * @Author: kevin
 * @Date: 2022-03-18 10:41:55
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-16 16:28:38
 * @Description: 公用
 */
import { axios } from '@/utils/request'
 /**
  * 删除
  */
  export function remove (baseURL, ids) {
    return axios({
      url: `${baseURL}/remove/${ ids }`, //
      method: 'delete',
      data: '',
      successTitle: '删除成功！',
      errorTitle: '删除失败！'
    })
  }

  // 单独上传文件/uploadNotice

  export function uploadNotice (baseURL, ids) {
    return axios({
      url: `/file/uploadNotice`, //
      method: 'post',
      data: '',
      successTitle: '上传成功！',
      errorTitle: '上传失败！'
    })
  }
