<template>
  <el-table class="table" :data="tableData" border style="width: 100%" >
        <el-table-column prop="scoreId" label="序号" width="50px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="studentName" label="学生姓名" width="200px" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="sex"  label="学生姓别" width="100px" align='center' :resizable='false'>
            <template slot-scope="scope">
                <span v-if="!scope.row.sex">男</span>
                <span v-if="scope.row.sex">女</span>
            </template>
        </el-table-column>
        <el-table-column prop="className" label="班级名" width="200px" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="groupName" label="组名" width="200px" align='center' :resizable='false'> </el-table-column>
        <el-table-column prop="scoreEndtime" label="结束时间" align='center' :resizable='false'></el-table-column>
        <el-table-column prop="scoreStatus" label="评分状态" width="85px" align='center' :resizable='false'>
            <template slot-scope="scope">
                <i v-if="scope.row.scoreStatus == 1" class="el-icon-success" style="color:green;height:100%"></i>
                <i v-if="scope.row.scoreStatus == 0" class="el-icon-error" style="color:red;height:100%"></i>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align='center' :resizable='false'>
            <template slot-scope="scope">
                <el-button type="primary" size ="mini" icon="el-icon-edit" circle @click="text(scope)"></el-button>
                <el-button type="danger" size ="mini" icon="el-icon-delete" circle @click="del(scope.row.scoreId)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios'
export default {
    name: "ScoreTable",
    data() {
        return {
            //评分字段
            RulerTitle:[],
            tableData:[]
        }
    },
    methods:{
        test(a){
            console.log(a);
        },
        del(Id){
            console.log(Id);
        }
    },
    mounted() {
        axios({
            method:'Get',
            url:'http://localhost:8080/api2/score/ruler/',
        }).then((response)=>{
            axios({
                method:'Get',
                url:'http://localhost:8080/api2/test',
            }).then((response)=>{
                console.log(response);
                this.tableData = response.data.data;
            })
            this.RulerTitle = response.data.data;
        })
        
    },
}
</script>

<style>

</style>