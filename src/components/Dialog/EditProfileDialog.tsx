import { CreateClassDialogProps, EditProfileDialogProps } from "@/@types/props";
import { addClassroomRequest } from "@/actions/classrooms";
import { AppState } from "@/reducers";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({isOpen=false, handleClose}) => {
    const account = useSelector((state:AppState)=>state.auth.user)


    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            firstName: { value: string };
            lastName: { value: string };
            email: { value: string };
            // classroomRoom: { value: string };
        };

        handleClose();
        // dispatch(addClassroomRequest({
        //   firstName: target.firstName.value,
        //   lastName: target.lastName.value,
        //   email: target.email.value,
        //   room: target.classroomRoom.value
        // }));
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
              id="studentID"
              label="Student ID"
              name="studentID"
              
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
            <Button type='submit'>Change</Button>
          </DialogActions>
        </Box>
      </Dialog>
    )
}