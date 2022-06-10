<template>
  <el-menu :default-openeds="['1', '9']" unique-opened >
    <el-menu-item index="1" style="padding-right:0px" v-if="identity == 'teacher'">
        <router-link to="/index/course"><i class="el-icon-reading"></i>课程信息</router-link>
    </el-menu-item>
    <el-menu-item index="5" style="padding-right:0px" v-if="identity == 'teacher'">
        <router-link to="/index/ruler"><i class="el-icon-open"></i>评分管理</router-link>
    </el-menu-item>
    <el-submenu index="2" v-if="identity == 'teacher'" >
        <template slot="title"><i class="el-icon-message"></i>成绩管理</template>
        <el-menu-item-group>
        <template slot="title">成绩对比</template>
            <el-menu-item index="2-1">
                <router-link to="/index/scoreSummary" >
                    班级成绩对比
                </router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
                <router-link to="/index/studentscoreSummary" >
                    个人成绩对比
                </router-link>
            </el-menu-item>
            <el-menu-item index="2-3">
                <router-link to="/index/grouosummary" >
                    小组成绩对比
                </router-link>
            </el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group title="成绩分析">
            <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
    </el-submenu>
    <!-- 学生端功能 -->
    <el-submenu index="3" v-if="identity == 'student'">
        <template slot="title"><i class="el-icon-menu"></i>评分功能</template>
        <el-menu-item-group>
        <el-menu-item index="3-1" >
            <router-link to="/index/selfscore">自我评分</router-link>    
        </el-menu-item>
        <!-- <el-menu-item index="3-2">小组互评</el-menu-item> -->
        </el-menu-item-group>
    </el-submenu>
    <!-- <router-link to="/index/info" class="info">
        <el-menu-item index="4" >
            <i class="el-icon-setting" style="margin-right:0px"></i>
            个人信息
        </el-menu-item>
    </router-link> -->

    <!-- 系统管理员端功能 -->
    <el-menu-item index="6" v-if="identity == 'admin'">
        <router-link to="/index/teacherAdmin"><i class="el-icon-user-solid"></i>教师管理</router-link>
    </el-menu-item>
    <el-menu-item index="7" v-if="identity == 'admin'">
        <router-link to="/index/studentAdmin"><i class="el-icon-user"></i>学生管理</router-link>
    </el-menu-item>
    <el-menu-item index="8" v-if="identity == 'admin'">
        <router-link to="/index/classadmin"><i class="el-icon-s-home"></i>班级管理</router-link>
    </el-menu-item>
    <el-menu-item index="9" v-if="identity == 'admin'">
        <router-link to="/index/courseadmin"><i class="el-icon-reading"></i>课程管理</router-link>
    </el-menu-item>
</el-menu>
</template>

<script>
export default {
  name: "AsideTable",
  data() {
      return {
          identity:'',
      }
  },
  mounted() {
      this.identity = JSON.parse(localStorage.getItem("identity"));
  },
};
</script>

<style>

/* .el-menu{
    background-color: #0980d6;
}
.el-menu-item{
    color: #fff;
} */
.el-menu-item{
    margin: 0;
    padding: 0;
}
.el-menu-item a{
    text-decoration: none;
    color: black;
    display: block;
}
.info{
    text-decoration: none;
}
</style>