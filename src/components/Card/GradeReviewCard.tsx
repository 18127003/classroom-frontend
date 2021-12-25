import { GradeReview } from "@/@types/model";
import { AssignmentIndRounded } from "@mui/icons-material";
import { Card, CardHeader, Avatar, Divider, CardContent } from "@mui/material";
import React from "react";

type GradeReviewCardProps = {
    review: GradeReview,
    key: any
}

const GradeReviewCard:React.FC<GradeReviewCardProps>=({review})=> {

    return (
        <Card>
            <CardHeader
                avatar={<Avatar sx={{background:"teal"}}><AssignmentIndRounded/></Avatar>}
                title='Expect'
                subheader={review.expectGrade}
                >
            </CardHeader>
            
            <Divider/>
            <CardContent>
                {review.explanation}
            </CardContent>
                
            
        </Card>
    );
}
export default GradeReviewCard