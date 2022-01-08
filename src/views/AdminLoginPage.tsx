import { LoginPageProps } from "@/@types/props";
import { loginRefresh } from "@/actions/auth";
import AdminLoginForm from "@/components/Form/AdminLoginForm";
import AdminSignupForm from "@/components/Form/AdminSignUpForm";
import { AppState } from "@/reducers";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, CardContent, Stack, Tab, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

const AdminLoginPage: React.FC<LoginPageProps> = ({tab})=>{
    const auth = useSelector((state: AppState)=>state.auth.user);
    const [cookies]=useCookies(['user'])
    const dispatch = useDispatch();
    const location = useLocation();
    const [tabValue, setTabValue] = React.useState(tab);

    const handleChange = (event: React.SyntheticEvent, newValue: "1"|"2") => {
        setTabValue(newValue);
    };

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
                        <TabContext value={tabValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList 
                                        onChange={handleChange} 
                                        aria-label="auth-tabs" 
                                        sx={{flexGrow:1}}
                                        variant="fullWidth"
                                    >
                                        <Tab label="Login" value="1"/>
                                        <Tab label="Sign Up" value="2"/>
                                    </TabList>
                                </Box>
                                <TabPanel value="1"><AdminLoginForm/></TabPanel>
                                <TabPanel value="2"><AdminSignupForm/></TabPanel>
                            </TabContext>
                        </CardContent>
                    </Card>
                </Stack>
                
            </Box>
        </Box>
    )
}

export default AdminLoginPage;