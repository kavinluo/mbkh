/*
 * @Author: kevin
 * @Date: 2022-03-01 15:29:21
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-01 15:37:05
 * @Description: 一些操作js
 */
import { useStore } from 'vuex'
const stroe = useStore()
let downStatus = null
const handleFn = (ref) => {
  downStatus = ref
}
  const downOut = (downStatus) => {
    downStatus.value = !downStatus.value
    console.log('显示下拉', downStatus)
  }
  const logOut = () => {
    stroe.dispatch('user/loginOut')
  }

  // 点击任何区域关闭
  const handleBodyClick = (event) => {
    const sp = headline.value
    if (sp) {
      if (!sp.contains(event.target)) {
        downStatus.value = false
      }
    }
  }

export {
  handleFn
}
