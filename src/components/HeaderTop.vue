<template>
  <div>
    <el-header class="el-header">
      <span class="title">学生成绩综合评估分析系统</span>
      <el-dropdown class="el-dropdown">
        <i class="el-icon-s-custom" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item  @click.native="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{user.studentName}}</span>
    </el-header>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: "HeaderTop",
  data() {
    return {
      user:{},
    };
  },
  methods: {
    exit(){
      sessionStorage.removeItem('user')
      this.$router.push('/')
    }
  },
  mounted() {
    // axios({
    //   method:'Get',
    //   url:'http://localhost:8080/api2/StudentName',
    //   params:{
    //     id:sessionStorage.getItem('user')
    //   }
    // }).then((response)=>{
    //   this.user = response.data
    // })
  },
};
</script>

<style scoped>
#Top {
  width: 100%;
  padding: 0;
  margin: 0;
}
.el-header {
  color: #3f3f3f;
  background-color: #545c64;
  font-size: 12px;
  line-height: 60px;
}
.el-dropdown{
  float: right;
}
.el-icon-s-custom {
  background-color: #fff;
}
.el-icon-s-custom:hover {
  cursor: pointer;
}
.title{
  color: #fff;
  font-size: 20px;
  text-align: left;
  line-height: 60px;
}
</style>