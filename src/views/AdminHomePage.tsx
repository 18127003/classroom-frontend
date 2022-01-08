import BasicAppBar from "@/components/BasicAppBar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, LinearProgress, Tab } from "@mui/material";
import React from "react";

const AdminHomePage: React.FC = ()=>{
    const [tabValue, setTabValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
    return (
        <TabContext value={tabValue}>
            <BasicAppBar>
                <TabList 
                    onChange={handleChange} 
                    aria-label="classroom-tabs" 
                    sx={{flexGrow:20, display:{md:'block',sm:'none', xs:'none'} , alignSelf:'flex-end'}} 
                    centered
                >
                    <Tab label="Users" value="1"/>
                    <Tab label="Classes" value="2"/>
                    <Tab label="Admins" value="3"/>
                </TabList>
                
            </BasicAppBar>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display:{md:'none',sm:'block', xs:'block'} }}>
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
            
            {/* <LinearProgress sx={loading?{}:{display: 'none'}}/> */}
            <TabPanel value="1"></TabPanel>
            <TabPanel value="2">
                {
                    
                }
            </TabPanel>
            <TabPanel value="3"></TabPanel>
        </TabContext>
    )
}

export default AdminHomePage;