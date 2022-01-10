import BasicAppBar from "@/components/BasicAppBar";
import ClassNotFound from "@/components/ClassNotFound";
import { AppState } from "@/reducers";
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const AssignmentPage: React.FC = ()=>{
    const error = useSelector((state: AppState)=>state.assignment.error);

    if(error){
        return <ClassNotFound/>
    }

    return (
        <>
            <BasicAppBar/>
            <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1}} columnSpacing={{md:4}} justifyContent='center' mt={5}>
                <Grid item md={8} sm={4} xs={4}>
                    
                </Grid>
                <Grid item md={3} sm={4} xs={4} mr={2} ml={2}>
                    <Card>
                        <CardHeader title='Add Submission'/>
                        <CardContent></CardContent>
                        <CardActions>
                            <Button sx={{flexGrow:1}} variant='outlined'>Submit</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default AssignmentPage;