<template>
	<div>
		<div class="classes-header">
			<div class="classes-btn">
				<el-button type="primary" @click="addClient" size="small"><i class="el-icon-plus"></i> 添加分类</el-button>
			</div>
			<div class="classes-search">
			    <el-input placeholder="请输入分类名称" v-model="search" size="small">
			        <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
			    </el-input>
			</div>
		</div>
		<div class="classes-main">
			
			<div class="classes-body">
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
				      prop="name"
				      label="分类名称">
				    </el-table-column>
				    <el-table-column
				      prop="user.nickname"
              width="150"
				      label="创建人">
				    </el-table-column>
				    <el-table-column
				      prop="created_at"
              width="160"
				      label="创建时间">
				    </el-table-column>
				    <el-table-column
				      prop="updated_at"
              width="160"
				      label="修改时间">
				    </el-table-column>
				    <el-table-column
				      label="操作" width="120">
				      <template slot-scope="scope">
				        <el-button @click="delClick(scope.$index, scope.row.uid)" type="text" size="small">删除</el-button>
				        <el-button @click="editClick(scope.$index, scope.row.uid)" type="text" size="small">编辑</el-button>
				      </template>
				    </el-table-column>
				 </el-table>
			</div>
			<div class="classes-footer">
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
        powerWrite: ''
        // products: []
      }
    },
    created () {
      this.getData()

    },
    methods: {
      getData () {
        var obj = this
        obj.$api.post('/category/list', {'module_id': obj.$val.moduleId(), 'page_size': obj.pagecurrent, 'page': 1}, function (r, p) {
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
        obj.$api.post('/category/list', {'name': obj.search}, function (r, p) {
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
        obj.$api.post('/category/list', data, function (r, p) {
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
      addClient () {
        this.$router.push('/classes/add')
      },
      delClick (index, row) {
        var obj = this
        obj.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              obj.$api.post('/category/delete', {'id': row, 'module_id': obj.$val.moduleId()}, function (r) {
                if (parseInt(r.code) === 0) {
                  // obj.tableData3.splice(index, 1) // 删除不渲染
                  obj.handleCurrentChange(obj.currentPage)   // 删除后重新请求一次数据
                  done()
                } else {
                  this.$message({
                    type: 'info',
                    message: '删除失败!'
                  })
                }
              })
              done() // 关闭弹窗
            } else {
              done()
            }
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editClick (index, row) {
        this.$router.push({path: '/classes/add', query: {oid: row}})
      }
    }
  }
</script>
