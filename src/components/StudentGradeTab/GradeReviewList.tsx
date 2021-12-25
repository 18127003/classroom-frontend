import useGradeReview from "@/hooks/useGradeReview";
import { Stack } from "@mui/material";
import React from "react";
import GradeReviewCard from "../Card/GradeReviewCard";

const GradeReviewList: React.FC = ()=>{
    const {reviews} = useGradeReview()

    return (
        <Stack mt={4} spacing={4}>
            {reviews.map(review=>(
                
                <GradeReviewCard review={review} key={review.id}/>
                
            ))}
        </Stack>
    )
}

export default GradeReviewList;