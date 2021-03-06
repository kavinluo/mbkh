/*
 * @Author: kevin
 * @Date: 2022-04-08 16:10:14
 * @LastEditors: kevin
 * @LastEditTime: 2022-05-13 16:03:21
 * @Description: 弹框配置
 */
export const targetModelConfig = {
  dialogVisible: false,
  isShowFooter: false,
  params: '',
  dialogWidth: '1200px'
}

export const reportDialogConfig = {
  dialogVisible: false,
  isShowFooter: true,
  modeType: 'report',
  useFn: () => ({}),
  params: ''
}

export const fileDialogConfig = {
  dialogVisible: false,
  isShowFooter: true
}

export const reasonDialogConfig = {
  dialogVisible: false,
  dialogWidth: '600px',
  isShowFooter: true
}
