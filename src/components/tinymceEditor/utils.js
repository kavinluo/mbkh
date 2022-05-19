/**
 * tinymce 工具函数
 * 无状态函数、可移植
 */
export const uuid = (prefix) => {
  return prefix + '_' + (Date.now() + Math.floor(Math.random() * 1000000))
}

export const getTinymce = () => {
  const root = typeof window !== 'undefined' ? window : global
  return root && 'tinymce' in root ? root.tinymce : null
}

export function getContent (editor) {
  if (!editor) return ''
  return editor.getContent()
}

export function setContent (val, editor) {
  if (!editor) return
  editor.setContent(val)
}

export function resetContent (val, editor) {
  if (!editor) return
  if (editor.resetContent) return editor.resetContent(val)
  // 若无 reset fun，则手动 reset
  editor.setContent(val)
  editor.setDirty(false) // 恢复初始状态
  editor.undoManager.clear()
}

export function setModeDisabled (editor, disabled = true) {
  if (!editor) return
  editor.mode.set(disabled ? 'readonly' : 'design')
}

// custom images upload handler
export function imageUploadHandler (setting, blobInfo, success, failure, progress) {
  const {
    // eslint-disable-next-line camelcase
    images_upload_url,
    // eslint-disable-next-line camelcase
    images_upload_credentials,
    // eslint-disable-next-line camelcase
    custom_images_upload_header,
    // eslint-disable-next-line camelcase
    custom_images_upload_param,
    // eslint-disable-next-line camelcase
    custom_images_upload_callback
  } = setting || {}

  let xhr, formData

  // eslint-disable-next-line prefer-const
  xhr = new XMLHttpRequest()
  // 是否开启 withCredentials <= images_upload_credentials
  // eslint-disable-next-line camelcase
  xhr.withCredentials = !!images_upload_credentials
  // images_upload_url
  // eslint-disable-next-line camelcase
  xhr.open('POST', images_upload_url || '')

  // eslint-disable-next-line camelcase
  if (custom_images_upload_header) {
    Object.keys(custom_images_upload_header).forEach((key) => {
      xhr.setRequestHeader(key, custom_images_upload_header[key])
    })
  }

  xhr.upload.onprogress = function (e) {
    progress((e.loaded / e.total) * 100)
  }

  xhr.onload = function () {
    if (xhr.status === 403) {
      failure('HTTP Error (custom): status ' + xhr.status, { remove: true })
      return
    }
    if (xhr.status < 200 || xhr.status >= 300) {
      failure('HTTP Error (custom): status ' + xhr.status)
      return
    }

    const json = JSON.parse(xhr.responseText)

    if (!json) {
      failure('Invalid JSON (custom): ' + xhr.responseText)
      return
    }

    // 处理返回图片地址 custom_images_upload_callback
    const backImgUrl =
      // eslint-disable-next-line camelcase
      typeof custom_images_upload_callback === 'function' ? custom_images_upload_callback(json) : json.location

    if (!backImgUrl) {
      failure('Failed Path (custom): location image path is error/empty')
      return
    }

    success(backImgUrl)
  }

  xhr.onerror = function () {
    failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
  }
  // eslint-disable-next-line prefer-const
  formData = new FormData()
  formData.append('file', blobInfo.blob(), blobInfo.filename())

  // 额外的请求参数 custom_images_upload_param
  // eslint-disable-next-line camelcase
  if (custom_images_upload_param) {
    Object.keys(custom_images_upload_param).forEach((key) => {
      formData.append(key, custom_images_upload_param[key])
    })
  }

  xhr.send(formData)
}
