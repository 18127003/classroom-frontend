import AdminTab from "@/components/Admin/AdminTab";
import BlacklistTab from "@/components/Admin/BlacklistTab";
import ClassTab from "@/components/Admin/ClassTab";
import UserTab from "@/components/Admin/UserTab";
import BasicSnackBar from "@/components/BasicSnackBar";
import { AppState } from "@/reducers";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, LinearProgress, Tab, Fab } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogButton from "@/components/Button/DialogButton"
import { logoutRequest } from "@/actions/auth";
import { useCookies } from "react-cookie";
import { COOKIES_AUTH_NAME } from "@/constants/common";

const AdminHomePage: React.FC = ()=>{
    const [tabValue, setTabValue] = React.useState('1');
    const [cookies, setCookies, removeCookies] = useCookies([COOKIES_AUTH_NAME])
    const loading = useSelector((state: AppState)=>state.admin.loading)
    const error = useSelector((state: AppState)=>state.admin.error)
    const msg = useSelector((state: AppState)=>state.admin.msg)
    const dispatch = useDispatch()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const onLogout = ()=>{
        removeCookies(COOKIES_AUTH_NAME,{'path':'/'})
        dispatch(logoutRequest())
    }

    return (


        <TabContext value={tabValue}>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <TabList 
                    onChange={handleChange} 
                    aria-label="classroom-tabs" 
                    sx={{flexGrow:1}} 
                    centered
                >
                    <Tab label="Users" value="1"/>
                    <Tab label="Classes" value="2"/>
                    <Tab label="Admins" value="3"/>
                    <Tab label="Blacklist" value="4"/>
                </TabList>
            </Box>
            
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <TabPanel value="1"><UserTab/></TabPanel>
            <TabPanel value="2"><ClassTab/></TabPanel>
            <TabPanel value="3"><AdminTab/></TabPanel>
            <TabPanel value="4"><BlacklistTab/></TabPanel>
            <BasicSnackBar type="error" msg={error}/>
            <BasicSnackBar type="success" msg={msg}/>
            <DialogButton 
                onConfirm={onLogout} 
                dialogContent={"Do you want to logout?"}
            >
                <Fab 
                    color="primary" 
                    aria-label="add" 
                    sx={{position: 'fixed', bottom: 32, right: 32,}}
                >
                    <LogoutRoundedIcon />
                </Fab>
            </DialogButton>
            
        </TabContext>
    )
}

export default AdminHomePage;