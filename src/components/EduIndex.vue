<template>
    <div>
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
    </div>
</template>

<script>
import FootDeep from "./FootDeep.vue";
import HeaderTop from "./HeaderTop.vue";
export default {
    name:'EduIndex',
    components: { HeaderTop, FootDeep},
}
</script>

<style>

</style>