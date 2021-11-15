import { DrawerItemProps } from "@/@types/props";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

const DrawerItem:React.FC<DrawerItemProps>=({title,toggleDrawer,items})=>{
    const [open, setOpen] = React.useState(false);

    const handleExpand = () => {
      setOpen(!open);
    };

    return (
        <>
          <ListItemButton onClick={handleExpand}>
            <ListItemText primary={title} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open}>
              {
                  items.map((item, index) => {
                      return(
                        
                        <ListItemButton sx={{ pl: 4 }} onClick={toggleDrawer} key={index}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                        
                      )
                  })
              }
              {/* <List component="div">
                
              </List> */}
          </Collapse>
          </>
    )
}
export default DrawerItem