<template>
  <div>
    <el-table class="table" :data="tableData" border style="width: 100%" >
        <el-table-column prop="courseName" label="课程名" width="200px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="projectName" label="项目名" width="200px" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="taskName" label="任务名" width="175px" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="teacherName" label="老师名" width="150px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="330px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="330px" align='center' :resizable='false'></el-table-column>
        <el-table-column label="评分状态" width="100px" align='center' :resizable='false' scope="scope">
            <template slot-scope="scope">
              <!-- 显示是否评分 -->
              <i v-if="scope.row.statusScore ==2" class="el-icon-success" style="color:green;height:100%">已提交</i>
              <i v-if="scope.row.statusScore ==1" class="el-icon-info" >已保存</i>
              <i v-if="scope.row.statusScore ==0" class="el-icon-error" style="color:red;height:100%">未提交</i>
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
import axios from 'axios'
export default {
    name: "TaskList",
    data() {
      return {
        tableData: [
        {
          studentId: '2016-05-04',
          studentName: '王小虎',
          password: 2
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
      axios({
        method:'Get',
        url:'http://localhost:8080/api2/taskQuery',
        params:{
          id:sessionStorage.getItem('user')
        }
      }).then((response)=>{
          this.tableData = response.data;
    })
  },
};
</script>

<style scoped>

</style>