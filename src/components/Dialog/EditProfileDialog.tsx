import { EditProfileDialogProps } from "@/@types/props";
import { updateRequest } from "@/actions/account";
import { AppState } from "@/reducers";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({isOpen=false, handleClose}) => {
    const account = useSelector((state:AppState)=>state.auth.user)
    const dispatch = useDispatch()


    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            firstName: { value: string };
            lastName: { value: string };
            email: { value: string };
            studentId: { value: string };
        };

        handleClose();
        dispatch(updateRequest({
          id: account.id,
          firstName: target.firstName.value,
          lastName: target.lastName.value,
          email: target.email.value,
          studentId: target.studentId.value
        }));
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
        <DialogTitle>Edit Profile</DialogTitle>
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
              id="firstName"
              label="First Name"
              name="firstName"
              defaultValue={account.firstName}
            />
            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              defaultValue={account.lastName}
            />
            <TextField
              id="studentId"
              label="Student ID"
              name="studentId"
              defaultValue={account.studentId}
            />
            <TextField
              id="email"
              label="Email"
              name="email"
              defaultValue={account.email}
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