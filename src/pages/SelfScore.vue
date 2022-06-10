<template>
    <div class="SelfScore">
        <el-empty description="没有未评分的任务" v-if="this.ScoreTask == []"></el-empty>
        <el-table :data="ScoreTaskTable" >
            <el-table-column prop="taskId" label="任务号" align="center"></el-table-column>
            <el-table-column prop="taskName" label="任务名" align="center"></el-table-column>
            <el-table-column prop="teacherName" label="老师" align="center"></el-table-column>
            <el-table-column prop="taskType" label="任务类型" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.taskType == 1" >课堂任务</span>
                    <span v-if="scope.row.taskType == 0" >课前任务</span>
                    <span v-if="scope.row.taskType == 2" >拓展任务</span>
                </template>
            </el-table-column>
            <el-table-column prop="taskendTime" label="结束时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" icon="el-icon-edit" @click="StudentSCore(scope.row)">评分</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagin :page="page" :size="size" :table="ScoreTask" :total="total" v-on:changeTable="changetestTable"></Pagin>

        <el-dialog title="评分" :visible.sync="openScore" width="50%" >
            <div style="overflow:auto;height:300px">
                <el-card class="box-card" >
                    <div v-for="(item,index) in Ruler" :key="index" style="margin:20px 0">
                        <el-col :span="4">
                            {{item.rulerName}}
                        </el-col>
                        <el-col :span="18">
                            <el-slider v-model="score[index]" :max="100"   show-input></el-slider>
                        </el-col>
                    </div>
                </el-card>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="openScore = false">取 消</el-button>
                <el-button type="primary" @click="submitScore">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import Pagin from '../components/Pagin.vue'
export default {
    name:"SelfScore",
    components:{Pagin},
    data(){
        return{
            studentId:'',
            ScoreTask:[],
            ScoreTaskTable:[],
            score:[],
            openScore:false,
            Ruler:[],
            taskInfo:[],   //任务信息
            size:10,
            page:1,
            total:0,
            // tutor:[],
        }
    },
    methods:{
        changetestTable(value){
            this.ScoreTaskTable = value;
        },
        submitScore(){
            axios({
                method: "POST",
                url: this.$URL.mqttUrl+"/score/info/add/"+ `${this.score}`,
                params:{
                    taskId:this.taskInfo.taskId,
                    studentId:this.studentId
                }
            }).then((response) => { 
                this.$message({
                    message: response.data.msg,
                    type: 'success'
                });
                axios({
                    url:this.$URL.mqttUrl+"/score/student/task/"+`${this.studentId}`
                }).then((response)=>{
                    this.ScoreTask = response.data.data
                })
            });
            this.openScore = false
        },
        StudentSCore(item){
            this.taskInfo = item
            this.openScore = true
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
            });
        }
    },
    mounted() {
        this.studentId = localStorage.getItem("userName");
        //查询当前用户的所有可以评分的任务
        axios({
            url:this.$URL.mqttUrl+"/score/student/task/"+`${this.studentId}`
        }).then((response)=>{
            this.ScoreTask = response.data.data
            this.ScoreTaskTable = response.data.data.slice(0,this.size);
            this.total = response.data.data.length;
        })
    },
}
</script>

<style>
.SelfScore{
    padding-left: 10px;
    padding-right: 10px;
}
</style>