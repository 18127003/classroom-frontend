import { UpdateStudentIDDialogProps } from "@/@types/props"
import { updateStudentIdRequest } from "@/actions/account"
import { Dialog, DialogTitle, Box, DialogContent, TextField, DialogActions, Button } from "@mui/material"
import React, { SyntheticEvent } from "react"
import { useDispatch } from "react-redux"

const UpdateStudentIDDialog: React.FC<UpdateStudentIDDialogProps> = ({isOpen=false, handleClose, studentId, onUpdate}) => {

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            studentId: { value: string };
            studentName: { value: string };
        };
        handleClose();
        onUpdate(target.studentId.value, target.studentName.value)
    }


    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
        <DialogTitle>Update Student ID</DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '96%' },
          }}
          autoComplete="off"
        >
          <DialogContent>
            <TextField
                required
                id="studentId"
                label="Student ID"
                name="studentId"
                defaultValue={studentId}
            />
            <TextField
                required
                id="studentName"
                label="Student Name"
                name="studentName"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Update</Button>
          </DialogActions>
        </Box>
      </Dialog>
    )
}

export default UpdateStudentIDDialog;