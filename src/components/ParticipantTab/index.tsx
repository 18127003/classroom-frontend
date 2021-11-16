import { getParticipantsRequest } from "@/actions/detail";
import useParticipantFilter from "@/hooks/useParticipantFilter";
import { AppState } from "@/reducers";
import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParticipantList from "./ParticipantList";

const ParticipantTab: React.FC=()=>{
    const dispatch = useDispatch();
    const {students, teachers} = useParticipantFilter()
    const reload = useSelector((state: AppState)=>state.detail.participants.reload)
    const detail = useSelector((state: AppState)=>state.detail.detail)

    useEffect(()=>{
        if(detail && reload){
            dispatch(getParticipantsRequest(detail.id))
        }
    },[detail])

    return (
        <>
            <ParticipantList 
                title={"Teachers"} 
                data={teachers} 
                hasCount={false} 
                hasAddIcon={detail.role==="TEACHER"?true:false}
            />
            <Paper elevation={0} sx={{height:'50px'}} />
            <ParticipantList 
                title={"Students"} 
                data={students} 
                hasCount={students.length>0} 
                hasManage={students.length>0 && detail.role==="TEACHER"}
                hasAddIcon={detail.role==="TEACHER"}
            />
        </>
    )
}

export default ParticipantTab;

