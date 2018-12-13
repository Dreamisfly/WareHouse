<template>
  <div class="goods-add-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px"  class="demo-ruleForm">
      <el-row :span="24">
        <el-form-item label="名称" prop="name">
          <el-col :span="16">
            <el-input v-model="ruleForm.name"></el-input>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-checkbox v-model="ruleForm.state" true-label="1" false-label="0">是否上架</el-checkbox>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row :span="24">
        <el-form-item label="描述" prop="attr">
          <el-col :span="16">
            <el-input v-model="ruleForm.attr"></el-input>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-checkbox v-model="ruleForm.is_recommend">今日推荐</el-checkbox>
          </el-col>
        </el-form-item>
      </el-row>
      <el-form-item label="分类" prop="category_id">
        <el-col :span="16">
          <el-select v-model="ruleForm.category_id" filterable placeholder="请选择分类">
            <el-option
              v-for="item in categorys"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="是否转发优惠" prop="is_promotion">
        <el-radio-group v-model="ruleForm.is_promotion" size="small">
          <el-radio label="1" border>是</el-radio>
          <el-radio label="0" border>不是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="转发优化价格" prop="promotion_price" v-if="ruleForm.is_promotion == 1">
        <el-col :span="16">
          <el-input v-model="ruleForm.promotion_price"  placeholder="输入转发优惠价格"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-col :span="16">
          <el-input v-model="ruleForm.price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="折扣" prop="discount">
        <el-col :span="16">
          <el-input v-model="ruleForm.discount"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-col :span="16">
          <el-input v-model="ruleForm.market_price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="上传封面" prop="image">
        <el-upload
          class="avatar-uploader"
          
          :action="upImgUrl"
          :data="form"
          :show-file-list="false"
          :on-success="upImgSuccess"
          :before-upload="beforeUpload">
          <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情" prop="description">
        <el-col :span="20">
          <div class="components-container">
            
            <div class="editor-container">
              <!-- <UE :defaultMsg="form_data.content" :config=config :id=ue1 ref="ue"></UE> -->
              <script id="ue1" type="text/plain"></script>
            </div>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import UE from '../../components/ue/ue.vue'
    export default {
      components: {
        UE
      },
      data () {
        var checkType = (rule, value, callback) => {
          if(this.ruleForm.is_promotion == 1){
            if (!value) {
              return callback(new Error('请填写转发优惠价格'))
            }
          }
          callback()
        }
        return {
          ruleForm: {
            module_id: this.$val.moduleId(),
            name: '',
            state: '',
            attr: '',
            is_recommend: '',
            description: '',
            discount: '',
            price: '',
            market_price: '',
            category_id: '',
            image: '',
            is_promotion: '',
            promotion_price: ''
          },
          editor: null,
          ue1: 'ue1', // 不同编辑器必须不同的id
          config: {
            initialFrameWidth: null,
            initialFrameHeight: 350
          },
          categorys: [],
          bucketHost: this.$val.OutMp3Url(),   // 上传图片的外链域名
          form: {},
          upImgUrl: this.$val.upMp3Url(),      //this.$val.upImgUrl(), // 服务器上传使用
          //upImgData: {token: this.$val.token(), app_id: this.$val.appID(), domain_type: this.$val.domainType(), type: this.$val.upImgType()},    // 服务器上传使用
          rules: {
            name: [
              { required: true, message: '请输入分类名称', trigger: 'blur' }
            ],
            attr: [
              { required: true, message: '请输入描述', trigger: 'blur' }
            ],
            is_promotion: [
              { required: true, message: '请选择是否转发优惠', trigger: 'change' }
            ],
            promotion_price: [
              { validator: checkType, required: true, trigger: 'blur' }
            ],
            category_id: [
              { required: true, message: '请选择分类', trigger: 'change' }
            ],
            price: [
              { required: true, message: '请输入价格', trigger: 'blur' }
            ],
            discount: [
              { required: true, message: '请输入折扣', trigger: 'blur' }
            ],
            market_price: [
              { required: true, message: '请输入市场价格', trigger: 'blur' }
            ],
            image: [
              { required: true, message: '请上传封面', trigger: 'change' }
            ],
            description: [
              { required: true, message: '请输入商品描述', trigger: 'blur' }
            ],
          }
        }
      },
      created () {
        var obj = this
        obj.$api.post('/category/list', {'module_id': obj.$val.moduleId(), 'page_size': 1000, 'page': 1}, function (r, p) {
          obj.categorys = obj.$common.selFormat(r.items)
        })
      },
      mounted () {
        this.editor = window.UE.getEditor('ue1', this.config) // 初始化UE
        // console.log(this.editor)
        var obj = this
        var id = this.$route.query.oid
        if (id) {
          obj.$api.post('/goods/detail', { 'id': id }, function (r) {
            if(parseInt(r.code) !== 0){
              obj.$message({
                message: '数据获取失败，请重新打开。',
                type: 'warning'
              })
            }else{
              obj.ruleForm.name = r.data.name
              obj.ruleForm.state = r.data.state.toString()
              obj.ruleForm.is_recommend = r.data.is_recommend.toString()
              obj.ruleForm.attr = r.data.attr
              obj.ruleForm.discount = r.data.discount
              obj.ruleForm.price = r.data.price
              obj.ruleForm.market_price = r.data.market_price
              obj.ruleForm.category_id = r.data.category_id
              obj.ruleForm.image = r.data.image
              obj.ruleForm.description = r.data.description
              obj.ruleForm.is_promotion = r.data.is_promotion.toString()
              obj.ruleForm.promotion_price = r.data.promotion_price
              setTimeout(function(){
                obj.editor.setContent(r.data.description)
              }, 1000)
              // obj.editor.setContent(r.data.description) // 确保UE加载完成后，放入内容。
            }
          })
        }
      },
      destroyed () {
        this.editor.destroy()
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
          this.ruleForm.description = this.editor.getContent()
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var url = '/goods/add';
              if(oid){
                url = '/goods/update';
                obj.ruleForm.id = oid
              }
              var ruleData = {}
              for(var item in obj.ruleForm){
                if(obj.ruleForm[item] != '' && item != "username"){
                  ruleData[item] = obj.ruleForm[item]
                }
              }
              obj.$api.post(url, ruleData, function (r) {
                if(parseInt(r.code) === 0){
                  obj.openSuccess("操作成功")
                }
                setTimeout(function () {
                  obj.$router.push('/audio/list')
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
        resetForm (formName) {
          this.$refs[formName].resetFields()
        },
        upImgSuccess(response, file, fileList){
          // if(0 === parseInt(response.code)){
          //   this.ruleForm.image = response.data.path
          // }
          let key = response.key
          let name = file.name
          let prefix = this.supportWebp ? 'webp/' : ''
          let url = `${this.bucketHost}/${prefix}${encodeURI(key)}`
          // this.fileList = {"name": name, "url": url}
          this.ruleForm.image = url
        },
        beforeUpload (file) {
          var _this = this
          _this.form.key = file.name
          // _this.$api.post('/file/qiniutoken', {}, function (r) {
          //   _this.form.token = r
          // })
          $.ajaxSetup({ 
              async : false 
          });
          var apiUrl = this.$val.apiUrl() + "/file/qiniutoken"
          $.post(apiUrl, {'module_id': this.$val.moduleId(), 'token': this.$val.token, 'domain_type': this.$val.domainType(), 'app_id': this.$val.appID()}, function(data) { 
            _this.form.token = data
          });

          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 10;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 10;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }
    }
</script>
