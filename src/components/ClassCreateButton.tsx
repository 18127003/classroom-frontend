import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ClassCreateButtonProps } from "@/@types/props";
import { addClassroom } from "@/services/service";

const ClassCreateButton: React.FC<ClassCreateButtonProps> = ({onCreate}) => {
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
        classroomName: { value: string };
        classroomPart: { value: string };
        classroomTopic: { value: string };
        classroomRoom: { value: string };
    };
    handleClose();
    let classroom = await addClassroom({
      name: target.classroomName.value,
      part: target.classroomPart.value,
      topic: target.classroomTopic.value,
      room: target.classroomRoom.value,
      code: undefined,
      id: undefined
    });
    onCreate(classroom.data);
  }

  return (
    <div>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClickOpen}
          >
          <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
        <DialogTitle>Create classroom</DialogTitle>
        
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '96%' },
          }}
          noValidate
          autoComplete="off"
        >
          <DialogContent>
            <TextField
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