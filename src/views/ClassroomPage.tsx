import ClassroomAppBar from "@/components/ClassroomAppBar";
import InvitationRespondDialog from "@/components/Dialog/InvitationRespondDialog";
import ParticipantTab from "@/components/ParticipantTab";
import useClassroomWrapper from "@/hooks/useClassroomWrapper";
import { AppState } from "@/reducers";
import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";


const ClassroomPage: React.FC = ()=>{
    const [acceptInvite, setAcceptInvite] = useState(false);
    const {invite} = useClassroomWrapper(acceptInvite);
    const loading = useSelector((state: AppState)=>state.detail.loading);
    const classroom = useSelector((state: AppState)=>state.detail.detail);
    const error = useSelector((state: AppState)=>state.detail.error)
    
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
            <ClassroomAppBar/>
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <div>Classroom code: {classroom?classroom.code:''}</div>
            <ParticipantTab/>
        </>
        
    )
}

export default ClassroomPage;