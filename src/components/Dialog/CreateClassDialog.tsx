import { CreateClassDialogProps } from "@/@types/props";
import { userService } from "@/services/service";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";

export const CreateClassDialog: React.FC<CreateClassDialogProps> = ({
    isOpen, handleClose, onPostCreate, onPreCreate}) => {

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
        let classroom = await userService.addClassroom({
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
        <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
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
    )
}