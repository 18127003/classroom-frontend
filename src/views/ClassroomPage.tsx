import { AssignedClassroom } from "@/@types/model";
import { getDetailRequest } from "@/actions/detail";
import ClassroomAppBar from "@/components/ClassroomAppBar";
import ParticipantTab from "@/components/ParticipantTab";
import { AppState } from "@/reducers";
import { LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

type ClassroomPageParams = {
    id: string
}

const ClassroomPage: React.FC = ()=>{
    const {id} = useParams<ClassroomPageParams>()
    const location = useLocation();
    const loading = useSelector((state: AppState)=>state.detail.loading);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(location.state){
            dispatch(getDetailRequest(location.state as AssignedClassroom))
        } else {
            dispatch(getDetailRequest(+id))
        }
    },[id])

    return (
        <>
            <ClassroomAppBar/>
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <div>Classroom code: {(location.state as AssignedClassroom).code}</div>
            <ParticipantTab id={+id}/>
        </>
        
    )
}

export default ClassroomPage;