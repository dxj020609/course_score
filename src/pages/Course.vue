<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <!-- <el-row :gutter="60"> -->
        <!-- <el-col :span="1"> -->
            <el-button type="primary" class="operate" size="small" @click.native="openDialog">添加</el-button>
        <!-- </el-col>
        <el-col :span="1"> -->
            <el-button type="danger" class="operate" size="small" v-show="delinfo !=''"  @click.native="delCourseInfo">删除</el-button>
            <el-button type="danger" class="operate" size="small" v-show="delinfo ==''" disabled @click.native="delCourseInfo">删除</el-button>
        <!-- </el-col> -->
    <!-- </el-row> -->
    <el-table class="table" :data="CourseTable" border  @selection-change="getDetInfo">
        <el-table-column
        type="selection"
        width="40px"
      ></el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        prop="teacherName"
        label="教师"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="className"
        label="授课班级"
        align="center"
        :resizable="false"
      >
      <!-- 这是如果显示授课班级是数组展示 -->
      <!-- <template slot-scope="scope">
        <p v-for="classitem in scope.row.class" :key="classitem.classId" >{{classitem.className}}</p>
      </template>
       -->
      </el-table-column>
      <!-- <el-table-column
        prop="groupName"
        label="班级人数"
        align="center"
        :resizable="false"
      >
      </el-table-column> -->
      <el-table-column
        prop="phone"
        label="联系电话"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="tutor"
        label="校外导师"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-view"
            @click="gotoProject(scope.row)"
          >项目管理
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加课程" :visible.sync="dialogucOpen">
        <el-form >
            <el-form-item label="课程名" label-width="120px">
                <el-select v-model="courseValue" placeholder="请选择" @change="getclassInfo">
                  <el-option
                    v-for="item in courseInfo"
                    :key="item.courseId"
                    :label="item.courseName"
                    :value="item.courseId"
                    >
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级名" label-width="120px" v-show="courseValue!=''">
                <el-select  placeholder="请选择活动区域" v-model="classValue" >
                    <el-option v-for="item in classInfo"
                    :key="item.classId"
                    :label="item.className"
                    :value="item.classId"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="clearDialog">取 消</el-button>
            <el-button type="primary" @click.native="submitService">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>

import axios from 'axios';
// import axios from "axios";
export default {
  name: "Course",
  data() {
    return {
      //信息
      dialogucOpen:false,
      CourseTable:[],
      courseInfo:[],
      courseValue:"",
      classInfo:[],
      classValue:"",
      delinfo:[],
    };
  },
  methods:{
    gotoProject(row) {
      this.$router.push({
            name:'project',
            params:{
              teacherId:row.teacherId,
              classId:row.classId,
              courseId:row.courseId
            }
        })
    },
    delCourseInfo(){
      //调用删除的接口
      axios({
        method:"DELETE",
        url:"http://localhost:8080/api2/score/course/info/del",
        data:{
          delList:this.delinfo
        }
      }).then((response)=>{
          if(response.data.code == 200){
            this.$message({
                message: response.data.msg,
                type: 'success'
            });
            axios({
              method:"GET",
              url:"http://localhost:8080/api2/score/course/info/1"
            }).then((response)=>{
                this.CourseTable = response.data.data
            })
          }else{
            this.$message({
                message: response.data.msg,
                type: 'danger'
            });
          }
      })
    },
    getDetInfo(delarr){
      this.delinfo = delarr
    },
    //添加课程信息
    submitService(){
      axios({
          method:"POST",
          url:"http://localhost:8080/api2/score/course/info/"+`${this.courseValue}`+"/"+`${this.classValue}`+"/"+'1'  //后续把1换成老师id
      }).then((response)=>{
          if (response.data.code == 200) {
            this.$message({
                message: response.data.msg,
                type: 'success'
            });
            //添加成功后重新读值
            axios({
              method:"GET",
              url:"http://localhost:8080/api2/score/course/info/1"
            }).then((response)=>{
                this.CourseTable = response.data.data
            })
          }else{
            this.$message({
                    message: response.data.msg,
                    type: 'danger'
            });
          }
      })
      this.dialogucOpen = false;
    },
    //查询所有未选择本门课的班级
    getclassInfo(){
      axios({
          method:"GET",
          url:"http://localhost:8080/api2/score/class/info/"+`${this.courseValue}`
      }).then((response)=>{
          this.classInfo = response.data.data
      })
    },
    openDialog(){
      //查询所有课程
      axios({
          method:"GET",
          url:"http://localhost:8080/api2/score/course/info"
      }).then((response)=>{
          this.courseInfo = response.data.data
      })
      this.courseValue = "";
      this.classValue = "";
      this.dialogucOpen = true
    },
    clearDialog(){
      this.courseValue = "";
      this.classValue = "";
      this.dialogucOpen = false
    }
  },
  mounted() {
      axios({
          method:"GET",
          url:"http://localhost:8080/api2/score/course/info/1"
      }).then((response)=>{
          this.CourseTable = response.data.data
      })
  },
  
};
</script>

<style scoped>
.el-table{
  width: 100%;
}
.box-card{
  margin-bottom: 10px;
}
.el-row{
    width: 100%;
}
.operate{
  margin-bottom: 10px;
}
</style>