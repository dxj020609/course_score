<template>
    <div>
        <el-card class="box-card">
        <div slot="header">
            <el-page-header @back="goBack"></el-page-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/index/course'}">课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        </el-card>
        <el-button type="primary" class="operate" size="small" @click.native="openDialog">添加</el-button>
        <el-input placeholder="搜索" size="small" class="search" v-model="searchInput" @change = "searchProjectName"></el-input>
        <el-table class="table" :data="testTable" border >
            <el-table-column
                prop="projectId"
                label="项目名"
                align="center"
                :resizable="false"
            ></el-table-column>
            <el-table-column
                prop="projectName"
                label="项目号"
                align="center"
                :resizable="false"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                :resizable="false"
            >
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" icon="el-icon-edit" @click.native="updatedialogucOpen(scope.row.projectId)">
                            修改
                        </el-button>
                        <el-popconfirm
                            confirm-button-text='是'
                            cancel-button-text='否'
                            icon="el-icon-info"
                            icon-color="red"
                            title="确定要删除项目吗？"
                            @confirm="delProject(scope.row.projectId)"
                        >
                            <el-button type="danger" slot="reference" size="mini" icon="el-icon-delete" >
                                删除
                            </el-button>
                        </el-popconfirm>
                        
                        <el-button type="primary" size="mini" icon="el-icon-s-operation" @click="gotoTask(scope.row)" >
                            任务管理
                        </el-button>
                        
                    </template>
            </el-table-column>
        </el-table>
        <Pagin :page="page" :size="size" :table="ProjectTable" :total="total" v-on:changeTable="changetestTable"></Pagin>

        <el-dialog title="添加项目" :visible.sync="dialogucOpen">
            <el-form >
                <el-form-item label="项目名" label-width="120px">
                    <el-input placeholder="请输入你要添加的项目名" v-model="ProjectInput"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="clearDialog">取 消</el-button>
                <el-button type="primary" @click.native="submitService">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改项目" :visible.sync="updatedialoguc">
            <el-form >
                <el-form-item label="项目名" label-width="120px">
                    <el-input placeholder="请输入你要修改的项目名" v-model="ProjectInput"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="clearupdatedialogucOpen">取 消</el-button>
                <el-button type="primary" @click.native="updateService">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import Pagin from '../components/Pagin.vue'
export default {
    name:"Project",
    components: { Pagin },
    props:['teacherId','classId','courseId'],
    data() {
        return {
            ProjectTable:[],
            dialogucOpen:false,
            updatedialoguc:false,
            ProjectInput:"",
            projectId:0,
            searchInput:"",
            testTable:[],
            size:8,
            page:1,
            total:0,
        }
    },
    methods: {
        changetestTable(value){
            this.testTable = value;
        },
        gotoTask(row){
            this.$router.push({
            name:'task',
            params:{
                projectId:row.projectId,
                teacherId:this.teacherId,
                classId:this.classId,
                courseId:this.courseId
            }
        })
        },
        goBack(){
            this.$router.push({
                name:'course',
            })
        },
        //模糊搜索
        searchProjectName(){
            if(this.searchInput != ""){
                axios.get("http://localhost:8080/api2/score/project/info/search/"+`${this.searchInput}`).then((response)=>{
                    if(response.data.code==200){
                        this.ProjectTable = response.data.data
                        this.$message({
                            message: response.data.msg,
                            type: 'success'
                        })
                    }else{
                        this.$message({
                            message: response.data.msg,
                            type: 'error'
                        })
                    }
                })
            }else{
                axios.get("http://localhost:8080/api2/score/project/info/"+`${this.teacherId}`+"/"+`${this.classId}`+"/"+`${this.courseId}`).then((response)=>{
                    this.ProjectTable = response.data.data
                })
            }
        },
        openDialog(){
            this.dialogucOpen = true
        },
        updatedialogucOpen(id){
            this.projectId = id;
            this.updatedialoguc = true
        },
        clearupdatedialogucOpen(){
            this.updatedialoguc = false
        },
        clearDialog(){
            this.dialogucOpen = false
        },
        //增加项目
        submitService(){
            //axios请求提交参数是addProject和teacherId和classId
            axios.post("http://localhost:8080/api2/score/project/info/add/"+`${this.ProjectInput}`+"/"+`${this.teacherId}`+"/"+`${this.courseId}`+"/"+`${this.classId}`).then((response)=>{
                if(response.data.code==200){
                    axios.get("http://localhost:8080/api2/score/project/info/"+`${this.teacherId}`+"/"+`${this.classId}`+"/"+`${this.courseId}`).then((response)=>{
                        this.ProjectTable = response.data.data,
                        this.updatedialoguc = false;
                    })
                    this.$message({
                            message: response.data.msg,
                            type: 'success'
                    })
                }else{
                    this.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            })
            this.ProjectInput = ""
            this.dialogucOpen = false;
        },
        //修改项目
        updateService(){
            //axios请求提交参数是ProjectId
            axios.put("http://localhost:8080/api2/score/project/info/put/"+`${this.projectId}`+"/"+`${this.ProjectInput}`).then((response)=>{
                if(response.data.code==200){
                    axios.get("http://localhost:8080/api2/score/project/info/"+`${this.teacherId}`+"/"+`${this.classId}`+"/"+`${this.courseId}`).then((response)=>{
                        this.ProjectTable = response.data.data,
                        this.updatedialoguc = false;
                    })
                    this.$message({
                            message: response.data.msg,
                            type: 'success'
                    })
                }else{
                    this.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            })
            this.projectId = 0;
            this.ProjectInput = "";
            this.updatedialoguc = false;
        },
        //
        delProject(id){
            //删除项目
            axios.delete("http://localhost:8080/api2/score/project/info/del/"+`${id}`).then((response)=>{
                if(response.data.code==200){
                    axios.get("http://localhost:8080/api2/score/project/info/"+`${this.teacherId}`+"/"+`${this.classId}`+"/"+`${this.courseId}`).then((response)=>{
                        this.ProjectTable = response.data.data
                    })
                    this.$message({
                        message: response.data.msg,
                        type: 'success'
                    })
                }else{
                    this.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            })
        },
    },
    mounted() {
        axios.get("http://localhost:8080/api2/score/project/info/"+`${this.teacherId}`+"/"+`${this.classId}`+"/"+`${this.courseId}`).then((response)=>{
            this.ProjectTable = response.data.data;
            this.testTable = response.data.data.slice(0,this.size);
            this.total = response.data.data.length;
        })
    },

}
</script>

<style scoped>
.box-card{
  margin-bottom: 10px;
}
.operate{
  margin-bottom: 10px;
}
.search{
    width: 250px;
    margin-right: 10px;
    float: right;
}
.el-table__cell .el-button{
    margin-right: 10px;
}
.el-page-header{
  display: inline-block;
}
.el-breadcrumb{
  display: inline-block;
}
</style>