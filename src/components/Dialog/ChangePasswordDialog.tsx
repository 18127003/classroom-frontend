import { ChangePasswordDialogProps } from "@/@types/props";
import { addClassroomRequest } from "@/actions/classrooms";
import { AppState } from "@/reducers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({isOpen=false, handleClose}) => {
    const account = useSelector((state:AppState)=>state.auth.user)
    const [valid,setValid]=useState(true)

    const close = ()=>{
        setValid(true)
        handleClose()
        console.log(valid)
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            oldPassword: { value: string };
            newPassword: { value: string };
        };
        if(target.newPassword.value!==target.oldPassword.value){
            close();
        // dispatch(addClassroomRequest({
        //   name: target.classroomName.value,
        //   part: target.classroomPart.value,
        //   topic: target.classroomTopic.value,
        //   room: target.classroomRoom.value
        // }));
        }
        else{
            setValid(false)
        }
    }


    return (
        <Dialog open={isOpen} onClose={close} maxWidth='sm' fullWidth={true}>
        <DialogTitle>Change Password</DialogTitle>
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
                    type="password"
                    id="oldPassword"
                    label="Your Current Password"
                    name="oldPassword"
                />
            <TextField
                required
                type="password"
                id="newPassword"
                label="New Password"
                name="newPassword"
            />
            {!valid&&(<Typography color="red">Invalid New Password</Typography>)}
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button type='submit'>Change</Button>
          </DialogActions>
        </Box>
      </Dialog>
    )
}