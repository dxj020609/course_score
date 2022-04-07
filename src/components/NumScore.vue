<template>
  <el-input-number v-model="score"  :min="0" :max="100" label="成绩" @blur="setScope"></el-input-number>
</template>

<script>
export default {
    name:'NumScore',
    data(){
        return{
            score:0
        }
    },
    methods:{
        setScope(){
            this.$bus.$emit('getScope',this.score)
            this.score = 0
        }
    }
}
</script>