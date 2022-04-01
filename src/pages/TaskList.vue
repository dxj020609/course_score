<template>
  <div>
    <el-table class="table" :data="tableData" border style="width: 100%" >
        <el-table-column class="page-component__scroll" type="selection" width="55px" align='center'  :resizable='false'> </el-table-column>
        <el-table-column prop="studentId" label="课程名" width="260px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="studentName" label="项目名" width="260px" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="sex" label="老师名" width="150px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="password" label="开始时间" width="330px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="password" label="结束时间" width="330px" align='center' :resizable='false'></el-table-column>
        <el-table-column label="是否评分" width="100px" align='center' :resizable='false' scope="scope">
            <template slot-scope="scope">
              <!-- 显示是否评分 -->
              <i v-if="scope.row.password" class="el-icon-success" style="color:green;height:100%"></i>
              <i v-if="!scope.row.password" class="el-icon-error" style="color:red;height:100%"></i>
            </template>
        </el-table-column>
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
    name: "TaskList",
    data() {
      return {
        tableData: [
        {
          studentId: '2016-05-04',
          studentName: '王小虎',
          password: '上海市普陀区金沙江路 1517 号'
        },
      ]
    }
  },
    methods:{
      handleClick(row){
          console.log(row);
          this.$message({
              message:'保存成功',
              type:'success'
          });
      },
      test(){
          console.log(this)
      }
  },
  mounted() {
    //   axios.get('http://localhost:8080/api2//').then((response)=>{
    //       console.log(this);
    //       console.log(response);
    //       this.tableData = response.data;
    //       console.log(this);
    // })
  },
};
</script>

<style scoped>

</style>