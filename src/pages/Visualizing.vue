<template>
  <div class="Echarts">
    <div id="main" style="width: 600px;height: 400px;"></div>
  </div>
</template>
 
<script>
import * as echarts from "echarts";
import axios from 'axios'
export default {
  name: 'Visualizing',
  props:['course','type'],
  data() {
    return {
      ruler:[],
    }
  },
  methods: {
    myEcharts(){
      var myChart = echarts.init(document.getElementById('main'));
      //配置图表
      var option = {
        title: {
          text: '',
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: this.ruler
        },
        yAxis: {
        },
        series: [{
          name: '销量',
          type: this.type,
          data: [5,20,36,10,10,20]
        }]
      };
      myChart.setOption(option);
    }
  },
  watch:{
    course:{
      handler(){
        this.myEcharts();
      }
    }
  },mounted() {
    axios({
      method: "Get",
      url: "http://localhost:8080/api2/score/ruler/",
    }).then((response) => {
      for (let index = 0; index < response.data.data.length; index++) {
        this.ruler.push(response.data.data[index].rulerName)
      }
    })
  },
}
</script>
 
<style>
 
</style>