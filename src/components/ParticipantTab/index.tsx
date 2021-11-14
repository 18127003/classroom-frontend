import { getParticipantsRequest } from "@/actions/detail";
import { AppState } from "@/reducers";
import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParticipantList from "./ParticipantList";

const ParticipantTab: React.FC=()=>{
    const dispatch = useDispatch();
    const participants = useSelector((state: AppState)=>state.detail.participants.data)
    const reload = useSelector((state: AppState)=>state.detail.participants.reload)
    const detail = useSelector((state: AppState)=>state.detail.detail)

    useEffect(()=>{
        if(detail && reload){
            dispatch(getParticipantsRequest(detail.id))
        }
    },[detail])

    return (
        <>
            <ParticipantList title={"Teachers"} list={participants.filter(p=>p.role==="TEACHER")} hasCount={false} />
            <Paper elevation={0} sx={{height:'50px'}} />
            <ParticipantList title={"Students"} list={participants.filter(p=>p.role==="STUDENT")} hasCount={true} />
        </>
    )
}

export default ParticipantTab;

