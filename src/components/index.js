/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-08 13:28:10
 * @Description: 组件注册
 */
import { components, plugins } from './element-ui/register-element'
import UserIcon from '@/components/kvIcon/kvIcon.js'
import keTable from '@/components/kvTable'
import KvFrom from '@/components/kvform'
const userComponentlist = [keTable, KvFrom]
const concatComponent = components.concat(userComponentlist)

function globalRegisterComponent (app) {
  for (const component of concatComponent) {
    if (component.name === 'Menu') { // Menu组件名称和html本身标签重名
      app.component('IconMenu', component)
    }
    app.component(component.name, component)
  }
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
  const { name, kvIcon } = UserIcon
  app.component(name, kvIcon)
}

export {
  globalRegisterComponent
}
