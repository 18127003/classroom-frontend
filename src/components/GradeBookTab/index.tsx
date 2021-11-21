import { Grid, Stack } from "@mui/material";
import React from "react";

const GradeBookTab: React.FC = ()=>{
    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:'center'}}>
            <Grid item md={8} sm={6} xs={4}>
                <Stack>
                    Something here
                </Stack>
            </Grid>
        </Grid>
    )
}

export default GradeBookTab;