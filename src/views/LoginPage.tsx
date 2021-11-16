
import { LoginPageProps } from "@/@types/props";
import { loginRefresh } from "@/actions/auth";
import LoginForm from "@/components/Form/LoginForm";
import SignupForm from "@/components/Form/SignupForm";
import { AppState } from "@/reducers";
import { Box, Card, CardContent, Tab } from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const LoginPage: React.FC<LoginPageProps> = ({tab})=>{
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

    if(auth!==null && auth!==undefined){
        return <Redirect to={location.state??'/'}/>
    }
   
    return (
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
            <Box sx={{m:12, position: 'relative' }}>
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
                            <TabPanel value="1"><LoginForm/></TabPanel>
                            <TabPanel value="2"><SignupForm/></TabPanel>
                        </TabContext>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default LoginPage;