/*
 * @Author: kevin
 * @Date: 2022-02-28 15:57:13
 * @LastEditors: kevin
 * @LastEditTime: 2022-02-28 16:21:45
 * @Description: 动态获取路由
 */
let firstMenu = null
export function mapMenusToRoutes (userMenus) {
  const routes = []

  // 1.先去加载默认所有的routes
  const allRoutes = []
  const routeFiles = require.context('../router', true, /\.js/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function mapMenusToPermissions (userMenus) {
  const permissions = []

  const _recurseGetPermission = (menus) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export function menuMapLeafKeys (menuList) {
  const leftKeys = []

  const _recurseGetLeaf = (menuList) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leftKeys
}
export { firstMenu }
