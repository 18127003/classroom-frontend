
import usePointsSum from "@/hooks/usePointsSum";
import { AppState } from "@/reducers";
import { Card, CardHeader, Grid, LinearProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import GradeStructure from "./GradeStructure";


const GradeStructureTab: React.FC = ()=>{
    const total = usePointsSum();
    const loading = useSelector((state:AppState)=>state.assignment.loading)

    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:'center'}}>
            <Grid item md={8} sm={6} xs={4}>
                <Card sx={{width:'90%', background: "rgba(0, 128, 0, 0.3)"}}>
                    <CardHeader 
                        title="Grade Structure"
                        subheader={`Total points: ${total}`}
                    />
                </Card>
                <LinearProgress sx={{width:'90%', display:!loading&&'none'}}/>
                <GradeStructure/>
            </Grid>
        </Grid>
    )
}

export default GradeStructureTab;