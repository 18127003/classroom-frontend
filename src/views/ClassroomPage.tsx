import { Account, AssignedClassroom } from "@/@types/model";
import ClassroomAppBar from "@/components/ClassroomAppBar";
import ParticipantTab from "@/components/ParticipantTab";
import ParticipantList from "@/components/ParticipantTab/ParticipantList";
import { classroomService } from "@/services";
import { AccountBalance } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

type ClassroomPageParams = {
    id: string
}

const ClassroomPage: React.FC = ()=>{
    const {id} = useParams<ClassroomPageParams>()
    const location = useLocation();

    return (
        <>
            <ClassroomAppBar/>
            <div>Classroom code: {(location.state as AssignedClassroom).code}</div>
            <ParticipantTab id={+id}/>
        </>
        
    )
}

export default ClassroomPage;