import { getParticipantsRequest } from "@/actions/detail";
import { AppState } from "@/reducers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParticipantList from "./ParticipantList";

const ParticipantTab: React.FC<{id: number}>=({id})=>{
    const dispatch = useDispatch();
    const participants = useSelector((state: AppState)=>state.detail.participants)
    // const classId = useSelector((state: AppState)=>state.detail.detail.id)

    useEffect(()=>{
        dispatch(getParticipantsRequest(id))
    },[])

    return (
        <>
            <ParticipantList nameList={"Teachers"} list={participants.filter(p=>p.role==="TEACHER")} hasCount={false}/>
            <ParticipantList nameList={"Students"} list={participants.filter(p=>p.role==="STUDENT")} hasCount={true}/>
        </>
    )
}

export default ParticipantTab;

