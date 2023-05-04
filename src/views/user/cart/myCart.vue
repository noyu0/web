<template>
    <div>
        <el-container>
            <el-main>
                <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                max-height = "600"
                border
                style="width: 100%">
                    <!--每行输出的内容-->
                    <el-table-column
                    label="名称"
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
                    <el-table-column
                    fixed="right"
                    width="280"
                    align="center">
                        <!--搜索框-->
                        <template #header>
                            <el-input
                            v-model="search"
                            placeholder="输入名称搜索"
                            ></el-input>
                        </template>
                        <!--编辑与删除按钮-->
                        <template slot-scope="scope">
                            <el-button
                            type="primary"
                            @click="handleBuy(scope.row)">购买</el-button>
                            <el-button
                            type="danger"
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
  name: 'MyCart',
  props: {
    tableData: Array
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    handleBuy (row) {
      this.$confirm('是否购买该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = new URLSearchParams()
        params.append('name', row.name)
        params.append('remarks', row.remarks)
        params.append('price', row.price)
        params.append('id', row.id)
        this.$http.post('/api/mall/addmyGoods', params)
          .then(() => {
            params.append('inventory', row.inventory - 1)
            this.$http.post('/api/manage/editGoods', params)
              .then(() => {
                params.append('amount', this.$http.get('/api/log/getamount', params) + 1)
                this.$http.post('/api/log/updatelog', params)
                  .then(() => {
                    this.$http.post('/api/mall/deleteCart', params)
                      .then(() => {
                        // 向父组件请求更新数据
                        this.$emit('getData')
                        this.$emit('updateCart')
                        this.$emit('updateMyGoods')
                        this.$message({
                          message: '购买成功',
                          type: 'success'
                        })
                      }).catch((error) => {
                        console.log(error)
                        this.$message.error('购买成功但购物车删除失败')
                      })
                  }).catch((error) => {
                    console.log(error)
                    this.$message.error('修改日志失败')
                  })
              }).catch((error) => {
                console.log(error)
                this.$message.error('购买成功但库存修改失败')
              })
          }).catch((error) => {
            console.log(error)
            this.$message.error('添加失败')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消购买'
        })
      })
    },
    handleDelete (row) {
      this.$confirm('是否删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送请求，让数据库删除数据
        const params = new URLSearchParams()
        params.append('name', row.name)
        this.$http.post('/api/mall/deleteCart', params)
          .then(() => {
            // 向父组件请求更新数据
            this.$emit('updateCart')
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
