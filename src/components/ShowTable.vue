<template>
  <div>
    <el-container>
        <el-header style="background-color:rgb(69 74 97);">
            <el-row :span="24" style="height:60px">
                <p class="headtext">
                   分数界面
                </p>
            </el-row>
        </el-header>

        <el-main style="height:608px">
             <el-table :data="group" style="width: 100%;background-color:black;">
                <el-table-column prop="name" label="小组名" width="200px" style="background-color:black"></el-table-column>
                <el-table-column prop="score.groupScore" label="小组评分" width="200px"></el-table-column>
                <el-table-column prop="score.teacherScore" label="教师评分" width="200px"></el-table-column>
                <el-table-column prop="score.tutorScore" label="导师评分" width="200px"></el-table-column>
                <el-table-column label="成员">
                    <template slot-scope="scope">
                        <div class="peopel" v-for="(item,index) in scope.row.user" :key="index">
                            <el-avatar class="avatar"> {{item.name}} </el-avatar>
                            <span class="name"> {{item.name}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-footer style="background-color:rgb(69 74 97);">
            <div class="buttons">
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
            group:[
                {
                    name:'小组1',
                    score:{
                        groupScore:0,
                        teacherScore:0,
                        tutorScore:0,
                    },
                    user:[
                        {name:"邓姝妍"},
                        {name:"张洁"},
                        {name:"张玉玺"},
                        {name:"唐娜"},
                        {name:"魏美玲"},
                        {name:"吴婕"},
                        {name:"肖海萍"},
                        {name:"熊连珍"},
                    ],
                },
                {
                    name:'小组2',
                    score:{
                        groupScore:0,
                        teacherScore:0,
                        tutorScore:0,
                    },
                    user:[
                        {name:"阳湘媛"},
                        {name:"易靓"},
                        {name:"周珍"},
                        {name:"孙琼云"},
                        {name:"彭湘"},
                        {name:"罗心雨"},
                        {name:"刘思佳"},
                        {name:"李露"},
                    ],
                },
                {
                    name:'小组3',
                    score:{
                        groupScore:0,
                        teacherScore:0,
                        tutorScore:0,
                    },
                    user:[
                        {name:"詹博文"},
                        {name:"张凌浩"},
                        {name:"朱圣杰"},
                        {name:"成欣怡"},
                        {name:"何颖欣"},
                        {name:"吴维"},
                        {name:"鄢辉焱"},
                        {name:"杨志华"},
                    ],
                },
                {
                    name:'小组4',
                    score:{
                        groupScore:0,
                        teacherScore:0,
                        tutorScore:0,
                    },
                    user:[
                        {name:"刘科江"},
                        {name:"刘霖坤"},
                        {name:"刘威"},
                        {name:"柳彬"},
                        {name:"龙辉"},
                        {name:"秦正康"},
                        {name:"谭博"},
                        {name:"王益凡"},
                    ],
                },
                {
                    name:'小组5',
                    score:{
                        groupScore:0,
                        teacherScore:0,
                        tutorScore:0,
                    },
                    user:[
                        {name:"曹春海"},
                        {name:"代玉银"},
                        {name:"黄志勇"},
                        {name:"蹇乐成"},
                        {name:"李文博"},
                        {name:"秦牛郑威"},
                        {name:"胡琳"},
                        {name:"高明明"},
                    ],
                },
                {
                    name:'小组6',
                    score:{
                        groupScore:0,
                        teacherScore:0,
                        tutorScore:0,
                    },
                    user:[
                        {name:"曹春海"},
                        {name:"代玉银"},
                        {name:"黄志勇"},
                        {name:"蹇乐成"},
                        {name:"李文博"},
                        {name:"秦牛郑威"},
                        {name:"胡琳"},
                        {name:"高明明"},
                    ],
                },
                {
                    name:'小组7',
                    score:{
                        groupScore:0,
                        teacherScore:0,
                        tutorScore:0,
                    },
                    user:[
                        {name:"曹春海"},
                        {name:"代玉银"},
                        {name:"黄志勇"},
                        {name:"蹇乐成"},
                        {name:"李文博"},
                        {name:"秦牛郑威"},
                        {name:"胡琳"},
                        {name:"高明明"},
                    ],
                }
            ],
        }
    },
    methods: {
        goback(){
            this.$router.push({
                name:"index"
            })
        }
    },
}
</script>

<style scoped>
body{
    background-color: white;
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
    color: black;
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