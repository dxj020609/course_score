<template>
  <div>
        <el-card class="box-card">
            <div slot="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>小组成绩对比</el-breadcrumb-item></el-breadcrumb>
            </div>
        </el-card>
        <div class="chooses">
            <el-select v-model="courseId" size="mini" placeholder="请选择课程" @change="getClass">
                <el-option
                    v-for="item in courseInfo"
                    :key="item.courseId"
                    :label="item.courseName"
                    :value="item.courseId">
                </el-option>
            </el-select>
            <el-select v-model="classId" size="mini" placeholder="请选择班级" v-show="courseId!=''" @change="getProject">
                <el-option
                    v-for="item in classInfo"
                    :key="item.classId"
                    :label="item.className"
                    :value="item.classId">
                </el-option>
            </el-select>
            <el-select v-model="projectId" size="mini" placeholder="请选择项目" v-show="classId!=''" @change="getTask">
                <el-option
                    v-for="item in projectInfo"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                </el-option>
            </el-select>
            <el-select v-model="taskId" size="mini" placeholder="请选择任务" v-show="projectId!=''" @change="showGroup">
                <el-option
                    v-for="item in taskInfo"
                    :key="item.taskId"
                    :label="item.taskName"
                    :value="item.taskId">
                </el-option>
            </el-select>
        </div>
        <div>
            <Visualizing :scoreInfo="scoreInfo" :type="type"></Visualizing>
        </div>
    </div>
</template>

<script>
import Visualizing from "./Visualizing.vue"
import axios from "axios"
export default {
  name:"GroupSummary",
  components:{Visualizing},
  data() {
    return {
      courseInfo:[],
      projectInfo:[],
      classInfo:[], 
      taskInfo:[],
      scoreInfo:[],
      courseId:"",
      classId:"",
      projectId:"",
      taskId:"",
      type:"bar"
    }
  },
  methods: {
    getClass(){
        this.classId="",     //班级号
        this.taskId="",
        this.projectId="",
        axios({
            method:"get",
            url:this.$URL.mqttUrl+"/score/class/info/all/"+`${this.courseId}`
        }).then((response)=>{
            this.classInfo = response.data.data
        })
    },
    getProject(){
        this.projectId="",
        this.taskId="",
        axios({
            method:"get",
            url:this.$URL.mqttUrl+"/score/project/info/"+`${this.courseId}`+"/"+`${this.classId}`+"/"+`1`  //后续把这个换成当前登录的id
        }).then((response)=>{
            this.projectInfo = response.data.data
        })
    },
    showGroup(){
        axios({
            method:"get",
            url:this.$URL.mqttUrl+"/score/info/get/group/"+`${this.taskId}`,
            params:{
                classId:this.classId
            }
        }).then((response)=>{
            console.log(response.data.data);
            this.scoreInfo = response.data.data
        })
    },
    getTask(){
        this.taskId="",
        axios({
            method:"get",
            url:this.$URL.mqttUrl+"/score/task/info/"+`${this.projectId}`,
        }).then((response)=>{
            this.taskInfo = response.data.data
        })
    }
  },
  mounted() {
    //获取课程信息
    axios({
            method:"GET",
            url:this.$URL.mqttUrl+"/score/course/info/all/1"
        }).then((response)=>{
            this.courseInfo = response.data.data
        })
  },
}
</script>

<style>
.chooses{
    margin: 10px 20px;
}
.el-select{
    margin: 5px;
}
</style>