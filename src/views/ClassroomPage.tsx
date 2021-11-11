import React from "react";
import { useParams } from "react-router";

type ClassroomPageParams = {
    id: string
}

const ClassroomPage: React.FC = ()=>{
    const {id} = useParams<ClassroomPageParams>()

    return (
        <div>Classroom id: {id}</div>
    )
}

export default ClassroomPage;