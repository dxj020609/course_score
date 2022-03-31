import VueRouter from "vue-router";
import HomePage from '../pages/HomePage.vue'
import TaskList from '../pages/TaskList.vue'
import CourseMyself from '../pages/CourseMySelf.vue'

 const router = new VueRouter({
    routes:[
        {
            path:'/',
            meta:{title:'主页'},
            component:HomePage
        },
        {
            path:'/Task',
            meta:{title:'任务查看'},
            component:TaskList
        },
        {
            path:'/course',
            meta:{title:'自我评分'},
            component:CourseMyself
        }
    ]
})

router.afterEach((to) => {
    console.log(to);
    // to and from are both route objects.
    if(to.meta.title){
        document.title = to.meta.title
    }else{
        document.title = '成绩系统'
    }
})

export default router