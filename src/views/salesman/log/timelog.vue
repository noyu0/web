<template>
    <div>
        <el-container>
            <el-main>
                <el-table
                :data="tableData.filter(data =>!search ||data.id.toLowerCase().includes(search.toLowerCase()))"
                    max-height="600" border style="width: 100%">
                    <!--每行输出的内容-->
                    <el-table-column label="ID" width="200" prop="id">
                    </el-table-column>
                    <el-table-column label="身份" width="200" prop="identity">
                    </el-table-column>
                    <el-table-column label="操作类型" width="200" prop="type">
                    </el-table-column>
                    <el-table-column label="时间" width="200" prop="time">
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'timeRecord',
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
