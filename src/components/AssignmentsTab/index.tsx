
import { Grid } from "@mui/material";
import React from "react";
import AssignmentList from "./AssignmentList";

const AssignmentsTab = ()=>{
    
    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:{md:'center',sm:'center'}}}>
            <Grid item md={6} sm={6} xs={4}>
                <AssignmentList/>
            </Grid>
        </Grid>
    )
}

export default AssignmentsTab;