import { mapState, createNamespacedHelpers } from 'vuex'
import useMapper from './useMapper'
/**
 * @param {Object or Array} mapper
 * @param {string} moduleName
 * @returns function
 */
//  useState([], 'XX')
export default function useState (mapper, moduleName) {
  let mapperFn = mapState
  if (typeof moduleName === 'string' && moduleName) {
    console.log('moduleName', moduleName)
    mapperFn = createNamespacedHelpers(moduleName).mapState
  }
  return useMapper(mapper, mapperFn)
}
