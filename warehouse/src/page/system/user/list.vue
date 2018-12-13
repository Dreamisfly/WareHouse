<template>
    <div>
        <div class="system-user-header">
            <div class="system-user-btn">
                <el-button type="primary" @click="addClient" size="small"><i class="el-icon-plus"></i> 查询</el-button>
            </div>
            <div class="system-user-search">
                <el-row :span="18">
                    <el-col :span="5" :offset="5">
                        <el-select v-model="category" clearable placeholder="分类" size="small">
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
                    <el-col :span="13">
                        <el-input placeholder="请输入音频名称" v-model="search" size="small">
                            <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="system-user-main">
            <div class="system-user-body">
                <el-table
                        :data="tableData"
                        stripe
                        :border="false"
                        style="width: 100%">
                    <el-table-column
                            label="序号"
                            width="50">
                        <template slot-scope="scope">
                            {{scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="工号"
                            width="80"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <img :src="scope.row.image" width="50" height="50"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            prop="category_id"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="user.nickname"
                            width="100"
                            label="创建日期">
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            width="160"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            width="160"
                            label="邮箱">
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            width="160"
                            label="角色">
                    </el-table-column>
                    <el-table-column
                            label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button @click="editClick(scope.$index, scope.row.uid)" type="text" size="small">编辑</el-button>
                            <el-button @click="delClick(scope.$index, scope.row.uid)" type="text" size="small">禁用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="system-user-footer">
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
                categorys: [],
                category: ''
            }
        },
        created () {
            var obj = this
            obj.$api.post('/category/list', {'module_id': obj.$val.moduleId(), 'page_size': 100, 'page': 1}, function (r, p) {
                obj.categorys = obj.$common.idToNameFormat(r.items)
                obj.getData() // 获取列表信息
            })
        },
        methods: {
            getData () {
                var obj = this
                obj.$api.post('/goods/list', {'module_id': obj.$val.moduleId(), 'page_size': obj.pagecurrent, 'page': 1}, function (r, p) {
                    for(var item in r.items){
                        r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
                        r.items[item].category_id = obj.categorys[r.items[item].category_id]
                    }
                    obj.tableData = r.items
                    obj.pagerotal = r.total_count
                    obj.pagecurrent = r.page_size
                })
            },
            handleIconClick (ev) {
                var obj = this
                var data = {}
                if(obj.search != ""){
                    data.name = obj.search
                }
                if(obj.category != ""){
                    data.category_id = obj.category
                }
                obj.$api.post('/goods/list', data, function (r, p) {
                    for(var item in r.items){
                        r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
                        r.items[item].category_id = obj.categorys[r.items[item].category_id]
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
                if(obj.category != ""){
                    data.category_id = obj.category
                }
                obj.$api.post('/goods/list', data, function (r, p) {
                    for(var item in r.items){
                        r.items[item].created_at = obj.$common.formatDate(r.items[item].created_at)
                        r.items[item].category_id = obj.categorys[r.items[item].category_id]
                    }
                    obj.tableData = r.items
                    obj.pagerotal = r.total_count
                    obj.pagecurrent = r.page_size
                })
            },
            addClient () {
                this.$router.push('/audio/add')
            },
            delClick (index, row) {
                var obj = this
                obj.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            obj.$api.post('/goods/delete', {'id': row, 'module_id': obj.$val.moduleId()}, function (r) {
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
                this.$router.push({path: '/audio/add', query: {oid: row}})
            }
        }
    }
</script>