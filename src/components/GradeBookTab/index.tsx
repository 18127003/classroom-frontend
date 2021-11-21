import { getAssignmentsRequest } from "@/actions/detail";
import { AppState } from "@/reducers";
import { Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const GradeBookTab: React.FC = ()=>{
    const assignments = useSelector((state: AppState)=>state.detail.assignments.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAssignmentsRequest(classId))
    },[])

    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:'center'}}>
            <Grid item md={8} sm={6} xs={4}>
                <Stack>
                    <ul>
                    {assignments.map(assignment=>(<li>{assignment.name}</li>))}
                    </ul>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default GradeBookTab;