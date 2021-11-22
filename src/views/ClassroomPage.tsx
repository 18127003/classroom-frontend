import BasicAppBar from "@/components/BasicAppBar";
import ClassNotFound from "@/components/ClassNotFound";
import DetailClassTab from "@/components/DetailClassTab";
import InvitationRespondDialog from "@/components/Dialog/InvitationRespondDialog";
import GradeBookTab from "@/components/GradeBookTab";
import ParticipantTab from "@/components/ParticipantTab";
import useClassroomWrapper from "@/hooks/useClassroomWrapper";
import { AppState } from "@/reducers";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, LinearProgress, Tab } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";


const ClassroomPage: React.FC = ()=>{
    const {invite, handleAcceptInvite} = useClassroomWrapper();
    const loading = useSelector((state: AppState)=>state.detail.loading);
    const classroom = useSelector((state: AppState)=>state.detail.detail);
    const error = useSelector((state: AppState)=>state.detail.error);
    
    const [tabValue, setTabValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
      

    if(invite || error){
        return invite?<InvitationRespondDialog handleAccept={handleAcceptInvite}/>:<ClassNotFound/>
    }

    return (
        <>
            <TabContext value={tabValue}>
                <BasicAppBar>
                    <TabList 
                        onChange={handleChange} 
                        aria-label="classroom-tabs" 
                        sx={{flexGrow:20, display:{md:'block',sm:'none', xs:'none'} , alignSelf:'flex-end'}} 
                        centered
                    >
                        <Tab label="News" value="1"/>
                        {classroom && classroom.role==="STUDENT" && (<Tab label="Assignments" value="2"/>)}
                        <Tab label="Participants" value="3"/>
                        {classroom && classroom.role==="TEACHER" && (<Tab label="Grade Book" value="4"/>)}
                    </TabList>
                    
                </BasicAppBar>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display:{md:'none',sm:'block', xs:'block'} }}>
                    <TabList 
                        onChange={handleChange} 
                        aria-label="classroom-tabs" 
                        sx={{flexGrow:1}} 
                        centered
                    >
                        <Tab label="News" value="1"/>
                        {classroom && classroom.role==="STUDENT" && (<Tab label="Assignments" value="2"/>)}
                        <Tab label="Participants" value="3"/>
                        {classroom && classroom.role==="TEACHER" && (<Tab label="Grade Book" value="4"/>)}
                    </TabList>
                </Box>
                
                <LinearProgress sx={loading?{}:{display: 'none'}}/>
                <TabPanel value="1">{classroom && <DetailClassTab detailClass={classroom}/>}</TabPanel>
                {classroom && classroom.role==="STUDENT" && (<TabPanel value="2">Assignments</TabPanel>)}
                <TabPanel value="3"><ParticipantTab/></TabPanel>
                {classroom && classroom.role==="TEACHER" && (<TabPanel value="4"><GradeBookTab/></TabPanel>)}
            </TabContext>
        </>
        
    )
}

export default ClassroomPage;