<template>
  <div>
    <el-container>
        <el-header style="background-color:rgb(69 74 97);">
            <el-row style="height:60px">
                <el-col :span="6">
                    <p class="headtext">
                    2022&nbsp;-&nbsp;06&nbsp;-&nbsp;09&nbsp;的&nbsp;PK
                </p>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="course1" size="mini" placeholder="请选择课程" >
                        <el-option :value="'机器人流程自动化RPA实战'">机器人流程自动化RPA实战</el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                <el-select v-model="course2" size="mini" placeholder="请选择项目" @click="change">
                    <el-option :value="'项目1-客户邀请机器人'">项目1-客户邀请机器人</el-option>
                    <el-option :value="'项目2-总结统计机器人'">项目2-总结统计机器人</el-option>
                    <el-option :value="'项目3-企业征信机器人'">项目3-企业征信机器人</el-option>
                    <el-option :value="'项目4-工单处理机器人'">项目4-工单处理机器人</el-option>
                    <el-option :value="'项目5-财务记账机器人'">项目5-财务记账机器人</el-option>
                </el-select>
                </el-col>
                <el-col :span="6" v-show="course2 == ''">
                    <el-select v-model="course3" size="mini" placeholder="请选择任务" @click="change">
                        
                    </el-select>
                </el-col>
                <el-col :span="6" v-show="course2 == '项目1-客户邀请机器人'">
                    <el-select v-model="course3" size="mini" placeholder="请选择任务" @click="change">
                        <el-option :value="'任务1-1 初始RPA'">任务1-1 初始RPA</el-option>
                        <el-option :value="'任务1-2 统计总结提交情况'">任务1-2 统计总结提交情况</el-option>
                        <el-option :value="'任务1-3 根据条件判断拟定邀请信息'">任务1-3 根据条件判断拟定邀请信息</el-option>
                        <el-option :value="'任务1-4 为多个客户拟定邀请信息'">任务1-4 为多个客户拟定邀请信息</el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" v-show="course2 == '项目2-总结统计机器人'">
                    <el-select v-model="course3" size="mini" placeholder="请选择任务" @click="change">
                        <el-option :value="'任务2-1 自动下载员工总结'">任务2-1 自动下载员工总结</el-option>
                        <el-option :value="'任务2-2 统计总结提交情况'">任务2-2 统计总结提交情况</el-option>
                        <el-option :value="'任务2-3 未交总结员工处理'">任务2-3 未交总结员工处理</el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" v-show="course2 == '项目3-企业征信机器人'">
                    <el-select v-model="course3" size="mini" placeholder="请选择任务" @click="change">
                        <el-option :value="'任务3-1 公司基本信息核查'">任务3-1 公司基本信息核查</el-option>
                        <el-option :value="'任务3-2 保存公司详情信息'">任务3-2 保存公司详情信息</el-option>
                        <el-option :value="'任务3-3 保存公司法人信息'">任务3-3 保存公司法人信息</el-option>
                        <el-option :value="'任务3-4 分析公司风险及优势'">任务3-4 分析公司风险及优势</el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" v-show="course2 == '项目4-工单处理机器人'">
                    <el-select v-model="course3" size="mini" placeholder="请选择任务" @click="change">
                        <el-option :value="'任务4-1 周一PDF文件中多工单识别'">任务4-1 周一PDF文件中多工单识别</el-option>
                        <el-option :value="'任务4-2 提取多张工单中的指定数据'">任务4-2 提取多张工单中的指定数据</el-option>
                        <el-option :value="'任务4-3 调用OCR引擎识别图片工单'">任务4-3 调用OCR引擎识别图片工单</el-option>
                        <el-option :value="'任务1-4 为多个客户拟定邀请信息'">任务1-4 为多个客户拟定邀请信息</el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" v-show="course2 == '项目5-财务记账机器人'">
                    <el-select v-model="course3" size="mini" placeholder="请选择任务" @click="change">
                        <el-option :value="'任务5-1 明确用户需求 提写需求说明'">任务5-1 明确用户需求 提写需求说明</el-option>
                        <el-option :value="'任务5-2 分解技术步骤 撰写技术文档'">任务5-2 分解技术步骤 撰写技术文档</el-option>
                        <el-option :value="'任务5-3-1 下载电子发票归类'">任务5-3-1 下载电子发票归类</el-option>
                        <el-option :value="'任务5-3-2 识别电子发票内容'">任务5-3-2 识别电子发票内容</el-option>
                        <el-option :value="'任务5-3-2 识别电子发票内容'">任务5-3-2 识别电子发票内容</el-option>
                        <el-option :value="'任务5-3-3 验证电子发票真伪'">任务5-3-3 验证电子发票真伪</el-option>
                        <el-option :value="'任务5-3-4 录入电子发票凭证'">任务5-3-4 录入电子发票凭证</el-option>
                        <el-option :value="'任务5-4 优化流程设计 运行日志跟踪'">任务5-4 优化流程设计 运行日志跟踪</el-option>
                        <el-option :value="'任务5-5 测试场景文档 实施上线部署'">任务5-5 测试场景文档 实施上线部署</el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-header>

        <el-main style="height:608px">
            <el-row :gutter="20" style="margin-bottom:20px">
                <el-col :span="1" class="groupName">小组1</el-col>
                <el-col :span="9" class="score">
                    <el-rate v-model="value1" :max="10" class="root" ></el-rate>
                </el-col>
                <el-col :span="12" class="info">
                    <div class="peopel" v-for="(item,index) in user1" :key="index">
                        <el-avatar class="avatar"> {{item.name}} </el-avatar>
                        <span class="name"> {{item.name}}</span>
                    </div>
                </el-col>
                <el-col :span="1" class="close">
                    X
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-bottom:20px">
                <el-col :span="1" class="groupName">小组2</el-col>
                <el-col :span="9" class="score">
                    <el-rate v-model="value2" :max="10" class="root" ></el-rate>
                </el-col>
                <el-col :span="12" class="info">
                    <div class="peopel" v-for="(item,index) in user2" :key="index">
                        <el-avatar class="avatar">  {{item.name}} </el-avatar>
                        <span class="name"> {{item.name}}</span>
                    </div>
                </el-col>
                <el-col :span="1" class="close">
                    X
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-bottom:20px">
                <el-col :span="1" class="groupName">小组3</el-col>
                <el-col :span="9" class="score">
                    <el-rate v-model="value3" :max="10" class="root" ></el-rate>
                </el-col>
                <el-col :span="12" class="info">
                    <div class="peopel" v-for="(item,index) in user3" :key="index">
                        <el-avatar class="avatar">  {{item.name}} </el-avatar>
                        <span class="name"> {{item.name}}</span>
                    </div>
                </el-col>
                <el-col :span="1" class="close">
                    X
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-bottom:20px">
                <el-col :span="1" class="groupName">小组4</el-col>
                <el-col :span="9" class="score">
                    <el-rate v-model="value4" :max="10" class="root" ></el-rate>
                </el-col>
                <el-col :span="12" class="info">
                    <div class="peopel" v-for="(item,index) in user4" :key="index">
                        <el-avatar class="avatar">  {{item.name}} </el-avatar>
                        <span class="name"> {{item.name}}</span>
                    </div>
                </el-col>
                <el-col :span="1" class="close">
                    X
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-bottom:20px">
                <el-col :span="1" class="groupName">小组5</el-col>
                <el-col :span="9" class="score">
                    <el-rate v-model="value5" :max="10" class="root" ></el-rate>
                </el-col>
                <el-col :span="12" class="info">
                    <div class="peopel" v-for="(item,index) in user5" :key="index">
                        <el-avatar class="avatar">  {{item.name}} </el-avatar>
                        <span class="name"> {{item.name}}</span>
                    </div>
                </el-col>
                <el-col :span="1" class="close">
                    X
                </el-col>
            </el-row>
            
            <el-row :gutter="20" style="margin-bottom:20px">
                <el-col :span="1" class="groupName">小组6</el-col>
                <el-col :span="9" class="score">
                    <el-rate v-model="value6" :max="10" class="root" ></el-rate>
                </el-col>
                <el-col :span="12" class="info">
                    <div class="peopel" v-for="(item,index) in user6" :key="index">
                        <el-avatar class="avatar">  {{item.name}} </el-avatar>
                        <span class="name"> {{item.name}}</span>
                    </div>
                </el-col>
                <el-col :span="1" class="close">
                    X
                </el-col>
            </el-row>

            <el-row :gutter="20" >
                <el-col :span="1" class="groupName">小组7</el-col>
                <el-col :span="9" class="score">
                    <el-rate v-model="value7" :max="10" class="root" ></el-rate>
                </el-col>
                <el-col :span="12" class="info">
                    <div class="peopel" v-for="(item,index) in user7" :key="index">
                        <el-avatar class="avatar">  {{item.name}} </el-avatar>
                        <span class="name"> {{item.name}}</span>
                    </div>
                </el-col>
                <el-col :span="1" class="close">
                    X
                </el-col>
            </el-row>
        </el-main>

        <el-footer style="background-color:rgb(69 74 97);">
            <div class="buttons">
                <el-button type="warning" @click="gototable">结束评分</el-button>
                <el-button type="success" @click="clearScore">清空分数</el-button>
                <el-button @click="goback">返回</el-button>
            </div>
        </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
    name:"ShowScore",
    data() {
        return {
            course1:"机器人流程自动化RPA实战",
            course2:"",
            course3:"",
            value1:0,
            value2:0,
            value3:0,
            value4:0,
            value5:0,
            value6:0,
            value7:0,
            user1:[
                {name:"邓姝妍"},
                {name:"张洁"},
                {name:"张玉玺"},
                {name:"唐娜"},
                {name:"魏美玲"},
                {name:"吴婕"},
                {name:"肖海萍"},
                {name:"熊连珍"},
            ],
            user2:[
                {name:"阳湘媛"},
                {name:"易靓"},
                {name:"周珍"},
                {name:"孙琼云"},
                {name:"彭湘"},
                {name:"罗心雨"},
                {name:"刘思佳"},
                {name:"李露"},
            ],
            user3:[
                {name:"詹博文"},
                {name:"张凌浩"},
                {name:"朱圣杰"},
                {name:"成欣怡"},
                {name:"何颖欣"},
                {name:"吴维"},
                {name:"鄢辉焱"},
                {name:"杨志华"},
            ],
            user4:[
                {name:"刘科江"},
                {name:"刘霖坤"},
                {name:"刘威"},
                {name:"柳彬"},
                {name:"龙辉"},
                {name:"秦正康"},
                {name:"谭博"},
                {name:"王益凡"},
            ],
            user5:[
                {name:"曹春海"},
                {name:"代玉银"},
                {name:"黄志勇"},
                {name:"蹇乐成"},
                {name:"李文博"},
                {name:"秦牛郑威"},
                {name:"胡琳"},
                {name:"高明明"},
            ],
            user6:[
                {name:"曹春海"},
                {name:"代玉银"},
                {name:"黄志勇"},
                {name:"蹇乐成"},
                {name:"李文博"},
                {name:"秦牛郑威"},
                {name:"胡琳"},
                {name:"高明明"},
            ],
            user7:[
                {name:"曹春海"},
                {name:"代玉银"},
                {name:"黄志勇"},
                {name:"蹇乐成"},
                {name:"李文博"},
                {name:"秦牛郑威"},
                {name:"胡琳"},
                {name:"高明明"},
            ]
        }
    },
    methods: {
        change(a){
            this.course2 = a;
            this.course3 = '';
        },
        goback(){
            this.$router.back()
        },
        clearScore(){
            this.value1 = 0,
            this.value2 = 0,
            this.value3 = 0,
            this.value4 = 0,
            this.value5 = 0,
            this.value6 = 0,
            this.value7 = 0
        },
        gototable(){
            this.$router.push({
                name:"showTable"
            })
        }
    },
}
</script>

