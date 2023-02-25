<template>
    <div>
        <el-container>
            <el-main>
                <!--修改框-->
                <el-dialog
                :title=dialogTitle
                :visible.sync="editDialogVisible"
                :before-close="handleClose"
                width="50%">
                    <!--表单-->
                    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                        <el-form-item label="商品名" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="remarks">
                            <el-input v-model="form.remarks"></el-input>
                        </el-form-item>
                        <el-form-item label="价格" prop="price">
                            <el-input v-model.number="form.price"></el-input>
                        </el-form-item>
                        <el-form-item label="库存" prop="inventory">
                            <el-input v-model.number="form.inventory"></el-input>
                        </el-form-item>
                    </el-form>
                    <!--确定与取消-->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel()">取 消</el-button>
                        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                    </span>
                </el-dialog>

                <!--表格-->
                <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                max-height = "600"
                border
                style="width: 100%">
                    <!--每行输出的内容-->
                    <el-table-column
                    label="商品名"
                    width="200"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    label="备注"
                    width="200"
                    prop="remarks">
                    </el-table-column>
                    <el-table-column
                    label="价格"
                    width="200"
                    prop="price">
                    </el-table-column>
                    <el-table-column
                    label="库存"
                    width="200"
                    prop="inventory">
                    </el-table-column>
                    <el-table-column fixed="right"
                                     width="280"
                                     align="center">
                      <!--搜索框-->
                      <template #header>
                        <el-button size="mini"
                                   type="primary"
                                   class="add"
                                   @click="handleAdd()">添加</el-button>
                        <el-input v-model="search"
                                  placeholder="输入商品名搜索"
                                  style="width: 70%"></el-input>
                      </template>
                      <!--编辑与删除按钮-->
                      <template slot-scope="scope">
                        <el-button type="primary"
                                   @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="danger"
                                   @click="handleDelete(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>

            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'AdminGoodsManage',
  props: {
    tableData: Array
  },
  data: function () {
    return {
      search: '',
      dialogTitle: '',
      editDialogVisible: false,
      isAdd: false,
      id: '',
      rules: {
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', min: 0, max: 10000, message: '价格必须为0-10000的整数', trigger: 'blur' }
        ],
        inventory: [
          { required: true, message: '请输入库存', trigger: 'blur' },
          { type: 'number', min: 0, max: 10000, message: '价格必须为0-10000的整数', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        remarks: '',
        price: '',
        inventory: ''
      }
    }
  },
  methods: {
    // 提交表单
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.editDialogVisible = false
          if (this.isAdd === true) {
            this.isAdd = false
            const params = new URLSearchParams()
            params.append('price', this.form.price)
            params.append('inventory', this.form.inventory)
            params.append('name', this.form.name)
            params.append('remarks', this.form.remarks)
            this.$http.post('/api/goods/addGoods', params)
              .then(() => {
                // 向父组件请求更新数据
                this.$emit('getData')
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              })
              .catch((error) => {
                console.log(error)
                this.$message.error('添加失败')
              })
          } else {
            const params = new URLSearchParams()
            params.append('price', this.form.price)
            params.append('inventory', this.form.inventory)
            params.append('name', this.form.name)
            params.append('remarks', this.form.remarks)
            this.$http.post('/api/goods/addGoods', params)
            this.$http.post('/api/manage/editGoods', params)
              .then(() => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$emit('getData')
              })
              .catch((error) => {
                console.log(error)
                this.$message.error('修改失败')
              })
          }
        } else {
          return false
        }
      })
    },
    // 关闭表单
    cancel (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.isAdd = false
          this.editDialogVisible = false
          done()
        })
        .catch(_ => { })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.isAdd = false
          done()
        })
        .catch(_ => { })
    },
    // 添加
    handleAdd () {
      // 初始化表单
      this.dialogTitle = '添加'
      this.form.name = ''
      this.form.remarks = ''
      this.form.price = ''
      this.form.inventory = ''
      this.editDialogVisible = true
      this.isAdd = true
    },
    // 编辑
    handleEdit (row) {
      // 将表格数据传入表单
      this.dialogTitle = '编辑'
      this.form.name = row.name
      this.form.remarks = row.remarks
      this.form.price = row.price
      this.form.inventory = row.inventory
      this.editDialogVisible = true
    },
    // 删除
    handleDelete (row) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送请求，让数据库删除数据
        const params = new URLSearchParams()
        params.append('name', row.name)
        this.$http.post('/api/goods/deleteID', params)
          .then(() => {
            // 向父组件请求更新数据
            this.$emit('getData')
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('删除失败')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}
</script>

<style scoped>

</style>
