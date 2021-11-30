import { updateStudentIdRequest } from "@/actions/detail";
import { AppState } from "@/reducers";
import { LoadingButton } from "@mui/lab";
import { Box, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssignmentList from "./AssignmentList";

const AssignmentsTab = ()=>{

    const classroom = useSelector((state:AppState)=>state.detail.detail)
    const loading = useSelector((state:AppState)=>state.detail.loading)
    const dispatch = useDispatch()

    const handleUpdateStudentId = (event: SyntheticEvent)=>{
        event.preventDefault()
        const target = event.target as typeof event.target & {
            studentId: { value: string };
        }
        dispatch(updateStudentIdRequest(classroom.id, target.studentId.value))
    }

    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:{md:'flex-start',sm:'center'}}} columnSpacing={{md:4}}>
            <Grid item md={3} sm={6} xs={4}>
                <Card sx={{marginTop:4, marginLeft:{md:8}, width:{md:'75%'}}}>
                    <CardHeader title="Student ID"/>
                    {classroom && classroom.studentId?(<CardContent>{classroom.studentId}</CardContent>):(
                        <Box
                            component="form"
                            onSubmit={handleUpdateStudentId}
                            autoComplete="off"
                            noValidate={false}
                        >
                            <CardContent>
                                <TextField
                                    label="Student ID"
                                    variant="outlined"
                                    name="studentId"
                                />
                            </CardContent>
                            <CardActions sx={{ justifyContent: "flex-end", mr:1}}>
                                <LoadingButton type="submit" loading={loading} disabled={loading}>Update</LoadingButton>
                            </CardActions>
                        </Box>
                    )}
                    
                    
                </Card>
            </Grid>
            <Grid item md={6} sm={6} xs={4}>
                <AssignmentList/>
            </Grid>
        </Grid>
    )
}

export default AssignmentsTab;