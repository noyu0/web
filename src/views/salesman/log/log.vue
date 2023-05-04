<template>
    <div>
        <el-container>
            <el-main>
                <el-table
                :data="tableData.filter(data =>!search ||data.name.toLowerCase().includes(search.toLowerCase()))"
                    max-height="600" border style="width: 100%">
                    <!--每行输出的内容-->
                    <el-table-column label="名称" width="200" prop="name">
                    </el-table-column>
                    <el-table-column label="备注" width="200" prop="remarks">
                    </el-table-column>
                    <el-table-column label="价格" width="200" prop="price">
                    </el-table-column>
                    <el-table-column label="销量" width="200" prop="amount">
                    </el-table-column>
                    <el-table-column fixed="right" width="280" align="center">
                        <!--搜索框，注意一定要#header，不能写v-slot，不然有显示问题-->
                        <template #header>
                            <el-input v-model="search" placeholder="输入名称搜索"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'GoodsRecord',
  props: {
    tableData: Array
  },
  data () {
    return {
      search: ''
    }
  }
}
</script>

<style scoped></style>
