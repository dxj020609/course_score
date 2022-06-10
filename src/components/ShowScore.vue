<template>
  <div>
    <el-container>
        <el-header style="background-color:rgb(69 74 97);">
            <el-row :span="24" style="height:60px">
                <p class="headtext">
                    2022&nbsp;-&nbsp;06&nbsp;-&nbsp;09&nbsp;的&nbsp;PK
                </p>
            </el-row>
        </el-header>

        <el-main style="height:608px">
            <el-row :gutter="20" style="margin-bottom:50px">
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

            <el-row :gutter="20" style="margin-bottom:50px">
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

            <el-row :gutter="20" style="margin-bottom:50px">
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

            <el-row :gutter="20" style="margin-bottom:40px">
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

            <el-row :gutter="20" >
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
        </el-main>

        <el-footer style="background-color:rgb(69 74 97);">
            <div class="buttons">
                <el-button type="warning">结束评分</el-button>
                <el-button type="success">清空分数</el-button>
                <el-button>返回</el-button>
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
            value1:0,
            value2:0,
            value3:0,
            value4:0,
            value5:0,
            value6:0,
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
            ]
        }
    },
}
</script>

<style>
body{
    background-color: rgb(89 93 115);
}
.headtext{
    font-size: 24px;
    line-height: 60px;
    height: 60px;
    color: white;
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