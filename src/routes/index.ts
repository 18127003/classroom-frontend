import ClassroomPage from "@/views/ClassroomPage";
import HomePage from "@/views/HomePage";
import LoginPage from "@/views/LoginPage";
import SignupPage from "@/views/SignupPage";
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
        path: '/login',
        name: 'Login Page',
        component: LoginPage,
        protected: false,
        exact: true,
    },
    {
        path: '/signup',
        name: 'Signup Page',
        component: SignupPage,
        protected: false,
        exact: true,
    }

]

export default routes;