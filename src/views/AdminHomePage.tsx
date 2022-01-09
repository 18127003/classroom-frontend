import AdminTab from "@/components/Admin/AdminTab";
import ClassTab from "@/components/Admin/ClassTab";
import UserTab from "@/components/Admin/UserTab";
import BasicAppBar from "@/components/BasicAppBar";
import { AppState } from "@/reducers";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, LinearProgress, Tab } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const AdminHomePage: React.FC = ()=>{
    const [tabValue, setTabValue] = React.useState('1');
    const loading = useSelector((state: AppState)=>state.admin.loading)
    const error = useSelector((state: AppState)=>state.admin.error)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
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
                </TabList>
            </Box>
            
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <TabPanel value="1"><UserTab/></TabPanel>
            <TabPanel value="2"><ClassTab/></TabPanel>
            <TabPanel value="3"><AdminTab/></TabPanel>
        </TabContext>
    )
}

export default AdminHomePage;