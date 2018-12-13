<template>
<div>
    <!-- 左侧导航 -->
  <el-row :span="24" class="main">
    <el-col :span="24">
      <div class="menu-left">
        <div class="admin-logo" @click="menuBtn">
          <!-- <img :src="Logo" v-show="!isCollapse" style="width: calc(14vw)" />
          <span v-show="isCollapse">PK</span> -->
        </div>
        
        <el-menu default-active="0" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#1d2c37" text-color="#fff" theme="dark" :unique-opened="true">
          
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf&&item.power==1" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <div v-for="(term, index2) in item.children" v-if="term.menuShow">
                <el-submenu v-if="term.children &&term.menuShow"  :index="index+'-'+index2+''">
                  <template slot="title" ><i :class="item.iconCls"></i>{{term.name}}</template>
                  <el-menu-item v-for="term2 in term.children" :key="term2.path" :index="term2.path" v-if="term2.menuShow" :class="$route.path==term2.path?'is-active':''">
                    <span slot="title">{{term2.name}}</span>
                  </el-menu-item>

                </el-submenu>
                <el-menu-item :index="term.path" v-else-if="!term.children&&term.menuShow" :class="$route.path==term.path?'is-active':''">
                  <i :class="item.iconCls"></i><span slot="title">{{term.name}}</span>
                </el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length&&item.power==1" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''" >
              <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <div class="right-header">
              <div class="header-title" @click="titleMenu">{{headerTitle}}</div>
              <div class="header-menu">
                <i><strong>您好，{{username}}</strong></i>
                <!-- <i class="el-icon-myicon-xiugaimima1" @click="dialogFormVisible = true"></i> -->
                <i class="el-icon-myicon-iconfontcolor20" @click="logout"></i>
              </div>
            </div>
            <div class="right-body">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPw">
          <el-col :span="18">
            <el-input v-model="ruleForm.oldPw" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPw">
          <el-col :span="18">
            <el-input v-model="ruleForm.newPw" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="重复新密码" :label-width="formLabelWidth" prop="twoNewPw">
          <el-col :span="18">
            <el-input v-model="ruleForm.twoNewPw" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePw('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    var checkConfirm = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入新密码'))
      }
      if (this.ruleForm.newPw !== value) {
        return callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
    return {
      isCollapse: false,
      headerTitle: this.$route.matched[0].name + '／' + this.$route.name,
      username: '',
      Logo: require('../assets/logo.png'),
      dialogFormVisible: false,
      ruleForm: {
        oldPw: '',
        newPw: '',
        twoNewPw: ''
      },
      formLabelWidth: '120px',
      rules: {
        oldPw: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPw: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        twoNewPw: [
          { validator: checkConfirm, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route () {
      this.headerTitle = this.$route.matched[0].name + '／' + this.$route.name
    }
  },
  created () {
    this.username = sessionStorage.getItem('name')
  },
  methods: {
    openSuccess (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    menuBtn () {
      if (this.isCollapse) {
        this.isCollapse = false
      } else {
        this.isCollapse = true
      }
    },
    changePw (formName) {
      // alert('修改密码')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj = this
          var data = this.ruleForm
          obj.$api.post('/users/changepw', data, function (r) {
            obj.openSuccess(r.msg)
            obj.dialogFormVisible = false
            obj.$refs[formName].resetFields()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    titleMenu () {
      this.$router.push(this.$route.path)
    }
  }
}
</script>

