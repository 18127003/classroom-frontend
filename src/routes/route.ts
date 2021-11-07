import useAuth from "@/hooks/useAuth";
import HomePage from "@/views/HomePage";
import LoginPage from "@/views/LoginPage";
import React from "react";

type AppRoute = {
    path:string,
    name:string,
    component: React.FC,
    exact:boolean,
    protected: boolean,
    props?:any,
    condition?: ()=>boolean,
    redirect?: string
}

const routes: AppRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        protected: true,
        exact: true,
        condition: ()=>useAuth()?.user!==null,
        redirect: "/login"
    },
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage,
        protected:false,
        exact: true,
        condition: ()=>useAuth()?.user===null,
        redirect:"/"
    }
]

export default routes;