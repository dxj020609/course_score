<template>
    <div id="User_login">
        <el-form ref="formdata" :model="formdata" :rules="rules" class="login-box" status-icon show-message >
            <h3 class="login-title">学生成绩综合评估分析系统</h3>
            <el-form-item  prop="username" class="el-form-item">
                    <el-input  type="text"  v-model.number="formdata.username" placeholder="账号">
                    <i slot="prefix" class="el-icon-user-solid logo"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"  v-model="formdata.password" placeholder="密码" @keydown.enter.native="submit('formdata')">
                    <i slot="prefix" class="el-icon-lock logo"></i>
                </el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="submit('formdata')" class="login">
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'UserLogin',
    data(){
        //编写规则
        var checkUserName = (rule, value, callback) => {
            if(typeof(value)=="number"){
                if(value.length === 0){
                    callback(new Error('请输入你的账号'))
                }else{
                    callback();
                }
            }else{
                callback(new Error("账号格式错误"));
            }
        }

        var checkPassword = (rule, value, callback) => {
            if(value.length===0){
                    //返回错误信息
                    callback(new Error('请输入你的密码'))
            }else{
                callback()
            }  
        }

        return {
            formdata:{
                username:'',
                password:'',
            },
            loading:false,
            // 校准验证
            rules:{
                username:[
                    //表示 使用checkUserName规则，焦点切换触发
                    {validator: checkUserName,trigger:"blur"}
                ],
                password:[
                    {validator:checkPassword,tigger:"blur"}
                ]
            }
        }
    },
    methods:{
        //提交前进行验证，同时还应该进行对账号密码的判定
        submit(formName){
            this.loading = true;
            console.log(this.$URL.mqttUrl);
            this.$refs[formName].validate((valid) => {
                if(valid){
                    axios({
                        method:"get",
                        url:this.$URL.mqttUrl+"/score/login",
                        params:{
                            userName:this.formdata.username,
                            password:this.formdata.password,
                        }
                    }).then((response)=>{
                        if(response.data.data!=null&&response.data.code == 200){
                            localStorage.setItem("userName",JSON.stringify(response.data.data.userName))
                            localStorage.setItem("identity",JSON.stringify(response.data.data.identity))
                            this.$router.push("/index")
                        }else{
                            this.$message({
                                type:'error',
                                message:"账号或密码错误"
                            })
                            this.formdata.password = ''
                        }
                    })
                    // axios({
                    //     method: 'POST',
                    //     url: 'http://localhost:8080/api2/CheckPwd',
                    //     params:{
                    //         id:this.formdata.username,
                    //         pwd:this.formdata.password
                    //     }
                    // }).then((response)=>{
                    //     sessionStorage.setItem('user',JSON.stringify(this.formdata.username))
                    //     if (response.data) {
                    //         this.$router.push('/index')
                    //     } else {
                    //         return false;
                    //     }
                    // })
                    this.loading = false;
                }else{
                    return false;
                }
            });
        },
        // 清空所有内容
        clearInput(form) {
            this.$refs[form].resetFields();
        }
    },
    mounted() {
        if(localStorage.getItem('userName')!= null&&localStorage.getItem('identity')!=null){
            this.$router.push('/index')
        }
    },
}
</script>

<style scoped>
#User_login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/banner.jpg");
    background-size: 100% 100%;
}
.login-box{
    border-radius: 6px;
    background: #ffffff;
    width: 300px;
    padding: 25px 25px 5px 25px;
}
#User_login #user,#password,#submit{
    margin: 20px;
}
.login-title{
    text-align:center;
    margin: 0 auto 40px auto;
    color: #303133;
}
.logo{
    position:absolute;
    height: 40px;
    line-height: 40px;
    font-size:20px;
    left: 0.5px;
}
.login{
    width: 100%;
}

</style>