import { JoinClassDialogProps } from "@/@types/props";
import { joinClassroomRequest } from "@/actions/classrooms";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";

const JoinClassDialog: React.FC<JoinClassDialogProps> = ({isOpen, handleClose}) => {
    const dispatch = useDispatch();

    const handleSubmit = (event: SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            classroomCode: { value: string };
        };

        handleClose();

        dispatch(joinClassroomRequest({
            code: target.classroomCode.value
        }));
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Join classroom</DialogTitle>
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
                autoFocus
                required
                id="classroomCode"
                label="Classroom Code"
                name="classroomCode"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Join</Button>
            </DialogActions>
            </Box>
        </Dialog>
    )
}

export default JoinClassDialog;