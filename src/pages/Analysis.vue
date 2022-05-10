<template>
  <div>
    <el-empty description="请先完成选择" v-show="!this.studentInfo!=''"></el-empty>
    <el-container v-show="this.studentInfo!=''">
        <el-aside width="200px">
            <el-row>
              <b>
                学生姓名
              </b>
            </el-row>
            <el-col v-for="student in studentInfo" :key="student.studentId">
                <el-link :underline="false" @click="getStudentId(student.studentId)"><i class="el-icon-user-solid"></i>{{student.studentName}}</el-link>
            </el-col>
        </el-aside>
        <el-main>
            <div class="Echarts">
                <div id="ShowMain"></div>
            </div>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from 'axios';
var myChart={dispose(){}};
export default {
  name: 'Analysis',
  props:['studentInfo','type',"taskType"],
  data() {
    return {
        studentId:'',
        list:'',
    }
  },
  methods: {
    myEcharts(){
      if (myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose(); //销毁
      }
      myChart = echarts.init(document.getElementById('ShowMain'));
      //配置图表
      var option = {
        title: {
          text: '成绩图',
        },
        tooltip: {},
        legend: {
        },
        xAxis: {
            data: this.list.taskName
        },
        yAxis: {
          
        },
        series: [{
          type: this.type,
          data: this.list.score,
          barWidth: '20%',
          smooth:true,
        }]
      };
      myChart.setOption(option);
    },
    getStudentId(id){
      axios({
        method:"get",
        url:"http://localhost:8080/api2/score/info/get/list/"+`${this.taskType}`,
        params:{
          studentId:id
        }
      }).then((response)=>{
        this.list = response.data.data
      })
    }
  },
  watch:{
    list:{
      handler(){
        this.myEcharts();
      }
    },
    taskType:{
      handler(){
        myChart.dispose();
      }
    }
  },
}
</script>

<style scoped>
.Echarts{
  width: 90%;
}
 #ShowMain{
   height: 500px;
 }
 .el-col{
     margin: 0;
 }
 .el-row b{
   background: 000000;
 }
 .el-main{
     padding: 0;
     height: 500px;
 }
 .el-aside{
   height: 500px;
   overflow: auto;
 }
</style>