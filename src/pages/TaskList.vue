<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
          <el-page-header @back="goBack"></el-page-header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/index/course'}">课程管理</el-breadcrumb-item>
            <el-breadcrumb-item >项目管理</el-breadcrumb-item>
            <el-breadcrumb-item >任务管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
    </el-card>
    <el-select v-model="taskTypechoose" placeholder="请选择任务类型" @change="queryByType">
      <el-option label="请选择任务类型" value="all"></el-option>
      <el-option label="课前任务" :value="0"></el-option>
      <el-option label="课堂任务" :value="1"></el-option>
      <el-option label="拓展任务" :value="2"></el-option>
    </el-select>
    <el-button type="primary" class="operate" size="small" @click.native="openDialog">添加</el-button>
    <el-button type="warning" class="operate" size="small" @click.native="queryAllTask">查看所有任务</el-button>
    <el-table class="table" :data="taskTable" border >
      <el-table-column  prop="taskName" label="任务名" align="center" :resizable="false" ></el-table-column>
      <el-table-column prop="taskType" label="任务类型" align="center" width="100px" :resizable="false" >
        <template slot-scope="scope">
          <span v-if="scope.row.taskType == 1" >课堂任务</span>
          <span v-if="scope.row.taskType == 0" >课前任务</span>
          <span v-if="scope.row.taskType == 2" >拓展任务</span>
        </template>
      </el-table-column>
      <el-table-column prop="taskstartTime" label="开始时间" align="center" :resizable="false" ></el-table-column>
      <el-table-column prop="taskendTime" label="结束时间" align="center" :resizable="false" ></el-table-column>
      <el-table-column label="操作" align="center" width="400px" :resizable="false" >
        <template slot-scope="scope">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click.native="updatedialogucOpen(scope.row)">
              修改
          </el-button>
          <el-popconfirm confirm-button-text='是' cancel-button-text='否' icon="el-icon-info" icon-color="red" title="确定要删除任务吗？" @confirm="delTask(scope.row.taskId)" >
              <el-button type="danger" slot="reference" size="mini" icon="el-icon-delete" >
                  删除
              </el-button>
          </el-popconfirm>
          <el-button type="primary" size="mini" icon="el-icon-s-operation" @click="gotoScore(scope.row)" >
              学生成绩管理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加任务" :visible.sync="dialoguc">
      <el-form >
          <el-form-item label="任务名" label-width="120px">
            <el-input placeholder="请输入任务名" v-model="fromInput.taskName"></el-input>
          </el-form-item>
          <el-form-item label="任务类型" label-width="120px">
            <el-select v-model="fromInput.taskType" placeholder="请选择任务类型">
              <el-option label="课前任务" :value="0"></el-option>
              <el-option label="课堂任务" :value="1"></el-option>
              <el-option label="拓展任务" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务开始时间" label-width="120px">
            <el-date-picker v-model="fromInput.taskstartTime" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="任务结束时间" label-width="120px">
            <el-date-picker v-model="fromInput.taskendTime" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click.native="clearDialog">取 消</el-button>
          <el-button type="primary" @click.native="submitfrom">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改任务" :visible.sync="modifydialoguc">
      <el-form >
          <el-form-item label="任务名" label-width="120px">
            <el-input placeholder="请输入任务名" v-model="frommodify.taskName"></el-input>
          </el-form-item>
          <el-form-item label="任务类型" label-width="120px">
            <el-select v-model="frommodify.taskType" placeholder="请选择任务类型">
              <el-option label="课前任务" :value="0"></el-option>
              <el-option label="课堂任务" :value="1"></el-option>
              <el-option label="拓展任务" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务结束时间" label-width="120px">
            <el-date-picker v-model="frommodify.taskendTime" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click.native="clearmodify">取 消</el-button>
          <el-button type="primary" @click.native="submitmodify">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="所有任务" :visible.sync="queryTask">
      <el-table :data="allTaskTable">
        <el-table-column property="taskName" label="任务名" ></el-table-column>
        <el-table-column property="taskType" label="任务类型" >
          <template slot-scope="scope">
            <span v-if="scope.row.taskType == 1" >课堂任务</span>
            <span v-if="scope.row.taskType == 0" >课前任务</span>
            <span v-if="scope.row.taskType == 2" >拓展任务</span>
          </template>
        </el-table-column>
        <el-table-column property="taskstartTime" label="开始时间"></el-table-column>
        <el-table-column property="taskendTime" label="结束时间"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "TaskList",
    props:['projectId','teacherId','classId','courseId'],
    data() {
      return {
        taskTable: [],
        taskTypechoose:"",
        dialoguc:false,
        modifydialoguc:false,
        queryTask:false,
        fromInput:{
          taskName:"",
          taskType:0,
          taskstartTime:"",
          taskendTime:"",
        },
        frommodify:{},
        allTaskTable:[],
    }
  },
  methods:{
    queryAllTask(){
      this.queryTask = true
      axios.get("http://localhost:8080/api2/score/task/info/all/"+`${this.projectId}`).then((response)=>{
        this.allTaskTable = response.data.data;
      })
    },
    goBack(){
      this.$router.push({
            name:'project',
            params:{
              teacherId:this.teacherId,
              classId:this.classId,
              courseId:this.courseId
            }
        })
    },
    gotoScore(row){
        this.$router.push({
          name:'scoreTable',
            params:{
              taskId:row.taskId,
              projectId:this.projectId,
              teacherId:this.teacherId,
              classId:this.classId,
              courseId:this.courseId
            }
        })
      },
    submitmodify(){
      axios({
        method:"PUT",
        url:"http://localhost:8080/api2/score/task/info/put/"+`${this.frommodify.taskId}`,
        params:{
          taskName:this.frommodify.taskName,
          taskType:this.frommodify.taskType,
          taskendTime:this.frommodify.taskendTime,
        }
      }).then((response)=>{
        if(response.data.code == 200){
          this.$message({
            message: response.data.msg,
            type: 'success'
          })
          axios.get("http://localhost:8080/api2/score/task/info/"+`${this.projectId}`).then((response)=>{
            this.taskTable = response.data.data;
          })
        }else{
          this.$message({
            message: response.data.msg,
            type: 'error'
          })
        }
        this.modifydialoguc = false;
      })
    },
    updatedialogucOpen(row){
      this.modifydialoguc = true;
      this.frommodify = row;
    },
    clearmodify(){
      this.modifydialoguc = false;
    },
    delTask(row){
      axios.delete("http://localhost:8080/api2/score/task/info/Del/"+`${row}`).then((response)=>{
        if(response.data.code == 200){
          this.$message({
            message: response.data.msg,
            type: 'success'
          })
          axios.get("http://localhost:8080/api2/score/task/info/"+`${this.projectId}`).then((response)=>{
            this.taskTable = response.data.data;
          })
        }else{
          this.$message({
            message: response.data.msg,
            type: 'error'
          })
        }
      })
    },
    submitfrom(){
      if(this.fromInput.taskstartTime>this.fromInput.taskendTime){
        this.$message({
              message: "开始日期不能大于结束日期",
              type: 'error'
            })
      }else{
        axios({
          method:'POST',
          url:"http://localhost:8080/api2/score/task/info/add/"+`${this.projectId}`,
          params:{
            taskName:this.fromInput.taskName,
            taskType:this.fromInput.taskType,
            TaskStartTime:this.fromInput.taskstartTime,
            taskendTime:this.fromInput.taskendTime
          }
        }).then((response)=>{
          if(response.data.code == 200){
            axios.get("http://localhost:8080/api2/score/task/info/"+`${this.projectId}`).then((response)=>{
              this.taskTable = response.data.data;
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
          this.from={};
          this.dialoguc = false;
        })
      }
    },
    openDialog(){
      this.dialoguc = true;
    },
    clearDialog(){
      this.dialoguc = false;
    },
    queryByType(){
      if(this.taskTypechoose =="all"){
        axios.get("http://localhost:8080/api2/score/task/info/"+`${this.projectId}`).then((response)=>{
          if(response.data.code == 200){
            this.taskTable = response.data.data;
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
        axios.get("http://localhost:8080/api2/score/task/info/type/"+`${this.taskTypechoose}`,{params:{projectId:this.projectId}}).then((response)=>{
          if(response.data.code == 200){
            this.taskTable = response.data.data;
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
      }
    },
  },
  mounted() {
      axios.get("http://localhost:8080/api2/score/task/info/"+`${this.projectId}`).then((response)=>{
        this.taskTable = response.data.data;
      })
  },
};
</script>

<style scoped>
.box-card{
  margin-bottom: 10px;
}
.operate{
  margin-left: 10px;
  margin-bottom: 10px;
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