<template>
  <div>
    <el-menu
      id="Top"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">任务查询</template>
        
        <router-link to="/index/Task" style="text-decoration: none;">
          <el-menu-item index="1-1">
          任务查看
          </el-menu-item>
        </router-link>
        <router-link to="/index/result" style="text-decoration: none;">
          <el-menu-item index="1-2">
          任务成绩
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">任务评分</template>
        <router-link to="/index/coursemyself" style="text-decoration: none;">
          <el-menu-item index="2-1">自我评分</el-menu-item>
        </router-link>
        <router-link to="/index/coursegroup"  style="text-decoration: none;">
          <el-menu-item index="2-2">小组评分</el-menu-item>
        </router-link>
        <!-- 权限判断，老师才可以评分 -->
        <el-menu-item index="2-3" v-if="false">教师评分</el-menu-item>
        <!-- 权限判断，导师才可以评分 -->
        <el-submenu index="2-4" v-if="false"> 
          <template slot="title" >导师评分</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-header
        class="el-header"
        style="text-align: right; font-size: 12px; line-height: 60px"
      >
        <el-dropdown class="el-dropdown">
          <i class="el-icon-s-custom" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item  @click.native="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{user.studentName}}</span>
      </el-header>
    </el-menu>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "HeaderTop",
  data() {
    return {
      user:{}
    };
  },
  methods: {
    exit(){
      sessionStorage.removeItem('user')
      this.$router.push('/')
    }
  },
  mounted() {
    axios({
      method:'Get',
      url:'http://localhost:8080/api2/StudentName',
      params:{
        id:sessionStorage.getItem('user')
      }
    }).then((response)=>{
      this.user = response.data
    })
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
  color: #fff;
}
.el-icon-s-custom {
  background-color: #fff;
}
.el-icon-s-custom:hover {
  cursor: pointer;
}
</style>