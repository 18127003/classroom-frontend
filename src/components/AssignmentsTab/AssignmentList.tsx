import useAssignments from "@/hooks/useAssignments";
import { AppState } from "@/reducers";
import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AssignmentCard from "../GradeStructureTab/AssignmentCard";

const AssignmentList = ()=>{
    const {assignments, classId}=useAssignments()

    return (
        <Stack>
            <Stack mt={4} spacing={4}>
                {assignments.map(assignment=>(
                    <Link 
                        to={`/classroom/${classId}/assignment/${assignment.id}`} 
                        style={{textDecoration:'none'}}
                    >
                        <AssignmentCard assignment={assignment} key={assignment.id}/>
                    </Link>
                ))}
            </Stack>
        </Stack>
    )
}

export default AssignmentList;