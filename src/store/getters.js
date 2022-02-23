import { getStaticData } from '@/utils/util'
const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  buttons: state => state.user.buttons,
  adminType: state => state.user.adminType,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  lang: state => state.i18n.lang,
  sidebarShow: state => state.app.sidebarShow,
  inRecruitment: state => {
    let inRecruitment = state.app.inRecruitment
    // console.log('let inRecruitment', inRecruitment)
    if (!inRecruitment.id) {
      inRecruitment = getStaticData('inRecruitment')
    }
    return inRecruitment
  },
  HOST: state => {
    const host = window.location.host
    const testHost = 'http://127.0.0.1:8000'
    let currHost = state.app.HOST
    // 为开发环境时,域名设置为 开发环境地址
    if (host.indexOf('127.0.0.1') !== -1) {
      currHost = testHost
    }
    // 为开发环境时,域名设置为 开发环境地址
    if (host.indexOf('192.168.1.157') !== -1) {
      currHost = 'http://192.168.1.157:9760/'
    }
    // 为开发环境时,域名设置为 开发环境地址
    if (host.indexOf('192.168.1.65') !== -1) {
      currHost = 'http://192.168.1.65:9999'
    }
    return currHost
  }
}

export default getters
