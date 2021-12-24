import { AppState } from "@/reducers";
import { Alert, Card, CardHeader, Grid, LinearProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import GradeReviewList from "./GradeReviewList";
import StudentGradeBoard from "./StudentGradeBoard";

const StudentGradeTab: React.FC = ()=>{
    const studentId = useSelector((state: AppState)=>state.account.detail.studentId)
    const loading = useSelector((state: AppState)=>state.grade.loading)

    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:{md:'center',sm:'center'}, mt:4}} columnSpacing={{md:4}}>
            <Grid item md={8} sm={6} xs={4}>
                {
                    studentId?(
                        <>
                            <LinearProgress sx={{display:!loading&&'none'}}/>
                            <StudentGradeBoard student={studentId}/>
                            <Card sx={{background: "rgba(0, 128, 0, 0.3)", mt:4}}>
                                <CardHeader 
                                    title="Pending Grade Reviews"
                                />
                            </Card>
                            <GradeReviewList/>
                        </>
                        
                    ):(
                        <Alert severity="warning">Map account student ID to see your grade</Alert>
                    )
                }               
            </Grid>
        </Grid>
    )
}

export default StudentGradeTab;