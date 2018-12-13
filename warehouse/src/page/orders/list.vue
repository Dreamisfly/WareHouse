<template>
	<div>
		<div class="orders-header">
			<div class="orders-btn">
				<!-- <el-button type="primary" @click="addClient"><i class="el-icon-plus"></i> 添加订单</el-button> -->
			</div>
			<!-- <div class="orders-search">
        <el-row :span="24">
          <el-col :span="4">
            <el-select v-model="product" clearable placeholder="分类" size="small">
              <el-option
                v-for="(item, index) in categorys"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            &nbsp;
          </el-col>
          <el-col :span="4" >
            <el-select v-model="good" clearable placeholder="商品" size="small">
              <el-option
                v-for="(item, index) in products"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            &nbsp;
          </el-col>
          <el-col :span="9">
            <el-input placeholder="请输入商品名称" v-model="search" size="small">
              <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
            </el-input>
          </el-col>
        </el-row>
			    
			</div> -->
		</div>
		<div class="orders-main">
			<div class="orders-body">
				<el-table
				    :data="tableData"
				    stripe
				    :border="false"
				    style="width: 100%">
            <el-table-column
              label="ID"
              width="50">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column
              prop="order_sn"
              label="订单号"
              width="200">
            </el-table-column>
				    <el-table-column
				      prop="goods[0].goods_name"
				      label="商品"
				      width="200">
				    </el-table-column>
				    <el-table-column
				      prop="goods[0].goods_price"
				      label="金额">
				    </el-table-column>
            <el-table-column
              
              label="订单状态">
              <template slot-scope="scope">
                {{orderStatus[scope.row.order_status]}}
              </template>
            </el-table-column>
				    <el-table-column
				      prop="created_at"
              width="160"
				      label="创建时间">
				    </el-table-column>
				    <el-table-column
				      label="操作" width="120">
				      <template slot-scope="scope">
				        <!-- <el-button @click="delClick(scope.$index, scope.row.id)" type="text" size="small">删除</el-button> -->
				        <el-button @click="editClick(scope.$index, scope.row.uid)" type="text" size="small">查看</el-button>
				      </template>
				    </el-table-column>
				 </el-table>
			</div>
			<div class="orders-footer">
				<el-pagination
			        @size-change="handleSizeChange"
			        @current-change="handleCurrentChange"
			        :current-page="currentPage"
			        :page-sizes="[10, 20, 30, 40]"
			        :page-size="10"
			        layout="total, prev, pager, next, jumper"
			        :total="pagerotal">
			    </el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        tableData: [],
        currentPage: 1,
        pagerotal: 0,
        pagecurrent: 10,
        powerWrite: '',
        products: [],
        categorys: [],
        product: '',
        good: '',
        orderStatus:{"0":"未支付", "1":"已支付"}
      }
    },
    created () {
      var obj = this
      obj.$api.post('/category/list', {'module_id': obj.$val.moduleId(), 'page_size': 100, 'page': 1}, function (r, p) {
        obj.categorys = obj.$common.idToNameFormat(r.items)
      })
      obj.$api.post('/goods/list', {'module_id': obj.$val.moduleId(), 'page_size': 1000, 'page': 1}, function (r, p) {
        obj.products = obj.$common.idToNameFormat(r.items)
      })
      this.getData()

    },
    methods: {
      getData () {
        var obj = this
        obj.$api.post('/order/list', {'module_id': obj.$val.moduleId(), 'page_size': obj.pagecurrent, 'page': 1}, function (r, p) {
          for(var item in r.items){
            r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
            r.items[item].updated_at = obj.$common.formatDate(r.items[item].updated_at)
            // r.items[item].product_id = obj.products[r.items[item].product_id]
          }
          obj.tableData = r.items
          obj.pagerotal = r.total_count
          obj.pagecurrent = r.page_size
        })
      },
      handleIconClick (ev) {
        var obj = this
        obj.$api.post('/order/list', {'name': obj.search}, function (r, p) {
          for(var item in r.items){
            r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
            r.items[item].updated_at = obj.$common.formatDate(r.items[item].updated_at)
            // r.items[item].product_id = obj.products[r.items[item].product_id]
          }
          obj.tableData = r.items
          obj.pagerotal = r.total_count
          obj.pagecurrent = r.page_size
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        var obj = this
        var data = {'module_id': obj.$val.moduleId(), 'page_size': obj.pagecurrent, 'page': val}
        if (obj.search) {
          data.name = obj.search
        }
        obj.$api.post('/order/list', data, function (r, p) {
          for(var item in r.items){
            r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
            r.items[item].updated_at = obj.$common.formatDate(r.items[item].updated_at)
            // r.items[item].product_id = obj.products[r.items[item].product_id]
          }
          obj.tableData = r.items
          obj.pagerotal = r.total_count
          obj.pagecurrent = r.page_size
        })
      },
      // addClient () {
      //   this.$router.push('/client/addclient')
      // },
      editClick (index, row) {
        this.$router.push({path: '/orders/detail', query: {oid: row}})
      }
    }
  }
</script>
