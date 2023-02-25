<template>
    <div class="bg">
      <el-dialog
          :title=dialogTitle
          :visible.sync="editDialogVisible"
          :before-close="handleClose"
          width="50%">
              <!--表单-->
              <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                  <el-form-item label="ID" prop="userid">
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

        <div class="info_area">
            <div class="title">电子商务网站</div>
            <el-form :model="Lform" label-width="80px" class="form">
                <el-input v-model="Lform.name"
                placeholder="用户名"
                type="name"
                class="input"></el-input>
                <el-input v-model="Lform.password"
                placeholder="密码"
                type="password"
                class="input"></el-input>
            </el-form>
            <div class="btn" @click="login()">登录</div>
            <div class="btn" @click="register()">注册</div>
        </div>
    </div>
</template>

<script>
const validPassword = (rule, value, callback) => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,15}$/
  if (!reg.test(value)) {
    callback(new Error('密码必须是由4-15位字母+数字组合'))
  } else {
    callback()
  }
}

export default {
  name: 'LoginPage',
  data () {
    return {
      editDialogVisible: false,
      dialogTitle: '',
      Lform: {
        name: '',
        password: ''
      },
      form: {
        userid: '',
        password: ''
      },
      ID: [],
      isWrong: true,
      rules: {
        userid: [
          { required: true, message: '请输入用户ID', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      if (this.Lform.name === '' || this.Lform.password === '') {
        this.$message.error('请输入用户名和密码')
      } else {
        this.$http.get('/api/lar/getID')
          .then((res) => {
            this.ID = res.data.data
            for (let i = 0; i < this.ID.length; i++) {
              if (this.ID[i].userid === this.Lform.name && this.ID[i].password === this.Lform.password) {
                this.isWrong = false
                // 在这进入对应账号的页面
                if (this.ID[i].identity === '用户') {
                  this.$router.push({ name: 'user' })
                } else if (this.ID[i].identity === '销售人员') {
                  this.$router.push({ name: 'salesman' })
                } else if (this.ID[i].identity === '管理员') {
                  this.$router.push({ name: 'admin' })
                }
                this.$store.commit('changeID', this.ID[i].userid)
              }
            }
            if (this.isWrong === true) {
              this.$message.error('用户名或密码错误')
            }
            this.isWrong = true
          })
      }
    },
    register () {
      // 初始化表单
      this.dialogTitle = '注册'
      this.form.userid = ''
      this.form.password = ''
      this.editDialogVisible = true
    },
    // 关闭表单
    cancel (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.editDialogVisible = false
          done()
        })
        .catch(_ => {})
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.editDialogVisible = false
          // 发送请求，让数据库添加新用户ID
          const params = new URLSearchParams()
          params.append('userid', this.form.userid)
          params.append('password', this.form.password)
          this.$http.post('/api/lar/addID', params)
            .then(() => {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
            })
            .catch((error) => {
              console.log(error)
              this.$message.error('注册失败')
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
    .bg {
        background-color: rgb(238, 239, 227);
        height: 100%;
    }
    .info_area {
        height: 360px;
        width: 480px;
        position: relative;
        left: 50%;
        top: 50%;
        border-radius: 15px;
        background-color: rgb(164, 187, 209);
        transform: translate(-50%, -50%);
    }
    .title {
        width: 100%;
        text-align: center;
        font-size: 35px;
        padding: 50px 0 0 0;
    }
    .form {
        padding: 30px 20px 0 20px;
    }
    .input {
        margin-top: 10px;
        margin-bottom: 5px;
    }
    .btn {
        margin-top: 10px;
        width: 380px;
        margin-left: 50px;
        margin-right: 50px;
        height: 35px;
        border-radius: 10px;
        border: 0;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 15px;
        background-image: linear-gradient(to right, #30cfd0, #330867);
    }
</style>
