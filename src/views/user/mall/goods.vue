<template>
  <div>
    <el-container>
      <el-main>
        <!--表格-->
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          max-height="600" border style="width: 100%">
          <!--每行输出的内容-->
          <el-table-column label="商品名" width="200" prop="name">
          </el-table-column>
          <el-table-column label="备注" width="200" prop="remarks">
          </el-table-column>
          <el-table-column label="价格" width="200" prop="price">
          </el-table-column>
          <el-table-column label="库存" width="200" prop="inventory">
          </el-table-column>
          <el-table-column fixed="right" width="280" align="center">
            <!--搜索框，注意一定要#header，不能写v-slot，不然有显示问题-->
            <template #header>
              <el-input v-model="search" placeholder="输入商品名搜索"></el-input>
            </template>
            <!--编辑与删除按钮-->
            <template slot-scope="scope">
              <el-button type="primary" @click="handleAdd(scope.row)">加入购物车</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'GoodsMall',
  props: {
    tableData: Array
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    handleAdd (row) {
      const params = new URLSearchParams()
      params.append('name', row.name)
      params.append('remarks', row.remarks)
      params.append('price', row.price)
      params.append('inventory', row.inventory)
      params.append('id', row.id)
      this.$http.post('/api/mall/addCart', params)
        .then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$emit('updateCart')
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('添加失败')
        })
    }
  }
}
</script>

<style scoped></style>
