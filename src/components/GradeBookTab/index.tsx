import { getAssignmentsRequest } from "@/actions/detail";
import { AppState } from "@/reducers";
import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssignmentCard from "./AssignmentCard";
import EditAssignmentCard from "./EditAssignmentCard";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const GradeBookTab: React.FC = ()=>{
    const assignments = useSelector((state: AppState)=>state.detail.assignments.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const [editing,setEditing]=useState<number|null>(null)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAssignmentsRequest(classId))
    },[])

    const onEdit=(value: number)=>{
        setEditing(value)
    }
    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:'center'}}>
           
            <Grid item md={8} sm={6} xs={4}>
                {!editing&&assignments.length===0&&<EditAssignmentCard/>}
                <Stack mt={4} spacing={4}>
                {assignments.map((assignment)=>assignment.id===editing?(<EditAssignmentCard assignment={assignment}/>)
                :(<AssignmentCard assignment={assignment} onEdit={onEdit}  />))}
                </Stack>
            </Grid>
        </Grid>
        
    )
}

export default GradeBookTab;