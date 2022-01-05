import { FinalizeGradeReviewDialogProps } from "@/@types/props";
import { Dialog, DialogTitle, Box, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import React, { SyntheticEvent } from "react";

const FinalizeGradeReviewDialog: React.FC<FinalizeGradeReviewDialogProps> = ({isOpen=false, handleClose, handleSubmit}) => {

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            grade: { value: number };
        };
        handleSubmit(target.grade.value);
        handleClose();
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
        <DialogTitle>Finalize Grade Review</DialogTitle>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '96%' },
          }}
          autoComplete="off"
        >
          <DialogContent>
            <TextField
                required
                id="grade"
                label="Final Grade"
                type="number"
                name="grade"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Finalize</Button>
          </DialogActions>
        </Box>
      </Dialog>
    )
}

export default FinalizeGradeReviewDialog;