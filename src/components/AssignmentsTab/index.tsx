
import { AppState } from "@/reducers";
import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AssignmentList from "./AssignmentList";
import StudentIdCard from "./StudentIdCard";

const AssignmentsTab = ()=>{
    const classroom = useSelector((state:AppState)=>state.detail.detail)
    

    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:{md:'flex-start',sm:'center'}}} columnSpacing={{md:4}}>
            <Grid item md={3} sm={6} xs={4}>
                {classroom && (
                    <StudentIdCard studentId={classroom.studentId} classId={classroom.id}/>
                )}
            </Grid>
            <Grid item md={6} sm={6} xs={4}>
                <AssignmentList/>
            </Grid>
        </Grid>
    )
}

export default AssignmentsTab;