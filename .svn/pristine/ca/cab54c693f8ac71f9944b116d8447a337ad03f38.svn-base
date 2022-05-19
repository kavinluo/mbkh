<template>
  <div :id="state.id" class="tiny-textarea"></div>
  <p v-if="state.err">{{ state.err }}</p>
</template>

<script>
</script>

<script setup>
import {
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated
} from 'vue'

import {
  uuid,
  getTinymce,
  getContent,
  setContent,
  resetContent,
  setModeDisabled,
  imageUploadHandler
} from './utils'

import { scriptLoader } from './scriptLoader'

const props = defineProps({
  modelValue: String,
  setting: { type: Object, default: () => ({}) },
  setup: Function,
  disabled: Boolean,
  scriptSrc: String,
  debug: Boolean
})

const emit = defineEmits(['update:modelValue', 'init', 'change'])

let mounting = true

const state = reactive({
  editor: null,
  id: uuid('tinymce'),
  err: ''
})

const getModelValue = () => String(props.modelValue ?? '')

const updateValue = val => emit('update:modelValue', val)

const printLog = (e, val, oldVal) => {
  if (!props.debug) return
  console.log(`来自：${e.type} | \n ${val} \n ${oldVal || '--'}`)
}

const onChanged = (e, editor) => {
  if (!editor) editor = state.editor

  const content = getContent(editor)
  printLog(e, content)

  updateValue(content)
  emit('change', content)
}

const onInited = editor => {
  state.editor = editor

  setContent(getModelValue(), editor)

  if (props.disabled && editor.mode.get() !== 'readonly') {
    setModeDisabled(editor)
  }

  // change input undo redo keyup
  editor.on('change input undo redo', e => {
    onChanged(e, editor)
  })

  emit('init', editor)
}

const initEditor = () => {
  if (getTinymce() === null) {
    state.err = 'tinymce is null'
    return
  }

  if (props.debug) {
    console.warn('vue3-tinymce 进入debug模式')
  }

  const setting = {
    ...props.setting,
    language: 'zh_CN',
    toolbar: 'undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
    toolbar_mode: 'floating',
    quickbars_selection_toolbar: 'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
    plugins: 'link image media table lists fullscreen quickbars searchreplace', // 根据需求配置，保证/plugins里面有该插件
    fontsize_formats: '12px 14px 16px 18px',
    default_link_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: true,
    selector: '#' + state.id,
    setup: editor => {
      if (props.setup) props.setup(editor)
      editor.on('init', () => onInited(editor))
    }
  }

  // custom_images_upload true
  if (props.setting.custom_images_upload) {
    setting.images_upload_handler = (...arg) => {
      imageUploadHandler.apply(null, [props.setting || {}, ...arg])
    }
  }

  getTinymce().init(setting)
  mounting = false
}

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (!state.editor || !state.editor.initialized) return
    if (oldVal === val || val === getContent(state.editor)) return

    printLog({ type: 'propsChanged to setContent' }, val, oldVal)

    if (val === null) return resetContent('', state.editor)
    setContent(getModelValue(), state.editor)
  }
)

watch(
  () => props.disabled,
  val => {
    if (!state.editor || !state.editor.initialized) return
    setModeDisabled(state.editor, val)
  }
)

defineExpose({
  id: state.id,
  editor: state.editor
})

onMounted(() => {
  if (getTinymce() !== null) {
    initEditor()
    return
  }

  const scriptSrc =
    props.scriptSrc ??
    '/tinymce_5.10.4/tinymce.min.js'
    // 'https://cdn.bootcdn.net/ajax/libs/tinymce/5.8.2/tinymce.min.js'
  scriptLoader.load(scriptSrc, initEditor)
})

onActivated(() => {
  if (!mounting) initEditor()
})

onDeactivated(() => {
  if (!state.editor) return
  state.editor.remove()
})

onBeforeUnmount(() => {
  if (!state.editor) return
  state.editor.remove()
})
</script>
<script>
  export default {
    name: 'tinymceEditor'
  }
</script>
