/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-02 15:46:50
 * @Description: Do not edit
 */
import { components, plugins } from './register-element'

const concatComponent = components.concat()

function globalRegister (app) {
  for (const component of concatComponent) {
    if (component.name === 'Menu') {
      app.component('IconMenu', component)
    }
    app.component(component.name, component)
  }
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

export {
  globalRegister
}
