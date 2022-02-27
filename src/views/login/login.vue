<template>
  <div class="loginPage">
    <div class="login-wrap">
      <div class="login-title">登录 / LOGIN</div>
      <el-form ref="ruleFormRef" :model="form" label-width="0" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" clearable size="large" placeholder="请输用户名">
            <template #suffix>
              <el-icon class="el-input__icon">
                <Avatar />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin: 30px 0" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            clearable
            size="large"
            placeholder="请输入密码"
            show-password>
            <template #suffix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="large" style="display: block; width: 100%" @click="onSubmit(ruleFormRef)">登录</el-button>
    </div>
  </div>
</template>

<script>
import { getEnvs } from '@/api/test.js'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { accountRules } from './rules'
export default {
  name: 'Login',
  setup () {
    const rules = reactive(accountRules)
    // const currentInstance = getCurrentInstance()
    // const { $axios } = currentInstance.appContext.config.globalProperties
    // const { proxy } = getCurrentInstance()
    const router = useRouter()
    const route = useRoute()
    console.log('router', router, route)
    const ruleFormRef = ref({})
    const form = reactive({
      username: '',
      password: ''
    })
    const onSubmit = (formEl) => {
      // router.push('/manage')
      // // router.push({
      // //   name: 'manage',
      // //   path: '/manage'
      // // })
      // // return
      // if (!formEl) return
      formEl?.validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    const envsData = ref({ })
    // const getData = async ()=> await getEnvs().then((res) =>{
    //   console.log('res',res);
    //   const  { data } = res
    //   envsData.value = data
    //   console.log('envsData',envsData);
    // })
    getEnvs().then((res) => {
      console.log('res', res)
      const { data } = res
      envsData.value = data
    })
    // getData()

    return {
      envsData,
      form,
      rules,
      ruleFormRef,
      onSubmit,
      route
    }
    /**
    // function getList() {
    //   proxy.$axios({
    //     url: '/envs'
    //   }).then(res=>{
    //     let { data } = res.data
    //     console.log('data', data); // undefind
    //     console.log(res.data)  // 正常
    //   })
    // }
    // getList()
    // 方法一 end

    // 方法二 start
    // const { proxy } = getCurrentInstance()

    // function getData() {
    //   proxy.$http({
    //     url: '/api/v1/posts/list'
    //   }).then(res=>{
    //     let { data } = res.data
    //     console.log(data)
    //   })
    // }
    */
  }
}
</script>

<style>
  .loginPage {
    height: 100%;
    background: url('@/assets/img/loginBg.jpg') no-repeat center top;
    background-size: cover;
  }
  .login-title {
    font-size: 20px;
    color: rgb(49, 49, 49);
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .login-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    height: 300px;
    box-sizing: border-box;
    background: #fff;
    padding: 20px 40px;
    text-align: center;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 1px 8px 12px 3px rgb(3, 3, 3, 26%);
  }
</style>
