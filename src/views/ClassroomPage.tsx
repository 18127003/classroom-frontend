import AssignmentsTab from "@/components/AssignmentsTab";
import BasicAppBar from "@/components/BasicAppBar";
import ClassNotFound from "@/components/ClassNotFound";
import BasicSnackBar from "@/components/BasicSnackBar"
import DetailClassTab from "@/components/DetailClassTab";
import InvitationRespondDialog from "@/components/Dialog/InvitationRespondDialog";
import GradeBookTab from "@/components/GradeBookTab";
import GradeStructureTab from "@/components/GradeStructureTab";
import OverallGradeTab from "@/components/StudentGradeTab";
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
    const detailError = useSelector((state: AppState)=>state.detail.error);
    const detailMsg = useSelector((state: AppState)=>state.detail.msg)
    const assignmentError = useSelector((state: AppState)=>state.assignment.error)
    const assignmentMsg = useSelector((state: AppState)=>state.assignment.msg)
    const gradeError = useSelector((state: AppState)=>state.grade.error)
    const gradeMsg = useSelector((state: AppState)=>state.grade.msg)
    
    const [tabValue, setTabValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
      

    if(invite || detailError==='Get classroom detail failed'){
        return invite?<InvitationRespondDialog handleAccept={handleAcceptInvite}/>:<ClassNotFound/>
    }

    return (
        <TabContext value={tabValue}>
            <BasicAppBar>
                <TabList 
                    onChange={handleChange} 
                    aria-label="classroom-tabs" 
                    sx={{flexGrow:20, display:{md:'block',sm:'none', xs:'none'} , alignSelf:'flex-end'}} 
                    centered
                >
                    <Tab label="News" value="1"/>
                    <Tab label="Assignments" value="2"/>
                    <Tab label="Participants" value="3"/>
                    <Tab label="Grade" value="4"/>
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
                    <Tab label="Assignments" value="2"/>
                    <Tab label="Participants" value="3"/>
                    <Tab label="Grade" value="4"/>
                </TabList>
            </Box>
            
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <TabPanel value="1">{classroom && <DetailClassTab detailClass={classroom}/>}</TabPanel>
            <TabPanel value="2">
                {
                    classroom && classroom.role==="STUDENT"?<AssignmentsTab/>:<GradeStructureTab/>
                }
            </TabPanel>
            <TabPanel value="3"><ParticipantTab/></TabPanel>
            <TabPanel value="4">
                {
                    classroom && classroom.role==="STUDENT"?<OverallGradeTab/>:<GradeBookTab/>
                }
            </TabPanel>
            <BasicSnackBar type='error' msg={detailError}/>
            <BasicSnackBar type='success' msg={detailMsg}/>
            <BasicSnackBar type='error' msg={assignmentError}/>
            <BasicSnackBar type='success' msg={assignmentMsg}/>
            <BasicSnackBar type='error' msg={gradeError}/>
            <BasicSnackBar type='success' msg={gradeMsg}/>
        </TabContext>
    )
}

export default ClassroomPage;