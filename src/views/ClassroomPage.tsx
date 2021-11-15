import BasicAppBar from "@/components/BasicAppBar";
import DetailClassTab from "@/components/DetailClassTab";
import InvitationRespondDialog from "@/components/Dialog/InvitationRespondDialog";
import ParticipantTab from "@/components/ParticipantTab";
import useClassroomWrapper from "@/hooks/useClassroomWrapper";
import { AppState } from "@/reducers";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { LinearProgress, Tab } from "@mui/material";
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
        return invite?<InvitationRespondDialog handleAccept={handleAcceptInvite}/>:<>No class found</>
    }

    return (
        <>
            <TabContext value={tabValue}>
                <BasicAppBar titleFlexGrow={false}>
                    <TabList onChange={handleChange} aria-label="classroom-tabs" centered sx={{flexGrow:1}}>
                        <Tab label="News" value="1"/>
                        <Tab label="Assignments" value="2"/>
                        <Tab label="Participants" value="3"/>
                        {classroom && classroom.role==="TEACHER" && (<Tab label="Grade Book" value="4"/>)}
                    </TabList>
                </BasicAppBar>
                <LinearProgress sx={loading?{}:{display: 'none'}}/>
                <TabPanel value="1">{classroom && <DetailClassTab detailClass={classroom}/>}</TabPanel>
                <TabPanel value="2">Assignments</TabPanel>
                <TabPanel value="3"><ParticipantTab/></TabPanel>
                {classroom && classroom.role==="TEACHER" && (<TabPanel value="4">Grade book</TabPanel>)}
            </TabContext>
        </>
        
    )
}

export default ClassroomPage;