<template>
  <!--导航栏-->
  <div class="salesmanBody">
    <el-container>
      <el-aside width="200px" style="height: 800px; background-color: rgb(128, 128, 128)">
        <el-menu :default-openeds="['1', '2']" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-tools"></i>商品管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-marketing"></i>日志记录</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">商品销量</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-2">操作日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>

  </div>
</template>

<script>
export default {
  name: 'salesmanNav',
  methods: {
    handleSelect (key) {
      // 向vuex和父组件传递key值，即控制页面（子组件）显示与否的index值
      this.$store.commit('changeIndex', key)
      this.$emit('conveyIsShow', key)
    }
  }
}
</script>

<style scoped>
  .el-aside {
    color: #333;
  }
</style>
