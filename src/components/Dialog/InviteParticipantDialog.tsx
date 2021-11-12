import { DialogProps } from "@/@types/props";
import {  ContentCopy, Email } from "@mui/icons-material";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, ListItem, Paper, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";

interface InviteParticipantDialogProps extends DialogProps{
    title: string,
    isStudent?: boolean
}
const InviteParticipantDialog: React.FC<InviteParticipantDialogProps>=({title,isStudent, isOpen, handleClose})=>{
    const [emails, setEmails]= React.useState([])
    const [value, setValue]= React.useState("")

    const handleSubmit = (event: SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
        };

        handleClose();

        // dispatch(joinClassroomRequest(target.classroomCode.value));
    }
    const handleDelete = (chipToDelete) => () => {
        setEmails((chips) => chips.filter((chip) => chip !== chipToDelete));
      };

    const handleKeyDown = (event)=>{
        if([ 'Space','Enter'].includes(event.code)){
            event.preventDefault();

            var email= value.trim()
            if(email){
                setEmails([...emails, email])
                setValue("")
            } 
        }
    }
    const handleChange =(event)=>{
        setValue(event.target.value)
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
                //chỗ để link
                defaultValue="Link Here"
                //link anh ei
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <IconButton>
                            <ContentCopy />
                        </IconButton>
                    )
                }}
                
            />)}
            <Grid container rowSpacing={1} columnSpacing={{ xs: 4, sm:8, md: 8 }}> 
                {emails.map(email=>(
                    <Grid item  md={4}  key={emails.indexOf(email)}>
                    <Chip
                      label={email}
                      onDelete={handleDelete(email)}
                    />
                    </Grid>
                ))}
            </Grid>
            <TextField
                placeholder="Type or paste email addresses and press `Enter`"
                value={value}
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