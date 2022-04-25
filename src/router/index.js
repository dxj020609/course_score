import VueRouter from "vue-router";
import TaskList from '../pages/TaskList.vue'
import CourseMyself from '../pages/CourseMySelf.vue'
import CourseResult from '../pages/CourseResult.vue'
import CourseGroup from '../pages/CourseGroup.vue'
import UserLogin from '../components/UserLogin.vue'
import EduIndex from '../components/EduIndex.vue'
import HomePage from '../pages/HomePage.vue'
import TeacherOperation from '../pages/TeacherOperation.vue'
import ScoreTable from '../pages/ScoreTable.vue'
import Score from '../pages/Score.vue'
import Course from '../pages/Course.vue'
import Project from '../pages/Project.vue'

 const router = new VueRouter({
    routes:[
        {
            path:'/',
            meta:{title:'登录'},
            component:UserLogin
        },
        {
            path:'/index',
            meta:{title:'主页'},
            component:EduIndex,
            children:[
                {
                    path:'',
                    meta:{title:'主页'},
                    component:HomePage
                },
                {
                    path:'Task',
                    meta:{title:'任务查看'},
                    component:TaskList
                },
                {
                    path:'coursemyself',
                    meta:{title:'自我评分'},
                    component:CourseMyself
                },
                {
                    path:'result',
                    meta:{title:'任务成绩'},
                    component:CourseResult
                },
                {
                    path:'coursegroup',
                    meta:{title:'小组评分'},
                    component:CourseGroup
                },
                {
                    path:'Teacherindex',
                    meta:{title:'教师评分'},
                    component:TeacherOperation
                },
                {
                    path:'RulerTable',
                    name:'ScoreTable',
                    meta:{title:'成绩表'},
                    component:ScoreTable,
                    
                },
                {
                    path:"Score/:id",
                    name:'score',
                    meta:{title:'评分界面'},
                    component:Score,
                    props:true
                },
                {
                    path:"Course",
                    name:"course",
                    meta:{title:"课程信息"},
                    component:Course,
                },{
                    path:"Project/:teacherId/:classId/:courseId",
                    name:"project",
                    meta:{title:"项目信息"},
                    component:Project,
                    props:true
                }
            ]
        }
        
    ]
})

router.afterEach((to) => {
    // to and from are both route objects.
    if(to.meta.title){
        document.title = to.meta.title
    }else{
        document.title = '成绩系统'
    }
})

export default router