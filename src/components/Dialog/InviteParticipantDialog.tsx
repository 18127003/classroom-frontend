import { InviteParticipantDialogProps } from "@/@types/props";
import { sendInvitationRequest } from "@/actions/detail";
import useChipEditor from "@/hooks/useChipEditor";
import { AppState } from "@/reducers";
import {  ContentCopy } from "@mui/icons-material";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const InviteParticipantDialog: React.FC<InviteParticipantDialogProps>=({title,isStudent, isOpen, handleClose})=>{
    const {values,currentValue, handleDelete, handleChange, handleKeyDown} = useChipEditor();
    const classroom = useSelector((state: AppState)=>state.detail.detail);
    const [inviteLink, setInviteLink] = useState("");
    const [copied, setCopied]=useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(classroom){
            setInviteLink(`https://mnclassroom.netlify.app/#/classroom/${classroom.id}?invite=true&code=${classroom.code}`)
        }
    },[classroom])

    const handleSubmit = (event: SyntheticEvent)=>{
        event.preventDefault();

        if(classroom && values.length > 0){
            handleClose();

            dispatch(sendInvitationRequest({
                classId: classroom.id,
                invitations: values,
                role: isStudent?'STUDENT':'TEACHER'
            }));
        }
    }

    const handleCopyClick = ()=>{
        navigator.clipboard.writeText(inviteLink)
        setCopied(true)
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Invite {title}</DialogTitle>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '96%' }
                }}
                autoComplete="on"
            >
                <DialogContent>
                    {isStudent&&(<TextField
                        id="link"
                        label="Invite Link"
                        defaultValue={inviteLink}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <IconButton onClick={handleCopyClick}>
                                    <ContentCopy />
                                </IconButton>
                            )
                        }}
                    />)}
                    {copied && 
                        (<Typography color='green' sx={{m:1}} variant="body2">
                            Link copied to clipboard
                        </Typography>)}
                    <Divider sx={{m:1}}/>
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