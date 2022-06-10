<template>
  <div class="Echarts">
    <div id="main"  >
      <el-empty description="请先完成选择" v-show="this.scoreInfo==''"></el-empty>
    </div>
  </div>
</template>
 
<script>
import * as echarts from "echarts";
export default {
  name: 'Visualizing',
  props:['scoreInfo','type'],
  data() {
    return {
    }
  },
  methods: {
    myEcharts(){
      var myChart = echarts.init(document.getElementById('main'));
      //配置图表
      var option = {
        title: {
          text: '成绩图',
        },
        tooltip: {},
        legend: {
        },
        xAxis: {
        },
        yAxis: {
          data: this.scoreInfo.studentNames
        },
        series: [{
          type: this.type,
          data: this.scoreInfo.score,
          barWidth: '20%',
        }]
      };
      myChart.setOption(option);
    },
  },
  watch:{
    scoreInfo:{
      handler(){
        this.myEcharts();
      }
    }
  },
}
</script>
 
<style scoped>
.Echarts{
  width: 90%;
}
 #main{
   width: 100%;
   height: 450px;
 }
</style>