
import usePointsSum from "@/hooks/usePointsSum";
import { Card, CardHeader, Grid } from "@mui/material";
import React from "react";
import GradeStructure from "./GradeStructure";


const GradeBookTab: React.FC = ()=>{
    const total = usePointsSum();
    
    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:'center'}}>
            <Grid item md={8} sm={6} xs={4}>
                <Card sx={{width:'90%'}}>
                    <CardHeader 
                        title="Grade Structure"
                        subheader={`Total points: ${total}`}
                    />
                </Card>
                <GradeStructure/>
            </Grid>
        </Grid>
        
    )
}

export default GradeBookTab;