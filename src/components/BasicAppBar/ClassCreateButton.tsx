import { MenuItem } from "@mui/material";
import React, { useState } from "react";
import { ClassCreateButtonProps } from "@/@types/props";
import { CreateClassDialog } from "../Dialog/CreateClassdialog";

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

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Create Class</MenuItem>
      <CreateClassDialog 
        isOpen={open} 
        handleClose={handleClose}
        onPostCreate={onPostCreate}
        onPreCreate={onPreCreate}
      />
    </div>
  );
}

export default ClassCreateButton;