import { InviteParticipantDialogProps } from "@/@types/props";
import useChipEditor from "@/hooks/useChipEditor";
import { AppState } from "@/reducers";
import {  ContentCopy } from "@mui/icons-material";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useSelector } from "react-redux";


const InviteParticipantDialog: React.FC<InviteParticipantDialogProps>=({title,isStudent, isOpen, handleClose})=>{
    const {values,currentValue, handleDelete, handleChange, handleKeyDown} = useChipEditor();
    const classroom = useSelector((state: AppState)=>state.detail.detail)

    const handleSubmit = (event: SyntheticEvent)=>{
        event.preventDefault();

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
            {isStudent&&(<TextField
                id="link"
                label="Invite Link"
                defaultValue={classroom?`https://18127003.github.io/classroom-frontend/classroom/${classroom.id}?invite=true&code=${classroom.code}`:''}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <IconButton>
                            <ContentCopy />
                        </IconButton>
                    )
                }}
                
            />)}
            <Grid container rowSpacing={2} columnSpacing={1} columns={{ xs: 4, sm: 10, md: 10 }} sx={{m:1}}> 
                {values.map((email, index)=>(
                    <Grid item  key={index}>
                        <Chip
                            label={email}
                            onDelete={handleDelete(email)}
                        />
                    </Grid>
                ))}
            </Grid>
            <TextField
                placeholder="Type or paste email addresses and press `Enter`"
                value={currentValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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