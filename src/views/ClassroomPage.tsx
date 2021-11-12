import { AssignedClassroom } from "@/@types/model";
import React from "react";
import { useLocation, useParams } from "react-router";

type ClassroomPageParams = {
    id: string
}

const ClassroomPage: React.FC = ()=>{
    const {id} = useParams<ClassroomPageParams>()
    const location = useLocation();

    return (
        <div>Classroom code: {(location.state as AssignedClassroom).code}</div>
    )
}

export default ClassroomPage;