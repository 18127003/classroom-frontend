import React, { useState } from "react"
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Tooltip, Button } from "@mui/material";
import GradeReviewDialog from "../Dialog/GradeReviewDialog";

const GradeReviewButton: React.FC = ()=>{
    const [open, setOpen] = useState(false)

    const handleOpen=()=>{setOpen(true)}

    const handleClose=()=>{setOpen(false)}

    return (
        <>
            <Tooltip title="Grade Reviews">
                <Button 
                    color="primary" 
                    size="small"
                    aria-label="grade-review-list"
                    variant="outlined" 
                    component="span"
                    onClick={handleOpen}
                >
                    <RateReviewIcon />
                </Button>
            </Tooltip>
            <GradeReviewDialog isOpen={open} handleClose={handleClose}/>
        </>
    )
}

export default GradeReviewButton