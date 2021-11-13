import ClassroomAppBar from "@/components/ClassroomAppBar";
import InvitationRespondDialog from "@/components/Dialog/InvitationRespondDialog";
import ParticipantTab from "@/components/ParticipantTab";
import useClassroomWrapper from "@/hooks/useClassroomWrapper";
import { AppState } from "@/reducers";
import { TabContext, TabPanel } from "@mui/lab";
import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";


const ClassroomPage: React.FC = ()=>{
    const [acceptInvite, setAcceptInvite] = useState(false);
    const {invite} = useClassroomWrapper(acceptInvite);
    const loading = useSelector((state: AppState)=>state.detail.loading);
    const classroom = useSelector((state: AppState)=>state.detail.detail);
    const error = useSelector((state: AppState)=>state.detail.error);
    
    const [tabValue, setTabValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
    
    const handleAcceptInvite = () => {
        setAcceptInvite(true)
    }

    if(error){
        return <>No class found</>
    }

    if(invite){
        return <InvitationRespondDialog handleAccept={handleAcceptInvite}/>
    }

    return (
        <>
            <TabContext value={tabValue}>
                <ClassroomAppBar handleChangeTab={handleChange}/>
                <LinearProgress sx={loading?{}:{display: 'none'}}/>
                <TabPanel value="1"><div>Classroom code: {classroom?classroom.code:''}</div></TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3"><ParticipantTab/></TabPanel>
            </TabContext>
        </>
        
    )
}

export default ClassroomPage;