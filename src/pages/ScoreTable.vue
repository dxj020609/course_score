<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <el-page-header @back="goBack"></el-page-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/Course'}">课程管理</el-breadcrumb-item>
          <el-breadcrumb-item >项目管理</el-breadcrumb-item>
          <el-breadcrumb-item >任务管理</el-breadcrumb-item>
          <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-table class="table" :data="testTable" border >
      <el-table-column
        prop="studentId"
        label="学号"
        width="50px"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        prop="studentName"
        label="学生姓名"
        width="100px"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        prop="sex"
        label="姓别"
        width="80px"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.sex">男</span>
          <span v-if="scope.row.sex">女</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级名"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="组名"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="scoreStatus"
        label="评分状态"
        width="85px"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <i
            v-if="scope.row.scoreStatus == 1"
            class="el-icon-success"
            style="color: green; height: 100%"
          ></i>
          <i
            v-if="scope.row.scoreStatus != 1"
            class="el-icon-error"
            style="color: red; height: 100%"
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150px"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="update(scope.row)"
          >去评分
          </el-button>
          <el-popconfirm
            confirm-button-text='是'
            cancel-button-text='否'
            icon="el-icon-info"
            icon-color="red"
            title="确定要重置成绩吗？"
            @confirm="del(scope.row.scoreId)"
          >
            <el-button
            type="danger"
            v-if="scope.row.scoreStatus == 1"
            size="mini"
            icon="el-icon-refresh"
            slot="reference"
            circle
          ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagin :page="page" :size="size" :table="taskTable" :total="total" v-on:changeTable="changetestTable"></Pagin>
  </div>
</template>

<script>
import axios from "axios";
import Pagin from '../components/Pagin.vue'
export default {
  name: "ScoreTable",
  props:['taskId','projectId','teacherId','classId','courseId'],
  components: { Pagin },
  data() {
    return {
      //信息
      tableData: [],
      testTable:[],
      size:8,
      page:1,
      total:0,
    };
  },
  methods: {
    changetestTable(value){
        this.testTable = value;
    },
    goBack(){
      this.$router.push({
            name:'task',
            params:{
              projectId:this.projectId,
              teacherId:this.teacherId,
              classId:this.classId,
              courseId:this.courseId
            }
        })
    },
    update(row) {
      this.$router.push({
            name:'score',
            params:{
              id:row.studentId,
              taskId:this.taskId,
              projectId:this.projectId,
              teacherId:this.teacherId,
              classId:this.classId,
              courseId:this.courseId
            }
        })
    },
    del(Id) {
      axios({
        method: "DELETE",
        url: "http://localhost:8080/api2/score/info/del/" + `${Id}`,
      }).then((response) => {
        axios({
          method: "Get",
          url: "http://localhost:8080/api2/score/student/info/"+`${this.taskId}`,
        }).then((response) => {
          console.log(response);
          this.tableData = response.data.data; 
        });
        if(response.data.code==200){
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
        }else{
          this.$message({
            message: response.data.msg,
            type: 'danger'
          });
        }
      });
    },
  },
  mounted() {
    axios({
      method: "Get",
      url: "http://localhost:8080/api2/score/student/info/"+`${this.taskId}`,
    }).then((response) => {
      this.tableData = response.data.data;
      this.testTable = response.data.data.slice(0,this.size);
      this.total = response.data.data.length;  
    });
  },
};
</script>

<style scoped>
.el-table{
  width: 100%
}
.box-card{
  margin-bottom: 10px;
}
.el-page-header{
  display: inline-block;
}
.el-breadcrumb{
  display: inline-block;
}
</style>