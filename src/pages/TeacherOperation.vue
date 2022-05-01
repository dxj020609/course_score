<template>
    <div>
        <div style="display:inline-block;">
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-select v-model.number="classes" placeholder="请选择班级" size="mini">
                        <el-option
                        v-for="item in classOptions"
                        :key="item.value"
                        :label="item.className"
                        :value="item.classId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select v-model.number="course" placeholder="请选择课程" size="mini">
                        <el-option
                        v-for="item in courseOptions"
                        :key="item.value"
                        :label="item.courseName"
                        :value="item.courseId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select v-model.number="project" @click.native="optionsChangeProject" placeholder="请选择项目" size="mini">
                        <el-option
                        v-for="item in projectOptions"
                        :key="item.value"
                        :label="item.projectName"
                        :value="item.projectId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select v-model.number="task" @click.native="optionsChangeTask" placeholder="请选择任务" size="mini">
                        <el-option
                        v-for="item in taskOptions"
                        :key="item.value"
                        :label="item.taskName"
                        :value="item.taskId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-button type="primary" round size="mini" :loading="isLoad" @click="Query">查看</el-button>
            </el-row>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" width="55" align='center'  :resizable='false'> </el-table-column>
                <el-table-column prop="courseName" label="课程名" width="150" align='center' :resizable='false'></el-table-column>
                <el-table-column prop="projectName" label="项目名" width="150" align='center' :resizable='false'> </el-table-column>
                <el-table-column prop="taskName" label="任务名" width="200" align='center' :resizable='false'></el-table-column>
                <el-table-column prop="className" label="班级名" width="200" align='center' :resizable='false'></el-table-column>
                <el-table-column prop="studentName" label="学生名" width="200" align='center' :resizable='false'></el-table-column>
                <el-table-column prop="endTime" label="结束时间" width="200" align='center' :resizable='false'></el-table-column>
                <el-table-column  label="评分" width="254" align='center' :resizable='false'>
                    <NumScore></NumScore>
                </el-table-column>
                <el-table-column label="操作" width="100" align='center' :resizable='false'>
                    <template slot-scope="scope">
                        <el-button @click="SaveScope(scope.row)" type="text" size="small">保存</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" id="submit" round>提交</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NumScore from '../components/NumScore.vue'
export default {
    name:'TeacherOperation',
    components:{NumScore},
    data() {
        return {
            isLoad:false,
            course:'',
            classes:'',
            project:'',
            task:'',
            Scope:0,
            classOptions:[],
            courseOptions:[],
            projectOptions:[],
            taskOptions:[],
            tableData: []
        }
    },
    methods:{
        Query(){
            this.isLoad = true
            if(this.classes != ''){
                if(this.course == ''){
                    this.isLoad = false;
                    this.$message({
                        message:'请选择课程',
                        type:'error'
                    });
                }else{
                    if(this.project == ''){
                        this.isLoad = false;
                        this.$message({
                            message:'请选择项目',
                            type:'error'
                        });
                    }else{
                        if(this.task == ''){
                            this.isLoad = false;
                            this.$message({
                                message:'请选择任务',
                                type:'error'
                            });
                        }else{
                            axios({
                                method:'GET',
                                url:'http://localhost:8080/api2/Query',
                                params:{
                                    course:this.course,
                                    project:this.project,
                                    task:this.task,
                                    classes:this.classes
                                }
                            }).then((response)=>{
                                this.isLoad=false
                                this.tableData = response.data
                            })
                        }
                    }
                }
            }else{
                this.isLoad = false;
                this.$message({
                    message:'请选择班级',
                    type:'error'
                });
            }
        },
        optionsChangeProject(){
            axios({
                method:'GET',
                url:'http://localhost:8080/api2/changeProject',
                params:{
                    id:this.course
                }
            }).then((response)=>{
                this.projectOptions = response.data;
            })
        },
        optionsChangeTask(){
            axios({
                method:'GET',
                url:'http://localhost:8080/api2/changetask',
                params:{
                    id:this.project
                }
            }).then((response)=>{
                this.taskOptions = response.data;
            })
        },
        SaveScope(row){
            console.log(row);
            console.log(this.Scope);
            console.log(row.studentName);
            axios({
                method:'GET',
                url:'http://localhost:8080/api2/addScope',
                params:{
                    scope:this.Scope,
                    scoringType:2,
                    taskName:row.taskName,
                    StudentName:row.studentName,
                    ClassName:row.className,
                }
            }).then(()=>{
            })
        },
        getScope(Scope){
            this.Scope = Scope
        }
    },
    mounted() {
        this.$bus.$on('getScope',this.getScope)
        axios({
            method:'GET',
            url:'http://localhost:8080/api2/options'
        }).then((response)=>{
            this.classOptions = response.data[0];
            this.courseOptions = response.data[1];
        })
    },
    watch:{
        tableData:{
            handler(newValue){
                for (let index = 0; index < newValue.length; index++) {
                    this.tableData[index].endTime = newValue[index].endTime.substring(0,4)+"年"+newValue[index].endTime.substring(5,7)+"月"+newValue[index].endTime.substring(9,10)+"日"
                }
            }
        }
    }
}
</script>

<style scoped>
.el-row{
    /* border: 1px solid rgb(117, 186, 254); */
    padding: 10px;
    /* box-shadow: 5px 5px 5px #909399; */
}
#submit{
    float: right;
    position: absolute;
    top: 85%;
    left: 93.5%;
    z-index: 100;
}
</style>