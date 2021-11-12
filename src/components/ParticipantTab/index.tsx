import { getParticipantsRequest } from "@/actions/detail";
import { AppState } from "@/reducers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParticipantList from "./ParticipantList";

const ParticipantTab: React.FC<{id: number}>=({id})=>{
    const dispatch = useDispatch();
    const participants = useSelector((state: AppState)=>state.detail.participants)
    const detail = useSelector((state: AppState)=>state.detail.detail)

    useEffect(()=>{
        if(detail){
            dispatch(getParticipantsRequest(detail.id))
        }
    },[detail])

    return (
        <>
            <ParticipantList title={"Teachers"} list={participants.filter(p=>p.role==="TEACHER")} hasCount={false}/>
            <ParticipantList title={"Students"} list={participants.filter(p=>p.role==="STUDENT")} hasCount={true}/>
        </>
    )
}

export default ParticipantTab;

