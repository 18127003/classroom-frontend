import { DialogProps } from "@/@types/props";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";

interface InviteParticipantDialogProps extends DialogProps{
    title: string,
    isStudent?: boolean
}
const InviteParticipantDialog: React.FC<InviteParticipantDialogProps>=({title,isStudent, isOpen, handleClose})=>{
    const handleSubmit = (event: SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
        };

        handleClose();

        // dispatch(joinClassroomRequest(target.classroomCode.value));
    }
    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
            <DialogTitle>{title}</DialogTitle>
            <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '96%' },
            }}
            autoComplete="on"
            >
            <DialogContent>
                <TextField
                autoFocus
                required
                id="email"
                label="Email or Name"
                name="email"
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Invite</Button>
            </DialogActions>
            </Box>
        </Dialog>
    )
}

export default InviteParticipantDialog;