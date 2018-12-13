<template>
 <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        logining: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'}
            // { validator: validaePass }
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
            // { validator: validaePass2 }
          ]
        },
        checked: true
      }
    },
    methods: {
      handleLogin () {
        this.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            this.logining = true
            var loginParams = { username: this.account.username, password: this.account.pwd, type: 2}
            var obj = this
            // obj.$api.post('/user/login', loginParams, function (r) {
            //   if (r.code !== 0) {
            //     obj.$message({
            //       message: r.msg,
            //       type: 'error'
            //     })
            //     obj.logining = false
            //   } else {
            //     // console.log(r)
            //     sessionStorage.setItem('access-token', r.data.token)
            //     sessionStorage.setItem('name', r.data.nickname)
            //     sessionStorage.setItem('username', r.data.username)
            //     sessionStorage.setItem('app_id', "7085b04d8a79c6a9")
            //     sessionStorage.setItem('domain_type', 1)
            //     // sessionStorage.setItem('power', JSON.stringify(r.powers))
            //     if (obj.$route.query.redirect) {
            //       obj.$router.push(obj.$route.query.redirect)
            //     } else {
            //       obj.$router.push('/')
            //     }
            //   }
            // })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

