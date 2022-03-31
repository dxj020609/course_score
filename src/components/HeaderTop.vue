<template>
  <div>
    <el-menu
      id="Top"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      menu-trigger='click'
    >
      <el-menu-item index="1">
        <router-link to="/Task" style="text-decoration: none;">
        任务查看
        </router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">任务评分</template>
        <router-link to="/course">
          <el-menu-item index="2-1">自我评分</el-menu-item>
        </router-link>
        <el-menu-item index="2-2">小组评分</el-menu-item>
        <el-menu-item index="2-3">教师评分</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">导师评分</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item> -->
      <!-- 个人信息 -->
      <el-header
        class="el-header"
        style="text-align: right; font-size: 12px; line-height: 60px"
      >
        <el-dropdown class="el-dropdown">
          <i class="el-icon-s-custom" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: "HeaderTop",
  data() {
    return {};
  },
  methods: {
    handleSelect() {
      console.log(1);
    },
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