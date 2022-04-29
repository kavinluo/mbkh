/*
 * @Author: kevin
 * @Date: 2022-03-03 12:49:43
 * @LastEditors: kevin
 * @LastEditTime: 2022-03-29 15:15:53
 * @Description: 表单字段
 */
// 机构
export const organization = {
  labelWidth: '120px',
  itemStyle: { padding: '0 40px 0 0' },
  colLayout: {
    span: 24
  },
  isVerify: true,
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '机构名称',
      placeholder: '请输入机构名称',
      rules: {
        required: true,
        trigger: 'blur',
        message: '请输入机构名称'
      }
    }, {
      field: 'parentId',
      type: 'slot',
      label: '父级菜单',
      placeholder: '请选择',
      slotName: 'parentId'
    }
  ]
}

// 验证
const isMobel = (rule, val, callback) => {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  if (val === '' || !reg.test(val)) {
    callback(new Error('请输入正确的手机号！'))
  } else {
    callback()
  }
}
const isEmail = (rule, val, callback) => {
  const reg = /^(?=.{1,30}$)\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (val === '' || !reg.test(val)) {
    callback(new Error('请输入正确的邮箱！'))
  } else {
    callback()
  }
}
// 系统用户
export const account = {
  labelWidth: '120px',
  itemStyle: { padding: '0 40px 0 0' },
  colLayout: {
    span: 24
  },
  isVerify: true,
  formItems: [
    {
      field: 'account',
      type: 'input',
      label: '登陆账号',
      rules: {
        required: true,
        message: '请输入登陆账号',
        trigger: 'blur'
      },
      placeholder: '请输入登陆账号'
    }, {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名',
      rules: {
        required: true,
        message: '请输入姓名',
        trigger: 'blur'
      }
    }, {
      field: 'email',
      type: 'input',
      label: '电子邮箱',
      placeholder: '请输入电子邮箱',
      rules: {
        required: true,
        trigger: 'blur',
        validator: isEmail
      }
    }, {
      field: 'telephone',
      type: 'input',
      label: '手机号',
      placeholder: '请输入手机号',
      rules: {
        required: true,
        trigger: 'blur',
        validator: isMobel
      }
    }, {
      field: 'number',
      type: 'input',
      label: '人员编号',
      placeholder: '请输入人员编号',
      rules: {
        required: true,
        message: '请输入人员编号',
        trigger: 'blur'
      }
    }, {
      field: 'password',
      type: 'password',
      label: '登陆密码',
      placeholder: '请输入登陆密码',
      rules: {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    }, {
      field: 'enable',
      type: 'slot',
      slotName: 'enable',
      label: '是否启用'
    }

  ]
}
