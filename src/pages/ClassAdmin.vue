<template>
  <div class="classInfo">
        <el-button type="primary" class="operate" size="small" @click.native="openDialog">添加</el-button>
        <el-input placeholder="搜索" size="small" class="search" v-model="searchInput" @change = "searchCourseName"></el-input>
        <el-table :data="showTable" >
            <el-table-column prop="classId" label="班级号" align="center"></el-table-column>
            <el-table-column prop="className" label="班级名" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" icon="el-icon-delete" @click.native="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagin :page="page" :size="size" :table="CourseTable" :total="total" v-on:changeTable="changetestTable"></Pagin>

        <el-dialog title="新增课程" :visible.sync="openCourse" width="50%" >
            <div style="overflow:auto;">
                <div>
                    <el-col :span="4">
                        <span>班级名</span>
                    </el-col>
                    <el-col :span="18">
                        <el-input size="mini" v-model="inputName" placeholder="请输入班级名"></el-input>
                    </el-col>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="openCourse = false">取 消</el-button>
                <el-button type="primary" @click="additionCourse">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import Pagin from '../components/Pagin.vue'
export default {
    name:"ClassAdmin",
    components:{Pagin},
    data(){
        return{
            identity:'',
            CourseTable:[],
            showTable:[],
            openCourse:false,
            inputName:"",
            searchInput:"",
            //分页的变量
            size:10,
            page:1,
            total:0,
        }
    },
    methods:{
        changetestTable(value){
            this.showTable = value;
        },
        openDialog(){
            this.openCourse = true;
        },
        additionCourse(){
            //发送请求增加课程
            axios({
                url:this.$URL.mqttUrl+"/score/class/add/"+`${this.inputName}`,
                method:"POST"
            }).then((response)=>{
                if(response.data.code == 200){
                    this.$message({
                        type:"success",
                        message:response.data.msg
                    })
                }else{
                    this.$message({
                        type:"error",
                        message:response.data.msg
                    })
                }
                this.inputName = '',
                this.openCourse = false;
                this.getAllinfo();
            })
        },
        del(row){
            //发送请求删除课程
            axios({
                url:this.$URL.mqttUrl+"/score/class/del/"+`${row.classId}`,
                method:"delete"
            }).then((response)=>{
                if(response.data.code == 200){
                    this.$message({
                        type:"success",
                        message:response.data.msg
                    })
                }else{
                    this.$message({
                        type:"error",
                        message:response.data.msg
                    })
                }
            })
            this.getAllinfo();
        },
        searchCourseName(){
            //模糊搜索
            if(this.searchInput!=''){
                axios({
                    url:this.$URL.mqttUrl+"/score/class/search/"+`${this.searchInput}`,
                    method:"get"
                }).then((response)=>{
                    this.CourseTable = response.data.data
                    this.showTable = response.data.data.slice(0,this.size);
                    this.total = response.data.data.length;
                })
            }else
                this.getAllinfo();
        },
        getAllinfo(){
            axios({
                url:this.$URL.mqttUrl+"/score/class/info/all",
                method:"GET"
            }).then((response)=>{
                this.CourseTable = response.data.data
                this.showTable = response.data.data.slice(0,this.size);
                this.total = response.data.data.length;
            })
        }
    },
    mounted() {
        this.identity = localStorage.getItem("userName");
        this.getAllinfo();
    }
}
</script>

<style scoped>
.operate{
  margin-bottom: 10px;
}
.search{
    width: 250px;
    margin-right: 10px;
    float: right;
}
</style>