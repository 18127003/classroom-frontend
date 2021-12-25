import useAssignments from "@/hooks/useAssignments";
import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AssignmentCard from "../Card/AssignmentCard";

const AssignmentList = ()=>{
    const {assignments, classId}=useAssignments()

    return (
        <Stack mt={4} spacing={4}>
            {assignments.map(assignment=>(
                <Link 
                    to={`/classroom/${classId}/assignment/${assignment.id}`} 
                    style={{textDecoration:'none'}}
                    key={assignment.id}
                >
                    <AssignmentCard assignment={assignment} key={assignment.id}/>
                </Link>
            ))}
        </Stack>
    )
}

export default AssignmentList;