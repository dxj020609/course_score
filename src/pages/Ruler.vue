<template>
  <div>
    <el-card class="box-card">
        <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评分管理</el-breadcrumb-item></el-breadcrumb>
        </div>
    </el-card>
    <el-button type="primary" class="operate" size="small" @click.native="openDialog">添加</el-button>
    <el-button type="danger" class="operate" size="small" v-show="delinfo !=''"  @click.native="delrulerInfo">删除</el-button>
    <el-button type="danger" class="operate" size="small" v-show="delinfo ==''" disabled @click.native="delrulerInfo">删除</el-button>  
    <el-table class="testTable" :data="testTable" border @selection-change="getDetInfo">
        <el-table-column  type="selection"  width="40px" ></el-table-column>
        <el-table-column prop="rulerId" label="规则号" align="center" :resizable="false" ></el-table-column>
        <el-table-column prop="rulerName" label="规则名"  align="center" :resizable="false" ></el-table-column>
        <el-table-column prop="rulerPercent" label="规则占比" align="center" :resizable="false" ></el-table-column>
        <el-table-column prop="disabebled" label="是否禁用" align="center" :resizable="false">
            <template slot-scope="scope">
                <el-switch active-text="启用" v-model="scope.row.disabled" inactive-text="禁用"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" :resizable="false">
            <template slot-scope="scope">
            <el-button type="warning" size="mini" icon="el-icon-edit" @click.native="openModifyDialog(scope.row.rulerId)">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
    <Pagin :page="page" :size="size" :table="rulerTable" :total="total" v-on:changeTable="changetestTable"></Pagin>

    <el-dialog title="添加规则" :visible.sync="dialogucOpen">
        <el-form :model="addRuler">
            <el-form-item label="规则名称" label-width="120px" >
                <el-input v-model="addRuler.RulerName"></el-input>
            </el-form-item>
            <el-form-item label="规则占比" label-width="120px">
                <el-input-number size="mini" :step="0.1" :max="1" :min="0" v-model="addRuler.RulerPercent"></el-input-number>
            </el-form-item>
            <el-form-item label="默认禁用" label-width="120px">                
                <el-switch active-text="启用" v-model="addRuler.disabled" inactive-text="禁用"></el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="clearDialog">取 消</el-button>
            <el-button type="primary" @click="additionRuler">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="修改规则" :visible.sync="dialogucOpenModify">
        <el-form :model="Update">
            <el-form-item label="规则名称" label-width="120px" >
                <el-input v-model="Update.rulerName"></el-input>
            </el-form-item>
            <el-form-item label="规则占比" label-width="120px">
                <el-input-number size="mini" :step="0.1" :max="1" :min="0" v-model="Update.rulerPercent"></el-input-number>
            </el-form-item>
            <el-form-item label="默认禁用" label-width="120px">                
                <el-switch active-text="启用" v-model="Update.disabled" inactive-text="禁用"></el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="clearDialogmodify">取 消</el-button>
            <el-button type="primary" @click="modifyRuler">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Pagin from '../components/Pagin.vue'
export default {
  components: { Pagin },
    name:"Ruler",
    data() {
        return {
            rulerTable:[],
            delinfo:[],
            dialogucOpen:false,
            addRuler:{
                RulerName:'',
                RulerPercent:0,
                disabled:false,
            },
            testTable:[],
            size:8,
            page:1,
            total:0,
            dialogucOpenModify:false,
            Update:{},
        }
    },
    methods: {
        clearDialogmodify(){
            this.dialogucOpenModify = false;
        },
        modifyRuler(){
            axios({
                method:'put',
                url:"http://localhost:8080/api2/score/ruler/put/"+`${this.Update.rulerId}`,
                params:{
                    rulerName:this.Update.rulerName
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
                this.rulerTable = response.data.data;
                this.clearDialogmodify();
            })
            
        },
        openModifyDialog(row){
            this.dialogucOpenModify = true;
            axios({
                method:'get',
                url:"http://localhost:8080/api2/score/ruler/info/"+`${row}`
            }).then((response)=>{
                this.Update = response.data.data;
            })
        },
        changetestTable(value){
            this.testTable = value;
        },
        delrulerInfo(){
        //调用删除的接口
        axios({
            method:"DELETE",
            url:"http://localhost:8080/api2/score/ruler/info/del",
            data:{
                delList:this.delinfo
            }
        }).then((response)=>{
            if(response.data.code == 200){
                this.$message({
                    message: response.data.msg,
                    type: 'success'
                });
            }else{
                this.$message({
                    message: response.data.msg,
                    type: 'error'
                });
            }
            this.rulerTable = response.data.data
            this.delinfo = [];
            this.testTable = response.data.data.slice(0,this.size);
            this.total = response.data.data.length;
        })
        },
        //添加规则
        additionRuler(){
            axios({
                method:"POST",
                url:"http://localhost:8080/api2/score/ruler/add/"+`${this.addRuler.RulerName}`,
                params:{
                    rulerPercent:this.addRuler.RulerPercent,
                    disabled:this.addRuler.disabled==true?1:0
                }
            }).then((response)=>{
                if(response.data.code == 200){
                    this.$message({
                        message: response.data.msg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                this.clearDialog();
                this.rulerTable = response.data.data,
                this.addRuler={RulerName:'', RulerPercent:0, disabled:false,}
                this.testTable = response.data.data.slice(0,this.size);
                this.total = response.data.data.length;
            })
        },
        //关闭对话框
        clearDialog(){
            this.dialogucOpen = false;
        },
        //获取删除的id
        getDetInfo(delarr){
            this.delinfo = delarr
        },
        //打开对话框
        openDialog(){
            this.dialogucOpen = true;
        }
    },
    mounted(){
        axios({
            url:"http://localhost:8080/api2/score/ruler/",
            methods:"get",
        }).then((response)=>{
            this.rulerTable = response.data.data;
            this.testTable = response.data.data.slice(0,this.size);
            this.total = response.data.data.length;
        })
    }
}
</script>

<style scoped>
.el-table{
  width: 100%;
}
.box-card{
  margin-bottom: 10px;
}
.el-row{
    width: 100%;
}
.operate{
  margin-bottom: 10px;
}
</style>