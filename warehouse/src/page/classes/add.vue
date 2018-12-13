<template>
	<div class="classes-add-main">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px"  class="demo-ruleForm">
		  <el-form-item label="分类名称" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="请输入内容"
          v-model="ruleForm.description">
        </el-input>
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
        return {
          ruleForm: {
            module_id: this.$val.moduleId(),
            name: '',
            description: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入分类名称', trigger: 'blur' }
            ]
          }
        }
      },
      created () {
        var obj = this
        var id = this.$route.query.oid
        if (id) {
          obj.$api.post('/category/detail', { 'id': id }, function (r) {
            if(parseInt(r.errorCode) !== 0){
              obj.$message({
                message: '数据获取失败，请重新打开。',
                type: 'warning'
              })
            }else{
              obj.ruleForm.name = r.responseData.name
              obj.ruleForm.description = r.responseData.description
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
              var url = '/category/add';
              if(oid){
                url = '/category/update';
                obj.ruleForm.id = oid
              }
              obj.$api.post(url, obj.ruleForm, function (r) {
                if(parseInt(r.code) === 0){
                  obj.openSuccess("操作成功")
                }
                setTimeout(function () {
                  obj.$router.push('/classes/list')
                }, 2000)
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
        resetForm (formName) {
          this.$refs[formName].resetFields()
        }
      }
    }
</script>
