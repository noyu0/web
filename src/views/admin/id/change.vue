<template>
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
                  <el-form-item label="销售人员ID" prop="userid">
                      <el-input v-model="form.userid"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="form.password"></el-input>
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
          :data="tableData.filter(data => !search || data.userid.toLowerCase().includes(search.toLowerCase()))"
          max-height = "600"
          border
          style="width: 100%">
              <!--每行输出的内容-->
              <el-table-column
              label="销售人员ID"
              width="200"
              prop="userid">
              </el-table-column>
              <el-table-column
              label="密码"
              width="300"
              prop="password">
              </el-table-column>
              <el-table-column
              fixed="right"
              width="280"
              align="center">
                  <!--搜索框，注意一定要#header，不能写v-slot，不然有显示问题-->
                  <template #header>
                      <el-button
                      size="mini"
                      type="primary"
                      class="add"
                      @click="handleAdd()">添加</el-button>
                      <el-input
                      v-model="search"
                      placeholder="输入ID搜索"
                      style="width: 70%"
                      ></el-input>
                  </template>
                  <!--编辑与删除按钮-->
                  <template slot-scope="scope">
                      <el-button
                      type="primary"
                      @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button
                      type="danger"
                      @click="handleDelete(scope.row)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
        </el-main>
    </el-container>
</template>

<script>
// 表单验证——密码
const validPassword = (rule, value, callback) => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,15}$/
  if (!reg.test(value)) {
    callback(new Error('密码必须是由4-15位字母+数字组合'))
  } else {
    callback()
  }
}
export default {
  name: 'IdChange',
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
        userid: [
          { required: true, message: '请输入用户ID', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validPassword, trigger: 'blur' }
        ]
      },
      form: {
        userid: '',
        password: ''
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
            // 发送请求，让数据库添加销售人员ID
            const params = new URLSearchParams()
            params.append('userid', this.form.userid)
            params.append('password', this.form.password)
            this.$http.post('/api/salesmanID/addID', params)
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
            // 发送请求，让数据库修改销售人员ID
            const params = new URLSearchParams()
            params.append('userid', this.form.userid)
            params.append('password', this.form.password)
            params.append('id', this.id)
            this.$http.put('/api/salesmanID/updateID', params)
              .then(() => {
                // 向父组件请求更新数据
                this.$emit('getData')
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
              })
              .catch((error) => {
                console.log(error)
                this.$message.error('编辑失败')
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
        .catch(_ => {})
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.isAdd = false
          done()
        })
        .catch(_ => {})
    },
    // 添加
    handleAdd () {
      // 初始化表单
      this.dialogTitle = '添加'
      this.form.userid = ''
      this.form.password = ''
      this.editDialogVisible = true
      this.isAdd = true
    },
    // 编辑
    handleEdit (row) {
      // 将表格数据传入表单
      this.dialogTitle = '编辑'
      this.form.userid = row.userid
      this.form.password = row.password
      this.id = row.userid
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
        params.append('userid', row.userid)
        this.$http.post('/api/salesmanID/deleteID', params)
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
  .add {
    margin-right: 8px;
  }
</style>
