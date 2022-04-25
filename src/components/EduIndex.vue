<template>
    <el-container  style="height: 100%;" >
                <!-- 头部组件 -->
            <el-header style="padding: 0">
                <HeaderTop></HeaderTop>
            </el-header>
        

        <el-container>
            <el-aside width="14.6%" style="background-color: rgb(238, 241, 246)">
                <AsideTable></AsideTable>
            </el-aside>

            <!-- 显示内容,插槽内容 -->
            <el-main >
                <router-view></router-view>
            </el-main>
        </el-container>
        
    </el-container>
</template>

<script>
import AsideTable from "./AsideTable.vue";
import HeaderTop from "./HeaderTop.vue";
export default {
    name:'EduIndex',
    components: { HeaderTop, AsideTable},
}
</script>

<style scope>
.el-aside{
    height:668px;
    overflow: hidden;
}
.el-main{
    height: 668px;
}
</style>