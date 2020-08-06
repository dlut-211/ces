import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/page/LoginPage/LoginPage.vue';
import DashboardPage from '@/page/DashboardPage/DashboardPage.vue';
import TeacherPage from "@/childPage/TeacherPage/TeacherPage.vue";
import CoursePage from "@/childPage/CoursePage/CoursePage.vue";
import ClassRoomPage from "@/childPage/ClassRoomPage/ClassRoomPage.vue";
import StudentWorkPage from "@/childPage/StudentWorkPage/StudentWorkPage.vue";
import SubjectPage from "@/childPage/SubjectPage/SubjectPage.vue";
import AbilityPage from "@/childPage/AbilityPage/AbilityPage.vue";
import ClassRoomStudentPage from "@/childPage/ClassRoomStudentPage/ClassRoomStudentPage.vue";
import Stu_StudentWorkPage from "@/childPage/Stu_StudentWorkPage/Stu_StudentWorkPage.vue";
import SubjectGradePage from "@/childPage/SubjectGradePage/SubjectGradePage.vue";

import InviGilateInfoPage from "@/childPage/InviGilateInfoPage/InviGilateInfoPage.vue";
import InviGilateInfo1Page from "@/childPage/InviGilateInfo1Page/InviGilateInfo1Page.vue";
import SubjectManagePage from "@/childPage/SubjectManagePage/SubjectManagePage.vue";

import AdminHomePage from "@/childPage/AdminHomePage/AdminHomePage.vue";
import TeacherHomePage from "@/childPage/TeacherHomePage/TeacherHomePage.vue";
import StudentHomePage from "@/childPage/StudentHomePage/StudentHomePage.vue";
import TestPage from "@/childPage/TestPage/TestPage.vue";
import AdminLoginPage from "@/childPage/AdminLoginPage/AdminLoginPage.vue";
import StudentLoginPage from "@/childPage/StudentLoginPage/StudentLoginPage.vue";
import TeacherLoginPage from "@/childPage/TeacherLoginPage/TeacherLoginPage.vue";
import TeacherRegisterPage from "@/childPage/TeacherRegisterPage/TeacherRegisterPage.vue";
import courseInfo from "@/childPage/courseInfo/courseInfo.vue";

import SchoolPage from "@/childPage/SchoolPage/SchoolPage.vue";
Vue.use(Router);

export default new Router({
    routes: [{
        name: 'LoginPage',
        path: '/LoginPage',
        component: LoginPage
    },
    {
        path: '/AdminLoginPage',
        name: 'AdminLoginPage',
        component: AdminLoginPage
    },
    {
        path: '/StudentLoginPage',
        name: 'StudentLoginPage',
        component: StudentLoginPage
    },
    {
        path: '/TeacherLoginPage',
        name: 'TeacherLoginPage',
        component: TeacherLoginPage
    },
    {
        path: '/TeacherRegisterPage',
        name: 'TeacherRegisterPage',
        component: TeacherRegisterPage
    },
     {
        name: 'DashboardPage',
        path: '/DashboardPage',
        component: DashboardPage,
        children: [
            {
                path: '/AdminHomePage',
                name: 'AdminHomePage',
                component: AdminHomePage,
                meta: {
                    title: "首页"
                }
            },
            {
                path: '/TeacherHomePage',
                name: 'TeacherHomePage',
                component: TeacherHomePage,
                meta: {
                    title: "首页"
                }
            },
            {
                path: '/StudentHomePage',
                name: 'StudentHomePage',
                component: StudentHomePage,
                meta: {
                    title: "首页"
                }
            },
            {
                path: '/TeacherPage',
                name: 'TeacherPage',
                component: TeacherPage,
                meta: {
                    title: "教师"
                }
            },
            {
                path: 'CoursePage',
                name: 'CoursePage',
                component: CoursePage,
                meta: {
                    title: "课程管理"
                }
            },
            {
                path:'courseInfo',
                name:'courseInfo',
                component:courseInfo,
                meta:{
                    title:"课程详情"
                }
            },
            {
                path: 'ClassRoomPage',
                name: 'ClassRoomPage',
                component: ClassRoomPage,
                meta:{
                    title:"我的课堂"
                }
                
            },
            {
                path: 'StudentWorkPage',
                name: 'StudentWorkPage',
                component: StudentWorkPage,
                meta:{
                    title:"章节作业"
                }
            },
            {
                path: 'SubjectPage',
                name: 'SubjectPage',
                component: SubjectPage,
                meta: {
                    title: "学科"
                }
            },
            {
                path: 'SchoolPage',
                name: 'SchoolPage',
                component: SchoolPage,
                meta: {
                    title: "学校"
                }
            },
            {
                path: 'AbilityPage',
                name: 'AbilityPage',
                component: AbilityPage
            },
            {
                path: 'ClassRoomStudentPage',
                name: 'ClassRoomStudentPage',
                component: ClassRoomStudentPage,
                meta:{
                    title:"我的课堂"
                }
            },
            {
                path: 'Stu_StudentWorkPage',
                name: 'Stu_StudentWorkPage',
                component: Stu_StudentWorkPage
            },
           {
                path: 'SubjectGradePage',
                name: 'SubjectGradePage',
                component: SubjectGradePage,
                meta:{
                    title:"我的学科"
                }
            },
            {
                path:'InviGilateInfoPage',
                name:'InviGilateInfoPage',
                component: InviGilateInfoPage,
                meta: {
                    title: "监考信息"
                }
            },
            {
                path:'InviGilateInfo1Page',
                name:'InviGilateInfo1Page',
                component: InviGilateInfo1Page
            },
            {
                path: 'SubjectManagePage',
                name: 'SubjectManagePage',
                component: SubjectManagePage,
                meta:{
                    title:"我的课堂"
                }
            },
            {
                path: 'TestPage',
                name: 'TestPage',
                component: TestPage
            }
        ]
    }, {
        path: '*',
        component: LoginPage
    }]
})
