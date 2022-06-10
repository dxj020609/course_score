<template>
    <div class="text-center">
        <el-row :gutter="20">
            <el-col :span="6" :xs="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                    </div>
                    <div class="avatar">
                        <el-avatar shape="circle" :size="125" fit="fill" :src="url"></el-avatar>
                    </div>
                    <div>
                        <ul class="list-group list-group-striped">
                            <li class="list-group-item">
                                <i class="el-icon-postcard"></i>学号
                                <div class="pull-right">{{user.id}}</div>
                            </li>
                            <li class="list-group-item">
                                <i class="el-icon-user"></i>姓名
                                <div class="pull-right">{{user.name}}</div>
                            </li>
                            <li class="list-group-item">
                                <i class="el-icon-mobile-phone"></i>电话
                                <div class="pull-right">{{user.phone}}</div>
                            </li>
                            <li class="list-group-item" v-if="job == 'admin'">
                                <i class="el-icon-mobile-phone"></i>身份
                                <div class="pull-right">系统管理员</div>
                            </li>
                            <li class="list-group-item" v-if="job =='teacher'">
                                <i class="el-icon-c-scale-to-original"></i>职位
                                <div class="pull-right" v-if="user.info1==0">校内老师</div>
                                <div class="pull-right" v-if="user.info1==1">校外老师</div>
                            </li>
                            <li class="list-group-item" v-if="job =='student'">
                                <i class="el-icon-c-scale-to-original"></i>班级
                                <div class="pull-right" >{{user.info1}}</div>
                            </li>
                            <li class="list-group-item" v-if="job =='student'">
                                <i class="el-icon-s-order"></i>组名
                                <div class="pull-right">{{user.info2}}</div>
                            </li>
                            <li class="list-group-item" v-if="job =='student'">
                                <i class="el-icon-s-custom"></i>组长
                                <div class="pull-right" v-if="user.boss==1">组长</div>
                                <div class="pull-right" v-if="user.boss==0">组员</div>
                                <div class="pull-right" v-if="user.boss==null">暂无</div>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18" :xs="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>基本资料</span>
                    </div>
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="基本资料" name="userinfo">
                            <el-form :model="user" ref="user" :rules="rules" label-width="80px" >
                                <el-form-item label="姓名" prop="name">
                                    <el-input v-model="user.name" placeholder="请输入姓名" name="name"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="phone">
                                    <el-input v-model="user.phone" placeholder="请输入手机号码" name="phone"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input v-model="user.email" placeholder="请输入邮箱" name="email"></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-radio-group class="sex" v-model="user.sex" >
                                        <el-radio :label="0" name="sex">男</el-radio>
                                        <el-radio :label="1" name="sex">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item class="sex">
                                    <el-button type="primary" size="mini" @click.native="modifyInfo">保存</el-button>
                                    <el-button type="danger" size="mini" @click.native="gotoindex">关闭</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="修改密码" name="resetPwd">
                            <el-form :model="Pwd" ref="Pwd" :rules="rules" label-width="80px">
                                <el-form-item label="旧密码" prop="oldPWd">
                                    <el-input v-model="Pwd.oldPWd" type="password" name="oldPWd" placeholder="请输入旧密码"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="newPwd">
                                    <el-input v-model="Pwd.newPwd" type="password" name="newPwd" placeholder="请输入新密码"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="trueNewPwd">
                                    <el-input v-model="Pwd.trueNewPwd" type="password" name="trueNewPwd" placeholder="请确认新密码"></el-input>
                                </el-form-item>
                                <el-form-item class="sex">
                                    <el-button type="primary" size="mini" @click.native="ChangePWD('Pwd')">保存</el-button>
                                    <el-button type="danger" size="mini" @click.native="gotoindex">关闭</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"info",
    data() {
        var checknewPwd = (ruler,value,callback)=>{
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.Pwd.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }       
        }
        
        return {
            Pwd:{
                oldPWd:"",
                newPwd:"",
                trueNewPwd:"",
            },
            user:{},
            job:'',
            url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            activeTab: "userinfo",

            

            rules: {
                name: [
                    { required: true, message: '用户昵称不能为空', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: "邮箱地址不能为空", trigger: "blur" },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
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
                oldPWd:[
                    { required: true, message: '旧密码不能为空', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
                newPwd:[
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
                trueNewPwd:[
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
                    { validator: checknewPwd, trigger: 'blur' }
                ]
            }
        }
    },methods: {
        gotoindex(){
            this.$router.push('/index')
        },
        modifyInfo(){
            if(this.job == 'teacher'){
                axios({
                    url:this.$URL.mqttUrl+"/teacher/update/info/"+`${this.user.id}`,
                    method:"PUT",
                    params:{
                        phone:this.user.phone,
                        sex:this.user.sex,
                        email:this.user.email,
                        name:this.user.name
                    }
                }).then((response)=>{
                    if(response.data.code==200){
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
            }else if(this.job == "student"){
                axios({
                    url:this.$URL.mqttUrl+"/student/update/info/"+`${this.user.id}`,
                    method:"PUT",
                    params:{
                        phone:this.user.phone,
                        sex:this.user.sex,
                        email:this.user.email,
                        name:this.user.name
                    }
                }).then((response)=>{
                    if(response.data.code==200){
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
            }else{
                axios({
                    url:this.$URL.mqttUrl+"//admin/update/info/"+`${this.user.id}`,
                    method:"PUT",
                    params:{
                        phone:this.user.phone,
                        sex:this.user.sex,
                        email:this.user.email,
                        name:this.user.name
                    }
                }).then((response)=>{
                    if(response.data.code==200){
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
            }
        },
        ChangePWD(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if (this.job == "student"){
                    axios({
                        method:"PUT",
                        url:this.$URL.mqttUrl+"/student/update/Pwd/"+`${this.user.id}`,
                        params:{
                            oldPwd:this.Pwd.oldPWd,
                            newPwd:this.Pwd.newPwd
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
                        this.Pwd.oldPWd = "",
                        this.Pwd.newPwd = "",
                        this.Pwd.trueNewPwd = ""
                    })
                }else if(this.job == "teacher"){
                    axios({
                        method:"PUT",
                        url:this.$URL.mqttUrl+"/teacher/update/Pwd/"+`${this.user.id}`,
                        params:{
                            oldPwd:this.Pwd.oldPWd,
                            newPwd:this.Pwd.newPwd
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
                        this.Pwd.oldPWd = "",
                        this.Pwd.newPwd = "",
                        this.Pwd.trueNewPwd = ""
                    })
                }else {
                    axios({
                        url:this.$URL.mqttUrl+"/admin/update/Pwd/"+`${this.user.id}`,
                        method:"PUT",
                        params:{
                            oldPwd:this.Pwd.oldPWd,
                            newPwd:this.Pwd.newPwd
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
                        this.Pwd.oldPWd = "",
                        this.Pwd.newPwd = "",
                        this.Pwd.trueNewPwd = ""
                    })
                }
            } 
            });
        }
    },
    mounted() {
        let id = parseInt(localStorage.getItem("userName"));
        this.job = JSON.parse(localStorage.getItem('identity'))
        if(JSON.parse(localStorage.getItem("identity"))=="student"){
            axios({
                method:"get",
                url:this.$URL.mqttUrl+"/student/self/"+`${id}`
            }).then((respsonse)=>{
                this.user = respsonse.data.data
            })
        }else if(JSON.parse(localStorage.getItem("identity"))=="teacher"){
            axios({
                method:"get",
                url:this.$URL.mqttUrl+"/teacher/info/"+`${id}`
            }).then((respsonse)=>{
                this.user = respsonse.data.data
            })
        }else{
            axios({
                method:"get",
                url:this.$URL.mqttUrl+"/admin/info/"+`${id}`
            }).then((response)=>{
                this.user = response.data.data
            })
        }
    },

}
</script>

<style scoped>
.el-card>.el-card__header{
    padding: 0px;
}
.box-card{
    padding-bottom: 10px;
}
.avatar{
    margin:10px auto;
}
ul li{
    list-style: none;
    text-align: left;
    border-bottom: 1px solid #e7eaec;
    border-top: 1px solid #e7eaec;
    padding: 5px 0px;
}
ul li .pull-right{
    float: right;
}
.sex{
    display: inline-block;
    position: relative;
    left: -360px;
}

</style>