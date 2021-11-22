import useAssignments from "@/hooks/useAssignments";
import { AppState } from "@/reducers";
import { Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AssignmentCard from "../GradeBookTab/AssignmentCard";

const AssignmentList = ()=>{
    const {assignments}=useAssignments()


    return (
        <Stack>
            <Stack mt={4} spacing={4}>
                {assignments.map(assignment=>(
                    <AssignmentCard assignment={assignment} key={assignment.id}/>
                ))}
            </Stack>
        </Stack>
    )
}

export default AssignmentList;