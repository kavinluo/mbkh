<!--
 * @Author: kevin
 * @Date: 2022-03-03 09:40:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-09 18:02:51
 * @Description: form 表单
-->
<template>
  <el-form :label-width="labelWidth">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-row>
      <template v-for="item in formItems" :key="item.labe">
        <el-col v-bind="item.span ? item.span : colLayout">
          <el-form-item
            v-if="!item.isHidden"
            :label="item.label"
            :rules="item.rules"
            :style="item.formItemsStyle ? item.formItemsStyle : itemStyle"
            :class="item.itemClassName">
            <template v-if="item.type === 'input' || item.type === 'password' || item.type === 'number'"> <!--- to do -->
              <el-input
                clearable
                :type="item.type"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"></el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                style="width: 100%"
                v-bind="item.otherOptions"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"></el-date-picker>
            </template>
            <template v-else-if="item.type === 'slot'">
              <slot :name="item.slotName" :label="item.label"></slot>
            </template>
            <p v-if="item.help" style="margin: 0; font-size:12px;color:#ccc;line-height:1.2">{{ item.help }}</p>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
  <div v-if="showLine" style="border-bottom: 9px solid rgb(220 233 244);margin: 0 -15px 16px;"></div>
</template>

<script>
export default {
  name: 'KvForm',
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    formItems: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      required: true
    },
    itemStyle: {
      type: Object,
      default: () => {}
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    showLine: { // 显示页脚分割线
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'callBack'],
  setup (props, { emit }) {
    console.log('.showLine.showLine', props.showLine)
    const handleValueChange = (value, field) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value }) // 双向绑定需要同时更新
    }

    return {
      handleValueChange
    }
  }
}
</script>

<style lang="less">
  .searchBtn {
    .el-form-item__label-wrap {
      display: none;
    }
  }
</style>
