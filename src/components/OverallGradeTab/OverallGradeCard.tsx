import useGradeManage from "@/hooks/useGradeManage";
import { AppState } from "@/reducers";
import { Card, CardHeader, CardContent, Alert } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const OverallGradeCard: React.FC = ()=>{
    const {overall} = useGradeManage();
    const studentId = useSelector((state: AppState)=>state.account.detail.studentId)
    return (
        <Card sx={{marginTop:4, marginLeft:{md:8}, width:{md:'75%'}}}>
            <CardHeader title="Overall Grade"/>
            {
                studentId?(
                    <CardContent>{`${overall.overallGrade??0}/${overall.maxGrade??0}`}</CardContent>
                ):(
                    <Alert severity="warning">Map student ID to view your grade</Alert>
                )
            }
                   
        </Card>
    )
}

export default OverallGradeCard;