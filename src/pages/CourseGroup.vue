<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>任务评分</el-breadcrumb-item>
        <el-breadcrumb-item>小组评分</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55" align='center'  :resizable='false'> </el-table-column>
        <el-table-column prop="date" label="课程名" width="200" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="name" label="项目名" width="200" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="province" label="老师名" width="150" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="city" label="开始时间" width="265" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="address" label="结束时间" width="265" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="address" label="组号" width="250" align='center' :resizable='false'></el-table-column>
        <el-table-column label="操作" width="100" align='center' :resizable='false' scope="scope">
            <template slot-scope="scope">
                <el-button @click="sumbit(scope.row.id)" type="text" size="small">评分</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button type="primary" id="submit" round>提交</el-button>

    <el-dialog title="XX小组" :visible.sync="dialogFormVisible">
        <el-form :inline="true" v-for="(item,index) in testData" :key="index">
            <el-form-item label="学生名:" :label-width="formLabelWidth">
                <el-tag>{{item.name}}</el-tag>
            </el-form-item>
            <el-form-item label="小组评分" :label-width="formLabelWidth">
                <NumScore></NumScore>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="clearNull">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
import NumScore from '../components/NumScore.vue'
export default {
  name:'CourseMySelf',
  components:{NumScore},
  data() {
    return {
        testData: [
        ],
        tableData: [
            {
                id:1,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            },
            {
                id:2,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            },
        ],
        dialogFormVisible: false,
        formLabelWidth: '200px'
    }
  },
  methods:{
        clearNull(){
            this.dialogFormVisible = false
            this.testData = []
        },
        sumbit(row){
          this.dialogFormVisible = true
            if(row === 1){
              this.testData.unshift({
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              })
            }else if(row === 2){
                this.testData.unshift([])
                this.testData = [
                    {
                        date: '2016-05-04',
                        name: '尤玉溪',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }
                ]
            }
        console.log(row);
      }
  }
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