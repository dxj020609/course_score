<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>任务评分</el-breadcrumb-item>
        <el-breadcrumb-item>自我评分</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55" align='center'  :resizable='false'> </el-table-column>
        <el-table-column prop="date" label="课程名" width="200" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="name" label="项目名" width="200" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="province" label="老师名" width="150" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="city" label="开始时间" width="265" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="address" label="结束时间" width="265" align='center' :resizable='false'></el-table-column>
        <el-table-column  label="评分" width="250" align='center' :resizable='false'>
            <NumScore></NumScore>
        </el-table-column>
        <el-table-column label="操作" width="100" align='center' :resizable='false'>
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">保存</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-button type="primary" id="submit" round>提交</el-button>
  </div>
</template>

<script>
import NumScore from '../components/NumScore.vue'
export default {
  components: { NumScore},
  name:'CourseMySelf',
  data() {
    return {
      tableData: [
          {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
          },
        ]
    }
  },
}
</script>

<style scoped>
.el-breadcrumb{
  margin: 20px 0;
}
#submit{
    float: right;
    position: absolute;
    top: 85%;
    left: 93.5%;
    z-index: 100;
}
</style>