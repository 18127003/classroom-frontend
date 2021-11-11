import { PopupMenuButtonProps } from "@/@types/props";
import { MenuItem } from "@mui/material";
import React, { ReactElement, useState } from "react";

const ClassJoinButton: React.FC<PopupMenuButtonProps> = ({onMenuItemClick, children, title}) => {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
      if(onMenuItemClick){
        onMenuItemClick();
      }
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <MenuItem onClick={handleClickOpen}>{title}</MenuItem>
        {
            React.Children.map(children, child=>React.cloneElement(child as ReactElement, {'isOpen':open, 'handleClose':handleClose}))
        }
      </div>
    );
  }
  
  export default ClassJoinButton;