<template>
  <div>
    <el-table class="table" :data="tableData" border style="width: 100%" >
        <el-table-column prop="date" label="课程名" width="200px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="name" label="项目名" width="200px" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="name" label="任务名" width="208px" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="province" label="个人评分" width="180px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="city" label="小组评分" width="180px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="address" label="老师评分" width="180px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="address" label="导师评分" width="180px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="address" label="总评分" width="180px" align='center' :resizable='false'></el-table-column>
        <!-- <el-table-column label="操作" width="110" align='center' :resizable='false'>
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">保存</el-button>
        </template>
        </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
    name: "CourseResult",
    
    data() {
      return {
        tableData: [
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
      ]
    }
  },
};
</script>

<style scoped>

</style>