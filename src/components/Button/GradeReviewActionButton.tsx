import { IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react"
import PopupMenu from "../PopupMenu";
import PopupMenuItem from "../PopupMenu/PopupMenuItem";
import FinalizeGradeReviewDialog from "../Dialog/FinalizeGradeReviewDialog";
import useGradeReview from "@/hooks/useGradeReview";
import { GradeReviewActionButtonProps } from "@/@types/props";

const GradeReviewActionButton: React.FC<GradeReviewActionButtonProps> = ({review})=>{
    const {finalize} = useGradeReview()

    const onFinalize = (grade:number)=>{
        finalize(review, grade)
    }

    return (
        <PopupMenu 
            id="grade-review-action"
            button={<IconButton><MoreVertIcon/></IconButton>}
        >
            <PopupMenuItem title="Reject">
                
            </PopupMenuItem>
            <PopupMenuItem title="Finalize">
                <FinalizeGradeReviewDialog handleSubmit={onFinalize}/>
            </PopupMenuItem>
        </PopupMenu>
    )
}

export default GradeReviewActionButton