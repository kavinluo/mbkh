
export const accountRules = {
  username: [
    {
      required: true,
      message: '请输入登录账号',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  reCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}
