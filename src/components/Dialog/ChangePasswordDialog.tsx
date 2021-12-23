import { ChangePasswordDialogProps } from "@/@types/props";
import { changePasswordRequest } from "@/actions/account";
import { AppState } from "@/reducers";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({isOpen=false, handleClose}) => {
    const account = useSelector((state:AppState)=>state.account.detail)
    const [valid,setValid]=useState(true)
    const dispatch = useDispatch()

    const close = ()=>{
        setValid(true)
        handleClose()
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            oldPassword: { value: string };
            newPassword: { value: string };
        };
        if(target.newPassword.value!==target.oldPassword.value){
          close();
          dispatch(changePasswordRequest({
            id: account.id,
            request: {
              oldPassword: target.oldPassword.value,
              newPassword: target.newPassword.value
            }
          }));
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
              label="Current Password"
              name="oldPassword"
            />
            <TextField
              required
              type="password"
              id="newPassword"
              label="New Password"
              name="newPassword"
            />
            {!valid&&(<Typography color="red" sx={{m:1}}>Invalid New Password</Typography>)}
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button type='submit'>Change</Button>
          </DialogActions>
        </Box>
      </Dialog>
    )
}

export default ChangePasswordDialog;