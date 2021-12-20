import { LoginPageProps } from "@/@types/props";
import { loginRefresh } from "@/actions/auth";
import AdminLoginForm from "@/components/Form/AdminLoginForm";
import { AppState } from "@/reducers";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

const AdminLoginPage: React.FC<LoginPageProps> = ()=>{
    const auth = useSelector((state: AppState)=>state.auth.user);
    const [cookies]=useCookies(['user'])
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(()=>{
        if(cookies.user){
            dispatch(loginRefresh(cookies.user))
        }
    },[])

    if(auth!==null && auth!==undefined && auth.role==='ADMIN'){
        return <Redirect to={location.state??'/admin'}/>
    }
   
    return (
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
            <Box sx={{m:10, position: 'relative' }}>
                <Stack sx={{alignItems:'center'}}>
                    <Typography variant="h4" m={5}>
                        Classroom Admin
                    </Typography>
                    <Card>
                        <CardContent>
                            <AdminLoginForm/>
                        </CardContent>
                    </Card>
                </Stack>
                
            </Box>
        </Box>
    )
}

export default AdminLoginPage;