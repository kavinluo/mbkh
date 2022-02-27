import 'element-plus/theme-chalk/base.css'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElIcon,
  ElMenuItemGroup,
  ElSubMenu,
  ElMenu,
  ElMenuItem
} from 'element-plus'

// icon引入
import {
  Avatar,
  Lock
  } from '@element-plus/icons-vue'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElMenuItemGroup,
  ElSubMenu,
  ElMenu,
  ElMenuItem,
  ElIcon,
  Avatar,
  Lock
]
const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification
]

export {
  components,
  plugins
}
