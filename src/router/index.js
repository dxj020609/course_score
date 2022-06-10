import VueRouter from "vue-router";
import Task from '../pages/TaskList.vue'
import UserLogin from '../components/UserLogin.vue'
import EduIndex from '../components/EduIndex.vue'
import HomePage from '../pages/HomePage.vue'
import TeacherOperation from '../pages/TeacherOperation.vue'
import ScoreTable from '../pages/ScoreTable.vue'
import Score from '../pages/Score.vue'
import Course from '../pages/Course.vue'
import Project from '../pages/Project.vue'
import ScoreSummary from '../pages/ScoreSummary.vue'
import StudentScoreSummary from '../pages/StudentScoreSummary.vue'
import Ruler from '../pages/Ruler.vue'
import GroupSummary from '../pages/GroupSummary.vue'
import SelfScore from '../pages/SelfScore.vue'
import info from '../pages/info.vue'
import courseadmin from '../pages/CourseAdmin.vue'
import classadmin from '../pages/ClassAdmin.vue'
import studentadmin from '../pages/StudentAdmin.vue'
import teacherAdmin from '../pages/TeacherAdmin.vue'
import ShowScore from '../components/ShowScore.vue'
import ShowTable from '../components/ShowTable.vue'

 const router = new VueRouter({
    routes:[
        {
            path:'/',
            meta:{title:'登录'},
            component:UserLogin
        },
        {
            path:'/index',
            name:'index',
            meta:{title:'主页'},
            component:EduIndex,
            children:[
                {
                    path:'ruler',
                    name:'ruler',
                    meta:{title:'评分管理'},
                    component:Ruler,
                },
                {
                    path:'',
                    meta:{title:'主页'},
                    component:HomePage
                },
                {
                    path:'scoreSummary',
                    name:'scoreSummary',
                    meta:{title:'成绩分析'},
                    component:ScoreSummary,
                },
                {
                    path:'studentscoreSummary',
                    name:'studentscoreSummary',
                    meta:{title:'成绩分析'},
                    component:StudentScoreSummary,
                },
                {
                    path:'Teacherindex',
                    meta:{title:'教师评分'},
                    component:TeacherOperation
                },
                {
                    path:'Score/:taskId',
                    name:'scoreTable',
                    meta:{title:'成绩信息'},
                    component:ScoreTable,
                    props:true,
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
                },
                {
                    path:"Project/:teacherId/:classId/:courseId",
                    name:"project",
                    meta:{title:"项目信息"},
                    component:Project,
                    props:true
                },
                {
                    path:"Task/:projectId",
                    name:"task",
                    meta:{title:"任务信息"},
                    component:Task,
                    props:true
                },
                {
                    path:"grouosummary",
                    name:"GroupSummary",
                    meta:{title:"小组成绩"},
                    component:GroupSummary,
                },
                // 学生端
                {
                    path:"selfscore",
                    name:"SelfScore",
                    meta:{title:"评分列表"},
                    component:SelfScore
                },
                {
                    path:"info",
                    name:"info",
                    meta:{title:"个人信息"},
                    component:info
                },
                {
                    path:"courseadmin",
                    name:"courseadmin",
                    meta:{title:"课程管理"},
                    component:courseadmin
                },
                {
                    path:"classadmin",
                    name:"classadmin",
                    meta:{title:"班级管理"},
                    component:classadmin
                },
                {
                    path:"studentAdmin",
                    name:"studentAdmin",
                    meta:{title:"学生管理"},
                    component:studentadmin
                },
                {
                    path:"teacherAdmin",
                    name:"teacherAdmin",
                    meta:{title:"教师管理"},
                    component:teacherAdmin
                },
            ]
        },
        {
            path:'/showScore',
            name:'showScore',
            meta:{title:"PK界面"},
            component:ShowScore
        },
        {
            path:'/showTable',
            name:'showTable',
            meta:{title:"分数界面"},
            component:ShowTable
        }
    ]
})

router.afterEach((to) => {
    if(to.meta.title){
        document.title = to.meta.title
    }else{
        document.title = '成绩系统'
    }
})

export default router