<template>
    <!--页面头部-->
    <el-container class="headerContainer">
        <el-header style="text-align: right; font-size: 17px">
            <el-dropdown @command="handleCommand">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span style="margin-right: 30px">{{userid}}</span>
        </el-header>
    </el-container>
</template>

<script>
export default {
  name: 'HeaderPage',
  data () {
    return {
      userid: ''
    }
  },
  methods: {
    handleCommand () {
      this.$router.push({ name: 'login' })
    }
  },
  mounted () {
    this.userid = this.$store.state.userid
  }
}
</script>

<style scoped>
  .el-header {
    background-color:#ffd800;
    color: #000000;
    line-height: 60px;
  }

</style>
