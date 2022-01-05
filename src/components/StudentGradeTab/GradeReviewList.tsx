import useGradeReview from "@/hooks/useGradeReview";
import { Fab, Stack } from "@mui/material";
import React, { useState } from "react";
import GradeReviewCard from "../Card/GradeReviewCard";
import AddGradeReviewDialog from "../Dialog/AddGradeReviewDialog";
import AddIcon from "@mui/icons-material/Add";

const GradeReviewList: React.FC = ()=>{
    const {reviews, addGradeReview} = useGradeReview()
    const [openAddDialog, setOpenAddDialog] = useState(false)

    const handleCloseAddDialog = ()=>{setOpenAddDialog(false)}

    return (
        <>
            <Stack mt={4} spacing={4}>
                {reviews.map(review=>(
                    
                    <GradeReviewCard review={review} key={review.id} viewOnly={true}/>
                    
                ))}
            </Stack>
            <Fab 
                color="primary" 
                aria-label="add" 
                sx={{position: 'fixed', bottom: 32, right: 32,}}
                onClick={()=>{setOpenAddDialog(true)}}
            >
                <AddIcon />
            </Fab>
            <AddGradeReviewDialog
                isOpen={openAddDialog}
                handleClose={handleCloseAddDialog}
                handleSubmit={addGradeReview}
            />
        </>
    )
}

export default GradeReviewList;