<template>
  <div class="classInfo">
        <el-button type="primary" class="operate" size="small" @click.native="openDialog">添加</el-button>
        <el-input placeholder="搜索" size="small" class="search" v-model="searchInput" @change = "searchCourseName"></el-input>
        <el-table :data="showTable" >
            <el-table-column prop="teacherId" label="老师号" align="center" width="75px"></el-table-column>
            <el-table-column prop="teacherName" label="老师姓名" align="center"></el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
                <template slot-scope="scope">
                    <span v-if="!scope.row.sex">男</span>
                    <span v-if="scope.row.sex">女</span>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="电话" align="center"></el-table-column>
            <el-table-column prop="teacherPwd" label="密码" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="teacherType" label="老师类型" align="center">
                <template slot-scope="scope">
                    <span v-if="!scope.row.teacherType">校内老师</span>
                    <span v-if="scope.row.teacherType">企业导师</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" icon="el-icon-delete" @click.native="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagin :page="page" :size="size" :table="CourseTable" :total="total" v-on:changeTable="changetestTable"></Pagin>

        <el-dialog title="新增课程" :visible.sync="openCourse" width="50%" >
            <div style="overflow:auto;height:300px">
                <div>
                    <el-form :model="user" ref="user" :rules="rules"  label-width="80px" >
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="user.name" placeholder="请输入姓名" name="name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group class="sex" v-model="user.sex" >
                                <el-radio :label="0" name="sex">男</el-radio>
                                <el-radio :label="1" name="sex">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="user.phone" placeholder="请输入手机号码" name="phone"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input type="password" v-model="user.pwd" placeholder="请输入密码" name="pwd"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="user.email" placeholder="请输入邮箱" name="email"></el-input>
                        </el-form-item>
                        <el-form-item label="班级" prop="type">
                            <el-select  placeholder="请选择授课班级" v-model="user.type">
                                <el-option label="校内老师" value="0"></el-option>
                                <el-option label="企业导师" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="openCourse = false">取 消</el-button>
                <el-button type="primary" @click="additionCourse('user')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import Pagin from '../components/Pagin.vue'
export default {
    name:"TeacherAdmin",
    components:{Pagin},
    data(){
        return{
            identity:'',
            CourseTable:[],
            showTable:[],
            openCourse:false,
            inputName:"",
            searchInput:"",
            user:{},
            classChoose:[],
            //分页的变量
            size:10,
            page:1,
            total:0,
            //规则
            rules: {
                name: [
                    { required: true, message: '用户昵称不能为空', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: "邮箱地址不能为空", trigger: "blur" },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: "blur"
                    }
                ],
                phone: [
                    { required: true, message: "手机号码不能为空", trigger: "blur" },
                    {
                        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                        message: "请输入正确的手机号码",
                        trigger: "blur"
                    }
                ],
                type:[
                    {required:true,message:"请选择老师类型",trigger:'blur'}
                ],
                pwd:[
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
                sex:[
                    {required:true,message:'请选择性别',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        changetestTable(value){
            this.showTable = value;
        },
        openDialog(){
            this.openCourse = true;
        },
        additionCourse(formName){
            //发送请求增加课程
            this.$refs[formName].validate((valid) => {
            if (valid) {
                axios({
                    url:this.$URL.mqttUrl+"/teacher/add/"+`${this.user.name}`,
                    method:"POST",
                    params:{
                        sex:this.user.sex,
                        phone:this.user.phone,
                        type:this.user.type,
                        pwd:this.user.pwd,
                        email:this.user.email
                    }
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
                    this.user = {},
                    this.openCourse = false;
                    this.getAllinfo();
                })
            }
            })
        },
        del(row){
            //发送请求删除课程
            axios({
                url:this.$URL.mqttUrl+"/teacher/del/"+`${row.teacherId}`,
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
                    url:this.$URL.mqttUrl+"/teacher/search/"+`${this.searchInput}`,
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
                url:this.$URL.mqttUrl+"/teacher/all",
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