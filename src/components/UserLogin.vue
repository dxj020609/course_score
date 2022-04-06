<template>
    <div id="User_login">
        <div style="margin: 20px;">
            <el-form ref="formdata" :model="formdata" :rules="rules" label-width="80px" class="login-box" status-icon show-message>
                <h3 class="login-title">欢迎登录</h3>
                <el-form-item label="学号" prop="username" >
                    <el-input type="text" v-model.number="formdata.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formdata.password" @keydown.enter.native="submit('formdata')"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="submit('formdata')">登录</el-button>
                    <el-button type="info" @click="clearInput('formdata')" style="margin-left:75px">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'UserLogin',
    data(){
        //编写规则
        var checkUserName = (rule, value, callback) => {
            
            if(value === ""){
                //返回错误信息
                callback(new Error('学号不正确'))
            }else{
                if(typeof(value) != 'number'){
                    console.log(typeof(value));
                    callback(new Error('学号错误'))
                }else{
                    axios({
                        method: 'POST',
                        url: 'http://localhost:8080/api2/CheckId',
                        params:{
                            id:value
                        }
                    }).then((response)=>{
                        if( !response.data ){
                            //返回错误信息
                            callback(new Error('学号错误!'));
                        }else{
                            //放行
                            callback()
                        }
                    })
                }
            }  
        }

        var checkPassword = (rule, value, callback) => {
            if(value === ""){
                    //返回错误信息
                    callback(new Error('密码不可为空'))
            }else{
                callback()
            }  
        }

        return {
            formdata:{
                username:'',
                password:'',
            },
            // 校准验证
            rules:{
                username:[
                    //表示 使用checkUserName规则，焦点切换触发
                    {validator: checkUserName,trigger:"change"}
                ],
                password:[
                    {validator:checkPassword,tigger:"change"}
                ]
            }
        }
    },
    methods:{
        //提交前进行验证，同时还应该进行对账号密码的判定
        submit(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    axios({
                        method: 'POST',
                        url: 'http://localhost:8080/api2/CheckPwd',
                        params:{
                            id:this.formdata.username,
                            pwd:this.formdata.password
                        }
                    }).then((response)=>{
                        sessionStorage.setItem('user',JSON.stringify(this.formdata.username))
                        if (response.data) {
                            this.$router.push('/index')
                        } else {
                            return false;
                        }
                    })
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
        if(sessionStorage.getItem('user')!= null){
            this.$router.push('/index')
        }    
    },
}
</script>

<style scoped>
.login-box{
    border:1px solid #DCDFE6;
    width: 350px;
    margin:180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }
#User_login #user,#password,#submit{
    margin: 20px;
}
.login-title{
    text-align:center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

</style>