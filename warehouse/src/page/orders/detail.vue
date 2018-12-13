<template>
	<div class="detail-main">
    <el-form :model="ruleForm" ref="ruleForm" label-width="130px"  class="demo-ruleForm">
      <el-form-item label="订单号：">
        <el-input v-model="ruleForm.order_sn" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品名称：">
        <el-input v-model="ruleForm.goods[0].name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="价格：">
        <el-input v-model="ruleForm.goods[0].price" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="下单时间：">
        <el-input v-model="ruleForm.created_at" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="支付状态：">
        <el-input v-model="orderStatus[ruleForm.order_status]" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="ruleForm.user.nickname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" >
        <el-input v-model="ruleForm.user.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goHistory">后退</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>
<script>
    export default {
      data () {
        return {
          ruleForm: {},
          orderStatus:{"0":"未支付", "1":"已支付"}
        }
      },
      created () {
        var obj = this
        var id = this.$route.query.oid
        if (id) {
          obj.$api.post('/order/detail', { 'id': id }, function (r) {
            console.log(r)
            if(parseInt(r.code) !== 0){
              obj.$message({
                message: '数据获取失败，请重新打开。',
                type: 'warning'
              })
            }else{
              obj.ruleForm = r.data
              obj.ruleForm.created_at = obj.$common.formatDate(obj.ruleForm.created_at)
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
        goHistory () {
          window.history.back(-1); 
        }
      }
    }
</script>
