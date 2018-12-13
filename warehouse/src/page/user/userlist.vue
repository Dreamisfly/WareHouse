<template>
<div>
  <div class="header">
    <div class="btn">
      <!-- <el-button type="primary" @click="addUser" size="small"><i class="el-icon-plus"></i> 添加用户</el-button> -->
    </div>
    <div class="search">
        <el-input placeholder="请输入昵称" v-model="search" size="small">
            <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
        </el-input>
    </div>
  </div>
	<div class="userlist-main">
		
		<div class="userlist-body">
			<el-table
			    :data="tableData"
			    stripe
			    :border="false"
			    style="width: 100%">
          <el-table-column
            prop="nickname"
            label="昵称">
          </el-table-column>
          <el-table-column
            
            label="头像">
            <template slot-scope="scope">
                <img :src="scope.row.gravatar" width="50" height="50"/>
              </template>
          </el-table-column>
			    <el-table-column
			      prop="sex"
			      label="性别">
			    </el-table-column>
          <el-table-column
            prop="province"
            label="省">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市">
          </el-table-column>
			    <el-table-column
			      prop="created_at"
            width="150"
			      label="创建时间">
			    </el-table-column>
			    <el-table-column
			      prop="updated_at"
            width="150"
			      label="更新时间">
			    </el-table-column>
			    <!-- <el-table-column
			      label="操作" width="150">
			      <template slot-scope="scope">
			        <el-button @click="delClick(scope.$index, scope.row.uid)" type="text" size="small">删除</el-button>
              <el-button @click="editClick(scope.$index, scope.row.uid)" type="text" size="small">编辑</el-button>
			      </template>
			    </el-table-column> -->
			 </el-table>
		</div>
		<div class="userlist-footer">
			<el-pagination
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
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        var obj = this
        obj.$api.post('/user/list', {'module_id': obj.$val.moduleId(), 'page_size': obj.pagecurrent, 'page': 1, type: 1}, function (r, p) {
          for(var item in r.items){
            r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
            r.items[item].updated_at = obj.$common.formatDate(r.items[item].updated_at)
            r.items[item].sex = r.items[item].sex == 0 ? "未知" : r.items[item].sex == 1 ? "男" : "女"
          }
          obj.tableData = r.items
          obj.pagerotal = r.total_count
          obj.pagecurrent = r.page_size
        })
      },
      handleIconClick (ev) {
        var obj = this
        obj.$api.post('/user/list', {'module_id': obj.$val.moduleId(), 'page_size': obj.pagecurrent, 'page': 1, type: 1, 'nickname': obj.search}, function (r, p) {
          for(var item in r.items){
            r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
            r.items[item].updated_at = obj.$common.formatDate(r.items[item].updated_at)
            r.items[item].sex = r.items[item].sex == 0 ? "未知" : r.items[item].sex == 1 ? "男" : "女"
          }
          obj.tableData = r.items
          obj.pagerotal = r.total_count
          obj.pagecurrent = r.page_size
        })
      },
      handleCurrentChange (val) {
        var obj = this
        var data = {'module_id': obj.$val.moduleId(), 'page_size': obj.pagecurrent, 'page': val, type: 1}
        if (obj.search) {
          data.nickname = obj.search
        }
        obj.$api.post('/user/list', data, function (r, p) {
          for(var item in r.items){
            r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
            r.items[item].updated_at = obj.$common.formatDate(r.items[item].updated_at)
            r.items[item].sex = r.items[item].sex == 0 ? "未知" : r.items[item].sex == 1 ? "男" : "女"
          }
          obj.tableData = r.items
          obj.pagerotal = r.total_count
          obj.pagecurrent = r.page_size
        })
      },
      addUser () {
        this.$router.push('/user/adduser')
      },
      delClick (index, row) {
        console.log(index, row)
      },
      powerClick (index, row) {
        this.$router.push({path: '/user/power', query: {oid: row}})
      },
      editClick (index, row) {
        this.$router.push({path: '/user/adduser', query: {oid: row}})
      }
    }
  }
</script>
