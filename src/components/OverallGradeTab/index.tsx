import { Grid } from "@mui/material";
import React from "react";
import OverallGradeCard from "./OverallGradeCard";

const OverallGradeTab: React.FC = ()=>{
    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:{md:'flex-start',sm:'center'}}} columnSpacing={{md:4}}>
            <Grid item md={3} sm={6} xs={4}>
                <OverallGradeCard/>
            </Grid>
            <Grid item md={6} sm={6} xs={4}>
            </Grid>
        </Grid>
    )
}

export default OverallGradeTab;