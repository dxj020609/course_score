<template>
  <div>
    <el-header class="el-header">
      <span class="title">学生成绩综合评估分析系统</span>
      <el-dropdown class="el-dropdown">
        <el-avatar icon="el-icon-user-solid" class="avatar"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="info">查看</el-dropdown-item>
          <el-dropdown-item  @click.native="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
      localStorage.removeItem('userName')
      localStorage.removeItem('identity')
      this.$router.push('/')
    },
    info(){
      this.$router.push('/index/info')
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
    if(localStorage.getItem('userName')== null){
        this.$router.push('/')
        this.$message({
          type:"error",
          message:"请先登录"
        })
    }
    this.user = {username:JSON.parse(localStorage.getItem('userName')),identity:JSON.parse(localStorage.getItem("identity"))}
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
.avatar{
  margin-top: 10px;
}
</style>