<template>
  <el-pagination small layout="prev, pager, next" @size-change="sizeChange" @current-change="currentChange" :current-page="page" :total="total" :page-size="size"></el-pagination>
</template>

<script>
export default {
    name:'Pagin',
    props:['size','page','total','table'],
    data() {
        return {
            testTable:[],
            sonsize:this.size,
            sonpage:this.page,
            sontotal:this.total
        }
    },
    methods:{
        changetestTable(){
            this.$emit("changeTable",this.testTable)
        },
        //分页
        getTablData(){
            this.testTable = this.table.slice((this.sonpage - 1)*this.sonsize,this.sonpage * this.sonsize);
            this.sontotal = this.table.length
            //调用事件总线
            this.changetestTable();
        },
        currentChange(val){
            this.sonpage = val;
            this.getTablData();
            //调用事件总线
            this.changetestTable();
        },
        sizeChange(val){
            this.sonsize = val;
            this.sonpage = 1;
            this.getTablData();
            //调用事件总线
            this.changetestTable();
        },
    },
    watch:{
        total:{
            handler(){
                this.getTablData()
            }
        }
    }
}
</script>

<style>

</style>