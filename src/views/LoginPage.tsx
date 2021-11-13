
import { loginRefresh } from "@/actions/auth";
import LoginForm from "@/components/Form/LoginForm";
import { AppState } from "@/reducers";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

const LoginPage = ()=>{
    const auth = useSelector((state: AppState)=>state.auth.user);
    const [cookies]=useCookies(['user'])
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(()=>{
        if(cookies.user){
            dispatch(loginRefresh(cookies.user))
        }
    },[])

    if(auth!==null && auth!==undefined){
        return <Redirect to={location.state??'/'}/>
    }
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
            <Box sx={{m:12, position: 'relative' }}>
                <LoginForm/>
            </Box>
        </Box>
    )
}

export default LoginPage;