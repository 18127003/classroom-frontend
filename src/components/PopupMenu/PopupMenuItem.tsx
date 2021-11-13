import { PopupMenuButtonProps } from "@/@types/props";
import { IconButton, MenuItem, Stack } from "@mui/material";
import React, { ReactElement, useState } from "react";

const ClassJoinButton: React.FC<PopupMenuButtonProps> = ({onMenuItemClick, children, title, button}) => {
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
        <MenuItem onClick={handleClickOpen}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3} sx={{flexGrow:1}}>
          {title}
          {button}
          </Stack>
        
        </MenuItem>
        {
            React.Children.map(children, child=>React.cloneElement(child as ReactElement, {'isOpen':open, 'handleClose':handleClose}))
        }
      </div>
    );
  }
  
  export default ClassJoinButton;