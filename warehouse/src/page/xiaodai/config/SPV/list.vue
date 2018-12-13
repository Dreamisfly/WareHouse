<template>
    <div>
        <div class="xiaodai-config-spv-header">
            <div class="xiaodai-config-spv-btn">
                <el-button type="primary" @click="addClient" size="small"><i class="el-icon-plus"></i> 新增</el-button>
            </div>
            <div class="xiaodai-config-spv-search">
                <el-row :span="18">
                    <el-col :span="5" :offset="5">
                        <!--<el-select v-model="category" clearable placeholder="分类" size="small">-->
                            <!--<el-option-->
                                    <!--v-for="(item, index) in categorys"-->
                                    <!--:key="index"-->
                                    <!--:label="item"-->
                                    <!--:value="index">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    </el-col>
                    <el-col :span="1">
                        &nbsp;
                    </el-col>
                    <el-col :span="18">
                        <el-input placeholder="请输入SPV名称" v-model="search" size="small">
                            <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="xiaodai-config-spv-main">
            <div class="xiaodai-config-spv-body">
                <el-table
                        :data="tableData"
                        stripe
                        :border="false"
                        style="width: 100%">
                    <!--<el-table-column-->
                            <!--label="序号"-->
                            <!--width="80">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.$index + 1}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="id"
                            label="序号">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="SPV名称">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="代号">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="描述">
                    </el-table-column>
                    <el-table-column
                            prop="c_time"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            prop="u_time"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button @click="editClick(scope.$index, scope.row.uid)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="xiaodai-config-spv-footer">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="page_size"
                        layout="total, prev, pager, next, jumper"
                        :total="page_total">
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
                page_total: 0,
                page_size: 2,
                powerWrite: '',
                categorys: [],
                category: ''
            }
        },
        created () {
            var obj = this
            // obj.$api.post('/category/list', {'module_id': obj.$val.moduleId(), 'page_size': 100, 'page': 1}, function (r, p) {
            //     obj.categorys = obj.$common.idToNameFormat(r.items)
            //     obj.getData() // 获取列表信息
            // })
            obj.getData()
        },
        methods: {
            getData () {
                var obj = this
                console.log(obj.page_size)
                obj.$api.get('/loan/config/spvs', { 'page_size': obj.page_size, 'page': 1}, function (r, p) {
                    if(r.code == 0){
                        obj.tableData = r.data.data
                        obj.page_total = r.data.total_count
                        obj.page_size = r.data.page_size
                    }else {
                        obj.$notify.error({
                            title: '错误',
                            message: '获取数据失败'
                        });
                    }
                })
            },
            handleIconClick (ev) {
                var obj = this
                var data = {'page_size': obj.page_size, 'page': 1}
                if(obj.search != ""){
                    data['ConfigSpvSearch[name]'] = obj.search
                }

                obj.$api.get('/loan/config/spvs', data, function (r, p) {
                    if(r.code == 0){
                        obj.tableData = r.data.data
                        obj.page_total = r.data.total_count
                        obj.page_size = r.data.page_size
                    }else {
                        obj.$notify.error({
                            title: '错误',
                            message: '获取数据失败'
                        });
                    }
                })
            },
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange (val) {
                var obj = this;
                var data = { 'page_size': obj.page_size, 'page': val};
                if (obj.search) {
                    data['ConfigPaymentSearch[name]'] = obj.search
                }

                obj.$api.get('/loan/config/spvs', data, function (r, p) {
                    if(r.code == 0){
                        obj.tableData = r.data.data
                        obj.page_total = r.data.total_count
                        obj.page_size = r.data.page_size
                    }else {
                        obj.$notify.error({
                            title: '错误',
                            message: '获取数据失败'
                        });
                    }
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