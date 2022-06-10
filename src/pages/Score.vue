<template>
<div>
    <el-page-header @back="goBack" content="评分页面">
    </el-page-header>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>用户信息</span>
        </div>
        <div style="margin:20px 0">
            <el-descriptions>
                <el-descriptions-item label="学生姓名">{{studentInfo.studentName}}</el-descriptions-item>
                <el-descriptions-item label="性别">
                    <span v-if="!studentInfo.sex">男</span>
                    <span v-if="studentInfo.sex">女</span>
                </el-descriptions-item>
                <el-descriptions-item label="班级">{{studentInfo.className}}</el-descriptions-item>
                <el-descriptions-item label="组名">{{studentInfo.groupName}}</el-descriptions-item>
                <el-descriptions-item label="当前评分状态">
                    <el-tag size="small" type="success" v-if="studentInfo.scoreStatus == 1" >已评</el-tag>
                    <el-tag size="small" type="danger" v-if="studentInfo.scoreStatus != 1">未评</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系电话">{{studentInfo.phone}}</el-descriptions-item>
            </el-descriptions>
        </div>
        
    </el-card>
    <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>评分内容</span>
        </div>
        <div v-for="(item,index) in Ruler" :key="index" style="margin:20px 0">
            <el-col :span="4">
                {{item.rulerName}}
            </el-col>
            <el-col :span="18">
                <el-slider v-model="score[index]" :max="100"  v-if="!studentInfo.scoreStatus" show-input></el-slider>
                <el-slider v-model="score[index]" :max="100"  v-if="studentInfo.scoreStatus" disabled show-input></el-slider>
            </el-col>
        </div>
        <div>
            <el-col :span="6" :offset="20">
                <el-button type="success" v-if="!studentInfo.scoreStatus" @click="save">保存</el-button>
                <el-button type="success" v-if="studentInfo.scoreStatus" disabled @click="save">保存</el-button>
            </el-col>
        </div>
    </el-card>
</div>
    
</template>

<script>
import axios from 'axios'
export default {
    name:"Score",
    props:['id','taskId','projectId','teacherId','classId','courseId'],
    data() {
        return {
            score:[],
            Ruler:[],
            studentInfo:{},
        }
    },
    methods:{
        save(){
            axios({
                method: "POST",
                url: this.$URL.mqttUrl+"/score/info/add/"+ `${this.score}`,
                params:{
                    taskId:this.taskId,
                    studentId:this.id
                }
            }).then((response) => { 
                this.$message({
                    message: response.data.msg,
                    type: 'success'
                });
                this.$router.push({
                    name:'scoreTable',
                    params:{
                        projectId:this.projectId,
                        teacherId:this.teacherId,
                        classId:this.classId,
                        courseId:this.courseId
                    }
                })
            });
        },
        goBack(){
            this.$router.back()
        }
    },
    mounted() {
        axios({
            method: "Get",
            url: this.$URL.mqttUrl+"/score/ruler/",
        }).then((response) => { 
            this.Ruler = response.data.data;
            let arr = [];
            for (let index = 0; index < response.data.data.length; index++) {
                arr.push(0)
            }
            this.score = arr
            axios({
                method:"GET",
                url:this.$URL.mqttUrl+"/score/info/"+`${this.id}`,
                params:{
                    taskId:this.taskId
                }
            }).then((response) => {
                this.studentInfo = response.data.data
            })
        });
    },
}
</script>

<style scope>
.el-card{
    margin-top: 10px;
}
.el-card__body{
    padding: 0 20px;
}
.el-col{
    text-align: center;
    height: 50px;
    line-height: 35px;
}
</style>