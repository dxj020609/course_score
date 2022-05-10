<template>
  <el-menu :default-openeds="['1', '5']" unique-opened >
    <el-menu-item index="1" style="padding-right:0px">
        <router-link to="/index/course"><i class="el-icon-reading"></i>课程信息</router-link>
    </el-menu-item>
    <el-menu-item index="5" style="padding-right:0px">
        <router-link to="/index/ruler"><i class="el-icon-open"></i>评分管理</router-link>
    </el-menu-item>
    <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>成绩管理</template>
        <el-menu-item-group>
        <template slot="title">成绩查询</template>
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
        </el-menu-item-group>
        <el-menu-item-group title="成绩分析">
        <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
    </el-submenu>
    <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
        <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
        <template slot="title">选项4</template>
        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
    </el-submenu>
    <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
        <el-menu-item index="4-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="4-4">
        <template slot="title">选项4</template>
        <el-menu-item index="4-4-1">选项4-1</el-menu-item>
        </el-submenu>
    </el-submenu>
</el-menu>
</template>

<script>
export default {
  name: "AsideTable",
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
</style>