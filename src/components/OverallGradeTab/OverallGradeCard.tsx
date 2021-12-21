import useGradeManage from "@/hooks/useGradeManage";
import { Card, CardHeader, CardContent } from "@mui/material";
import React from "react";

const OverallGradeCard: React.FC = ()=>{
    const {overall} = useGradeManage();
    return (
        <Card sx={{marginTop:4, marginLeft:{md:8}, width:{md:'75%'}}}>
            <CardHeader title="Overall Grade"/>
            <CardContent>{`${overall.overallGrade}/${overall.maxGrade}`}</CardContent>       
        </Card>
    )
}

export default OverallGradeCard;