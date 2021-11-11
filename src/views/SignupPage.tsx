
import { loginRefresh } from "@/actions/auth";
import LoginForm from "@/components/Form/LoginForm";
import SignupForm from "@/components/Form/SignupForm";
import { AppState } from "@/reducers";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const SignupPage = ()=>{
    const auth = useSelector((state: AppState)=>state.auth.user);
    const [cookies]=useCookies(['user'])
    const dispatch = useDispatch();

    useEffect(()=>{
        if(cookies.user){
            dispatch(loginRefresh(cookies.user))
        }
    },[])

    if(auth!==null && auth!==undefined){
        return <Redirect to="/"/>
    }
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
            <Box sx={{m:12, position: 'relative' }}>
                <SignupForm/>
            </Box>
        </Box>
    )
}

export default SignupPage;