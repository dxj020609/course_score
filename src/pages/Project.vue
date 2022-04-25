<template>
  
</template>

<script>
import axios from 'axios'
export default {
    name:"Project",
    props:['teacherId','classId','courseId'],
    mounted() {
        axios.get("http://localhost:8080/api2/score/project/info/"+`${this.teacherId}`+"/"+`${this.classId}`+"/"+`${this.courseId}`).then((response)=>{
            console.log(response.data);
        })
    },

}
</script>

<style>

</style>