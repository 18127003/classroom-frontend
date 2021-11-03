import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { ClassCreateButtonProps } from "@/@types/props";
import { addClassroom } from "@/services/service";

const ClassCreateButton: React.FC<ClassCreateButtonProps> = ({
    onMenuItemClick, onPreCreate, onPostCreate
  }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    onMenuItemClick();
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    console.log(open)
  },[open])

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
        classroomName: { value: string };
        classroomPart: { value: string };
        classroomTopic: { value: string };
        classroomRoom: { value: string };
    };
    handleClose();
    onPreCreate();
    let classroom = await addClassroom({
      name: target.classroomName.value,
      part: target.classroomPart.value,
      topic: target.classroomTopic.value,
      room: target.classroomRoom.value,
      code: undefined,
      id: undefined
    });
    onPostCreate(classroom.data);
  }

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Create Class</MenuItem>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
        <DialogTitle>Create classroom</DialogTitle>
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
              id="classroom-name"
              label="Classroom Name"
              name="classroomName"
            />
            <TextField
              id="classroom-part"
              label="Part"
              name="classroomPart"
            />
            <TextField
              id="classroom-topic"
              label="Topic"
              name="classroomTopic"
            />
            <TextField
              id="classroom-room"
              label="Room"
              name="classroomRoom"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Create</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default ClassCreateButton;