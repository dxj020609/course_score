<template>
  <dir>
    <el-container>
      <!-- 头部组件 -->
      <el-header style="padding: 0">
        <HeaderTop></HeaderTop>
      </el-header>

      <!-- 显示内容,插槽内容？ -->
      <el-main style="height:607px">
        <router-view></router-view>
      </el-main>

      <!-- 底部组件 -->
      <el-footer style="padding: 0">
        <FootDeep></FootDeep>
      </el-footer>
    </el-container>
  </dir>
</template>

<script>
import FootDeep from "./components/FootDeep.vue";
import HeaderTop from "./components/HeaderTop.vue";
export default {
  components: { HeaderTop, FootDeep },
  name: "app",
};
</script>

<style >
* {
  padding: 0;
  margin: 0;
}
</style>