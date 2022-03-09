/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-07 16:33:19
 * @Description: Do not edit
 */
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
  ElMenuItem,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElDialog,
  ElOption,
  ElSelect,
  ElRow,
  ElCol,
  ElSwitch,
  ElCascader,
  ElTableColumn,
  ElTable,
  ElDatePicker,
  ElPagination,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElLink
} from 'element-plus'

// icon引入
import {
  Avatar,
  Lock,
  Fold,
  Expand,
  Location,
  Document,
  Setting,
  Menu,
  Histogram,
  Cherry,
  Edit,
  Delete
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
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  Lock,
  Fold,
  Expand,
  Location,
  Document,
  Setting,
  Menu,
  ElDialog,
  ElOption,
  ElSelect,
  ElRow,
  ElCol,
  ElSwitch,
  ElCascader,
  ElTableColumn,
  ElTable,
  ElDatePicker,
  ElPagination,
  Histogram,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  Cherry,
  ElLink,
  Edit,
  Delete
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
