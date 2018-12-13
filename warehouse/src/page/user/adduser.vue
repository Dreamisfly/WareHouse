<template>
	<div class="adduser-main">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
		  <el-form-item label="账号" prop="username">
		    <el-input v-model="ruleForm.username"></el-input>
		  </el-form-item>
      <el-form-item label="姓名" prop="nickname">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model.number="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="company">
        <el-input v-model="ruleForm.company"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="password2">
        <el-input v-model="ruleForm.password2"></el-input>
      </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
    export default {
      data () {
        var checkTel = (rule, value, callback) => {
          // if (!value) {
          //   return callback(new Error('电话号码不能为空'))
          // }
          if (!Number.isInteger(value)) {
            return callback(new Error('请输入数字值'))
          }
          if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
            return callback(new Error('手机号码格式不正确'))
          }
          callback()
        }
        var checkPw = (rule, value, callback) => {
          // if (!value) {
          //   return callback(new Error('请重复密码'))
          // }
          if (this.ruleForm.password !== '' && this.ruleForm.password !== value) {
            return callback(new Error('两次密码输入不一致'))
          }
          callback()
        }
        return {
          ruleForm: {
            username: '',
            nickname: '',
            email: '',
            mobile: '',
            company: '',
            password: ''
          },
          rules: {
            username: [
              { required: true, message: '请输入账户名称', trigger: 'blur' }
            ],
            mobile: [
              { validator: checkTel, required: true, trigger: 'blur' }
            ],
            company: [
              { required: true, message: '请输入公司名称', trigger: 'blur' }
            ],
            // password: [
            //   { required: false, message: '请输入密码', trigger: 'change' }
            // ],
            password2: [
              { validator: checkPw, required: false, trigger: 'change' }
            ]
          }
        }
      },
      created () {
        var obj = this
        var id = this.$route.query.oid
        if (id) {
          obj.$api.post('/user/detail', { 'id': id }, function (r) {
            console.log(r)
            if(parseInt(r.code) !== 0){
              obj.$message({
                message: '数据获取失败，请重新打开。',
                type: 'warning'
              })
            }else{
              obj.ruleForm.username = r.data.username
              obj.ruleForm.email = r.data.email
              obj.ruleForm.mobile = parseInt(r.data.mobile)
              obj.ruleForm.company = r.data.company
            }
          })
        }
      },
      methods: {
        openSuccess (msg) {
          this.$message({
            message: msg,
            type: 'success'
          })
        },
        submitForm (formName) {
          var obj = this
          var oid = this.$route.query.oid
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var url = '/user/add';
              var ruleData = obj.ruleForm
              if(oid){
                url = '/user/updateinfo';
                obj.ruleForm.id = oid
                ruleData = {}
                for(var item in obj.ruleForm){
                  if(obj.ruleForm[item] != ''){
                    ruleData[item] = obj.ruleForm[item]
                  }
                }
              }
              obj.$api.post(url, ruleData, function (r) {
                if(parseInt(r.code) === 0){
                  obj.openSuccess("操作成功")
                }
                setTimeout(function () {
                  obj.$router.push('/user/userlist')
                }, 3000)
              })
            } else {
              obj.$message({
                message: '提交信息失败',
                type: 'warning'
              })
              return false
            }
          })
        },
        resetPowers () {
          var power = this.ruleForm.power
          for(var k in power){
            this.ruleForm.power[k] = ''
          }
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
        },
        clientCheckAllChange (event) {
          this.ruleForm.checkedClient = event.target.checked ? clientOptions : []
          this.isClient = false
        },
        clientCheckedCitiesChange (value) {
          let checkedCount = value.length
          this.checkAll = checkedCount === this.clients.length
          this.isClient = checkedCount > 0 && checkedCount < this.clients.length
        },
        mediaCheckAllChange (event) {
          this.ruleForm.checkedMedia = event.target.checked ? mediaOptions : []
          this.isMedia = false
        },
        mediaCheckedCitiesChange (value) {
          let checkedCount = value.length
          this.checkAll = checkedCount === this.medias.length
          this.isMedia = checkedCount > 0 && checkedCount < this.medias.length
        },
        radioRest (key1,key2) {
          if(this.ruleForm.power[key1] == '' || this.ruleForm.power[key1] == false){
            this.ruleForm.power[key2] = ''
          }
        },
        checkboxRest (key1,key2) {
          if(this.ruleForm.power[key2] > 0){
            this.ruleForm.power[key1] = true
          }
        }
      }
    }
</script>
