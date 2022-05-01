<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人成绩查询</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-card>
        <div class="chooses">
            <el-select v-model="course" size="mini" placeholder="请选择课程">
                <el-option
                    v-for="item in options"
                    :key="item.courseId"
                    :label="item.courseName"
                    :value="item.courseId">
                </el-option>
            </el-select>
        </div>
        <div>
            <Visualizing :course="course" :type="type"></Visualizing>
        </div>
    </div>
    
</template>

<script>
import Visualizing from "./Visualizing.vue"
import axios from 'axios'
export default {
    name:"Analysis",
    components:{Visualizing},
    data() {
        return {
            course:"",
            options:[],
            type:"bar",
        }
    },
    mounted() {
        axios({
            method:"GET",
            url:"http://localhost:8080/api2/score/course/info/all/1"
        }).then((response)=>{
            this.options = response.data.data
        })
    },
}
</script>

<style scoped>
.chooses{
    margin: 10px 20px;
}
</style>