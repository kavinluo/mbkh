/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-04 12:46:45
 * @Description: Do not edit
 */
import { components, plugins } from './register-element'
import UserIcon from '@/components/kvIcon/kvIcon.js'
const concatComponent = components.concat()

function globalRegisterComponent (app) {
  for (const component of concatComponent) {
    if (component.name === 'Menu') {
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