<style >
body{
    background-color: rgb(89 93 115);
}
.headtext{
    font-size: 24px;
    line-height: 60px;
    height: 60px;
    color: white;
}
.el-col{
    line-height: 20px;
}
.groupName{
    width: 75px;
    height: 75px;
    text-align: center;
    line-height: 75px;
    border-radius: 10px 0 0 10px;
    background-color: black;
    color: white;
}
.score{
    margin: 0 0 0 5px ;
    height: 75px;
    text-align: center;
    line-height: 75px;
    background-color: black;
}
.root{
    height: 75px;
    text-align: center;
    line-height: 75px;
}
.el-rate__icon{
    line-height: 75px;
    font-size: 30px;
}
.info{
    margin-left: 5px;
    height: 75px;
    background-color: black;
}
.peopel{
    color: white;
    width: 75px;
    height: 75px;
    font-size: 18px;
    display: inline-block;
    text-align: center;
}
.peopel .avatar{
    display: inline-block;  
    height: 50px;
    width: 50px; 
    line-height: 50px;
}
.name{
    height: 25px;
    width: 50px;
    font-size: 10px;
    text-align: center;
    display: inline-block;
}
.close{
    height: 75px;
    text-align: center;
    font-size: 28px;
    background-color: black;
    margin-left: 10px;
    color: brown;
    line-height: 75px;
    cursor: pointer;;
    border-radius: 0 10px 10px 0;
}
.buttons{
    float: right;
    line-height: 60px;
}
</style>