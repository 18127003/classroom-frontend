import AcceptTokenPage from "@/views/AcceptTokenPage";
import AdminHomePage from "@/views/AdminHomePage";
import AdminLoginPage from "@/views/AdminLoginPage";
import AssignmentPage from "@/views/AssignmentPage";
import ClassroomPage from "@/views/ClassroomPage";
import HomePage from "@/views/HomePage";
import LoginPage from "@/views/LoginPage";
import TestPage from "@/views/test";
import React from "react";

type AppRoute = {
    path:string,
    name:string,
    component: React.FC,
    exact:boolean,
    protected: boolean
    props?:any
}

const routes: AppRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        protected: true,
        exact: true
    },
    {
        path: '/classroom/:id',
        name: 'Classroom Page',
        component: ClassroomPage,
        protected: true,
        exact: true
    },
    {
        path: '/classroom/:classroomId/assignment/:id',
        name: 'Assignment Page',
        component: AssignmentPage,
        protected: true,
        exact: true
    },
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage,
        protected: false,
        exact: true,
        props:{
            tab: '1'
        }
    },
    {
        path: '/signup',
        name: 'Signup Page',
        component: LoginPage,
        protected: false,
        exact: true,
        props:{
            tab: '2'
        }
    },
    {
        path: '/invite/accept_token/:id',
        name: 'Accept Mail Page',
        component: AcceptTokenPage,
        protected: true,
        exact: true,
    },
    {
        path: '/login/admin',
        name: 'Admin Home Page',
        component: AdminLoginPage,
        protected: false,
        exact: true,
    }
]

export const adminRoute: AppRoute[] = [
    {
        path: '/admin',
        name: 'Admin Home Page',
        component: AdminHomePage,
        protected: true,
        exact: true,
    },
    {
        path: '/admin/test',
        name: 'Admin Test Page',
        component: TestPage,
        protected: true,
        exact: true,
    },
    
]

export default routes;