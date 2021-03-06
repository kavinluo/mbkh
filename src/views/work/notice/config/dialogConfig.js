/*
 * @Author: kevin
 * @Date: 2022-04-08 16:10:14
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-16 18:02:51
 * @Description: 弹框配置
 */
export const editModelConfig = {
  dialogVisible: false,
  isShowFooter: false,
  params: '',
  dialogWidth: '800px'
}

export const reportDialogConfig = {
  dialogVisible: false,
  isShowFooter: true,
  modeType: 'report',
  useFn: () => ({}),
  params: ''
  // dialogWidth: '1200px'
}

export const fileDialogConfig = {
  dialogVisible: false,
  isShowFooter: true
}
export const reasonDialogConfig = {
  dialogVisible: false,
  dialogWidth: '600px'
}
export const removeModelConfig = {
  dialogVisible: false,
  baseURL: '/notice',
  isShowFooter: true,
  modeType: 'remove',
  params: ''
}
export const removeModel = {
  dialogVisible: false,
  baseURL: '/noticeType',
  isShowFooter: true,
  modeType: 'remove',
  params: ''
}

export const typeModelConfig = {
  dialogVisible: false,
  dialogWidth: '800px'
}
