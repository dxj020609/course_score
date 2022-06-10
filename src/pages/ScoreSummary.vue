<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>班级成绩对比</el-breadcrumb-item></el-breadcrumb>
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
            <el-select v-model="classId" size="mini" placeholder="请选择班级" v-show="courseId!=''" @change="getProject" >
                <el-option
                    v-for="item in classInfo"
                    :key="item.classId"
                    :label="item.className"
                    :value="item.classId">
                </el-option>
            </el-select>
            <el-select v-model="projectId" size="mini" placeholder="请选择项目" v-show="classId!=''" @change="cleartask">
                <el-option
                    v-for="item in projectInfo"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                </el-option>
            </el-select>
            <el-select v-model="taskType" size="mini" placeholder="请选择任务类型"  v-show="projectId!=''" @change="getTask">
                <el-option label="课前任务" :value="0"></el-option>
                <el-option label="课堂任务" :value="1"></el-option>
                <el-option label="拓展任务" :value="2"></el-option>
            </el-select>
            <el-select v-model="taskId" size="mini" placeholder="请选择任务" v-show="projectId!=''" @change="getScoreInfo">
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
import axios from 'axios'
export default {
    name:"ScoreSummary",
    components:{Visualizing},
    data() {
        return {
            courseId:"",    //课程号
            projectId:"",  //项目号
            taskType:'',    //任务类型
            classId:'',     //班级号
            taskId:'',      //任务号
            courseInfo:[],  //课程选项
            classInfo:[],   //班级选项
            projectInfo:[],    //项目选项
            type:'bar',
            taskInfo:[],    //任务选项
            scoreInfo:"",
        }
    },
    methods: {
        cleartask(){    //班级号
            this.taskId="",
            this.taskType="",
            this.scoreInfo=""
            this.taskInfo=''
        },
        //获取任务
        getTask(){
            this.taskId="",
            this.scoreInfo="",
            axios({
                method:"get",
                url:this.$URL.mqttUrl+"/score/task/info/get/"+`${this.taskType}`,
                params:{
                    projectId:this.projectId
                }
            }).then((response)=>{
                this.taskInfo = response.data.data
            })
        },
        //获取成绩信息
        getScoreInfo(){
            axios({
                method:"get",
                url:this.$URL.mqttUrl+"/score/info/get/"+`${this.taskId}`,
            }).then((response)=>{
                this.scoreInfo = response.data.data
            })
        },
        //获取任务信息
        getProject(){
            this.projectId="",    //项目选项
            this.taskId="",
            this.taskType="",
            this.scoreInfo="",
            axios({
                method:"get",
                url:this.$URL.mqttUrl+"/score/project/info/"+`${this.courseId}`+"/"+`${this.classId}`+"/"+`1`  //后续把这个换成当前登录的id
            }).then((response)=>{
                this.projectInfo = response.data.data
            })
        },
        //获取班级
        getClass(){
            this.classId="",     //班级号
            this.taskId="",
            this.projectId="",
            this.taskType="",
            this.scoreInfo="",
            axios({
                method:"get",
                url:this.$URL.mqttUrl+"/score/class/info/all/"+`${this.courseId}`
            }).then((response)=>{
                this.classInfo = response.data.data
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

<style scoped>
.chooses{
    margin: 10px 20px;
}
.el-select{
    margin: 5px;
}
</style>