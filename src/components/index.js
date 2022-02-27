import { components, plugins } from './register-element'

const concatComponent = components.concat()

function globalRegister (app) {
  for (const component of concatComponent) {
    app.component(component.name, component)
  }
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

export {
  globalRegister
}
