import { Dialog, AppBar, Toolbar, IconButton, Typography, List } from "@mui/material";
import React from "react"
import Transition from "../Transition";
import CloseIcon from '@mui/icons-material/Close';
import { GradeReviewDialogProps } from "@/@types/props";
import useGradeReview from "@/hooks/useGradeReview";
import GradeReviewCard from "../Card/GradeReviewCard";

const GradeReviewDialog: React.FC<GradeReviewDialogProps> = ({isOpen, handleClose}) => {
    const {reviews} = useGradeReview()

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', background:'rgba(0, 128, 0, 0.3)' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Grade Reviews
                    </Typography>
                </Toolbar>
            </AppBar>
            <List sx={{m:3}}>
                {
                    reviews.map(review=>(
                        <GradeReviewCard key={review.id} review={review}/> 
                    ))
                }
            </List>
        </Dialog>
    );
}

export default GradeReviewDialog